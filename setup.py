from setuptools import setup
from analogic import version

setup(
    name='analogic',
    version=version,
    author='',
    python_requires='>=3.9',
    packages=[
        'analogic'
    ],
    include_package_data=True,
    install_requires=[
        'Flask==2.1.2',
        'Flask-Caching==2.0.0',
        'TM1py==1.9.1',
        'PyJWT==2.4.0',
        'requests==2.28.1',
        'numpy==1.23.1',
        'pandas==1.4.3',
        'XlsxWriter==1.3.7',
        'matplotlib==3.5.2',
        'PyYaml==6.0',
        'xlrd==2.0.1',
        'openpyxl==3.0.10',
        'Flask-Cors==3.0.10',
        'json_logging==1.3.0',
        'flask_talisman'
    ],
)
