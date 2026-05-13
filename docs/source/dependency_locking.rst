Dependency Locking
==================

Analogic keeps direct dependency pins in ``requirements.txt``,
``requirements-test.txt`` and ``setup.py``. Reproducible environments,
including transitive dependencies, are maintained in platform-specific lock
files.

Files
-----

- ``requirements.txt``: direct runtime pins
- ``requirements-test.txt``: direct test pins
- ``requirements.in``: runtime lock input
- ``requirements-test.in``: test lock input
- ``requirements.windows.lock``: Windows runtime lock with hashes
- ``requirements-test.windows.lock``: Windows test lock with hashes
- ``requirements.linux.lock``: Linux runtime lock with hashes
- ``requirements-test.linux.lock``: Linux test lock with hashes

Runtime install
---------------

Windows
~~~~~~~

::

   py -3.10 -m pip install --upgrade pip
   py -3.10 -m pip install --require-hashes -r requirements.windows.lock
   py -3.10 -m pip install --no-deps -e .

Linux / CI
~~~~~~~~~~

::

   python3.10 -m pip install --upgrade pip
   python3.10 -m pip install --require-hashes -r requirements.linux.lock
   python3.10 -m pip install --no-deps -e .

Test install
------------

Windows
~~~~~~~

::

   py -3.10 -m pip install --upgrade pip
   py -3.10 -m pip install --require-hashes -r requirements-test.windows.lock
   py -3.10 -m pip install --no-deps -e .

Linux / CI
~~~~~~~~~~

::

   python3.10 -m pip install --upgrade pip
   python3.10 -m pip install --require-hashes -r requirements-test.linux.lock
   python3.10 -m pip install --no-deps -e .

Regenerating lock files
-----------------------

Regenerate Windows locks on Windows with Python 3.10:

::

   py -3.10 -m pip install --upgrade pip pip-tools
   py -3.10 -m piptools compile --generate-hashes --strip-extras --resolver=backtracking --output-file requirements.windows.lock requirements.in
   py -3.10 -m piptools compile --generate-hashes --strip-extras --resolver=backtracking --output-file requirements-test.windows.lock requirements-test.in

Regenerate Linux locks on Linux or WSL for the CI target interpreter:

::

   python3 -m pip install --user --break-system-packages pip-tools wheel "Cython<3"
   python3 -m piptools compile --generate-hashes --strip-extras --no-build-isolation --resolver=backtracking --pip-args="--python-version 3.10 --implementation cp --abi cp310" --output-file requirements.linux.lock requirements.in
   python3 -m piptools compile --generate-hashes --strip-extras --no-build-isolation --resolver=backtracking --pip-args="--python-version 3.10 --implementation cp --abi cp310" --output-file requirements-test.linux.lock requirements-test.in

Notes
-----

- ``setup.py`` intentionally keeps only direct runtime dependencies. Do not add transitive locks there.
- The lock files are platform-specific because the dependency graph differs between Windows and Linux.
- ``--require-hashes`` is enabled in the install commands for integrity checking.
- ``--only-binary :all:`` is not enabled today because the current ``TM1py==2.1`` pin does not provide full wheel coverage across the supported targets.
