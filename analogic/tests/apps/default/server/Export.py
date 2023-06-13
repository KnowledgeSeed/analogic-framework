import io
import logging

import numpy as np
import pandas as pd
import xlsxwriter
from TM1py.Utils.Utils import build_pandas_dataframe_from_cellset

pd.set_option('display.float_format', lambda x: '%.3f' % x)


def getMDXJSONByRequest(request, setting):
    mdx = setting.get_mdx(request.args['key'])
    for k in request.args:
        mdx = mdx.replace('$' + k, request.args[k].replace('"', '\\"'))

    mdx = '{"MDX"  :"' + mdx + '"}'
    return mdx


class Export:

    def __init__(self):
        pass

    def getLogger(self):
        return logging.getLogger(__name__)

    def test_export(self, request, tm1_service, setting, authentication_provider):
        output = io.BytesIO()
        workbook = xlsxwriter.Workbook(output, {'in_memory': True})

        export_key = request.args.get('export_key')
        if export_key != 'testExport':
            raise Exception('Not valid request')

        instance = setting.get_instance()
        if instance != 'default':
            raise Exception('Not valid instance')

        target_url = setting.get_proxy_target_url()
        resp = authentication_provider.do_proxy_request(target_url + '/api/v1/Configuration', 'GET', '')
        data = resp.json()
        if resp.status_code != 200:
            raise Exception('Proxy request failed')

        connected = tm1_service.connection.is_connected()
        if connected is False:
            raise Exception('Tm1 service not connected')

        workbook.close()
        output.seek(0)
        return output
