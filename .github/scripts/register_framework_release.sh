#!/usr/bin/env bash
# Registers a framework release as a 'draft' on the Seeder Portal.
# The release becomes visible in Seeder only after a superadmin publishes it on the portal UI.
#
# Usage: register_framework_release.sh <version> [masterdata.zip]
#   masterdata.zip: package built by tools/masterdata/build_masterdata.py. It is uploaded first
#                   (the portal re-verifies and signs it) and the release is registered with its revision.
# Env:   PORTAL_FRAMEWORK_RELEASE_API_KEY  (required) key of the portal's FRAMEWORK_RELEASE_API_KEY
#        PORTAL_URL                        (optional) default https://portal.knowledgeseed.ch
#
# Idempotent: re-uploading a package or re-registering a draft is fine, an already published/revoked
# release (HTTP 409) is not an error.
set -euo pipefail

VERSION="${1:-}"
PACKAGE="${2:-}"
PORTAL_URL="${PORTAL_URL:-https://portal.knowledgeseed.ch}"

if [[ ! "$VERSION" =~ ^[0-9]+(\.[0-9]+)*$ ]]; then
  echo "::error::Invalid framework version '$VERSION'"
  exit 1
fi

if [[ -z "${PORTAL_FRAMEWORK_RELEASE_API_KEY:-}" ]]; then
  echo "::error::PORTAL_FRAMEWORK_RELEASE_API_KEY secret is not configured"
  exit 1
fi

if [[ -n "$PACKAGE" && ! -f "$PACKAGE" ]]; then
  echo "::error::Masterdata package '$PACKAGE' does not exist"
  exit 1
fi

RESPONSE_FILE="$(mktemp)"
trap 'rm -f "$RESPONSE_FILE"' EXIT

# portal_post <path> <content-type> <curl data args...>: prints the HTTP status, the body is in $RESPONSE_FILE
portal_post() {
  local path="$1" content_type="$2"
  shift 2
  curl --silent --show-error \
    --request POST "$PORTAL_URL$path" \
    --header "Content-Type: $content_type" \
    --header "x-framework-release-api-key: $PORTAL_FRAMEWORK_RELEASE_API_KEY" \
    "$@" \
    --retry 2 --retry-delay 10 --retry-all-errors \
    --output "$RESPONSE_FILE" --write-out '%{http_code}'
}

REVISION=""
if [[ -n "$PACKAGE" ]]; then
  echo "Uploading masterdata package $PACKAGE to $PORTAL_URL"
  HTTP_STATUS="$(portal_post /api/masterdata_packages application/zip --data-binary "@$PACKAGE")"
  echo "Portal response ($HTTP_STATUS):"
  cat "$RESPONSE_FILE"
  echo
  if [[ "$HTTP_STATUS" != "200" ]]; then
    echo "::error::Uploading the masterdata package failed with HTTP $HTTP_STATUS"
    exit 1
  fi
  REVISION="$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["revision"])' "$RESPONSE_FILE")"
  echo "Masterdata revision: $REVISION"
fi

echo "Registering framework release $VERSION as draft on $PORTAL_URL"
BODY="{\"version\": \"$VERSION\""
if [[ -n "$REVISION" ]]; then
  BODY="$BODY, \"masterdata_revision\": \"$REVISION\""
fi
BODY="$BODY}"

HTTP_STATUS="$(portal_post /api/framework_releases application/json --data "$BODY")"

echo "Portal response ($HTTP_STATUS):"
cat "$RESPONSE_FILE"
echo

case "$HTTP_STATUS" in
  200)
    echo "Release $VERSION registered as draft, waiting for superadmin approval on the portal."
    ;;
  409)
    echo "Release $VERSION is already published or revoked on the portal, nothing to do."
    ;;
  *)
    echo "::error::Registering framework release $VERSION failed with HTTP $HTTP_STATUS"
    exit 1
    ;;
esac
