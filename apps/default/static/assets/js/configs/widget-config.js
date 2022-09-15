/* global app */
'use strict';
WidgetConfig = {
        analogicMain:
            {
                id: 'analogicMain',
                type: PageWidget,
                widgets: [
                    {
                        id: 'analogicMainHelloAnalogic',
                        type: ButtonWidget,
                        url: '/helloanalogic',
                        label: 'Hello analogic application'
                    },
                    {
                        id: 'analogicMainHrDemo',
                        type: ButtonWidget,
                        url: '/hrdemo',
                        label: 'Hrdemo application'
                    }
                ]
            }
};