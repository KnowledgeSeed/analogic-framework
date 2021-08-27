import TM1py
from flask import jsonify
from TM1py.Services import TM1Service


def call():
    # address = "https://kseed-dc1.knowledgeseed.local:5125/tempapi"
    # address = "https://kseed-dc1.knowledgeseed.local:5125/analogicadminapi"
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

    # cube = tm1.cubes.get('Sales Plan by Product')
    # cube_names = tm1.cubes.get_all_names()
    # dim_names = tm1.cubes.get_dimension_names('zSYS Analogic UI Definition')
    dim_names = tm1.cubes.get_dimension_names('Sales Plan by Product')

    d = {}

    for dim_name in dim_names:
        d[dim_name] = []
        dim = tm1.dimensions.get(dim_name)
        for hierarchy in dim.hierarchies:
            elements = []
            subsets = []
            element_attributes = hierarchy.element_attributes
            alias_attr = next(x for x in element_attributes if 'Alias' == x.attribute_type)
            for element_name in hierarchy.elements:
                element = hierarchy.get_element(element_name)
                elements.append({'name': element.name, 'alias': element.element_attributes[alias_attr.name]})
            #for subset_name in hierarchy.subsets:
                #1. slow method
                #subsets.append(subset_name + ' (' + str(len(tm1.subsets.get_element_names(dim_name, hierarchy.name, subset_name))) + ')')
                #2. slow method
                #subset = tm1.subsets.get(subset_name, dim_name, hierarchy.name)
                #subsets.append(subset_name + ' (' + str(len(subset.elements)) + ')')
            d[dim_name].append({'name': hierarchy.name, 'defaultMember': hierarchy.default_member, 'elements': elements, 'subsets': hierarchy.subsets})


    # for dim_name in dim_names:
    #     d[dim_name] = {}
    #     for hierarchy_name in tm1.hierarchies.get_all_names(dim_name):
    #         a = tm1.elements.get_element_attributes(dim_name, hierarchy_name)
    #         b = tm1.elements.get_all_element_identifiers(dim_name, hierarchy_name)
    #         c = tm1.elements.get_alias_element_attributes(dim_name, hierarchy_name)
    #         e = tm1.elements.get_elements(dim_name, hierarchy_name)
    #
    #         d[dim_name][hierarchy_name] = {
    #             'defaultMember':  tm1.hierarchies.get_default_member(dim_name, hierarchy_name),
    #             'elements': tm1.elements.get_element_names(dim_name, hierarchy_name),
    #             'subsets': tm1.subsets.get_all_names(dim_name, hierarchy_name)
    #         }

    return jsonify(d)

    mdx = """SELECT
           {[Demo Measure].[Demo Measure].Members}
          ON COLUMNS ,
           {[Demo Products].[Demo Products].Members}
          ON ROWS
        FROM [Demo Cube 2]
        WHERE
          (
           [Demo Company].[Demo Company].[Company One],
           [Demo Time].[Demo Time].[2021]
          )"""

    a = tm1.subsets.get_all_names('Demo Company')
    b = tm1.cells.execute_mdx(mdx, ['Value'])
    c = tm1.cells.execute_mdx_cellcount(mdx)
    i = tm1.cells.execute_mdx_elements_value_dict(mdx)
    d = tm1.cells.execute_mdx_dataframe_pivot(mdx)
    e = tm1.cells.execute_mdx_raw(mdx, ['Value'], ['Name'], ['Name'])
    f = tm1.cells.execute_mdx_rows_and_values(mdx)
    g = tm1.cells.execute_mdx_values(mdx)

    return 'OK'
