/* global app */

'use strict';

app.widgetConfig = {
    BandiMain:
    {
        id: 'BandiMain',
        type: PageWidget,
        widgets: [
            {
                id: 'bandiPivot',
                type: PivotWidget
            },
            {
                id: 'bandiDemoHorizontalTable',
                type: HorizontalTableWidget,
                title: 'bandiDemoHorizontalTable',
                titleVisible: true,
                columnNames: ['Name', 'Region', 'Price'],
                searchField: true,
                visible: true,
                columnWidths: ["33%", "33%", "33%"],
                fadeOutNum: 15,
                marginLeft: 10,
                marginRight: 10,
                hideIfNoData: false,
                listen: [

                ],
                isInBox: false,
                //rightActionsLength: 1,
                marginBottom: '20',
                marginTop: '20',
                widgets: [

                ]
            }
        ]
    }
};