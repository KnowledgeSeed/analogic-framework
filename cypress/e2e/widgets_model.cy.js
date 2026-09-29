const {widgetModelChecks} = require('../support/widget-model-checks');

// Needs the framework running on localhost:5000 (see helloanalogic_base.cy.js).
// The legacy reference classes are the widgets as they were before the view model was introduced
// (support/legacy/*.legacy.js, renamed LegacyXWidget); they are loaded into the application window
// and compared with the current implementation.
const widgets = [
    {name: 'Toggle', file: 'toggle', legacyClass: 'LegacyToggleWidget'},
    {name: 'TextBox', file: 'textbox', legacyClass: 'LegacyTextBoxWidget'},
    {name: 'Button', file: 'button', legacyClass: 'LegacyButtonWidget'},
    {name: 'GridTableCell', file: 'grid-table-cell', legacyClass: 'LegacyGridTableCellWidget'},
    {name: 'Panel', file: 'panel', legacyClass: 'LegacyPanelWidget'},
    {name: 'Grid', file: 'grid', legacyClass: 'LegacyGridWidget'},
    {name: 'GridRow', file: 'grid-row', legacyClass: 'LegacyGridRowWidget'},
    {name: 'GridCell', file: 'grid-cell', legacyClass: 'LegacyGridCellWidget'},
    {name: 'Image', file: 'image', legacyClass: 'LegacyImageWidget'},
    {name: 'PasswordText', file: 'password-text', legacyClass: 'LegacyPasswordTextWidget'},
    {name: 'TextArea', file: 'textarea', legacyClass: 'LegacyTextAreaWidget'},
    {name: 'GridTableHeaderCell', file: 'grid-table-header-cell', legacyClass: 'LegacyGridTableHeaderCellWidget'},
    {name: 'DropBox', file: 'dropbox', legacyClass: 'LegacyDropBoxWidget'},
    {name: 'GridTable', file: 'grid-table', legacyClass: 'LegacyGridTableWidget'},
    {name: 'GridTableHeaderRow', file: 'grid-table-header-row', legacyClass: 'LegacyGridTableHeaderRowWidget'}
];

describe('View model widgets', () => {
    const reports = {};

    before(() => {
        cy.visit('http://localhost:5000/helloanalogic/');
        cy.get('.ks-text', {timeout: 20000}).should('exist');
        widgets.forEach(w => {
            cy.readFile(`support/legacy/${w.file}.legacy.js`).then(source => {
                // class declarations do not leak out of eval, expose the class explicitly
                cy.window().then(win => win.eval(`${source}\nwindow.${w.legacyClass} = ${w.legacyClass};`));
            });
        });
        cy.window().then(win => {
            widgets.forEach(w => {
                reports[w.name] = win.eval('(' + widgetModelChecks.toString() + ')(' + JSON.stringify(w.name) + ')');
            });
        });
    });

    widgets.forEach(w => {
        describe(w.name, () => {
            it('renders exactly what the legacy getHtml rendered (golden)', () => {
                expect(reports[w.name].error).to.equal(undefined);
                expect(reports[w.name].golden.mismatches, JSON.stringify(reports[w.name].golden.first)).to.equal(0);
            });

            it('updateHtml leaves the same DOM as a fresh render (equivalence)', () => {
                expect(reports[w.name].equivalence.mismatches, JSON.stringify(reports[w.name].equivalence.first)).to.equal(0);
            });

            it('keeps runtime classes, styles and attributes', () => {
                expect(reports[w.name].runtime.failures, JSON.stringify(reports[w.name].runtime.failures)).to.deep.equal([]);
            });

            it('passes the widget specific behavior checks', () => {
                const failed = Object.entries(reports[w.name].behavior).filter(([, ok]) => !ok).map(([label]) => label);
                expect(failed, failed.join(', ')).to.deep.equal([]);
            });
        });
    });
});
