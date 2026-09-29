// forceRefresh keeps the current content on screen while the data is loading and swaps the new
// content in one step. Needs the framework running on localhost:5000 (see helloanalogic_base.cy.js).
describe('forceRefresh render-then-swap', () => {
    let report;

    before(() => {
        cy.visit('http://localhost:5000/helloanalogic/');
        cy.get('.ks-text', {timeout: 20000}).should('exist');
        cy.window().then(win => {
            win.Api.openPage('gridTableLightDemo');
        });
        cy.get('#gridTableLightDemoTable .ks-grid-table-light_body', {timeout: 20000}).should('exist');
        cy.window().then(win => win.eval('(' + (async () => {
            const id = 'gridTableLightDemoTable', w = Widgets[id], out = {};
            const origLoad = QB.loadData;
            QB.loadData = (...a) => new Promise(r => setTimeout(r, 800)).then(() => origLoad(...a));
            const holder = () => document.getElementById(id);
            const run = async (fn) => {
                const log = [], t0 = performance.now();
                const mo = new MutationObserver(() => log.push(holder().querySelectorAll('*').length));
                mo.observe(holder(), {childList: true, subtree: true});
                holder().querySelector('.ks-grid-table-light_body').scrollTop = 60;
                await fn();
                await new Promise(r => setTimeout(r, 300));
                mo.disconnect();
                return {emptyStateObserved: log.some(n => n < 5), scrollTopAfter: holder().querySelector('.ks-grid-table-light_body').scrollTop};
            };
            try {
                out.oldPath = await run(() => w.reRenderWidgetEmptyFirst(false, false));
                out.newPath = await run(() => Api.forceRefreshWithoutLoader(id));
            } finally {
                QB.loadData = origLoad;
            }
            const text = Object.values(Widgets).find(x => x && x.constructor && x.constructor.name === 'TextWidget' && document.getElementById(x.options.id));
            const htmlBefore = document.getElementById(text.options.id).innerHTML, origRender = text.render.bind(text);
            text.render = () => Promise.reject(new Error('forced render failure'));
            try { await text.reRenderWidget(false, false); out.failureRejected = false; } catch (e) { out.failureRejected = true; }
            text.render = origRender;
            out.failure = {oldContentKept: document.getElementById(text.options.id).innerHTML === htmlBefore, isRendering: text.isRendering};
            out.pageOldPath = Object.values(Widgets).filter(x => x && x.constructor && x.constructor.name === 'PageWidget').every(p => p.keepsContentWhileRefreshing() === false);
            return out;
        }).toString() + ')()').then(r => { report = r; }));
    });

    it('the widget is blank while loading on the old path (control)', () => {
        expect(report.oldPath.emptyStateObserved).to.equal(true);
        expect(report.oldPath.scrollTopAfter).to.equal(0);
    });

    it('the widget is never blank and keeps its scroll position on the new path', () => {
        expect(report.newPath.emptyStateObserved).to.equal(false);
        expect(report.newPath.scrollTopAfter).to.equal(60);
    });

    it('keeps the old content and resets the state when the render fails', () => {
        expect(report.failureRejected).to.equal(true);
        expect(report.failure.oldContentKept).to.equal(true);
        expect(report.failure.isRendering).to.equal(false);
    });

    it('the page keeps the empty-first path', () => {
        expect(report.pageOldPath).to.equal(true);
    });
});
