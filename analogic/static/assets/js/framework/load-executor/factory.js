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
        let repositoryObject = ctx.getRepositoryObject(), loaderFunction = ctx.getLoaderFunction();
        ;

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

        return new LoadExecutor(ctx);
    }

    static createContext(widgetId, widgetTypeName, useDefaultData = false, loaderFunctionPath = 'init', extraParams = {}) {

        let repositoryObject = Repository[widgetId], loaderFunction,
            conditionPath = loaderFunctionPath + 'Condition', conditionFailedPath = loaderFunctionPath + 'Default',
            conditionFunction, conditionFailedFunction, referenceWidgetId, originalRepositoryObject;

        if (repositoryObject && repositoryObject.reference) {
            originalRepositoryObject = repositoryObject;
            referenceWidgetId = repositoryObject.reference;
            repositoryObject = Repository[repositoryObject.reference];
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

        let context = Object.create(Widgets);

        context.getId = () => {
            return widgetId;
        };
        context.getWidgetId = () => {
            return widgetId;
        };
        context.getReferenceWidgetId = () => {
            return referenceWidgetId;
        };
        context.getExtraParams = () => {
            return extraParams;
        };
        context.getObject = () => {
            return repositoryObject;
        };
        context.getOriginalRepositoryObject = () => {
            return originalRepositoryObject;
        };
        context.getRepositoryObject = () => {
            return repositoryObject;
        };
        context.getLoaderFunction = () => {
            return loaderFunction;
        };
        context.getLoaderFunctionName = () => {
            return loaderFunctionPath;
        };
        context.getConditionFunction = () => {
            return conditionFunction;
        };
        context.getConditionFailedFunction = () => {
            return conditionFailedFunction;
        };
        context.getWidgetTypeName = () => {
            return widgetTypeName;
        };
        context.triggerParsingControlFinished = () => {
            return true;
        };
        context.runParsingControl = () => {
            return true;
        };

        context.getRestRequest = () => {
            return false;
        };

        context.getEvent = () => {
            return {};
        };

        context.getElement = () => {
            return $('#' + widgetId);
        };

        return context;
    }
}