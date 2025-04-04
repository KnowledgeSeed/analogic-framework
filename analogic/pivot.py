import json
import re
import io
import xlsxwriter
import orjson

from TM1py.Objects import Subset
from TM1py.Services import TM1Service
from TM1py.Utils import format_url, cell_is_updateable
from flask import send_file
from analogic import authentication_provider


def call(tm1: TM1Service, username, cube_name=None, dimension_name=None, hierarchy_name=None, subset_name=None, element_names=None, subset_name_to_remove=None, selected_cards=None, options=None, export_data=None):
    data = {}
    username = username.replace('\\', '')

    # username = ''.join(ch for ch in username if ch.isalnum())

    if selected_cards:
        cell_limit = options.get('cellLimit', 1000000)
        selected_cards_data = json.loads(selected_cards)
        mdx = create_mdx(options, cube_name, selected_cards_data, username)
        cell_count = tm1.cells.execute_mdx_cellcount(mdx)
        if cell_count < cell_limit:
            data = get_pivot_data(tm1, mdx, selected_cards_data, bool(export_data))
        if export_data:
            return export_to_excel(selected_cards_data, data, json.loads(export_data))
        return orjson.dumps({'mdx': mdx, 'cell_count': cell_count, 'data': data}), 200, {'Content-Type': 'application/json'}
    elif element_names:
        subset_name = username + '_' + subset_name
        new_subset = Subset(subset_name, dimension_name, hierarchy_name, None, None, element_names)
        tm1.subsets.update_or_create(new_subset, True)
        hierarchy = get_hierarchy(tm1, dimension_name, hierarchy_name)
        data['defaultMember'] = hierarchy['DefaultMember']['Name']
        data['aliasAttributeNames'] = get_alias_attribute_names(hierarchy)
        children, data['privateSubsets'] = get_public_and_private_subsets(tm1, dimension_name, hierarchy_name, username, options)
    elif subset_name_to_remove:
        tm1.subsets.delete(username + '_' + subset_name_to_remove, dimension_name, hierarchy_name, True)
        hierarchy = get_hierarchy(tm1, dimension_name, hierarchy_name)
        data['defaultMember'] = hierarchy['DefaultMember']['Name']
        data['aliasAttributeNames'] = get_alias_attribute_names(hierarchy)
        children, data['privateSubsets'] = get_public_and_private_subsets(tm1, dimension_name, hierarchy_name, username, options)
    elif 'presetData' in options:
        preset_data = options['presetData']
        return get_adjusted_slicer_preset_data_according_to_selected_indexes(tm1, preset_data, username)
    elif 'process' in options:
        p = options['processParams']
        p['pUser'] = username
        p['pValue'] = json.dumps(p['pValue'])
        r = tm1.processes.execute_with_return(options['process'], **p)
        return orjson.dumps(r), 200, {'Content-Type': 'application/json'}
    elif dimension_name is None:
        children = tm1.cubes.get_dimension_names(cube_name)
        data = get_presets_data(tm1, username, options['widgetId'], options.get('presetParams', {}))
    elif hierarchy_name is None:
        children = tm1.hierarchies.get_all_names(dimension_name)
    elif subset_name is None:
        hierarchy = get_hierarchy(tm1, dimension_name, hierarchy_name)
        data['defaultMember'] = hierarchy['DefaultMember']['Name']
        data['aliasAttributeNames'] = get_alias_attribute_names(hierarchy)
        children, data['privateSubsets'] = get_public_and_private_subsets(tm1, dimension_name, hierarchy_name, username, options)
    else:
        # current_app.config['JSON_SORT_KEYS'] = False
        children = []
        is_private_subset = options['isPrivateSubset']
        if is_private_subset:
            subset_name = username + '_' + subset_name
        subset = tm1.subsets.get(subset_name, dimension_name, hierarchy_name, is_private_subset)
        data['defaultAliasAttributeName'] = subset.alias
        data['children'] = get_elements_with_aliases(tm1, subset, is_private_subset)
    return orjson.dumps({'children': children, 'data': data}, option=orjson.OPT_NON_STR_KEYS), 200, {'Content-Type': 'application/json'}


def get_hierarchy(tm1: TM1Service, dimension_name, hierarchy_name, **kwargs):
    url = format_url(
        "/api/v1/Dimensions('{}')/Hierarchies('{}')?$expand=ElementAttributes,Subsets,DefaultMember",
        dimension_name,
        hierarchy_name)
    return tm1._tm1_rest.GET(url, **kwargs).json()


