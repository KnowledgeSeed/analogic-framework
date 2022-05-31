/* global Widgets */

'use strict';

class WriteExecutorFactory {
    static createExecutor(eventMapId) {
        let s = eventMapId.split('.'), eventName = s[0], widgetId = s[1], z = widgetId.split('_');
    }
}