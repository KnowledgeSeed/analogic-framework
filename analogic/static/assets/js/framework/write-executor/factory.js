/* global Widgets, QB, Repository, Extensions */

'use strict';

class WriteExecutorFactory {

    static createExecutor(eventMapId, jqueryEvent, jqueryElement, resent = false) {
        let s = eventMapId.split('.'), eventName = s[0], widgetId = s[1], eventHandler,
            context = WriteExecutorFactory.createContext(eventName, widgetId, jqueryEvent, jqueryElement, resent),
            extResponse;

        eventHandler = context.getEventHandler();

        if (!eventHandler) {
            return new SkipWriteExecutor(context);
        }

        if (isClass(eventHandler)) {
            return new eventHandler(context); //Todo check
        }

        if (eventHandler instanceof WriteExecutor) {
            return eventHandler; // Todo check
        }

        for (let i = 0; i < Extensions.writeExecutors.length; ++i) {
            extResponse = Extensions.writeExecutors[i].getExecutor(context);
            if (extResponse instanceof WriteExecutor) {
                return extResponse;
            }
        }

        if (!context.isGridTable() && context.getEventName()  === 'uploadImage') {
            return new ImageUploadWriteExecutor(context);
        }

        if (typeof eventHandler === 'function') {
            return new FunctionWriteExecutor(context);
        }

        if (context.isGridTable()) {
            if (eventHandler.download && (typeof eventHandler.download === 'function')) {
                return new DownloadWriteExecutor(context);
            }
            return new GridTableWriteExecutor(context);
        }

        if (eventHandler.download && (typeof eventHandler.download === 'function')) {
            return new DownloadWriteExecutor(context);
        }

        return new WriteExecutor(context);
    }

    static createContext(eventName, widgetId, jqueryEvent, jqueryElement, resent = false) {
        let z = widgetId.split('_'),
            context = Widgets,
            widget, gridTableCell, gridTableInfo, widgetEventValue;

        if (z.length > 2 && z[1] !== 'row') { //grid table
            widget = context[z[0]];

            widget.row && delete widget.row;
            widget.column && delete widget.column;

            widget.row = z[1];
            widget.column = z[2];

            if (v(widgetId + '.' + eventName)) {
                widget[eventName] = v(widgetId + '.' + eventName);
                widgetEventValue = v(widgetId + '.' + eventName + '.value');
                if (widgetEventValue) {
                    widget.value = widgetEventValue
                }
            }

            gridTableCell = v(z[0] + '.cellData')[z[1]][z[2]];

            gridTableCell.dirty = true;

            gridTableInfo = WriteExecutorFactory.getGridTableInfo(gridTableCell, parseInt(z[1]), parseInt(z[2]), z, eventName + '.' + widgetId);

            widgetId = z.length > 3 ? z[3] : z[0];

            context = WriteExecutorFactory.getContext(eventName, widgetId, jqueryEvent, jqueryElement, resent, gridTableInfo);
        } else {
            context = WriteExecutorFactory.getContext(eventName, widgetId, jqueryEvent, jqueryElement, resent);
        }
        return context;
    }

    static getContext(eventName, widgetId, jqueryEvent, jqueryElement, resent = false, gridTableInfo = null) {
        let context = Object.create(Widgets);

        context.getId = () => {
            return widgetId;
        };
        context.getWidgetId = () => {
            return widgetId;
        };
        context.getEventMapId = () => {
            return context.getEventName() + '.' + context.getId();
        };
        context.getEventName = () => {
            return eventName;
        };
        context.getEventHandler = () => {
            return (context.getObject() || {})[context.getEventName()];
        };
        context.getObject = () => {
            return Repository[widgetId];
        };
        context.getJQueryEvent = () => {
            return jqueryEvent;
        };
        context.getJQueryElement = () => {
            return jqueryElement;
        };
        context.getEvent = () => {
            return jqueryEvent;
        };
        context.getElement = () => {
            return jqueryElement;
        };
        context.getWidgetValue = (property = false) => {
            return v(context.getId() + (property ? '.' + property : ''));
        };
        context.getEventValues = () => {
            return context.getWidgetValue(context.getEventName());
        };
        context.getCell = () => {
            return gridTableInfo !== null ? gridTableInfo.getCell() : null;
        };
        context.getCellId = () => {
            return context.getCell() ? context.getCell().id : null;
        };
        context.getRow = () => {
            return gridTableInfo !== null ? gridTableInfo.getRow() : null;
        };
        context.getColumn = () => {
            return gridTableInfo !== null ? gridTableInfo.getColumn() : null;
        };
        context.getGridTableInfo = () => {
            return gridTableInfo;
        };
        context.isGridTable = () => {
            return context.getGridTableInfo() !== null;
        };
        context.getGridTableOriginalEventMapId = () => {
            return gridTableInfo !== null ? gridTableInfo.getOriginalEventMapId() : null;
        };
        context.getGridTableSplitIds = () => {
            return gridTableInfo !== null ? gridTableInfo.getSplitIds() : null;
        }

        context.isResent = () => {
            return resent;
        }

        return context;
    }

    static getGridTableInfo(cell, row, column, splitIds, originalEventMapId) {
        return {
            getCell() {
                return cell;
            },
            getRow() {
                return row;
            },
            getColumn() {
                return column;
            },
            getSplitIds() {
                return splitIds;
            },
            getOriginalEventMapId() {
                return originalEventMapId;
            }
        };
    }
}