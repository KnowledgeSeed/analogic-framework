/* global app, Extensions, Auth, WidgetValue */

'use strict';

class SSOPoolAuthenticationProviderExtension extends AuthenticationProviderExtension {

    handle401() {
        if (('SSOPool' === app.authenticationMode || 'SSOBasicPool' === app.authenticationMode) && app.handled401 === false) {
            app.handled401 = true;
            $.cookie("authenticated", 0);
            window.location.href = app.url.authenticationBridge;
        }
    }

    handleSuccessLogin() {
        if ('SSOPool' === app.authenticationMode || 'SSOBasicPool' === app.authenticationMode) {
            app.handled401 = false;
        }
    }

    getUserData() {
        if (['SSOBasicPool', 'SSOPool', 'LoginBasicPool', 'LoginPool'].includes(app.authenticationMode)
            && !app.usePoolUserAsActiveUser) {
            return Auth.getTm1AjaxRequest(app.tm1ApiHost.replace('proxy', 'activeUser'), {}, 'GET').pipe(data => {
                WidgetValue.activeUser = data.username;
            });
        }
        return false;
    }
}

Extensions.authenticationProviders.push(
    new SSOPoolAuthenticationProviderExtension()
);