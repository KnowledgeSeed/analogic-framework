class TM1SpreadManager {
    constructor() {
        this.config = {
            'Proportional Spread': { code: 'P', requiresValue1: true, requiresValue2: false, requiresDirection: true },
            'Equal Spread': { code: 'S', requiresValue1: true, requiresValue2: false, requiresDirection: true },
            'Repeat': { code: 'R', requiresValue1: true, requiresValue2: false, requiresDirection: true },
            'Percent Change': { code: 'P%', requiresValue1: true, requiresValue2: false, requiresDirection: true },
            'Straight Line': { code: 'SL', requiresValue1: true, requiresValue2: true, requiresDirection: true },
            'Growth %': { code: 'GR', requiresValue1: true, requiresValue2: true, requiresDirection: true },
            'Clear': { code: 'C', requiresValue1: false, requiresValue2: false, requiresDirection: true },
            'Relative Proportional Spread': { code: 'RP', requiresValue1: true, requiresValue2: false, requiresDirection: false, requiresReference: true },
            'Relative Percent Adjustment': { code: 'R%', requiresValue1: true, requiresValue2: false, requiresDirection: false, requiresReference: true },
            'Repeat Leaves': { code: 'LR', requiresValue1: true, requiresValue2: false, requiresDirection: false },
            'Equal Spread Leaves': { code: 'LS', requiresValue1: true, requiresValue2: false, requiresDirection: false },
            'Leaf Hold': { code: 'H', requiresValue1: false, requiresValue2: false, requiresDirection: true },
            'Release Leaf Hold': { code: 'RH', requiresValue1: false, requiresValue2: false, requiresDirection: true },
            'Consolidation Hold': { code: 'HC', requiresValue1: false, requiresValue2: false, requiresDirection: true },
            'Release Consolidation Hold': { code: 'RC', requiresValue1: false, requiresValue2: false, requiresDirection: true }
        };

        this.reset();
    }

    reset() {
        this.state = {
            selectedMethodName: null,
            action: null,
            directions: {
                up: false,
                down: false,
                left: false,
                right: false
            },
            value1: null,
            value2: null,
            referencePayload: {}
        };
        console.log("TM1SpreadManager state has been reset.");
    }

    selectMethod(methodName) {
        this.reset();
        this.state.selectedMethodName = methodName;
        console.log(`Spreading method selected: ${methodName}`);
    }

    setAction(actionType) {
        this.state.action = this.state.action === actionType ? null : actionType;
        console.log(`Action set to: ${this.state.action}`);
    }

    toggleDirection(directionKey) {
        if (this.state.directions.hasOwnProperty(directionKey)) {
            this.state.directions[directionKey] = !this.state.directions[directionKey];
            console.log(`Direction '${directionKey}' toggled to: ${this.state.directions[directionKey]}`);
        }
    }

    getValue1() {
        return v('analogicSystemDataSpreadOptionsPopupPanel2TextboxPanel1Textbox.value');
    }

    getValue2() {
        return v('analogicSystemDataSpreadOptionsPopupPanel2TextboxPanel2Textbox.value');
    }

    generateApiPayload() {
        if (!this.state.selectedMethodName) {
            alert('Error: No spreading method selected.');
            return null;
        }

        const config = this.config[this.state.selectedMethodName];
        if (!config) {
            alert(`Error: Unknown method: ${this.state.selectedMethodName}`);
            return null;
        }

        let command = config.code;

        if (this.state.action === 'add') {
            command += '+';
        } else if (this.state.action === 'subtract') {
            command += '~';
        }

        if (config.requiresDirection) {
            let directionStr = '';
            if (this.state.directions.up) directionStr += '^';
            if (this.state.directions.down) directionStr += '|';
            if (this.state.directions.left) directionStr += '<';
            if (this.state.directions.right) directionStr += '>';
            command += directionStr;
        }

        const value1 = this.getValue1();
        const value2 = this.getValue2();

        if (config.requiresValue1) {
            if (value1 === null || value1 === '') {
                alert('Error: Value 1 is required.');
                return null;
            }
            command += String(value1).replace(',', '.');
        }
        if (config.requiresValue2) {
            if (value2 === null || value2 === '') {
                alert('Error: Value 2 is required.');
                return null;
            }
            command += ':' + String(value2).replace(',', '.');
        }

        console.log('Generated command string:', command);

        const payload = {
            Value: command,
            ...this.state.referencePayload
        };

        return payload;
    }
}