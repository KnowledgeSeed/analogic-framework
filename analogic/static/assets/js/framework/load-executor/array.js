'use strict';

class ArrayLoadExecutor extends LoadExecutor {

    loadData() {

        const ctx = this.context, loaderFunctions = ctx.getLoaderFunction(),
            repositoryObject = ctx.getRepositoryObject(),
            runParsingControl = typeof repositoryObject.commonParsingControl === 'undefined';


        let subContext, subLoaderFunction, c = 1, deferred = [];

        for (subLoaderFunction of loaderFunctions) {

            subContext = this.createContext(
                subLoaderFunction,
                ctx.getLoaderFunctionName() + '_' + c,
                runParsingControl);

            ++c;


            deferred.push(LoadExecutorFactory.getExecutor(subContext).execute());
        }

        return $.when.apply($, deferred).then(function (...results) {
            if (!runParsingControl) {
                let z, d = [], parsingControlResult;
                for (z of results) {
                    d.push(z);
                }
                parsingControlResult = repositoryObject.commonParsingControl(d, ctx.getWidgetId(), repositoryObject);
                QB.parsingControlFinished(ctx.getWidgetId());
                return parsingControlResult;
            }

            QB.parsingControlFinished(ctx.getWidgetId());
            if (repositoryObject.mergeInitResults) {
                return ArrayLoadExecutor.mergeResults(results[0], results[1]);
            }
            return results;
        });
    }

    createContext(loaderFunction, loaderFunctionName, runParsingControl) {

        const ctx = Utils.clone(this.context);

        ctx.getLoaderFunctionName = () => {
            return loaderFunctionName;
        };

        ctx.getLoaderFunction = () => {
            return loaderFunction;
        };

        ctx.getConditionFunction = () => {
            return null;
        };

        ctx.triggerParsingControlFinished = () => {
            return false;
        };

        ctx.runParsingControl = () => {
            return runParsingControl;
        };

        return ctx;

    }

    static mergeResults(result1, result2) {
        let m = [], z, n, y = [];

        for (z = 0; z < result1.length; ++z) {
            y = [];

            for (n = 0; n < result1[z].length; ++n) {
                y.push({...result1[z][n], ...result2[z][n]});
            }

            m.push(y);
        }

        return m;
    }
}