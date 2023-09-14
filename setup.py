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
        'TM1py==1.11.3',
        'PyJWT==2.4.0',
        'requests==2.31.0',
        'numpy==1.23.1',
        'pandas==1.4.3',
        'XlsxWriter==1.3.7',
        'matplotlib==3.5.2',
        'PyYaml==6.0',
        'xlrd==2.0.1',
        'openpyxl==3.0.10',
        'Flask-Cors==3.0.10',
        'json_logging==1.3.0',
        'flask_talisman',
        'Flask-APScheduler==1.12.4',
        'orjson==3.8.6',
        'rich==13.3.5'
    ],
    entry_points={
        'console_scripts': ['analogic=analogic.__cli__:main'],
    }
)
