from setuptools import setup

setup(
    name='DimensionFramework',
    version='4.0.3',
    packages=[
        'DimensionFramework',
        'DimensionFramework/AuthenticationProviders',
        'DimensionFramework/Core',
        'DimensionFramework/Pivot',

    ],
    include_package_data=True,
    install_requires=[
        'flask',
    ],
)