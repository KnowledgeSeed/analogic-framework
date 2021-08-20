from TM1py.Services import TM1Service


def call():
    # address = "https://kseed-dc1.knowledgeseed.local:5125/tempapi"
    address = "https://kseed-dc1.knowledgeseed.local:5125/analogicadminapi"
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

    n = tm1.cubes.get_all_names()

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
