/* global Widgets, QB, Repository, Extensions */

'use strict';

class LoadExecutorFactory {

    static createExecutor(widgetId, widgetTypeName, useDefaultData = false, loaderFunctionPath = 'init', extraParams = {}) {

        let context = LoadExecutorFactory.createContext(widgetId, widgetTypeName, useDefaultData, loaderFunctionPath, extraParams),
            repositoryObject, loaderFunction;

        if (useDefaultData) {
            return new DefaultLoadExecutor(context);
        }

        repositoryObject = context.getRepositoryObject();

        if (repositoryObject && repositoryObject.state) {
            return new StateLoadExecutor(context);
        }

        loaderFunction = context.getLoaderFunction();

        if(isClass(loaderFunction)){
            return new loaderFunction(context); //Todo check
        }

        if (loaderFunction instanceof LoadExecutor) {
            return loaderFunction; // Todo check
        }

        if (!loaderFunction) {
            return new SkipLoadExecutor(context);
        }

        if (loaderFunction.pivot) {
            return new PivotLoadExecutor(context);
        }

        return new LoadExecutor(context);

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
            }
        };

        return {...o, ...WidgetValue}
    }
}