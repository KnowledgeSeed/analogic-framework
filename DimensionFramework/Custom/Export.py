import xlsxwriter
import numpy as np
import pandas as pd
import io
from TM1py.Utils.Utils import build_pandas_dataframe_from_cellset
import requests
from flask import session

pd.set_option('display.float_format', lambda x: '%.3f' % x)


class Export:

    def __init__(self):
        pass

    def rocheIpPlanningMonthly(self, request, tm1_service, setting):

        output = io.BytesIO()
        workbook = xlsxwriter.Workbook(output, {'in_memory': True})
        worksheet = workbook.add_worksheet()

        mdx = setting.getMDX(request.args['key'])
        for k in request.args:
            mdx = mdx.replace('$' + k, request.args[k].replace('"', '\\"'))

        mdx = '{"MDX"  :"' + mdx + '"}'
        #     data = tm1_service.cells.execute_mdx(mdx)

        user = request.args['activeUserName']
        company = request.args['company']
        receiver = request.args['receiver']
        global_version = request.args['globalVersion']
        version = request.args['version']
        product = request.args['material']

        font_size = 12
        worksheet.protect('ADSBP', {'format_cells': True, 'format_rows': True, 'format_columns': True})

        worksheet.write(0, 0, user)
        worksheet.write(0, 1, company)
        worksheet.write(0, 2, receiver)
        worksheet.write(0, 3, global_version)
        worksheet.write(0, 4, version)
        worksheet.write(0, 5, product)

        bold = workbook.add_format({'bold': True})
        bold.set_font_name('Imago')
        bold.set_font_size(font_size)

        worksheet.write(2, 5, request.args['year1'], bold)
        worksheet.write(2, 18, request.args['year2'], bold)

        worksheet.write(2, 0, 'Material Number', bold)
        worksheet.write(2, 2, 'Level', bold)
        worksheet.write(2, 3, 'Instrument type', bold)
        worksheet.write(2, 4, 'Contract type', bold)

        i = 1
        j = 6
        while i <= 12:
            worksheet.write(2, j, str(i).zfill(2), bold)
            worksheet.write(2, j + 13, str(i).zfill(2), bold)
            j = j + 1
            i = i + 1

        headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                                   'Accept-Encoding': 'gzip, deflate, br'}

        tm1_session_id = setting.getTM1SessionId(session.get('cam_name', ''))

        cookies: dict[str, str] = {"TM1SessionId": tm1_session_id}

        cnf = setting.getConfig()

        target_url = cnf['tm1ApiHostBackend']

        response = requests.request(
            url=target_url + '/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,Value, Consolidated, RuleDerived, Updateable;$expand=Members($select=Name, Attributes/Caption))',
            method='POST',
            data=mdx,
            headers=headers,
            cookies=cookies,
            verify=False)

        d = response.json()

        simple = workbook.add_format({'locked': False})
        simple.set_font_name('Imago')
        simple.set_font_size(font_size)

        read_only = workbook.add_format()
        read_only.set_bg_color('#ebecec')
        read_only.set_font_name('Imago')
        read_only.set_font_size(font_size)

        l = len(d['Cells'])
        i = 0
        r = 2
        c = 0
        while i < l:
            if i % 29 == 0:
                r = r + 1
                c = 0
                pl = 6
                pl_text = d['Cells'][i + 2]['Value']
                if d['Cells'][i + 2]['Value'] != 'IP Node':
                    pl = int(d['Cells'][i + 2]['Value'].replace('PL', '').replace('a', ''))
                    pl_text = pl
                instrument_type = d['Cells'][i]['Members'][5]['Attributes']['Caption']
                contract_type = d['Cells'][i]['Members'][6]['Attributes']['Caption']
                name = d['Cells'][i]['Value']
                code = d['Cells'][i + 1]['Value']

                cf = workbook.add_format()
                cf.set_indent(pl)
                cf.set_font_name('Imago')
                cf.set_font_size(font_size)
                cf.set_bg_color('#ebecec')

                worksheet.write(r, c, code, read_only)
                c = c + 1
                worksheet.write(r, c, name, cf)
                c = c + 1
                worksheet.write(r, c, pl_text, cf)
                c = c + 1
                worksheet.write(r, c, instrument_type, read_only)
                c = c + 1
                worksheet.write(r, c, contract_type, read_only)

                i = i + 2

            else:
                value = d['Cells'][i]['Value']
                if (value == None):
                    value = 0
                if d['Cells'][i]['Consolidated'] == False and d['Cells'][i]['RuleDerived'] == False:
                    worksheet.write(r, c, value, simple)
                else:
                    worksheet.write(r, c, value, read_only)

            i = i + 1
            c = c + 1

        workbook.close()
        output.seek(0)
        return output

    def rocheMonthly(self, request, tm1_service, setting):
        output = io.BytesIO()
        workbook = xlsxwriter.Workbook(output, {'in_memory': True})
        worksheet = workbook.add_worksheet()

        mdx = setting.getMDX(request.args['key'])
        for k in request.args:
            mdx = mdx.replace('$' + k, request.args[k].replace('"', '\\"'))

        mdx = '{"MDX"  :"' + mdx + '"}'
        #     data = tm1_service.cells.execute_mdx(mdx)

        user = request.args['activeUserName']
        company = request.args['company']
        receiver = request.args['receiver']
        global_version = request.args['globalVersion']
        version = request.args['version']
        product = request.args['product']
        line_item = request.args['lineItem']

        font_size = 12
        worksheet.protect('ADSBP', {'format_cells': True, 'format_rows': True, 'format_columns': True})

        worksheet.write(0, 0, user)
        worksheet.write(0, 1, company)
        worksheet.write(0, 2, receiver)
        worksheet.write(0, 3, global_version)
        worksheet.write(0, 4, version)
        worksheet.write(0, 5, product)
        worksheet.write(0, 6, line_item)

        bold = workbook.add_format({'bold': True})
        bold.set_font_name('Imago')
        bold.set_font_size(font_size)

        worksheet.write(1, 3, request.args['year1'], bold)
        worksheet.write(1, 16, request.args['year2'], bold)
        worksheet.write(1, 29, request.args['year3'], bold)
        worksheet.write(1, 42, request.args['year4'], bold)

        worksheet.write(2, 1, 'Product Code', bold)
        worksheet.write(2, 2, 'PL', bold)
        worksheet.write(2, 3, line_item, bold)

        i = 1
        j = 4
        while i <= 12:
            worksheet.write(2, j, str(i).zfill(2), bold)
            worksheet.write(2, j + 13, str(i).zfill(2), bold)
            worksheet.write(2, j + 26, str(i).zfill(2), bold)
            worksheet.write(2, j + 39, str(i).zfill(2), bold)
            j = j + 1
            i = i + 1

        worksheet.write(2, 16, line_item, bold)
        worksheet.write(2, 29, line_item, bold)
        worksheet.write(2, 42, line_item, bold)

        # temp
        headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                                   'Accept-Encoding': 'gzip, deflate, br'}
        tm1_session_id = setting.getTM1SessionId(session.get('cam_name', ''))

        cookies: dict[str, str] = {"TM1SessionId": tm1_session_id}

        cnf = setting.getConfig()

        target_url = cnf['tm1ApiHostBackend']

        response = requests.request(
            url=target_url + '/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,Value, Consolidated, RuleDerived, Updateable)',
            method='POST',
            data=mdx,
            headers=headers,
            cookies=cookies,
            verify=False)

        d = response.json()

        simple = workbook.add_format({'locked': False})
        simple.set_font_name('Imago')
        simple.set_font_size(font_size)

        read_only = workbook.add_format()
        read_only.set_bg_color('#ebecec')
        read_only.set_font_name('Imago')
        read_only.set_font_size(font_size)

        l = len(d['Cells'])
        i = 0
        r = 2
        c = 0
        while i < l:
            if i % 55 == 0:
                r = r + 1
                c = 0
                pl = int(d['Cells'][i + 2]['Value'].replace('PL', '').replace('a', ''))
                cf = workbook.add_format()
                cf.set_indent(pl)
                cf.set_font_name('Imago')
                cf.set_font_size(font_size)
                cf.set_bg_color('#ebecec')
                value = d['Cells'][i]['Value']
                if (value == None):
                    value = 0
                worksheet.write(r, c, value, cf)
                c = c + 1
                i = i + 1
                value = d['Cells'][i]['Value']
                if (value == None):
                    value = 0
                worksheet.write(r, c, value, read_only)
                c = c + 1
                i = i + 1
                worksheet.write(r, c, pl, read_only)
            else:
                value = d['Cells'][i]['Value']
                if (value == None):
                    value = 0
                if d['Cells'][i]['RuleDerived'] == False:
                    worksheet.write(r, c, value, simple)
                else:
                    worksheet.write(r, c, value, read_only)

            i = i + 1
            c = c + 1

        # temp

        workbook.close()
        output.seek(0)
        return output

    def davidExport1(self, request, tm1_service, setting):
        mdx = 'SELECT NON EMPTY TM1SubsetToSet([Period], "Years") ON COLUMNS, NON EMPTY TM1SubsetToSet([Deal Email Report Measure], "Default") ON ROWS FROM [Deal Email Report] WHERE ([Deal].[Deal_0001])'
        data = tm1_service.cubes.cells.execute_mdx(mdx)
        df = build_pandas_dataframe_from_cellset(data, multiindex=False)
        del df['Deal']
        pivot = df.pivot_table('Values', index='Deal Email Report Measure', columns='Period')

        oszlop = pivot.iloc[[0], :]
        oszlop = oszlop.values.tolist()
        oszlop = oszlop[0]
        oszlop = len(oszlop)

        sor = pivot.iloc[:, [0]]
        sor = sor.values.tolist()
        sor = len(sor)

        output = io.BytesIO()
        workbook = xlsxwriter.Workbook(output, {'in_memory': True})
        worksheet = workbook.add_worksheet()

        cim = workbook.add_format({'bold': True})
        cim.set_font_name('Imago')
        cim.set_font_size(12)
        cim.set_align('center')
        cim.set_bg_color('#A9D08E')

        cimkicsi = workbook.add_format({'bold': True})
        cimkicsi.set_font_name('Imago')
        cimkicsi.set_font_size(8)
        cimkicsi.set_align('center')
        cimkicsi.set_bg_color('#A9D08E')

        cimkek = workbook.add_format({'bold': True})
        cimkek.set_font_name('Imago')
        cimkek.set_font_size(8)
        cimkek.set_align('center')
        cimkek.set_bg_color('#8DB4E2')

        bold = workbook.add_format({'bold': True})
        money = workbook.add_format({'num_format': '_ * # ##0_ ;_ * -# ##0_ ;_ * "-"??_ ;_ @_ '})

        worksheet.write('B2', 'Distributor Channel P&L', cim)
        worksheet.write('B3', '总渠道利润', cim)
        worksheet.write('B4', 'Hospital - quantity ', cim)
        worksheet.write('B6', 'Sales Growth rate% ')
        worksheet.write('B8', 'Items ', cimkek)
        worksheet.write('B9', 'Sales - reagent ( w/o VAT )', bold)
        worksheet.write('B10', 'Product Sales ( w/o VAT ) ', bold)

        arr = np.array(['Year1', 'Year2', 'Year3', 'Year4', 'Year5', 'Year6', 'Year7'])
        arr = arr[0:oszlop]
        szam = 0
        for x in arr:
            worksheet.write(4, 3 + szam, x, cimkicsi)
            szam = szam + 1

        szam = 0
        for x in arr:
            worksheet.write(7, 3 + szam, x, cimkek)
            szam = szam + 1

        rate = pivot.loc[["Sales Growth rate%"]]
        rate = rate.values.tolist()
        rate = rate[0]

        rate = np.array(rate)
        new_rate = np.delete(rate, 0)

        szamegy = 0
        for x in new_rate:
            worksheet.write(5, 4 + szamegy, x)
            szamegy = szamegy + 1

        data = pivot.loc[["Sales - reagent ( w/o VAT )"]]
        data = data.values.tolist()
        data = data[0]
        data = data[0]

        worksheet.write('D9', data)
        strings = ["=D9*(1+E$6)", "=E9*(1+F$6)", "=F9*(1+G6)", "=G9*(1+H6)"]

        row = 8
        szamlalo = 0

        for value in strings:
            worksheet.write(row, 4 + szamlalo, value, money)
            szamlalo = szamlalo + 1

        strings = ["=D9", "=E9", "=F9", "=G9", "=H9"]

        row = 9
        szamlalo = 0

        for value in strings:
            worksheet.write(row, 3 + szamlalo, value, money)
            szamlalo = szamlalo + 1

        worksheet.write('B12', "Cost - reagent")
        worksheet.write('C12', "65,13112137%")

        strings = ["=D9*$C$12", "=E9*$C$12", "=F9*$C$12", "=G9*$C$12", "=H9*$C$12"]
        row = 11
        szamlalo = 0

        for value in strings:
            worksheet.write(row, 3 + szamlalo, value, money)
            szamlalo = szamlalo + 1
        worksheet.write('B13', "Cost Of Goods Sold ( w/o VAT )", bold)

        strings = ["=D12", "=E12", "=F12", "=G12", "=H12"]
        row = 12
        szamlalo = 0

        for value in strings:
            worksheet.write(row, 3 + szamlalo, value, money)
            szamlalo = szamlalo + 1
        worksheet.write('B15', "Gross profit ", bold)

        strings = ["=D10-D13", "=E10-E13", "=F10-F13", "=G10-G13", "=H10-H13"]
        row = 14
        szamlalo = 0

        for value in strings:
            worksheet.write(row, 3 + szamlalo, value, money)
            szamlalo = szamlalo + 1
        worksheet.write('B16', "Gross profit %")

        strings = ["=D15/D10", "=E15/E10", "=F15/F10", "=G15/G10", "=H15/H10"]
        format2 = workbook.add_format({'num_format': '0%'})
        row = 15
        szamlalo = 0

        for value in strings:
            worksheet.write(row, 3 + szamlalo, value, format2)
            szamlalo = szamlalo + 1

        worksheet.write('I6', "Legal", bold)
        worksheet.write('I8', "Total", cimkek)
        worksheet.write('I9', "=SUM(D9:H9)", money)
        worksheet.write('I10', "=I9", money)
        worksheet.write('I12', "=SUM(D12:H12)", money)
        worksheet.write('I13', "=I12", money)
        worksheet.write('I15', "=I10-I13", money)
        worksheet.write('I16', "=I15/I10", format2)
        workbook.close()
        output.seek(0)
        return output

    def rocheProductLevelExport(self, request, tm1_service, setting):
        output = io.BytesIO()
        workbook = xlsxwriter.Workbook(output, {'in_memory': True})
        worksheet = workbook.add_worksheet()

        mdx = setting.getMDX(request.args['key'])
        for k in request.args:
            mdx = mdx.replace('$' + k, request.args[k].replace('"', '\\"'))

        mdx = '{"MDX"  :"' + mdx + '"}'
        #     data = tm1_service.cells.execute_mdx(mdx)

        user = request.args['activeUserName']
        company = request.args['company']
        global_version = request.args['globalVersion']
        version = request.args['version']
        currency = request.args['currency']

        font_size = 12

        # actual version
        worksheet.write(0, 0, user)
        worksheet.write(0, 1, company)
        worksheet.write(0, 2, currency)
        worksheet.write(0, 3, global_version)
        worksheet.write(0, 4, version)

        bold = workbook.add_format({'bold': True})
        bold.set_font_name('Imago')
        bold.set_font_size(font_size)

        worksheet.write(3, 4, request.args['year0'], bold)
        worksheet.write(3, 5, request.args['year1'], bold)
        worksheet.write(3, 6, request.args['year2'], bold)
        worksheet.write(3, 7, request.args['year3'], bold)
        worksheet.write(3, 8, request.args['year4'], bold)
        worksheet.write(3, 9, request.args['year1'], bold)
        worksheet.write(3, 10, request.args['year2'], bold)
        worksheet.write(3, 11, request.args['year3'], bold)
        worksheet.write(3, 12, request.args['year4'], bold)

        worksheet.write(4, 4, 'Value', bold)
        worksheet.write(4, 5, 'Value', bold)
        worksheet.write(4, 6, 'Value', bold)
        worksheet.write(4, 7, 'Value', bold)
        worksheet.write(4, 8, 'Value', bold)
        worksheet.write(4, 9, 'Plan Comment', bold)
        worksheet.write(4, 10, 'Plan Comment', bold)
        worksheet.write(4, 11, 'Plan Comment', bold)
        worksheet.write(4, 12, 'Plan Comment', bold)

        worksheet.write(5, 0, 'Product Name', bold)
        worksheet.write(5, 1, 'Product Code', bold)
        worksheet.write(5, 2, 'Product Level', bold)
        worksheet.write(5, 3, 'Reciver', bold)
        worksheet.write(5, 4, 'Actual', bold)
        worksheet.write(5, 5, 'Final Plan', bold)
        worksheet.write(5, 6, 'Final Plan', bold)
        worksheet.write(5, 7, 'Final Plan', bold)
        worksheet.write(5, 8, 'Final Plan', bold)
        worksheet.write(5, 9, 'Final Plan', bold)
        worksheet.write(5, 10, 'Final Plan', bold)
        worksheet.write(5, 11, 'Final Plan', bold)
        worksheet.write(5, 12, 'Final Plan', bold)

        # temp
        headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                                   'Accept-Encoding': 'gzip, deflate, br'}
        tm1_session_id = setting.getTM1SessionId(session.get('cam_name', ''))

        cookies: dict[str, str] = {"TM1SessionId": tm1_session_id}

        cnf = setting.getConfig()

        target_url = cnf['tm1ApiHostBackend']

        response = requests.request(
            url=target_url + '/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,Value;$expand=Members($select=Name))',
            method='POST',
            data=mdx,
            headers=headers,
            cookies=cookies,
            verify=False)

        d = response.json()

        simple = workbook.add_format()
        simple.set_font_name('Imago')
        simple.set_font_size(font_size)

        read_only = workbook.add_format()
        read_only.set_bg_color('#ebecec')
        read_only.set_font_name('Imago')
        read_only.set_font_size(font_size)

        l = len(d['Cells'])
        i = 0  # az összes elem
        r = 5  # sorok
        c = 0  # oszlopok
        while i < l:
            if i % 12 == 0:
                value = d['Cells'][i]['Value']
                r = r + 1
                c = 0
                if (value == None):
                    value = 0
                    worksheet.write(r, c, value, simple)
                    c = c + 1
                    i = i + 1
                else:
                    worksheet.write(r, c, value, simple)
                    c = c + 1
                    i = i + 1
            if c == 3:
                reciver = d['Cells'][i]['Members'][3]['Name']
                worksheet.write(r, c, reciver, simple)
                c = c + 1
            else:
                value = d['Cells'][i]['Value']
                if (value == None):
                    value = 0
                    worksheet.write(r, c, value, simple)
                    i = i + 1
                    c = c + 1
                else:
                    worksheet.write(r, c, value, simple)
                    i = i + 1
                    c = c + 1

        # temp

        workbook.close()
        output.seek(0)
        return output

    def rocheMaterialMaintenanceExport(self, request, tm1_service, setting):
        output = io.BytesIO()
        workbook = xlsxwriter.Workbook(output, {'in_memory': True})
        worksheet = workbook.add_worksheet()

        mdx = setting.getMDX(request.args['key'])
        for k in request.args:
            mdx = mdx.replace('$' + k, request.args[k].replace('"', '\\"'))

        mdx = '{"MDX"  :"' + mdx + '"}'
        #     data = tm1_service.cells.execute_mdx(mdx)

        user = request.args['activeUserName']
        company = request.args['company']
        global_version = request.args['globalVersion']
        version = request.args['version']

        font_size = 12

        # actual version
        worksheet.write(0, 0, user)
        worksheet.write(0, 1, company)
        worksheet.write(0, 2, global_version)
        worksheet.write(0, 3, version)

        bold = workbook.add_format({'bold': True})
        bold.set_font_name('Imago')
        bold.set_font_size(font_size)

        worksheet.write(3, 0, 'Profit center name', bold)
        worksheet.write(3, 1, 'Level', bold)
        worksheet.write(3, 2, 'Material Number', bold)

        # temp
        headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                                   'Accept-Encoding': 'gzip, deflate, br'}
        tm1_session_id = setting.getTM1SessionId(session.get('cam_name', ''))

        cookies: dict[str, str] = {"TM1SessionId": tm1_session_id}

        cnf = setting.getConfig()

        target_url = cnf['tm1ApiHostBackend']

        response = requests.request(
            url=target_url + '/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))',
            method='POST',
            data=mdx,
            headers=headers,
            cookies=cookies,
            verify=False)

        d = response.json()

        simple = workbook.add_format()
        simple.set_font_name('Imago')
        simple.set_font_size(font_size)

        read_only = workbook.add_format()
        read_only.set_bg_color('#ebecec')
        read_only.set_font_name('Imago')
        read_only.set_font_size(font_size)

        l = len(d['Cells'])
        i = 0  # az összes elem
        r = 3  # sorok kezdese
        c = 0  # oszlopok

        while i < l:
            if i % 3 == 0:
                value = d['Cells'][i]['FormattedValue']
                r = r + 1
                c = 0
                if (value == None):
                    value = 0
                    worksheet.write(r, c, value, simple)
                    c = c + 1
                    i = i + 1
                else:
                    worksheet.write(r, c, value, simple)
                    c = c + 1
                    i = i + 1
            else:
                value = d['Cells'][i]['FormattedValue']
                if (value == None):
                    value = 0
                    worksheet.write(r, c, value, simple)
                    i = i + 1
                    c = c + 1
                else:
                    worksheet.write(r, c, value, simple)
                    i = i + 1
                    c = c + 1

        # temp

        workbook.close()
        output.seek(0)
        return output

    def rocheMaterialMaintenanceByIpNodeExport(self, request, tm1_service, setting):
        output = io.BytesIO()
        workbook = xlsxwriter.Workbook(output, {'in_memory': True})
        worksheet = workbook.add_worksheet()

        mdx = setting.getMDX(request.args['key'])
        for k in request.args:
            mdx = mdx.replace('$' + k, request.args[k].replace('"', '\\"'))

        mdx = '{"MDX"  :"' + mdx + '"}'
        #     data = tm1_service.cells.execute_mdx(mdx)

        user = request.args['activeUserName']
        company = request.args['company']
        global_version = request.args['globalVersion']
        version = request.args['version']

        font_size = 12

        # actual version
        worksheet.write(0, 0, user)
        worksheet.write(0, 1, company)
        worksheet.write(0, 2, global_version)
        worksheet.write(0, 3, version)

        bold = workbook.add_format({'bold': True})
        bold.set_font_name('Imago')
        bold.set_font_size(font_size)

        worksheet.write(3, 0, 'Profit center name', bold)
        worksheet.write(3, 1, 'Level', bold)
        worksheet.write(3, 2, 'Material Number', bold)

        # temp
        headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                                   'Accept-Encoding': 'gzip, deflate, br'}
        tm1_session_id = setting.getTM1SessionId(session.get('cam_name', ''))

        cookies: dict[str, str] = {"TM1SessionId": tm1_session_id}

        cnf = setting.getConfig()

        target_url = cnf['tm1ApiHostBackend']

        response = requests.request(
            url=target_url + '/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))',
            method='POST',
            data=mdx,
            headers=headers,
            cookies=cookies,
            verify=False)

        d = response.json()

        simple = workbook.add_format()
        simple.set_font_name('Imago')
        simple.set_font_size(font_size)

        read_only = workbook.add_format()
        read_only.set_bg_color('#ebecec')
        read_only.set_font_name('Imago')
        read_only.set_font_size(font_size)

        l = len(d['Cells'])
        i = 0  # az összes elem
        r = 3  # sorok kezdese
        c = 0  # oszlopok

        while i < l:
            if i % 3 == 0:
                value = d['Cells'][i]['FormattedValue']
                r = r + 1
                c = 0
                if (value == None):
                    value = 0
                    worksheet.write(r, c, value, simple)
                    c = c + 1
                    i = i + 1
                else:
                    worksheet.write(r, c, value, simple)
                    c = c + 1
                    i = i + 1
            else:
                value = d['Cells'][i]['FormattedValue']
                if (value == None):
                    value = 0
                    worksheet.write(r, c, value, simple)
                    i = i + 1
                    c = c + 1
                else:
                    worksheet.write(r, c, value, simple)
                    i = i + 1
                    c = c + 1

        # temp

        workbook.close()
        output.seek(0)
        return output
