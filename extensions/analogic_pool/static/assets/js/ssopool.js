/* global app, Extensions */

'use strict';

Extensions.push(
    {
        handle401() {
            if (('SSOPool' === app.authenticationMode || 'SSOBasicPool' === app.authenticationMode) && app.handled401 === false) {
                app.handled401 = true;
                $.cookie("authenticated", 0);
                window.location.href = app.url.authenticationBridge;
            }
        },
        handleSuccessLogin() {
            if ('SSOPool' === app.authenticationMode || 'SSOBasicPool' === app.authenticationMode) {
                app.handled401 = false;
            }
        }
    }
);