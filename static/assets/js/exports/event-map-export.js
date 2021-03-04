/* global app, Utils */

'use strict';
class EventMapExport extends Export {

    createDataToExport() {
        return $.ajax({
            url: app.assetsFolder + '/js/configs/' + app.customerAssetsFolder + '/event-map.js',
            dataType: 'text',
            cache: false
        }).then((eventMapContent) => this.parseEventMapContent(eventMapContent));
    }

    parseEventMapContent(eventMapContent) {
        let line, exportableDataByEventMapKeys = {}, comment, commentsForStatement = [], commentStartKey;
        let lastEventMapKey, statement, eventMapKey, eventMapArray, exportData = [], i, d, v, len, args;

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
                exportableDataByEventMapKeys[lastEventMapKey].actions.push(statement.slice(7, -1).trim());

                continue;
            }

            if (-1 !== statement.indexOf('argument:')) {
                statement = null;
                commentsForStatement = [];

                continue;
            }

            v = statement.match(/^['|"](\w+\.\w+)['|"]/) || [];
            if (2 === v.length) {
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

                exportData.push([
                    v[0],
                    v[1],
                    i + 1,
                    d.actions[i],
                    this.toString(args[0]),
                    this.toString(args[1]),
                    this.toString(args[2]),
                    this.toString(args[3]),
                    d.comments.join(',')
                ]);
            }
        }

        return exportData;
    }

    toString(e) {
        if (!e) {
            return '';
        }

        return 'string' === typeof e ? e : JSON.stringify(e);
    }
}
;