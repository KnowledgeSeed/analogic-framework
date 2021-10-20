from flask import jsonify
from TM1py.Services import TM1Service
from TM1py.Objects import Subset
import json


def call(dimension_name=None, hierarchy_name=None, subset_name=None, element_names=None, subset_name_to_remove=None, selected_cards=None, expand_row_element=None, expand_col_element=None):
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

    if selected_cards:
        selected_cards_data = json.loads(selected_cards)
        mdx = create_mdx(cube_name, selected_cards_data, expand_row_element, expand_col_element)
        cell_count = tm1.cells.execute_mdx_cellcount(mdx)
        data = {}
        if cell_count < 2000000:
            data = get_pivot_data(tm1, mdx, selected_cards_data)
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


def create_mdx(cube_name, selected_cards_data, expand_row_element=None, expand_col_element=None):
    mdx = 'SELECT '

    if expand_col_element:
        d = json.loads(expand_col_element)
        s = d['dimension'] + '].[' + d['hierarchy'] + '].[' + d['member']
        mdx += ' {DRILLDOWNMEMBER({[' + s + ']}, {[' + s + ']})} ON COLUMNS'
    else:
        props = ''
        i = 0
        for d in selected_cards_data['cols']:
            s = '[' + d['dimension'] + '].[' + d['hierarchy'] + '].['
            mdx += (' * ' if i else '') + '{StrToSet("{' + s + d['subset'] + ']}")}'
            #props += (', ' if i else '') + s + d['alias_attr_name'] + ']'
            i += 1
        mdx += ((' PROPERTIES ' + props) if props else ' ') + ' ON COLUMNS'

    #if selected_subsets['rows']:
    #    mdx += ', NON EMPTY '

    if expand_row_element:
        d = json.loads(expand_row_element)
        s = d['dimension'] + '].[' + d['hierarchy'] + '].[' + d['member']
        mdx += ', {DRILLDOWNMEMBER({[' + s + ']}, {[' + s + ']})} ON ROWS'
    else:
        props = ''
        i = 0
        for d in selected_cards_data['rows']:
            s = '[' + d['dimension'] + '].[' + d['hierarchy'] + '].['
            mdx += (' * ' if i else ', ') + '{StrToSet("{' + s + d['subset'] + ']}")}'
            #props += (', ' if i else '') + s + d['alias_attr_name'] + ']'
            i += 1
        if i:
            mdx += ((' PROPERTIES ' + props) if props else ' ') + ' ON ROWS'

    mdx += ' FROM [' + cube_name + ']'

    if selected_cards_data['slices']:
        mdx += ' WHERE ('
        i = 0
        for d in selected_cards_data['slices']:
            mdx += (', ' if i else '') + '[' + d['dimension'] + '].[' + d['hierarchy'] + '].[' + str(d['element']) + ']'
            i += 1
        mdx += ')'

    return mdx


def get_pivot_data(tm1, mdx, selected_cards_data):
    alias_attribute_names = {}
    alias_attribute_names_by_axis_and_member_ids = [[], []]

    for type in selected_cards_data:
        if 'slices' == type:
            continue

        i = 0 if 'cols' == type else 1

        for d in selected_cards_data[type]:
            alias_attr_name = d['alias_attr_name']
            if alias_attr_name:
                alias_attribute_names_by_axis_and_member_ids[i].append(alias_attr_name)
                alias_attribute_names[alias_attr_name.replace(' ', '')] = 1

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
    $select=FormattedValue
)""".replace('\n', '')

    raw_data = tm1._tm1_rest.GET(url).json()
    cols = get_pivot_header_data(raw_data['Axes'][0]['Tuples'], alias_attribute_names_by_axis_and_member_ids[0])
    rows = get_pivot_header_data(raw_data['Axes'][1]['Tuples'], alias_attribute_names_by_axis_and_member_ids[1])
    cells = list(map(lambda c: c['FormattedValue'], raw_data['Cells']))

    return {'rows': rows, 'cols': cols, 'cells': cells}


def get_pivot_header_data(tuples, alias_attribute_names_by_member_ids):
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
