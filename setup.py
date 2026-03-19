from setuptools import setup
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
f = open(dir_path + "/analogic/version.config")
version = f.read().rstrip()

setup(
    name='analogic-framework',
    version=version,
    author='',
    python_requires='>=3.9',
    packages=[
        'analogic'
    ],
    include_package_data=True,
    package_data={'': ['version.config']},
    install_requires=[
        'Flask==3.1.3',
        'TM1py==2.1',
        'PyJWT==2.12.0',
        'requests==2.32.5',
        'numpy==2.2.3',
        'pandas==2.2.3',
        'XlsxWriter==1.3.7',
        'matplotlib==3.10.1',
        'PyYaml==6.0',
        'xlrd==2.0.1',
        'openpyxl==3.1.5',
        'json_logging==1.3.0',
        'flask_talisman==1.1.0',
        'Flask-APScheduler==1.13.1',
        'orjson==3.11.6',
        'rich==13.3.5',
        'jproperties==2.1.1',
        'cryptography==46.0.5'
    ],
    entry_points={
        'console_scripts': ['analogic=analogic.__cli__:main'],
    }
)
