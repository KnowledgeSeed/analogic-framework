'use strict';

class ContextMenu {
    constructor() {
        this.activeMenu = null;
        this.closeEventNamespace = 'contextMenuClose';
        this.closeEvents = `mousedown.${this.closeEventNamespace} keydown.${this.closeEventNamespace}`;
    }

    getDefaultTemplate() {
        return `
            <div class="ks-context-menu">
                <ul class="ks-context-menu-list"></ul>
            </div>
        `;
    }

    show(anchor, items = [], autoPosition = true) {
        this.close();

        const $body = $('body');
        const $menu = $(this.getDefaultTemplate());

        // Töltse fel a menüpontokat
        const $list = $menu.find('.ks-context-menu-list');
        items.forEach(item => {
            const $li = $('<li>').addClass('ks-context-menu-item').text(item.label);

            if (typeof item.action === 'function') {
                $li.on('click', e => {
                    e.preventDefault();
                    item.action(item);
                    this.close();
                });
            }

            $list.append($li);
        });

        $body.append($menu);
        this.activeMenu = $menu;
        Utils.setAutoPosition($menu, anchor);

        // // Pozicionálás
        // if (autoPosition && anchor instanceof jQuery) {
        //     const offset = anchor.offset();
        //     $menu.css({
        //         position: 'absolute',
        //         top: offset.top + anchor.outerHeight(),
        //         left: offset.left
        //     });
        // }

        setTimeout(() => {
            $(document).on(this.closeEvents, e => {
                const isKeydown = e.type === 'keydown';
                const $target = $(e.target);

                if ((isKeydown && e.which === 27) || !this.activeMenu.has($target).length) {
                    this.close();
                }
            });
        }, 0);

        return $menu;
    }

    close() {
        if (this.activeMenu) {
            this.activeMenu.remove();
            this.activeMenu = null;
            $(document).off(this.closeEvents);
        }
    }

    isActive() {
        return this.activeMenu && this.activeMenu.is(':visible');
    }
}
