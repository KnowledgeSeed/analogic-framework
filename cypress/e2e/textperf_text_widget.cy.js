// Functional checks of the TextWidget event handling and markup, on the apps/textperf test application.
// The checks themselves live in the application (static/assets/js/configs/self-test.js), so they can
// also be run by hand from the browser console: await TextPerf.selfTest()
describe('Text widget', () => {
    const runSelfTest = (compact) => {
        cy.viewport(1920, 1080)
            .visit('http://localhost:5000/textperf/', {
                onBeforeLoad(win) {
                    win.localStorage.setItem('textperfRows', '6');
                    win.localStorage.setItem('textperfCols', '8');
                    win.localStorage.setItem('textperfCompact', compact ? '1' : '0');
                }
            });

        cy.get('#textperfGrid_5_7 .ks-text-title').should('exist');

        cy.window().then({timeout: 30000}, win => new Cypress.Promise((resolve, reject) => {
            const script = win.document.createElement('script');
            script.src = win.app.applicationAssetsUrl + '/js/configs/self-test.js';
            script.onload = () => win.TextPerf.selfTest().then(resolve, reject);
            script.onerror = reject;
            win.document.head.appendChild(script);
        })).then(result => {
            expect(result.compact).to.equal(compact);
            expect(result.failed, JSON.stringify(result.failed)).to.have.length(0);
            expect(result.passed).to.be.greaterThan(50);
        });
    };

    it('default markup', () => runSelfTest(false));

    it('compact markup', () => runSelfTest(true));
});
