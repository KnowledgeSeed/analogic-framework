/* global app, El, Widget */

'use strict';

class SideBarWidget extends Widget {

    getHtml() {
        return '<div class="sidebar-holder tooltip-holder"><span class="icon-add"><\/span><div id="sideBarContent"><\/div><\/div>';
    }

    initEventHandlers() {
        El.sideBar = $('#' + app.SideBar);

        El.sideBar.close = () => El.sideBar.hide();

        El.sideBar.open = classNames => {
            sideBarHolder.removeClass().addClass('sidebar-holder ' + (classNames || ''));

            El.sideBar.show();
        };

        El.sideBar.on(app.clickEvent, '.icon-add', El.sideBar.close);

        El.sideBarContent = $('#sideBarContent');

        const sideBarHolder = El.sideBarContent.parent();
    }
}
;