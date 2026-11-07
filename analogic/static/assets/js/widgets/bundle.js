/* global app, Widget */

'use strict';

/**
 * Runs an installed client bundle (apps/<app>/bundles/<name>/) inside a widget page.
 *
 *     {id: 'salesCockpit', type: BundleWidget, bundle: 'sales', height: '640px', props: {region: 'France'}}
 *
 * The bundle gets the same context as on its own page (analogic-client.js createContext), fetched from
 * bundle_session/<name> (user, permissions, csrf token, allowlisted data sources), plus:
 *   ctx.props          the widget's props (or a repository result's "props" when the widget has a loader),
 *   ctx.widget.id      this widget's id,
 *   ctx.widget.emit(value)   fires the widget's "changed" event (event map: changed.<id>, value in
 *                            Widgets[id].changed.value), so other widgets can react.
 * The data rules do not change: every request carries X-Analogic-Bundle and is checked against the manifest.
 * The bundle's mount(element, ctx) may return an unmount function; it runs when the widget is rendered again or the
 * page is left.
 */
class BundleWidget extends Widget {

    static mounted = {};

    getHtml(widgets, d) {
        const o = this.options, v = this.getParameters(d), s = this.getGeneralStyles(d);

        // A bundle draws whatever it wants: with a fixed height it scrolls inside the widget instead of covering
        // the widgets below it.
        s.push('overflow:auto;');

        this.bundleProps = v.props;

        return `<div class="ks-bundle" data-action="changed" data-id="${o.id}" style="${s.join('')}">
                    <div class="ks-bundle-root" data-bundle="${BundleWidget.escape(v.bundle)}"></div>
                </div>`;
    }

    getParameters(d) {
        return {
            bundle: this.getRealValue('bundle', d, ''),
            props: this.getRealValue('props', d, {})
        };
    }

    updateHtml(data) {
        const v = this.getParameters(data);
        this.bundleProps = v.props;
        this.start();
    }

    initEventHandlers() {
        this.start();
    }

    static escape(value) {
        return String(value || '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
    }

    static sdkUrl() {
        return app.sdkUrl || app.assetsUrl.replace(/\/assets$/, '/sdk');
    }

    static async unmount(id) {
        const previous = BundleWidget.mounted[id];
        delete BundleWidget.mounted[id];
        if (previous && typeof previous.unmount === 'function') {
            try {
                await previous.unmount();
            } catch (e) {
                console.error('Bundle widget "' + id + '" unmount failed:', e);
            }
        }
    }

    static addStyles(boot) {
        for (const style of boot.styles || []) {
            const href = boot.bundleUrl + style;
            if (!document.querySelector(`link[data-analogic-bundle-style="${CSS.escape(href)}"]`)) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                link.dataset.analogicBundleStyle = href;
                document.head.appendChild(link);
            }
        }
    }

    async start() {
        const o = this.options, id = o.id, root = this.getSection().find('.ks-bundle-root').get(0);
        if (!root) {
            return;
        }
        const name = root.dataset.bundle;
        await BundleWidget.unmount(id);
        root.textContent = '';
        root.removeAttribute('data-error');
        if (!/^[a-z0-9][a-z0-9_-]{0,63}$/i.test(name)) {
            this.fail(root, new Error('Invalid or missing bundle name.'));
            return;
        }
        const token = {};
        BundleWidget.mounted[id] = token;
        try {
            const response = await fetch(app.applicationBaseUrl + '/bundle_session/' + encodeURIComponent(name),
                {credentials: 'same-origin', headers: {'Accept': 'application/json'}});
            if (!response.ok) {
                throw new Error('bundle_session returned ' + response.status);
            }
            const boot = await response.json();
            BundleWidget.addStyles(boot);
            const sdk = await import(BundleWidget.sdkUrl() + '/analogic-client.js');
            const module = await import(boot.bundleUrl + boot.entry);
            const mount = module.mount || (module.default && module.default.mount) || module.default;
            if (typeof mount !== 'function') {
                throw new Error('The entry module exports no mount(element, ctx).');
            }
            if (BundleWidget.mounted[id] !== token) {
                return; // rendered again while loading
            }
            const instance = this;
            const ctx = sdk.createContext(boot, {
                props: this.bundleProps,
                widget: {
                    id,
                    emit(value) {
                        // Like the other widgets: the event map sees Widgets[id].changed.value (changed.<id>).
                        const element = instance.getSection().find('.ks-bundle');
                        instance.value = value;
                        element.data('value', value);
                        Widget.doHandleSystemEvent(element, {type: 'changed'});
                    }
                }
            });
            const unmount = await mount(root, ctx);
            if (BundleWidget.mounted[id] === token) {
                token.unmount = unmount;
            } else if (typeof unmount === 'function') {
                unmount();
            }
        } catch (error) {
            if (BundleWidget.mounted[id] === token) {
                delete BundleWidget.mounted[id];
            }
            this.fail(root, error);
        }
    }

    fail(root, error) {
        console.error('Bundle widget "' + this.options.id + '" failed to start:', error);
        root.textContent = 'This content could not be started.';
        root.setAttribute('data-error', 'true');
    }
}

window.addEventListener('pagehide', () => {
    for (const id of Object.keys(BundleWidget.mounted)) {
        BundleWidget.unmount(id);
    }
});