def get_presets_data(tm1, username, widget_id, presetParams):
    setting = authentication_provider.get_authentication_provider().setting

    mdx = setting.get_mdx(widget_id + 'PresetMDX')

    if (not mdx):
        mdx = get_default_presets_data_mdx(username, widget_id)
    else:
        for p in presetParams:
            mdx = mdx.replace('$' + p, presetParams[p].replace('"', '\\"'))

    cellset_id = tm1.cells.create_cellset(mdx)
    url = "/api/v1/Cellsets('" + cellset_id + "')?$expand=Cells($select=FormattedValue)"
    data = tm1._tm1_rest.GET(url).json()

    return data['Cells']


def get_default_presets_data_mdx(username, widget_id):
    mdx = """WITH
MEMBER [Measures zSYS Analogic Pivot Presets].[Measures zSYS Analogic Pivot Presets].[sType]
AS [zSYS Analogic Pivot Presets].[zSYS Analogic Pivot Presets].CurrentMember.Properties('Type')
MEMBER [Measures zSYS Analogic Pivot Presets].[Measures zSYS Analogic Pivot Presets].[sOwner]
AS
IIF('""" + username + """' = [zSYS Analogic Pivot Presets].[zSYS Analogic Pivot Presets].CurrentMember.Properties('CreatedBy'),
1,0)
MEMBER [Measures zSYS Analogic Pivot Presets].[Measures zSYS Analogic Pivot Presets].[sID]
AS [zSYS Analogic Pivot Presets].[zSYS Analogic Pivot Presets].CurrentMember.Name
MEMBER [Measures zSYS Analogic Pivot Presets].[Measures zSYS Analogic Pivot Presets].[sWidgetID]
AS [zSYS Analogic Pivot Presets].[zSYS Analogic Pivot Presets].CurrentMember.Properties('WidgetID')
SELECT
   {[Measures zSYS Analogic Pivot Presets].[Measures zSYS Analogic Pivot Presets].[sID],
    [Measures zSYS Analogic Pivot Presets].[Measures zSYS Analogic Pivot Presets].[sWidgetID],
    [Measures zSYS Analogic Pivot Presets].[Measures zSYS Analogic Pivot Presets].[sType],
    [Measures zSYS Analogic Pivot Presets].[Measures zSYS Analogic Pivot Presets].[sOwner],
    [Measures zSYS Analogic Pivot Presets].[Measures zSYS Analogic Pivot Presets].[sName],
    [Measures zSYS Analogic Pivot Presets].[Measures zSYS Analogic Pivot Presets].[sValue]
   }
  ON COLUMNS ,
   FILTER(UNION({
        FILTER({
            [zSYS Analogic Pivot Presets].[zSYS Analogic Pivot Presets].Members
        }, INSTR([zSYS Analogic Pivot Presets].[zSYS Analogic Pivot Presets].CurrentMember.Properties('Type'), 'Public') > 0)
},{
    FILTER({
        [zSYS Analogic Pivot Presets].[zSYS Analogic Pivot Presets].Members
    }, INSTR([zSYS Analogic Pivot Presets].[zSYS Analogic Pivot Presets].CurrentMember.Properties('CreatedBy'), '""" + username + """') > 0)
}),INSTR([zSYS Analogic Pivot Presets].[zSYS Analogic Pivot Presets].CurrentMember.Properties('WidgetID'), '""" + widget_id + """') > 0)
  ON ROWS
FROM [zSYS Analogic Pivot Presets]"""

    return mdx


def get_public_and_private_subsets(tm1: TM1Service, dimension_name, hierarchy_name, username, options):
    public_subsets = get_filtered_subsets(tm1.subsets.get_all_names(dimension_name, hierarchy_name), options)
    private_subsets = get_filtered_subsets(tm1.subsets.get_all_names(dimension_name, hierarchy_name, True), options, username + '_')
    children = sorted(private_subsets + public_subsets)

    return children, private_subsets


def get_filtered_subsets(subsets, options, username_prefix=None):
    filtered_subsets = subsets

    if username_prefix:
        filtered_subsets = []
        for s in subsets:
            if s.startswith(username_prefix):
                filtered_subsets.append(s.removeprefix(username_prefix))

    filter_term = options.get('filter', False)

    if filter_term:
        filtered_subsets = list(filter(re.compile(filter_term).match, filtered_subsets))

    return filtered_subsets


def get_elements_with_aliases(tm1: TM1Service, subset: Subset, is_private_subset):
    hierarchy = get_hierarchy(tm1, subset.dimension_name, subset.hierarchy_name)
    alias_attribute_names = get_alias_attribute_names(hierarchy)

    if not alias_attribute_names:
        alias_attribute_names = ['Caption']

    alias_attributes = 'Attributes/' + ',Attributes/'.join(alias_attribute_names)

    if subset.is_static:
        elements = subset.elements

        if not elements:
            return []

        epx_prefix = '[' + subset.dimension_name + '].[' + subset.hierarchy_name + '].['
        expression = '{'
        for e in elements:
            expression += epx_prefix + e + '],'
        expression = expression[:-1] + '}'
    else:
        expression = subset.expression

    names_and_aliases = tm1.elements.execute_set_mdx(expression, None, ['Name', alias_attributes], None, None)

    d = []

    for e in names_and_aliases:
        d.append(e[0]['Attributes'] | {0: e[0]['Name']})

    return d


