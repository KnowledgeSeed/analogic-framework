const {textModelChecks} = require('../support/text-model-checks');

// Needs the framework running on localhost:5000 (see helloanalogic_base.cy.js).
describe('TextWidget view model', () => {
    let report;

    before(() => {
        cy.visit('http://localhost:5000/helloanalogic/');
        cy.get('.ks-text', {timeout: 20000}).should('exist');
        cy.window().then(win => {
            report = win.eval('(' + textModelChecks.toString() + ')()');
        });
    });

    it('renders exactly what the original getHtml rendered (golden)', () => {
        expect(report.error).to.equal(undefined);
        expect(report.golden.mismatches, JSON.stringify(report.golden.first)).to.equal(0);
    });

    it('updateHtml leaves the same DOM as a fresh render (equivalence)', () => {
        expect(report.equivalence.mismatches, JSON.stringify(report.equivalence.first)).to.equal(0);
    });

    it('keeps runtime classes, styles and attributes while following the data', () => {
        expect(report.runtime.failures, report.runtime.failures.join(', ')).to.deep.equal([]);
    });

    it('does not replace an editor that is in use', () => {
        expect(report.editing.editorKept).to.equal(true);
    });

    it('jQuery data() reads the new values after an update', () => {
        expect(report.dataCache.after).to.equal(8);
        expect(report.dataCache.editableAfter).to.equal(0);
    });

    it('subclasses that override getHtml keep the previous update path', () => {
        expect(report.subclass.error).to.equal(null);
        expect(report.subclass.usesLegacyPath).to.equal(true);
    });
});
