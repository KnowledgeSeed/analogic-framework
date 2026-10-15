"""Build the framework and selected extension checkouts into one wheel directory."""
import argparse
import json
from pathlib import Path
import subprocess
import sys


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--extensions', action='store_true')
    parser.add_argument('--available-extensions', action='store_true')
    parser.add_argument('--repository', type=Path, action='append', default=[])
    parser.add_argument('--out-dir', type=Path, default=Path('dist'))
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    repositories = [root, *args.repository]
    if args.extensions or args.available_extensions:
        manifest = json.loads((root / 'extensions/manifest.json').read_text(encoding='utf-8'))
        repositories.extend(root / 'extensions' / name for name in manifest
                            if args.extensions or (root / 'extensions' / name / 'setup.py').is_file())
    for repository in repositories:
        subprocess.run([sys.executable, '-m', 'build', '--wheel', '--outdir',
                        str(args.out_dir.resolve()), str(repository.resolve())], check=True)
