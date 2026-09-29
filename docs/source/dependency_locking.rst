Dependency Locking
==================

All packages require Python >= 3.10. Release validation covers CPython
3.10-3.14 on 64-bit Windows and Linux. See :doc:`python_compatibility`.

Normal installation
-------------------

Install the required extension in the environment managed by the application
installer, using the configured package index::

   python -m pip install analogic_seeder

Dependency metadata selects compatible framework and native dependency
versions. Users do not choose NumPy versions or download Windows LDAP wheels.
Seeder's Docker/Podman installer supplies its own Python runtime.

Maintainer locks
----------------

``requirements.txt`` is the single source of direct dependencies read by
``setup.py`` and included in source distributions, in every repository.

- ``requirements.lock``: hashed runtime dependencies with Python/platform markers
- ``requirements-test.lock``: runtime and test dependencies
- ``requirements-server.lock``: runtime plus the Waitress server
- ``requirements-extensions.lock``: test environment for all 14 nonempty extensions
- ``requirements*.windows.lock`` and ``requirements*.linux.lock``: compatibility
  entry points including the corresponding universal lock

A lock chooses interpreter-specific dependencies automatically. NumPy 2.2.6
supports Python 3.10-3.13; Python 3.14 selects 2.3.5. Extras are retained for
compatibility with older pip resolvers in base images.

From an activated virtual environment::

   python -m pip install --require-hashes -r requirements-test.lock
   python -m pip install --no-deps -e .
   python -m pip check

Framework and extension artifacts are installed separately from third-party
hash locks. ``extensions/manifest.json`` lists the complete local checkouts.
SAC is empty and has no package to install.

Testing the complete set
-----------------------

Clone repositories under ``extensions/<repository-name>``. In a clean
environment, using an empty wheel output directory::

   python -m pip install --require-hashes -r requirements-extensions.lock
   python scripts/build_wheels.py --extensions
   python -m pip install --no-index --find-links dist analogic-framework analogic-airflow-api-connector analogic-pool analogic-file-upload analogic-graphql analogic-iis-pool analogic-ldap-pool analogic-long-running-task analogic-mssql analogic-mysql analogic-saml analogic-seeder analogic-sharepoint analogic-sql analogic-tm1-error-reporting
   python -m pip check
   python scripts/run_tests.py --extensions
   python scripts/check_runtime.py --extensions

Linux needs ``libodbc2`` to import the SQL Server connector. Database
connections still require the vendor driver and application configuration.

Regenerating
------------

Install uv 0.12.5 as a maintainer tool, then run::

   python scripts/lock_dependencies.py
   python scripts/lock_dependencies.py --extensions

The second command also refreshes the Pool lock against the local framework,
so a coordinated release can be resolved before publication. Both commands
use universal resolution from Python 3.10 with hashes. Build tools and native
OS libraries are separate build requirements.