def get_alias_attribute_names(hierarchy):
    d = []
    for attribute in hierarchy['ElementAttributes']:
        if 'Alias' == attribute['Type']:
            d.append(attribute['Name'])
    return d


def create_mdx(options, cube_name, selected_cards_data, username):
    mdx = 'SELECT ' + ('NON EMPTY ' if options.get('nonEmptyColumns', False) else '')

    props = ''
    i = 0
    for d in selected_cards_data['cols']:
        s = '{[' + rep(d['dimension']) + '].[' + rep(d['hierarchy']) + '].['
        u = (username + '_') if d['private'] else ''
        m = '{StrToSet("' + s + u + rep(d['subset']) + ']}")}'
        for e, isToExpand in d['expanded_collapsed_members'].items():
            if isToExpand is None:
                continue
            elif isToExpand:
                m = '{DRILLDOWNMEMBER(' + m + ', ' + s + rep(e) + ']})}'
            else:
                m = '{DRILLUPMEMBER(' + m + ', ' + s + rep(e) + ']})}'
        # props += (', ' if i else '') + s + d['alias_attr_name'] + ']'
        mdx += (' * ' if i else '') + m
        i += 1
    mdx += ((' PROPERTIES ' + props) if props else ' ') + ' ON COLUMNS'

    if selected_cards_data['rows']:
        mdx += ', ' + ('NON EMPTY ' if options.get('nonEmptyRows', True) else '')

    props = ''
    i = 0
    for d in selected_cards_data['rows']:
        s = '{[' + rep(d['dimension']) + '].[' + rep(d['hierarchy']) + '].['
        u = (username + '_') if d['private'] else ''
        m = '{StrToSet("' + s + u + rep(d['subset']) + ']}")}'
        for e, isToExpand in d['expanded_collapsed_members'].items():
            if isToExpand is None:
                continue
            elif isToExpand:
                m = '{DRILLDOWNMEMBER(' + m + ', ' + s + rep(e) + ']})}'
            else:
                m = '{DRILLUPMEMBER(' + m + ', ' + s + rep(e) + ']})}'
        # props += (', ' if i else '') + s + d['alias_attr_name'] + ']'
        mdx += (' * ' if i else '') + m
        i += 1
    if i:
        mdx += ((' PROPERTIES ' + props) if props else ' ') + ' ON ROWS'

    mdx += ' FROM [' + rep(cube_name) + ']'

    if selected_cards_data['slices']:
        mdx += ' WHERE ('
        i = 0
        for d in selected_cards_data['slices']:
            mdx += (', ' if i else '') + '[' + rep(d['dimension']) + '].[' + rep(d['hierarchy']) + '].[' + rep(str(d['element'])) + ']'
            i += 1
        mdx += ')'

    return mdx


def rep(s):
    return s.replace(']', ']]')


def get_pivot_data(tm1, mdx, selected_cards_data, for_excel_export):
    alias_attribute_names = {}
    alias_attribute_names_by_axis_and_member_ids = [[], []]

    select_type = 'Value' if for_excel_export else 'FormattedValue'

    for type in selected_cards_data:
        if 'slices' == type:
            continue

        i = 0 if 'cols' == type else 1

        for d in selected_cards_data[type]:
            alias_attr_name = d['alias_attr_name']
            if alias_attr_name:
                alias_attribute_names_by_axis_and_member_ids[i].append(alias_attr_name)
                alias_attribute_names[alias_attr_name.replace(' ', '')] = 1

    if not alias_attribute_names:
        alias_attribute_names = {'Caption': True}

    alias_attribute_names = "Attributes/" + ",Attributes/".join(alias_attribute_names.keys())

    cellset_id = tm1.cells.create_cellset(mdx)

    url = f"""/api/v1/Cellsets('{cellset_id}')?
$expand=
Axes(
  $expand=Tuples(
    $expand=Members(
      $select=Name,{alias_attribute_names};
      $expand=Element(
          $select=Type,Level;
          $expand=Components($select=Name)
      )
    )
  )
), 
Cells(
    $select={select_type},Updateable,Consolidated
)""".replace('\n', '')

    raw_data = tm1._tm1_rest.GET(url).json()
    raw_cells = raw_data['Cells']

    cols = get_pivot_header_data(raw_data['Axes'][0]['Tuples'], alias_attribute_names_by_axis_and_member_ids[0])
    rows = get_pivot_header_data(raw_data['Axes'][1]['Tuples'], alias_attribute_names_by_axis_and_member_ids[1])
    cells = list(map(lambda c: c[select_type], raw_cells))
    cells_is_updateable = list(map(lambda c: cell_is_updateable(c) and not c['Consolidated'], raw_cells))

    return {'rows': rows, 'cols': cols, 'cells': cells, 'cellsIsUpdateable': cells_is_updateable, 'cellsetId': cellset_id}


