/* global app, El, Listeners, Loader, QB, PageState, WidgetConfig */

class Render {

    static showPage(page, withState = false) {
        let widget = Widgets[page], s = PageState;
        s.previous = s.current;
        s.current = page;
        s[s.previous] = El.body.clone();

        return widget.renderWidget(withState).then(() => Utils.checkScreenResolution());
    }

}