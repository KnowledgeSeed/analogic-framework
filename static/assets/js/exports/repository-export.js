/* global app */

'use strict';
class RepositoryExport extends Export {

    createDataToExport() {
        this.exportData = [];

        let widgetId, eventTypeConfigs, eventType, configs, order;

        for (widgetId in app.repository) {
            eventTypeConfigs = app.repository[widgetId];

            order = 1;

            for (eventType in eventTypeConfigs) {
                configs = eventTypeConfigs[eventType];

                if ($.isArray(configs)) {
                    configs.map((config, i) => this.processEventTypeConfig(widgetId, eventType, config, order + '.' + (i + 1)));
                } else {
                    this.processEventTypeConfig(widgetId, eventType, configs, order);
                }

                ++order;
            }
        }

        return this.exportData;
    }

    processEventTypeConfig(widgetId, eventType, config, order, paramName) {
        let configType = typeof config, val;

        if ('function' === configType) {
            val = config.toString();
        } else if ('object' === configType) {
            if (null === val) {
                val = 'null';
            } else {
                for (paramName in config) {
                    if ('parsingControl' === paramName) {
                        this.processParsingControlConfig(widgetId, eventType, config[paramName], order);
                    } else {
                        this.processEventTypeConfig(widgetId, eventType, config[paramName], order, paramName);
                    }
                }
            }
        } else {
            val = config.toString();
        }

        if ('undefined' !== typeof val) {
            this.exportData.push([widgetId, eventType, order, paramName || eventType, val]);
        }
    }

    processParsingControlConfig(widgetId, eventType, config, order) {
        if (config.type) {
            this.exportData.push([widgetId, eventType, order, 'parsingControlType', config.type]);
        }

        if (config.query) {
            this.exportData.push([widgetId, eventType, order, 'parsingControlQuery', this.stringifyQuery(config.query)]);
        }

        if (config.length) {
            this.exportData.push([widgetId, eventType, order, 'parsingControlLength', config.length]);
        }
    }

    stringifyQuery(q) {
        if ($.isArray(q)) {
            return q.map(e => 'function' === typeof e ? e.toString() : JSON.stringify(e)).join(',');
        } else if ('function' === typeof q) {
            return q.toString();
        } else if ('object' === typeof q) {
            let i, o, s = ['{'];

            for (i in q) {
                o = q[i];
                s.push(i, ': ', 'function' === typeof o ? o.toString() : JSON.stringify(o), ',');
            }

            s[s.length - 1] = '}';

            return s.join('');
        }

        return q;
    }
}
;