def get_pivot_header_data(tuples, alias_attribute_names_by_member_ids):
    if not tuples:
        return []

    data = []
    last_names = [0] * len(tuples[0]['Members'])
    alias_attribute_names_len = len(alias_attribute_names_by_member_ids)

    for t in tuples:
        d = []
        names = []
        i = 0
        for m in t['Members']:
            name = m['Name']
            alias = m['Attributes'][alias_attribute_names_by_member_ids[i]] if i < alias_attribute_names_len else name
            if last_names[i] != name:
                if 'Consolidated' == m['Element']['Type']:
                    d.append([alias, name, list(map(lambda c: c['Name'], m['Element']['Components']))])
                else:
                    d.append([alias, name])
            else:
                d.append(0)
            names.append(name)
            i += 1
        last_names = names
        data.append(d)

    return data


def get_adjusted_slicer_preset_data_according_to_selected_indexes(tm1, preset_data, username):
    for c in preset_data[0]:
        index = c.get('index', 0)
        is_private_subset = c['private']
        subset_name = (username + '_' if is_private_subset else '') + str(c['subset'])
        v = get_elements_name_and_alias(tm1, c['dimension'], c['hierarchy'], subset_name, is_private_subset, c['alias_attr_name'], index + 1)
        n = len(v) - 1

        if n < 0:
            continue

        e = v[n] if index == n else v[0]

        c['element'] = e[0]
        c['title'] = e[1]

    return preset_data


def get_elements_name_and_alias(tm1: TM1Service, dimension_name: str, hierarchy_name: str, subset_name: str, is_private_subset: bool, alias: str, top: int = 1000, **kwargs):
    subsets = "PrivateSubsets" if is_private_subset else "Subsets"

    if not alias:
        alias = 'Name'

    attribute_alias = alias.replace(' ', '')
    select = 'Name'

    if alias != 'Name':
        attribute_alias = 'Attributes/' + attribute_alias
        select += ',' + attribute_alias

    url = format_url(
        "/api/v1/Dimensions('{}')/Hierarchies('{}')/{}('{}')/Elements?$select={}&$top={}",
        dimension_name,
        hierarchy_name,
        subsets,
        subset_name,
        select,
        top)

    response = tm1._tm1_rest.GET(url, **kwargs).json()['value']

    elements = []

    if alias == 'Name':
        for e in response:
            elements.append([e['Name'], e['Name']])
    else:
        for e in response:
            elements.append([e['Name'], e['Attributes'][alias]])

    return elements


def export_to_excel(selected_cards_data, pivot_data, export_data):
    output = io.BytesIO()
    workbook = xlsxwriter.Workbook(output, {'in_memory': True})
    worksheet = workbook.add_worksheet(name='Pivot Export')

    bold = workbook.add_format({'bold': True})

    worksheet.write(0, 1, 'Filters', bold)
    worksheet.write(1, 1, 'Dimension name')
    worksheet.write(2, 1, 'Selected element')

    i = 0
    for d in selected_cards_data['slices']:
        worksheet.write(1, 2 + i, d['dimension'])
        worksheet.write(2, 2 + i, d['element'])
        i += 1

    col_header = export_data['col_header']
    row_header = export_data['row_header']
    col_header_offset = len(col_header[0])
    row_num = 5

    for r in row_header:
        i = 1
        for c in r:
            worksheet.write(row_num, col_header_offset + i, c)
            i += 1
        row_num += 1

    first_row_num = row_num

    for r in col_header:
        i = 1
        for c in r:
            worksheet.write(row_num, i, c)
            i += 1
        row_num += 1

    col_len = len(pivot_data['cols'])
    row_num = first_row_num
    col_header_offset += 1

    i = 0
    for c in pivot_data['cells']:
        if col_len == i:
            row_num += 1
            i = 0
        if c is None:
            worksheet.write(row_num, col_header_offset + i, c)
        else:
            try:
                worksheet.write_number(row_num, col_header_offset + i, float(c))
            except (ValueError, TypeError):
                worksheet.write(row_num, col_header_offset + i, str(c))
        i += 1

    workbook.close()
    output.seek(0)
    return send_file(output,
                     download_name='pivot_export.xlsx',
                     as_attachment=True,
                     max_age=0,
                     mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
