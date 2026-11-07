// Starts the bundle of a bundle page (templates/bundle.html): reads the boot data the server rendered, creates the
// client context and calls the bundle's mount(element, ctx).
import {createContext} from './analogic-client.js';

const boot = JSON.parse(document.getElementById('analogic-bundle-boot').textContent);
const element = document.getElementById('analogic-bundle-root');

function fail(error) {
    console.error('Bundle ' + boot.bundle + ' failed to start:', error);
    element.textContent = 'This page could not be started.';
    element.setAttribute('data-error', 'true');
}

try {
    const ctx = createContext(boot);
    const module = await import(boot.bundleUrl + boot.entry);
    const mount = module.mount || (module.default && module.default.mount) || module.default;
    if (typeof mount !== 'function') {
        throw new Error('The entry module exports no mount(element, ctx).');
    }
    const unmount = await mount(element, ctx);
    window.addEventListener('pagehide', () => {
        if (typeof unmount === 'function') {
            unmount();
        }
    });
} catch (error) {
    fail(error);
}
