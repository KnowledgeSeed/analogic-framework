/* global app, Utils */

'use strict';
class EventMapExport extends Export {

    createDataToExport() {
        return $.ajax({
            url: app.assetsUrl + '/js/configs/' + app.applicationAssetsFolder + '/event-map.js',
            dataType: 'text',
            cache: false
        }).then((eventMapContent) => this.parseEventMapContent(eventMapContent));
    }

    parseEventMapContent(eventMapContent) {
        let line, exportableDataByEventMapKeys = {}, comment, commentsForStatement = [], commentStartKey;
        let lastEventMapKey, statement, eventMapKey, eventMapArray, exportData = [], i, d, v, len, args, a;

        for (line of eventMapContent.replace(/\n/g, '\r').split('\r')) {
            commentStartKey = line.indexOf('//');
            if (-1 !== commentStartKey && ':' !== line[commentStartKey - 1]) {
                statement = line.slice(0, commentStartKey).trim();
                comment = line.slice(commentStartKey + 2).trim();

                if (comment) {
                    commentsForStatement.push(comment);
                }
            } else {
                statement = line.trim();
            }

            if (-1 !== statement.indexOf('action:')) {
                a = statement.slice(7, -1).trim();
                exportableDataByEventMapKeys[lastEventMapKey].actions.push(a);

                continue;
            }

            if (-1 !== statement.indexOf('argument:')) {
                statement = null;
                commentsForStatement = [];

                continue;
            }

            v = statement.match(/^['|"](\w+\.\w+(\.\w+)?)['|"]/) || [];
            if (3 === v.length) {
                lastEventMapKey = v[1];

                exportableDataByEventMapKeys[lastEventMapKey] = {comments: commentsForStatement, actions: []};
            }
        }

        for (eventMapKey in exportableDataByEventMapKeys) {
            d = exportableDataByEventMapKeys[eventMapKey];
            eventMapArray = Utils.getObjectValueByDotSeparatedKeys(app.eventMap, eventMapKey);

            v = eventMapKey.split('.');
            len = eventMapArray.length;

            for (i = 0; i < len; ++i) {
                args = eventMapArray[i].argument || [];
                if ('string' === typeof args) {
                    args = [args];
                }
                if(d.actions[i] === 'app.fn.conditionalGridTablePopup'){
                    let conditions = [], j, condition, k;
                    for(j = 0; j < args.length; ++j){
                        condition = {
                           conditionKey: args[j].conditionKey,
                            actions : []
                        };
                        for(k = 0; k < args[j].actions.length; ++k){
                            condition.actions.push(
                                {
                                    action: 'app.fn.' + args[j].actions[k].action.name,
                                    argument: args[j].actions[k].argument
                                }
                            )
                        }
                        conditions.push(condition);
                    }
                    exportData.push([
                        v[0],
                        v[1],
                        v.length > 2 ? v[2] : '',
                        i + 1,
                        d.actions[i],
                        JSON.stringify(conditions),
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        d.comments.join(',')
                    ]);
                }else {
                    exportData.push([
                        v[0],
                        v[1],
                        v.length > 2 ? v[2] : '',
                        i + 1,
                        d.actions[i],
                        this.toString(args[0]),
                        this.toString(args[1]),
                        this.toString(args[2]),
                        this.toString(args[3]),
                        this.toString(args[4]),
                        this.toString(args[5]),
                        this.toString(args[6]),
                        this.toString(args[7]),
                        this.toString(args[8]),
                        this.toString(args[9]),
                        d.comments.join(',')
                    ]);
                }
            }
        }

        return exportData;
    }

    toString(e) {
        if (!e) {
            return '';
        }

        return 'string' === typeof e ? e :  'function' === typeof e ? 'app.fn.' + e.name : JSON.stringify(e);
    }
}
;