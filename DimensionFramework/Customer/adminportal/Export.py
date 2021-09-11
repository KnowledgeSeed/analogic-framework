import xlsxwriter
import numpy as np
import pandas as pd
import io
from TM1py.Utils.Utils import build_pandas_dataframe_from_cellset
import requests
from flask import session
import logging

pd.set_option('display.float_format', lambda x: '%.3f' % x)


def getMDXJSONByRequest(request, setting):
    mdx = setting.getMDX(request.args['key'])
    for k in request.args:
        mdx = mdx.replace('$' + k, request.args[k].replace('"', '\\"'))

    mdx = '{"MDX"  :"' + mdx + '"}'
    return mdx


class Export:

    def __init__(self):
        pass

    def getLogger(self):
        return logging.getLogger(__name__)
