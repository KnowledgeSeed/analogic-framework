/* global app, Widget */

'use strict';

class SideBarWidget extends Widget {

    getHtml() {
        return '<div class="sidebar-holder tooltip-holder"><span class="icon-add"><\/span><div id="sideBarContent"><\/div><\/div>';
    }

    initEventHandlers(section) {
        app.el.sideBar = $('#' + app.SideBar);

        app.el.sideBar.close = () => {
            app.el.sideBar.hide();
        };

        app.el.sideBar.open = (classNames) => {
            sideBarHolder.removeClass().addClass('sidebar-holder ' + (classNames || ''));

            app.el.sideBar.show();
        };

        app.el.sideBar.on(app.prop.clickEvent, '.icon-add', app.el.sideBar.close);

        app.el.sideBarContent = $('#sideBarContent');

        const sideBarHolder = app.el.sideBarContent.parent();
    }
}
;