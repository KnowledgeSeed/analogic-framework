/* global Widgets, QB, Repository, Extensions */

'use strict';

class LoadExecutorFactory {

    static createExecutor(widgetId, widgetTypeName, useDefaultData = false, loaderFunctionPath = 'init', extraParams = {}) {

        let ctx = LoadExecutorFactory.createContext(widgetId, widgetTypeName, useDefaultData, loaderFunctionPath, extraParams);

        if (useDefaultData) {
            return new DefaultLoadExecutor(ctx);
        }

        return LoadExecutorFactory.getExecutor(ctx);
    }

    static getExecutor(ctx) {
        let repositoryObject = ctx.getRepositoryObject(), loaderFunction = ctx.getLoaderFunction();;

        if (!loaderFunction) {

            if (repositoryObject && repositoryObject.state) {
                return new StateLoadExecutor(ctx);
            }

            return new SkipLoadExecutor(ctx);
        }

        if (Array.isArray(loaderFunction)) {
            return new ArrayLoadExecutor(ctx);
        }

        if (isClass(loaderFunction)) {
            return new loaderFunction(ctx); //Todo check
        }

        if (loaderFunction instanceof LoadExecutor) {
            return loaderFunction; // Todo check
        }

        if (loaderFunction.pivot) {
            return new PivotLoadExecutor(ctx);
        }

        return new LoadExecutor(ctx);
    }

    static createContext(widgetId, widgetTypeName, useDefaultData = false, loaderFunctionPath = 'init', extraParams = {}) {

        let repositoryObject = Repository[widgetId], loaderFunction,
            conditionPath = loaderFunctionPath + 'Condition', conditionFailedPath = loaderFunctionPath + 'Default',
            conditionFunction, conditionFailedFunction, referenceWidgetId;

        if (repositoryObject && repositoryObject.reference) {
            repositoryObject = Repository[repositoryObject.reference];
            referenceWidgetId = repositoryObject.reference;
        }

        if (repositoryObject) {

            loaderFunction = repositoryObject[loaderFunctionPath];

            if (repositoryObject[conditionPath]) {
                conditionFunction = repositoryObject[conditionPath];
            }

            if (repositoryObject[conditionFailedPath]) {
                conditionFailedFunction = repositoryObject[conditionFailedPath];
            }
        }

        let o = {
            getId() {
                return widgetId;
            },
            getWidgetId() {
                return widgetId;
            },
            getReferenceWidgetId() {
                return referenceWidgetId;
            },
            getExtraParams() {
                return extraParams;
            },
            getObject() {
                return repositoryObject;
            },
            getRepositoryObject() {
                return repositoryObject;
            },
            getLoaderFunction() {
                return loaderFunction;
            },
            getLoaderFunctionName() {
                return loaderFunctionPath;
            },
            getConditionFunction() {
                return conditionFunction;
            },
            getConditionFailedFunction() {
                return conditionFailedFunction;
            },
            getWidgetTypeName() {
                return widgetTypeName;
            },
            triggerParsingControlFinished() {
                return true;
            },
            runParsingControl() {
                return true;
            }
        };

        return {...o, ...WidgetValue}
    }
}