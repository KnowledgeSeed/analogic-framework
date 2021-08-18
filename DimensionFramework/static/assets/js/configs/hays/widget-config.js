/* global app */

'use strict';

app.widgetConfig = {
    haysMain:
        {
            id: 'haysMain',
            type: PageWidget,
            widgets: [

                {
                    id: 'haystext',
                    type: TextWidget,
                    width: '100%',
                    body: 'Product',
                    titleAlignment: 'start',
                    marginBottom: 8,
                    marginLeft: '10%',
                    bodyAlignment: 'start'
                }

            ]
        }
};