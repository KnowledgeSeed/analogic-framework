"""Run service-independent core and extension tests using the current interpreter."""
import argparse
import json
from pathlib import Path
import subprocess
import sys


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--extensions', action='store_true')
    parser.add_argument('--repository', type=Path, action='append', default=[])
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    repositories = args.repository
    if args.extensions:
        manifest = json.loads((root / 'extensions/manifest.json').read_text(encoding='utf-8'))
        repositories.extend(root / 'extensions' / name for name in manifest)
    tests = [root / 'analogic/tests']
    for repository in repositories:
        if (repository / 'tests').is_dir():
            tests.append(repository / 'tests')
        for name in ('test_tm1_service_api_username.py', 'test_tm1_impersonate_auth.py'):
            test = repository / 'analogic_pool/tests' / name
            if test.is_file():
                tests.append(test)
    subprocess.run([sys.executable, '-m', 'pytest', '-q', '--tb=short',
                    *map(str, tests)], check=True)
