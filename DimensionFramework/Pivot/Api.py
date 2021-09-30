from flask import jsonify
from TM1py.Services import TM1Service
from TM1py.Objects import Subset
import json


def call(dimension_name=None, hierarchy_name=None, subset_name=None, element_names=None, subset_name_to_remove=None, selected_subsets=None):
    address = "https://kseed-dc1.knowledgeseed.local:5125/haysapi"
    namespace = "knowledgeseed"
    user = "tm1py"
    gateway = None
    password = "2bffS8hcbJqa7xdA"
    ssl = False

    tm1 = TM1Service(
        base_url=address,
        user=user,
        password=password,
        namespace=namespace,
        gateway=gateway,
        verify=False,
        ssl=ssl)

    cube_name = 'Sales by Channel'

    data = {}

    if selected_subsets:
        d = json.loads(selected_subsets)
        mdx = create_mdx(cube_name, d)
        cell_count = tm1.cells.execute_mdx_cellcount(mdx)
        data = {}
        if cell_count < 2000000:
            #cell_properties=['Value', 'Ordinal']
            data = get_pivot_data(tm1.cells.execute_mdx_raw(mdx, elem_properties=['Type']))
        return jsonify({'mdx': mdx, 'cell_count': cell_count, 'data': data})
    elif element_names:
        new_subset = Subset(subset_name, dimension_name, hierarchy_name, subset_name, None, element_names)
        tm1.subsets.update_or_create(new_subset)
        children = tm1.subsets.get_all_names(dimension_name, hierarchy_name)
        hierarchy = tm1.hierarchies.get(dimension_name, hierarchy_name)
        data['defaultMember'] = hierarchy.default_member
        data['aliasAttributeNames'] = get_alias_attribute_names(hierarchy)
    elif subset_name_to_remove:
        tm1.subsets.delete(subset_name_to_remove, dimension_name, hierarchy_name)
        children = tm1.subsets.get_all_names(dimension_name, hierarchy_name)
        hierarchy = tm1.hierarchies.get(dimension_name, hierarchy_name)
        data['defaultMember'] = hierarchy.default_member
        data['aliasAttributeNames'] = get_alias_attribute_names(hierarchy)
    elif dimension_name is None:
        children = tm1.cubes.get_dimension_names(cube_name)
    elif hierarchy_name is None:
        children = tm1.hierarchies.get_all_names(dimension_name)
    elif subset_name is None:
        children = tm1.subsets.get_all_names(dimension_name, hierarchy_name)
        hierarchy = tm1.hierarchies.get(dimension_name, hierarchy_name)
        data['defaultMember'] = hierarchy.default_member
        data['aliasAttributeNames'] = get_alias_attribute_names(hierarchy)
    else:
        children = []
        data['children'] = get_elements_with_aliases(tm1, dimension_name, hierarchy_name, subset_name)

    return jsonify({'children': children, 'data': data})


def get_elements_with_aliases(tm1, dimension_name, hierarchy_name, subset_name):
    d = {}

    element_names = tm1.subsets.get_element_names(dimension_name, hierarchy_name, subset_name)
    hierarchy = tm1.hierarchies.get(dimension_name, hierarchy_name)
    alias_attribute_names = get_alias_attribute_names(hierarchy)

    for element_name in element_names:
        element = hierarchy.get_element(element_name)
        aliases = {}
        for alias_attribute_name in alias_attribute_names:
            aliases[alias_attribute_name] = element.element_attributes[alias_attribute_name]
        d[element_name] = aliases

    return d


def get_alias_attribute_names(hierarchy):
    d = []
    for attribute in hierarchy.element_attributes:
        if 'Alias' == attribute.attribute_type:
            d.append(attribute.name)
    return d


def create_mdx(cube_name, selected_subsets):
    mdx = 'SELECT '
    props = ''
    i = 0

    for d in selected_subsets['cols']:
        s = '[' + d['dimension'] + '].[' + d['hierarchy'] + '].['
        mdx += (' * ' if i else '') + '{StrToSet("{' + s + d['subset'] + ']}")}'
        props += (', ' if i else '') + s + d['alias_attr_name'] + ']'
        i += 1

    mdx += ' PROPERTIES ' + props + ' ON COLUMNS'
    props = ''
    i = 0

    #if selected_subsets['rows']:
    #    mdx += ', NON EMPTY '

    for d in selected_subsets['rows']:
        s = '[' + d['dimension'] + '].[' + d['hierarchy'] + '].['
        mdx += (' * ' if i else ', ') + '{StrToSet("{' + s + d['subset'] + ']}")}'
        props += (', ' if i else '') + s + d['alias_attr_name'] + ']'
        i += 1

    if props:
        mdx += ' PROPERTIES ' + props + ' ON ROWS'

    mdx += ' FROM [' + cube_name + ']'

    if selected_subsets['slices']:
        mdx += ' WHERE ('
        i = 0
        for d in selected_subsets['slices']:
            mdx += (', ' if i else '') + '[' + d['dimension'] + '].[' + d['hierarchy'] + '].[' + str(d['element']) + ']'
            i += 1
        mdx += ')'

    return mdx


def get_pivot_data(raw_data):
    cols = []
    tuples = raw_data['Axes'][0]['Tuples']
    last_names = [0] * len(tuples[0]['Members'])

    for t in tuples:
        col = []
        names = []
        i = 0
        for m in t['Members']:
            name = m['Name']
            if last_names[i] != name:
                col.append([name, 1 if 'Consolidated' == m['Element']['Type'] else 0])
            else:
                col.append(0)
            names.append(name)
            i += 1
        last_names = names
        cols.append(col)

    rows = []
    tuples = raw_data['Axes'][1]['Tuples']
    last_names = [0] * len(tuples[0]['Members'])
    for t in tuples:
        row = []
        names = []
        i = 0
        for m in t['Members']:
            name = m['Name']
            if last_names[i] != name:
                row.append([name, 1 if 'Consolidated' == m['Element']['Type'] else 0])
            else:
                row.append(0)
            names.append(name)
            i += 1
        last_names = names
        rows.append(row)

    cells = list(map(lambda c: c['Value'], raw_data['Cells']))

    return {'rows': rows, 'cols': cols, 'cells': cells}
