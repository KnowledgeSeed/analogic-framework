/* global Auth, Loader, Server */

Pivot = {callNum: 0};

Pivot.call = p => {
    Loader.start(true);
    ++Pivot.callNum;

    return $.ajax({
        url: Utils.getFullUrlForAjax('pivot'),
        method: p.method || 'POST',
        data: p.data || {},
        dataType: p.dataType || 'json',
        statusCode: {
            401: function () {
                Auth.handle401();
            },
            302: function (resp) {
                Auth.handle302(resp);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            const status = jqXHR.status;

            console.error(`Pivot.call Error - Status: ${status}, TextStatus: ${textStatus}, Error: ${errorThrown}`);
            if (jqXHR.responseText) {
                 console.error("Response Text:", jqXHR.responseText);
            }

            let parsedError;
            try {
                parsedError = JSON.parse(jqXHR.responseText);
            } catch (e) {
                parsedError = null;
            }

            const parsedMessage = parsedError && parsedError.error ? (parsedError.error.message || parsedError.error) : (parsedError && parsedError.message ? parsedError.message : '');
            const combinedMessage = parsedMessage || jqXHR.responseText || '';

            if (status >= 400 && status < 500 && status !== 401) {
                 let message = `Client Error (${status}). Please check your request.`;
                 let skipPopup = false;

                 if (parsedMessage) {
                     message = `Error (${status}): ${parsedMessage}`;
                 }

                 if (status === 404 && /can not be found in collection of type 'Subset'/i.test(combinedMessage)) {
                     skipPopup = true;
                     console.warn('Pivot request missing expected subset. Continuing without showing popup.');
                 }

                 if (!skipPopup) {
                     Api.showPopup(message, 400);
                 }

            }
            else if (status >= 500 && status < 600) {
                 const message = `Server Error (${status}). Please try again later or contact support.`;
                 Api.showPopup(message, 500);
            }
            else if (status !== 401 && status !== 302) {
                 const message = `An unexpected error occurred (${textStatus || 'Network Error'}). Please check your connection or try again.`;
                 Api.showPopup(message, 400);
            }
        }
    }).always(() => {
        --Pivot.callNum;
        Loader.stop(true);
    });
};

Pivot.export = d => Server.download({url: Utils.getFullUrlForAjax('pivot')}, {method: 'POST', data: d, fileName: 'pivotExport.xlsx'});