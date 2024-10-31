/* global app */
'use strict';
WidgetConfig = {
    $projectIdMain:
        {
            id: '$projectIdMain',
            type: PageWidget,
            widgets: [
                {
                    id: '$projectIdMainHelloWorldText',
                    type: TextWidget,
                    title: 'Hello world'
                }
            ]
        }
};