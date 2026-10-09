from setuptools import setup
from pathlib import Path

root = Path(__file__).resolve().parent
version = (root / 'analogic/version.config').read_text(encoding='utf-8').strip()
requirements = (root / 'requirements.txt').read_text(encoding='utf-8').splitlines()

setup(
    name='analogic-framework',
    version=version,
    author='',
    python_requires='>=3.10',
    packages=[
        'analogic'
    ],
    include_package_data=True,
    package_data={'': ['version.config']},
    install_requires=[line for line in requirements if line and not line.startswith('#')],
    entry_points={
        'console_scripts': ['analogic=analogic.__cli__:main'],
    }
)
