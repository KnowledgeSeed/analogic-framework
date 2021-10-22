import os
import sys
from flask import json
from DimensionFramework.Core.SqlitePoolUserManager import SqlitePoolUserManager

if len(sys.argv) < 2:
    print('Please add application name as parameter')
    exit(0)

json_url = os.path.join(os.path.dirname(__file__), '..', 'applications', sys.argv[1], 'config.json')
if os.path.exists(json_url) is False:
    print('path does not exists: ' + json_url)
    exit(0)

setting = json.load(open(json_url), encoding="utf-8")


if 'pool' not in setting or 'users' not in setting['pool']:
    print('please set pool.users in config.json')
    exit(0)

if 'Pool' in setting['authenticationMode']:
    poolUserManager = SqlitePoolUserManager(setting['pool']['users'],
                                            os.path.join(os.path.dirname(__file__), '..'),
                                            sys.argv[1])
    poolUserManager.clear()
    poolUserManager.createDatabase()
    print('Database created')
else:
    print('authenticationMode is not Pool')
    exit(0)

