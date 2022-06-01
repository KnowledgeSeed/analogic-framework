/* global app */
'use strict';
app.repository = {

    frameworktestMainRow3Cell6Button: {
        launch: {
            execute: (db, widgetId) => {
                Utils.setWidgetValue('systemValueTrue', true);
                app.fn.updateContent('frameworktestMainRow3Cell5Button');
            }
        }
    },
    frameworktestMainRow3Cell5Button: {
        init: {
            execute: (db, widgetId) => {
                return {
                    fontSize: v('systemValueTrue') ?   15   : 12,

                }
            }

        }

    },


}
;