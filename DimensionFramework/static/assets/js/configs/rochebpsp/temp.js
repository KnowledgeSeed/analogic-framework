/* global app */
'use strict';
app.repository = {
    rocheBPSPProductsGridTableYearly: {
        initCondition: (db) => {
            return v('rocheBPSPProductsColumnSelectorPopupDropBox') !== false;
        },
        initDefault: (db) => {
            return [];
        },
        state:
            (db) => {
                let dpxVal = v('rocheBPSPProductsColumnSelectorPopupDropBox.value') ? v('rocheBPSPProductsColumnSelectorPopupDropBox.value').split(',') : [];
                return [
                    [
                        {label: 'Division Diagnostics', skin: 'gridtable_hierarchy_bpsp_L01'},
                        {title: '123456789012', editable: false},
                        {title: '1', editable: false},
                        {
                            title: '140.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '140.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '140.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '140.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '140.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '10.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '150.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'ODG Diagnostics', skin: 'gridtable_hierarchy_bpsp_L02'},
                        {title: '123456789012', editable: false},
                        {title: '2', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'Centralised & PoC Solutions', skin: 'gridtable_hierarchy_bpsp_L02'},
                        {title: '123456789012', editable: false},
                        {title: '2a', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'CENTRALISED SOLUTIONS', skin: 'gridtable_hierarchy_bpsp_L03'},
                        {title: '123456789012', editable: false},
                        {title: '3', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'LAB SOLUTIONS', skin: 'gridtable_hierarchy_bpsp_L03'},
                        {title: '123456789012', editable: false},
                        {title: '3a', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'CLINICAL CHEMISTRY', skin: 'gridtable_hierarchy_bpsp_L04'},
                        {title: '123456789012', editable: false},
                        {title: '4', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'CC REAGENTS', skin: 'gridtable_hierarchy_bpsp_L05'},
                        {title: '123456789012', editable: false},
                        {title: '5', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'CC Dat Reagents', skin: 'gridtable_hierarchy_bpsp_L06'},
                        {title: '123456789012', editable: false},
                        {title: '6', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'CC TDM Reagents', skin: 'gridtable_hierarchy_bpsp_L06'},
                        {title: '123456789012', editable: false},
                        {title: '6', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'CC HbA1c Reagents', skin: 'gridtable_hierarchy_bpsp_L06'},
                        {title: '123456789012', editable: false},
                        {title: '6', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ],
                    [
                        {label: 'CC Specific Protein Reagents', skin: 'gridtable_hierarchy_bpsp_L06'},
                        {title: '123456789012', editable: false},
                        {title: '6', editable: false},
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2019 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2020 Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 YTD Actuals'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000', editable: false, cellVisible: dpxVal.includes('2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '70.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Customer Plan Total'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '5.000.000',
                            editable: false,
                            cellVisible: dpxVal.includes('2021 Marketing Adjustment'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '75.000.000', editable: false, cellVisible: dpxVal.includes('2021 Total Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '', editable: false, cellVisible: dpxVal.includes('2021 Final  Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2020 Actual / 2021 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {
                            title: '11,4 %',
                            editable: false,
                            cellVisible: dpxVal.includes('Growth rate:  2021 Actual / 2022 Plan'),
                            cellSkin: 'readonly_bpsp'
                        },
                        {title: 'com', editable: false},
                        {title: 'rep', editable: false}
                    ]
                ];
            }
    },
};