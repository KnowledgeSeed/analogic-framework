/* global Widgets, QB, Repository, Extensions */

'use strict';

class WriteExecutorFactory {

    static createExecutor(eventMapId, jqueryEvent, jqueryElement) {
        let s = eventMapId.split('.'), eventName = s[0], widgetId = s[1], eventHandler,
            context = WriteExecutorFactory.createContext(eventName, widgetId, jqueryEvent, jqueryElement),
        extResponse;

        eventHandler = context.getEventHandler();

        if (!eventHandler) {
            return new SkipWriteExecutor(context);
        }

        for(let i = 0; i < Extensions.writeExecutors.length; ++i){
            extResponse = Extensions.writeExecutors[i].getExecutor(context);
            if (extResponse instanceof WriteExecutor) {
                return extResponse;
            }
        }

        if (eventName === 'upload') {
            return new UploadWriteExecutor(context);
        }

        if (context.isGridTable()) {
            return new GridTableWriteExecutor(context);
        }

        if (typeof eventHandler === 'function') {
            return new FunctionWriteExecutor(context);
        }

        if (eventHandler.download && (typeof eventHandler.download === 'function')) {
            return new DownloadWriteExecutor(context);
        }

        return new WriteExecutor(context);
    }

    static createContext(eventName, widgetId, jqueryEvent, jqueryElement) {
        let z = widgetId.split('_'),
            context = WidgetValue,
            repositoryObject, gridTableCell, gridTableInfo;

        if (z.length > 2 && z[1] !== 'row') { //grid table
            repositoryObject = context[z[0]];

            repositoryObject.row && delete repositoryObject.row;
            repositoryObject.column && delete repositoryObject.column;

            context[z[0]] = {...repositoryObject, ...{row: z[1], column: z[2]}, ...context[widgetId]};

            gridTableCell = v(z[0] + '.cellData')[z[1]][z[2]];

            gridTableInfo = WriteExecutorFactory.getGridTableInfo(gridTableCell, parseInt(z[1]), parseInt(z[2]), z, eventName + '.' + widgetId);

            widgetId = z.length > 3 ? z[3] : z[0];

            context = {...WriteExecutorFactory.getContext(eventName, widgetId, jqueryEvent, jqueryElement, gridTableInfo), ...context};
        } else {
            context = {...WriteExecutorFactory.getContext(eventName, widgetId, jqueryEvent, jqueryElement), ...context};
        }
        return context;
    }

    static getContext(eventName, widgetId, jqueryEvent, jqueryElement, gridTableInfo = null) {
        return {
            getId() {
                return widgetId;
            },
            getWidgetId() {
                return widgetId;
            },
            getEventMapId() {
                return this.getEventName() + '.' + this.getId();
            },
            getEventName() {
                return eventName;
            },
            getEventHandler() {
                return (this.getObject() || {})[this.getEventName()];
            },
            getObject() {
                return Repository[widgetId];
            },
            getJQueryEvent() {
                return jqueryEvent;
            },
            getJQueryElement() {
                return jqueryElement;
            },
            getEvent() {
                return jqueryEvent;
            },
            getElement() {
                return jqueryElement;
            },
            getWidgetValue(property = false) {
                return v(this.getId() + (property ? '.' + property : ''));
            },
            getEventValues() {
                return this.getWidgetValue(this.getEventName());
            },
            getCell() {
                return gridTableInfo !== null ? gridTableInfo.getCell() : null;
            },
            getRow() {
                return gridTableInfo !== null ? gridTableInfo.getRow() : null;
            },
            getColumn() {
                return gridTableInfo !== null ? gridTableInfo.getColumn() : null;
            },
            getGridTableInfo() {
                return gridTableInfo;
            },
            isGridTable() {
                return this.getGridTableInfo() !== null;
            },
            getGridTableOriginalEventMapId() {
                return gridTableInfo !== null ? gridTableInfo.getOriginalEventMapId() : null;
            },
            getGridTableSplitIds() {
                return gridTableInfo !== null ? gridTableInfo.getSplitIds() : null;
            },
        };
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