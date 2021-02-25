/* global app */

'use strict';
class WidgetConfigExport extends Export {

    createDataToExport() {
        this.exportData = [];

        let pageKey, widgetOrder = 0, config;

        for (pageKey in app.widgetConfig) {
            config = app.widgetConfig[pageKey];

            this.processConfigForWidget(config, '', ++widgetOrder);
        }

        return this.exportData;
    }

    processConfigForWidget(config, parentId, widgetOrder) {
        let paramName, paramVal, paramType;

        for (paramName in config) {
            if ('widgets' === paramName) {
                continue;
            }

            paramVal = config[paramName];
            paramType = typeof paramVal;

            if ('function' === paramType) {
                paramVal = paramVal.name;

                if (-1 !== paramVal.indexOf('Widget')) {
                    paramType = 'widget';
                }
            } else if ('object' === paramType) {
                if ($.isArray(paramVal)) {
                    paramType = 'array';
                }

                paramVal = null === paramVal ? 'null' : JSON.stringify(paramVal);
            } else {
                paramVal = paramVal.toString();
            }

            this.exportData.push([parentId, widgetOrder, config.id, config.type.name, paramName, paramType, paramVal]);
        }

        if (config.widgets) {
            this.traverseWidgetsConfigArray(config.widgets, config.id);
        }
    }

    traverseWidgetsConfigArray(widgetsConfigArray, parentId) {
        let config, widgetOrder = 0;

        for (config of widgetsConfigArray) {
            this.processConfigForWidget(config, parentId, ++widgetOrder);
        }
    }
}
;