/* global app */

'use strict';
class ConfigExport extends Export {

    createDataToExport() {
        return $.ajax({
            url: 'assets/js/configs/' + app.customerAssetsFolder + '/config.js',
            dataType: 'text',
            cache: false
        }).then((configContent) => this.parseConfigContent(configContent));
    }

    parseConfigContent(configContent) {
        let line, comment, commentsForStatement = [], commentStartKey, statement, possibleAppKey, configValue, exportData = [], v;

        for (line of configContent.replace(/\n/g, '\r').split('\r')) {
            if (!line || line.match(/jQuery|strict|\(\(\$,|app = app/)) {
                continue;
            }

            statement = null;

            commentStartKey = line.indexOf('//');

            if (-1 !== commentStartKey && ':' !== line[commentStartKey - 1]) {
                statement = line.slice(0, commentStartKey);
                comment = line.slice(commentStartKey + 2).trim();

                if (comment) {
                    commentsForStatement.push(comment);
                }
            } else {
                statement = line;
            }

            v = (statement || '').split('=');

            if (v.length > 1) {
                possibleAppKey = v[0].trim().replace('app.', '');

                configValue = app.utils.getObjectValueByDotSeparatedKeys(app, possibleAppKey);

                v = typeof configValue;

                if ('undefined' === v) {
                    continue;
                }

                exportData.push([
                    'app.' + possibleAppKey,
                    v,
                    'function' === v ? configValue.toString() : JSON.stringify(configValue),
                    commentsForStatement.join(',')
                ]);

                commentsForStatement = [];
            }
        }

        return exportData;
    }
}
;