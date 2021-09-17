import TM1py
from flask import jsonify
from TM1py.Services import TM1Service
from TM1py.Objects import Subset


def call(dimension_name=None, hierarchy_name=None, subset_name=None, element_names=None, subset_name_to_remove=None):
    address = "https://kseed-dc1.knowledgeseed.local:5125/rochebpspapi"
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

    cube_name = 'Sales Plan by Product'

    if element_names:
        new_subset = Subset(subset_name, dimension_name, hierarchy_name, subset_name, None, element_names)
        tm1.subsets.update_or_create(new_subset)
        d = tm1.subsets.get_all_names(dimension_name, hierarchy_name)
    elif subset_name_to_remove:
        tm1.subsets.delete(subset_name_to_remove, dimension_name, hierarchy_name)
        d = tm1.subsets.get_all_names(dimension_name, hierarchy_name)
    elif dimension_name is None:
        d = tm1.cubes.get_dimension_names(cube_name)
    elif hierarchy_name is None:
        d = tm1.hierarchies.get_all_names(dimension_name)
    elif subset_name is None:
        d = tm1.subsets.get_all_names(dimension_name, hierarchy_name)
    else:
        d = tm1.subsets.get_element_names(dimension_name, hierarchy_name, subset_name)

    return jsonify(d)

    # cube = tm1.cubes.get('Sales Plan by Product')
    # cube_names = tm1.cubes.get_all_names()
    # dim_names = tm1.cubes.get_dimension_names('zSYS Analogic UI Definition')

    d = {}

    for dim_name in dim_names:
        d[dim_name] = {}
        dim = tm1.dimensions.get(dim_name)
        for hierarchy_name in dim.hierarchies:
            elements = []
            subsets = []
            element_attributes = hierarchy_name.element_attributes
            alias_attr = next(x for x in element_attributes if 'Alias' == x.attribute_type)
            for element_name in hierarchy_name.elements:
                element = hierarchy_name.get_element(element_name)
                elements.append({'name': element.name, 'alias': element.element_attributes[alias_attr.name]})
            d[dim_name][hierarchy_name.name] = {'defaultMember': hierarchy_name.default_member, 'elements': elements, 'subsets': subsets}

    return jsonify(d)

