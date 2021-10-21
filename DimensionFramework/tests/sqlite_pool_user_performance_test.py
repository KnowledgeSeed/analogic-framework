from DimensionFramework.Core.SettingManager import SettingManager
from flask_caching import Cache
import os
from flask import Flask
import requests
from multiprocessing import Pool, TimeoutError
import time
import os

app = Flask(__name__)
site_root = os.path.realpath(os.path.dirname(__file__))

cache_path = os.path.join(os.path.dirname(__file__), 'cache')
cache = Cache(app, config={'CACHE_TYPE': 'FileSystemCache', 'CACHE_DIR': cache_path})

setting = SettingManager(cache, site_root, 'hays')


def doPoolRequest():
    url = 'https://kseed-dc1.knowledgeseed.local:5125/haysapi/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption, Attributes/NormalName))'

    mdx = '{"MDX":"SELECT {[}ElementAttributes_Organization Units].[}ElementAttributes_Organization Units].[Caption]}  ON COLUMNS , {[Organization Units].[Organization Units].[L_DE_ENTPR], [Organization Units].[Organization Units].[L_DE_CS&IND],[Organization Units].[Organization Units].[L_DE_SPOT],[Organization Units].[Organization Units].[L_DE_PERM]}   ON ROWS   FROM [}ElementAttributes_Organization Units]  "}'

    method = 'POST'

    headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                               'Accept-Encoding': 'gzip, deflate, br'}
    cookies: dict[str, str] = {}
    start_time = time.time()
    pool_user = setting.getPoolUser()
    print(pool_user['name'])
    print(os.getpid())
    print("--- %s seconds (Get pool user) ---" % (time.time() - start_time))
    authorization_required = pool_user['session'] == ''

    if authorization_required:
        headers['Authorization'] = setting.getPoolCamNamespace(pool_user['name'])
    else:
        cookies["TM1SessionId"] = pool_user['session']


    response = requests.request(
        url=url,
        method=method,
        data=mdx,
        headers=headers,
        cookies=cookies,
        verify=False)

    if authorization_required:
        pool_user['session'] = response.cookies.get('TM1SessionId')
        setting.updatePoolUser(pool_user)
    else:
        setting.decreasePoolUserSessionCount(pool_user)

    return response.status_code


def f(x):
    return x * x


if __name__ == '__main__':
    # start 4 worker processes
    with Pool(processes=4) as pool:

        res = pool.apply_async(doPoolRequest, ())
        print(res.get(timeout=30))
        res = pool.apply_async(doPoolRequest, ())
        print(res.get(timeout=30))
        res = pool.apply_async(doPoolRequest, ())
        print(res.get(timeout=30))

    # exiting the 'with'-block has stopped the pool
    print("Now the pool is closed and no longer available")
