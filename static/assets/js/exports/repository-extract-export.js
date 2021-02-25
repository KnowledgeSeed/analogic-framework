/* global app */

'use strict';
class RepositoryExtractExport extends Export {

    export(withTextDelimiter = true) {
        $.when(this.createDataToExport()).then(dataToExport => {
            this.exportToCsv(dataToExport[0], withTextDelimiter);
            this.exportToCsv(dataToExport[1], withTextDelimiter);
        });
    }

    createDataToExport() {
        this.exportData = [];
        this.serverSideExportData = [];
        this.newRepository = app.utils.clone(app.repository, true);

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
        return [this.exportData, this.serverSideExportData];
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
                    } else if ('body' === paramName) {
                        this.processBody(widgetId, eventType, config[paramName], order);
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

    processBody(widgetId, eventType, config, order) {
        let val = config.toString().replace(/(\r\n|\n|\r|\t)/gm, "").replace(/\s+/g, ' '),
                variables = val.match(/\${[^}\s]+}/g), v, newVal = [], added = [], newVars = [];
        newVal.push('(db) => {');
        newVal.push('return {');
        for (v of variables) {
            if (!added.includes(v)) {
                let nv = v.replace(/\${db./, '').replace(/}/, ''), tv = nv.replace(/\./g, '_');
                newVars.push(tv + ': db.' + nv);
                added.push(v);
                val = val.replaceAll(v, '$' + tv);
            }
        }
        newVal.push(newVars.join(','));
        newVal.push('};');
        newVal.push('}');
        val = app.utils.escapeText(val.replace('(db) => `', '').replace('`', ''));
        let oo = (order + "").split(".");
        this.exportData.push([widgetId, eventType, order, 'body', newVal.join('')]);
        if (oo.length > 1) {
            this.serverSideExportData.push([widgetId + '_' + eventType + '_' + oo[1], val]);
            this.newRepository[widgetId][eventType][oo[1] - 1]['body'] = newVal.join('');
        } else {            
            this.serverSideExportData.push([widgetId + '_' + eventType, val]);
            this.newRepository[widgetId][eventType]['body'] = newVal.join('');
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


