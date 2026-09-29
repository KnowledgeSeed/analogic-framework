"""Regenerate hashed Python 3.10+ dependency locks with uv 0.12.5."""
import argparse
import json
from pathlib import Path
import subprocess
import tempfile


ROOT = Path(__file__).resolve().parents[1]


def compile_lock(source, output, packages=()):
    command = ['uv', 'pip', 'compile', '--universal', '--python-version', '3.10',
               '--generate-hashes', '--no-strip-extras', '--no-header', '--quiet', str(source),
               '--output-file', str(output)]
    for package in packages:
        command.extend(['--no-emit-package', package])
    subprocess.run(command, cwd=ROOT, check=True)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--extensions', action='store_true', help='Also lock checked-out private extensions')
    args = parser.parse_args()
    compile_lock('requirements.in', 'requirements.lock')
    compile_lock('requirements-test.in', 'requirements-test.lock')
    compile_lock('requirements-server.in', 'requirements-server.lock')
    if args.extensions:
        packages = json.loads((ROOT / 'extensions/manifest.json').read_text(encoding='utf-8'))
        compile_lock('requirements-extensions.in', 'requirements-extensions.lock',
                     ['analogic-framework', *packages.values()])
        # Include the unpublished framework checkout when preparing a coordinated release.
        pool = ROOT / 'extensions/analogic-ext-analogic-pool'
        with tempfile.TemporaryDirectory() as temporary:
            source = Path(temporary) / 'requirements.in'
            source.write_text(f'-e {ROOT.as_posix()}\n-r {pool.as_posix()}/requirements.txt\n', encoding='utf-8')
            compile_lock(source, pool / 'requirements.lock', ['analogic-framework'])
