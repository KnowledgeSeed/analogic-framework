Python Compatibility
====================

The supported baseline is Python 3.10. Release validation covers standard,
64-bit CPython 3.10-3.14 on Windows and Linux. Future Python minors, PyPy,
free-threaded builds and additional architectures need their own validation
before being advertised as supported. ``Requires-Python: >=3.10`` declares
a minimum version, not a guarantee about future interpreters.

Installer behavior
------------------

The Seeder application and the Analogic Seeder extension are different
packages. Seeder's Docker/Podman installer carries its own Python environment;
it does not ask the user to align the host Python version. Its existing image
runtime and isolated AsyncService environment remain the integration boundary.
Do not install Analogic's Flask stack into Seeder's host environment.

The extension ``analogic_seeder`` requires the compatible framework release.
Installing it from the configured private index resolves framework dependencies
automatically. Other extensions also declare their direct framework, Pool or
SQL dependencies. Metadata comes from packaged ``requirements.txt`` files.

LDAP and IIS
------------

The LDAP provider uses ldap3's synchronous LDAPv3 SIMPLE bind, removing the
python-ldap/OpenLDAP build and manual Windows wheel installation. Existing
``server``, ``port``, ``secure``, ``userDn`` and ``baseDn`` settings remain
supported. Empty credentials cannot fall back to anonymous authentication.
Connections are unbound on success and failure.

Existing LDAPS configurations retain their previous certificate-validation
behavior. Set ``verifyCertificate: true`` and, for a private CA,
``caCertsFile`` to enable verification. The new client does not change
process-global TLS settings.

IIS authentication requires Windows and installs pywin32 only there. The
extension can be discovered on Linux without breaking unrelated providers;
selecting IIS authentication there raises an explicit platform error.

Release gates
-------------

1. Publish framework 4.1.109 (or a newer coordinated version) first, then
   Pool 4.1.44 and SQL 1.0.2, then the dependent extension releases.
2. The framework workflow tests five Python minors on both operating systems.
   Each extension calls a commit-pinned shared workflow with its own commit
   and an explicit ``framework-ref``. The calling repository uses its own
   ``GITHUB_TOKEN``. LDAP/IIS also need Pool, and MSSQL/MySQL also need SQL;
   their ``dependency-ref`` pins the coordinated dependency revision.
   Configure ``EXTENSIONS_READ_TOKEN`` with read access to these private
   dependencies for those four callers, and to all extensions for the complete
   matrix. A missing token fails the access check before the matrix starts.
   This is maintainer configuration, not an installer-user requirement.
3. Run ``All extensions compatibility`` before releasing the coordinated
   repositories. It builds actual wheels, checks dependencies, runs tests and
   starts an isolated application with all extensions. The package inventory
   is ``extensions/manifest.json``. The existing ``CI Build`` manual workflow
   can also invoke this check using ``include_extensions`` and
   ``extensions_ref``. This allows validation of coordinated feature branches
   before the new workflow has reached the default branch.
4. For protected Pool distributions, run the protected-wheel workflows with
   a PyArmor 9-compatible registration valid for the selected CI runners and
   BCC protection. Merely having a ``PYARMOR_LIC`` secret does not prove that
   the license is valid for PyArmor 9 or GitHub-hosted runners. PyArmor 9.2.7 generates and imports a
   separate wheel for each Python minor and OS. Protected wheels have
   CPython/ABI/platform tags; plaintext source wheels remain ``py3-none-any``.
   Never rename a protected cp310 wheel to install it on another interpreter.
5. Production configuration is inserted before obfuscation. The build rejects
   unexpected plaintext Python and produces no unprotected fallback on
   failure. Keep protected and plaintext distribution channels separate when
   source protection is required.

These checks do not replace live integration tests against TM1, LDAP/AD, IIS,
SAML, databases, SharePoint or Airflow. Protected release validation requires
the actual organization license and CI secrets.

The coordinated pull requests keep package/runtime changes and workflow
changes in separate commits. Merge and production publication belong to the
release owner. Advance the pinned framework and dependency revisions together
when preparing later coordinated changes.

Docker
------

The framework Dockerfiles use the hashed server lock and default to Python
3.12. ``--build-arg PYTHON_VERSION=3.14`` selects another tested minor without
changing package pins. They use the existing Waitress server implementation:
bjoern 3.2.2 does not build on Python 3.14. The historical ``Dockerfile-bjoern``
and bjoern-named Compose files now select Waitress too. Applications explicitly
selecting another WSGI server must package and validate that server separately.
The existing ProxyFix middleware retains ownership of forwarded headers.
The development Compose override explicitly selects Flask's reloading server.
Host virtual environments, local settings and extension
checkouts are excluded from the image build context. Package extension wheels
explicitly in application-specific images.
