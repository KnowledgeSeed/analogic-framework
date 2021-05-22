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

        font_size = 12
        worksheet.protect('ADSBP')

        worksheet.write(0, 0, user)
        worksheet.write(0, 1, company)
        worksheet.write(0, 2, receiver)
        worksheet.write(0, 3, global_version)
        worksheet.write(0, 4, version)
        worksheet.write(0, 5, product)

        bold = workbook.add_format({'bold': True})
        bold.set_font_name('Imago')
        bold.set_font_size(font_size)

        worksheet.write(1, 3, request.args['year1'], bold)
        worksheet.write(1, 16, request.args['year2'], bold)
        worksheet.write(1, 29, request.args['year3'], bold)
        worksheet.write(1, 42, request.args['year4'], bold)

        worksheet.write(2, 1, 'Product Code', bold)
        worksheet.write(2, 2, 'PL', bold)
        worksheet.write(2, 3, 'Final Plan', bold)

        i = 1
        j = 4
        while i <= 12:
            worksheet.write(2, j, str(i).zfill(2), bold)
            worksheet.write(2, j + 13, str(i).zfill(2), bold)
            worksheet.write(2, j + 26, str(i).zfill(2), bold)
            worksheet.write(2, j + 39, str(i).zfill(2), bold)
            j = j + 1
            i = i + 1

        worksheet.write(2, 16, 'Final Plan', bold)
        worksheet.write(2, 29, 'Final Plan', bold)
        worksheet.write(2, 42, 'Final Plan', bold)

        # temp
        headers: dict[str, str] = {'Content-Type': 'application/json; charset=utf-8',
                                   'Accept-Encoding': 'gzip, deflate, br'}
        tm1_session_id = setting.getTM1SessionId(session.get('cam_name', ''))

        cookies: dict[str, str] = {"TM1SessionId": tm1_session_id}

        cnf = setting.getConfig()

        target_url = cnf['tm1ApiHostBackend']

        response = requests.request(
            url=target_url + '/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue, Consolidated, RuleDerived, Updateable)',
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
                pl = int(d['Cells'][i + 2]['FormattedValue'].replace('PL', '').replace('a', ''))
                cf = workbook.add_format()
                cf.set_indent(pl)
                cf.set_font_name('Imago')
                cf.set_font_size(font_size)
                cf.set_bg_color('#ebecec')
                worksheet.write(r, c, d['Cells'][i]['FormattedValue'], cf)
                c = c + 1
                i = i + 1
                worksheet.write(r, c, d['Cells'][i]['FormattedValue'], read_only)
                c = c + 1
                i = i + 1
                worksheet.write(r, c, pl, read_only)
            else:
                if d['Cells'][i]['Consolidated'] == False and d['Cells'][i]['RuleDerived'] == False:
                    worksheet.write(r, c, d['Cells'][i]['FormattedValue'], simple)
                else:
                    worksheet.write(r, c, d['Cells'][i]['FormattedValue'], read_only)

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
