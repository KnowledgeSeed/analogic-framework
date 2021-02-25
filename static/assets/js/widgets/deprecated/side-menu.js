/* global Widget */

'use strict';
class SideMenuWidget extends Widget {

    getHtml(widgets, data) {
        const o = this.options;
        let stateful = o.stateful && o.stateful === true;
        if (stateful && typeof this.value.selected === 'undefined') {
            this.value = {selected: ''};
        }

        return `<div class="side-menu">
			<a href="#"><span class="icon-back-to-top"></span>Back to Top</a>
                        ${widgets.join('')}
			<!--a class="side-menu-tooltips">
				<div class="widget-checkbox sidemenu on">
					<span class="icon-checkbox-off"></span>
					<span class="icon-checkbox-on"></span>
				</div>
				Tooltips
			</a-->
		</div>`;
    }

    initEventHandlers(section) {
        Widget.handleSystemEvent(section, 'click', '.side-menu-button-action');
        const o = this.options;
        let stateful = o.stateful && o.stateful === true;
        if (stateful) {
            $('.side-menu-button-action').on('click', e => {
               this.value.selected = $(e.currentTarget).data('id'); 
            });
            $('.side-menu-button-action').removeClass('active');
            this.value.selected === '' ? $($('.side-menu-button-action')[0]).addClass('active') : $('[data-id="' + this.value.selected + '"]').addClass('active');
        } else {
            $('.side-menu-button-action').on('click', e => {
                $('.side-menu-button-action').removeClass('active');
                $(e.currentTarget).addClass('active');
            });

            $('.widget-checkbox.sidemenu').on('click', e => {
                $(e.currentTarget).toggleClass('on');
            });
        }
    }

}
;