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
        'Flask==2.3.2',
        'TM1py==2.0.4',
        'PyJWT==2.4.0',
        'requests==2.32.3',
        'numpy==1.23.1',
        'pandas==1.4.3',
        'XlsxWriter==1.3.7',
        'matplotlib==3.5.2',
        'PyYaml==6.0',
        'xlrd==2.0.1',
        'openpyxl==3.0.10',
        'json_logging==1.3.0',
        'flask_talisman==1.1.0',
        'Flask-APScheduler==1.12.4',
        'orjson==3.9.15',
        'rich==13.3.5',
        'jproperties==2.1.1',
        'cryptography>=37.0.4,<43.0.0'
    ],
    entry_points={
        'console_scripts': ['analogic=analogic.__cli__:main'],
    }
)
