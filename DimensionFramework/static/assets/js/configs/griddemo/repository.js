/* global app */

'use strict'
app.repository = {
    gridOuterText: {
        init: {
            execute: (ctx) => {
                return v('grid_0_4.choose.value', ctx) !== false ? {title: v('grid_0_4.choose.value', ctx)} : {title: ''};
            }
        }
    },
        grid: {
            choose: {
                type: 'PATCH',
                url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
                body: (db) => `{"Ordinal": ${db.grid.choose.ordinal},"Value": \"${db.grid.choose.value}\"}`
            },
            launch: {
                type: 'PATCH',
                url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
                body: (db) => `{"Ordinal": ${db.grid.launch.ordinal},"Value": \"${db.grid.launch.value}\"}`
            },
            slide: {
                type: 'PATCH',
                url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
                body: (db) => `{"Ordinal": ${db.grid.slide.ordinal},"Value": \"${db.grid.slide.value}\"}`
            },
            refresh_col_1: {
                execute: (ctx) => {
                    return {title: v('grid.slide.value', ctx)};
                }
            },
            init:
                {
                    execute: (db) => {
                        return [
    [
        {
            "title": "Property Prop."
        },
        {
            "title": "4 500"
        },
        {
            "value": "1",
            "ordinal": 1,
            "minRange": "-3 000",
            "maxRange": "3 000",
            "smallIncrement": "1",
            "largeIncrement": "100"
        },
        {
            "value": "0",
            "ordinal": 6
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 7
        },
        {
            "title": "4 950",
            "ordinal": 8
        },
        {
            "title": "5 247",
            "ordinal": 9
        },
        {
            "title": "5 614",
            "ordinal": 10
        },
        {
            "title": "55",
            "ordinal": 11
        },
        {
            "value": "-50",
            "ordinal": 12,
            "minRange": "-100",
            "maxRange": "100",
            "smallIncrement": "1",
            "largeIncrement": "10"
        },
        {
            "value": "1",
            "ordinal": 17
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 18
        },
        {
            "title": "56",
            "ordinal": 19
        },
        {
            "title": "7",
            "ordinal": 20
        },
        {
            "title": "-43",
            "ordinal": 21
        }
    ],
    [
        {
            "title": "Property Non-Prop."
        },
        {
            "title": "4 000"
        },
        {
            "value": "-1",
            "ordinal": 23,
            "minRange": "-3 000",
            "maxRange": "3 000",
            "smallIncrement": "1",
            "largeIncrement": "100"
        },
        {
            "value": "1",
            "ordinal": 28
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 29
        },
        {
            "title": "4 400",
            "ordinal": 30
        },
        {
            "title": "4 664",
            "ordinal": 31
        },
        {
            "title": "4 989",
            "ordinal": 32
        },
        {
            "title": "50",
            "ordinal": 33
        },
        {
            "value": "-48",
            "ordinal": 34,
            "minRange": "-100",
            "maxRange": "100",
            "smallIncrement": "1",
            "largeIncrement": "10"
        },
        {
            "value": "0",
            "ordinal": 39
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 40
        },
        {
            "title": "51",
            "ordinal": 41
        },
        {
            "title": "52",
            "ordinal": 42
        },
        {
            "title": "5",
            "ordinal": 43
        }
    ],
    [
        {
            "title": "Casualty"
        },
        {
            "title": "1 000"
        },
        {
            "value": "-81",
            "ordinal": 45,
            "minRange": "-800",
            "maxRange": "800",
            "smallIncrement": "1",
            "largeIncrement": "200"
        },
        {
            "value": "1",
            "ordinal": 50
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 51
        },
        {
            "title": "1 100",
            "ordinal": 52
        },
        {
            "title": "1 166",
            "ordinal": 53
        },
        {
            "title": "1 248",
            "ordinal": 54
        },
        {
            "title": "60",
            "ordinal": 55
        },
        {
            "value": "22",
            "ordinal": 56,
            "minRange": "-100",
            "maxRange": "100",
            "smallIncrement": "1",
            "largeIncrement": "10"
        },
        {
            "value": "0",
            "ordinal": 61
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 62
        },
        {
            "title": "61",
            "ordinal": 63
        },
        {
            "title": "62",
            "ordinal": 64
        },
        {
            "title": "86",
            "ordinal": 65
        }
    ],
    [
        {
            "title": "Speciality"
        },
        {
            "title": "2 700"
        },
        {
            "value": "-1",
            "ordinal": 67,
            "minRange": "-2 000",
            "maxRange": "2 000",
            "smallIncrement": "1",
            "largeIncrement": "100"
        },
        {
            "value": "0",
            "ordinal": 72
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 73
        },
        {
            "title": "2 970",
            "ordinal": 74
        },
        {
            "title": "3 148",
            "ordinal": 75
        },
        {
            "title": "3 369",
            "ordinal": 76
        },
        {
            "title": "62",
            "ordinal": 77
        },
        {
            "value": "-20",
            "ordinal": 78,
            "minRange": "-100",
            "maxRange": "100",
            "smallIncrement": "1",
            "largeIncrement": "10"
        },
        {
            "value": "1",
            "ordinal": 83
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 84
        },
        {
            "title": "43",
            "ordinal": 85
        },
        {
            "title": "23",
            "ordinal": 86
        },
        {
            "title": "4",
            "ordinal": 87
        }
    ],
    [
        {
            "title": "CS"
        },
        {
            "title": "800"
        },
        {
            "value": "252",
            "ordinal": 89,
            "minRange": "-500",
            "maxRange": "500",
            "smallIncrement": "1",
            "largeIncrement": "50"
        },
        {
            "value": "1",
            "ordinal": 94
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 95
        },
        {
            "title": "880",
            "ordinal": 96
        },
        {
            "title": "933",
            "ordinal": 97
        },
        {
            "title": "998",
            "ordinal": 98
        },
        {
            "title": "50",
            "ordinal": 99
        },
        {
            "value": "22",
            "ordinal": 100,
            "minRange": "-100",
            "maxRange": "100",
            "smallIncrement": "1",
            "largeIncrement": "10"
        },
        {
            "value": "0",
            "ordinal": 105
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 106
        },
        {
            "title": "51",
            "ordinal": 107
        },
        {
            "title": "52",
            "ordinal": 108
        },
        {
            "title": "53",
            "ordinal": 109
        }
    ]
];
                    }
                }
        },
    grid_t: {
        choose: {
            type: 'PATCH',
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            body: (db) => `{"Ordinal": ${db.grid.choose.ordinal},"Value": \"${db.grid.choose.value}\"}`
        },
        launch: {
            type: 'PATCH',
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            body: (db) => `{"Ordinal": ${db.grid.launch.ordinal},"Value": \"${db.grid.launch.value}\"}`
        },
        slide: {
            type: 'PATCH',
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            body: (db) => `{"Ordinal": ${db.grid.slide.ordinal},"Value": \"${db.grid.slide.value}\"}`
        },
        refresh_col_1: {
            execute: (ctx) => {
                return {title: v('grid.slide.value', ctx)};
            }
        },
        init:
            {
                url: () => `/api/v1/Cubes(\'zSYS TEMP Test Data Cube\')/Views(\'TestData\')/tm1.Execute?$expand=Cells($select=Ordinal,FormattedValue,HasPicklist,PicklistValues;$count;$expand=Members($select=Name,Attributes/Caption))`,
                body: (db) => ``,
                type: 'POST',
                parsingControl: {
                    type: 'matrix',
                    length: 22,
                    query: [
                        (r, x) => {
                            return {title: r.Cells[x].Members[1].Attributes.Caption}
                                ;
                        },
                        (r, x) => {
                            return {title: r.Cells[x].FormattedValue};
                        },
                        (r, x) => {
                            return {
                                value: r.Cells[x + 1].FormattedValue,
                                ordinal: x + 1,
                                minRange: r.Cells[x + 2].FormattedValue,
                                maxRange: r.Cells[x + 3].FormattedValue,
                                smallIncrement: r.Cells[x + 4].FormattedValue,
                                largeIncrement: r.Cells[x + 5].FormattedValue,
                            };
                        },
                        (r, x) => {
                            return {value: r.Cells[x + 6].FormattedValue, ordinal: x + 6};
                        },
                        (r, x) => {
                            return r.Cells[x + 7].HasPicklist === true ?
                                {
                                    items: r.Cells[x + 7].PicklistValues.map(t => {
                                        return {name: t, on: t === r.Cells[x + 7].FormattedValue ? true : false};
                                    }), ordinal: x + 7
                                }
                                :
                                {items: [], ordinal: x + 7};
                        },
                        (r, x) => {
                            return {title: r.Cells[x + 8].FormattedValue, ordinal: r.Cells[x + 8].Ordinal};
                        },
                        (r, x) => {
                            return {title: r.Cells[x + 9].FormattedValue, ordinal: r.Cells[x + 9].Ordinal};
                        },
                        (r, x) => {
                            return {title: r.Cells[x + 10].FormattedValue, ordinal: r.Cells[x + 10].Ordinal};
                        },
                        (r, x) => {
                            return {title: r.Cells[x + 11].FormattedValue, ordinal: r.Cells[x + 11].Ordinal};
                        },
                        (r, x) => {
                            return {
                                value: r.Cells[x + 12].FormattedValue,
                                ordinal: x + 12,
                                minRange: r.Cells[x + 13].FormattedValue,
                                maxRange: r.Cells[x + 14].FormattedValue,
                                smallIncrement: r.Cells[x + 15].FormattedValue,
                                largeIncrement: r.Cells[x + 16].FormattedValue,
                            };
                        },
                        (r, x) => {
                            return {value: r.Cells[x + 17].FormattedValue, ordinal: x + 17};
                        },
                        (r, x) => {
                            return r.Cells[x + 18].HasPicklist === true ?
                                {
                                    items: r.Cells[x + 18].PicklistValues.map(t => {
                                        return {name: t, on: t === r.Cells[x + 18].FormattedValue ? true : false};
                                    }), ordinal: x + 18
                                }
                                :
                                {items: [], ordinal: x + 18};
                        },
                        (r, x) => {
                            return {title: r.Cells[x + 19].FormattedValue, ordinal: r.Cells[x + 19].Ordinal};
                        },
                        (r, x) => {
                            return {title: r.Cells[x + 20].FormattedValue, ordinal: r.Cells[x + 20].Ordinal};
                        },
                        (r, x) => {
                            return {title: r.Cells[x + 21].FormattedValue, ordinal: r.Cells[x + 21].Ordinal};
                        }
                    ]
                }
            }

    },
        grid2: {
            choose: {
                type: 'PATCH',
                url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
                body: (db) => `{"Ordinal": ${db.grid2.choose.ordinal},"Value": \"${db.grid2.choose.value}\"}`
            },
            launch: {
                type: 'PATCH',
                url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
                body: (db) => `{"Ordinal": ${db.grid2.launch.ordinal},"Value": \"${db.grid2.launch.value}\"}`
            },
            slide: {
                type: 'PATCH',
                url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
                body: (db) => `{"Ordinal": ${db.grid2.slide.ordinal},"Value": \"${db.grid2.slide.value}\"}`
            },
            refresh_col_1: {
                execute: (ctx) => {
                    return {title: v('grid2.slide.value', ctx)};
                }
            },
            init:
                {
                    execute: (db) => {
                        return [
    [
        {
            "title": "Property Prop."
        },
        {
            "title": "4 500"
        },
        {
            "value": "1",
            "ordinal": 1,
            "minRange": "-3 000",
            "maxRange": "3 000",
            "smallIncrement": "1",
            "largeIncrement": "100"
        },
        {
            "value": "0",
            "ordinal": 6
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 7
        },
        {
            "title": "4 950"
        },
        {
            "title": "5 247"
        },
        {
            "title": "5 614"
        },
        {
            "title": "55"
        },
        {
            "value": "-50",
            "ordinal": 12,
            "minRange": "-100",
            "maxRange": "100",
            "smallIncrement": "1",
            "largeIncrement": "10"
        },
        {
            "value": "1",
            "ordinal": 17
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 18
        },
        {
            "title": "56"
        },
        {
            "title": "7"
        },
        {
            "title": "-43"
        }
    ],
    [
        {
            "title": "Property Non-Prop."
        },
        {
            "title": "4 000"
        },
        {
            "value": "-1",
            "ordinal": 23,
            "minRange": "-3 000",
            "maxRange": "3 000",
            "smallIncrement": "1",
            "largeIncrement": "100"
        },
        {
            "value": "1",
            "ordinal": 28
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 29
        },
        {
            "title": "4 400"
        },
        {
            "title": "4 664"
        },
        {
            "title": "4 989"
        },
        {
            "title": "50"
        },
        {
            "value": "-48",
            "ordinal": 34,
            "minRange": "-100",
            "maxRange": "100",
            "smallIncrement": "1",
            "largeIncrement": "10"
        },
        {
            "value": "0",
            "ordinal": 39
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 40
        },
        {
            "title": "51"
        },
        {
            "title": "52"
        },
        {
            "title": "5"
        }
    ],
    [
        {
            "title": "Casualty"
        },
        {
            "title": "1 000"
        },
        {
            "value": "-81",
            "ordinal": 45,
            "minRange": "-800",
            "maxRange": "800",
            "smallIncrement": "1",
            "largeIncrement": "200"
        },
        {
            "value": "1",
            "ordinal": 50
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 51
        },
        {
            "title": "1 100"
        },
        {
            "title": "1 166"
        },
        {
            "title": "1 248"
        },
        {
            "title": "60"
        },
        {
            "value": "22",
            "ordinal": 56,
            "minRange": "-100",
            "maxRange": "100",
            "smallIncrement": "1",
            "largeIncrement": "10"
        },
        {
            "value": "0",
            "ordinal": 61
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 62
        },
        {
            "title": "61"
        },
        {
            "title": "62"
        },
        {
            "title": "86"
        }
    ],
    [
        {
            "title": "Speciality"
        },
        {
            "title": "2 700"
        },
        {
            "value": "-1",
            "ordinal": 67,
            "minRange": "-2 000",
            "maxRange": "2 000",
            "smallIncrement": "1",
            "largeIncrement": "100"
        },
        {
            "value": "0",
            "ordinal": 72
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 73
        },
        {
            "title": "2 970"
        },
        {
            "title": "3 148"
        },
        {
            "title": "3 369"
        },
        {
            "title": "62"
        },
        {
            "value": "-20",
            "ordinal": 78,
            "minRange": "-100",
            "maxRange": "100",
            "smallIncrement": "1",
            "largeIncrement": "10"
        },
        {
            "value": "1",
            "ordinal": 83
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 84
        },
        {
            "title": "43"
        },
        {
            "title": "23"
        },
        {
            "title": "4"
        }
    ],
    [
        {
            "title": "CS"
        },
        {
            "title": "800"
        },
        {
            "value": "252",
            "ordinal": 89,
            "minRange": "-500",
            "maxRange": "500",
            "smallIncrement": "1",
            "largeIncrement": "50"
        },
        {
            "value": "1",
            "ordinal": 94
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 95
        },
        {
            "title": "880"
        },
        {
            "title": "933"
        },
        {
            "title": "998"
        },
        {
            "title": "50"
        },
        {
            "value": "22",
            "ordinal": 100,
            "minRange": "-100",
            "maxRange": "100",
            "smallIncrement": "1",
            "largeIncrement": "10"
        },
        {
            "value": "0",
            "ordinal": 105
        },
        {
            "items": [
                {
                    "name": "2019",
                    "on": false
                },
                {
                    "name": "2021",
                    "on": false
                },
                {
                    "name": "2022",
                    "on": false
                },
                {
                    "name": "2023",
                    "on": false
                }
            ],
            "ordinal": 106
        },
        {
            "title": "51"
        },
        {
            "title": "52"
        },
        {
            "title": "53"
        }
    ]
];
                    }
                }
        },
    grid2_t: {
        choose: {
            type: 'PATCH',
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            body: (db) => `{"Ordinal": ${db.grid2.choose.ordinal},"Value": \"${db.grid2.choose.value}\"}`
        },
        launch: {
            type: 'PATCH',
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            body: (db) => `{"Ordinal": ${db.grid2.launch.ordinal},"Value": \"${db.grid2.launch.value}\"}`
        },
        slide: {
            type: 'PATCH',
            url: (db) => `/api/v1/Cellsets('${db.cellsetId}')/Cells`,
            body: (db) => `{"Ordinal": ${db.grid2.slide.ordinal},"Value": \"${db.grid2.slide.value}\"}`
        },
        refresh_col_1: {
            execute: (ctx) => {
                return {title: v('grid2.slide.value', ctx)};
            }
        },
        init:
            {
                url: () => `/api/v1/Cubes(\'zSYS TEMP Test Data Cube\')/Views(\'TestData\')/tm1.Execute?$expand=Cells($select=Ordinal,FormattedValue,HasPicklist,PicklistValues;$count;$expand=Members($select=Name,Attributes/Caption))`,
                body: (db) => ``,
                type: 'POST',
                parsingControl: {
                    type: 'matrix',
                    length: 22,
                    query: [
                        (r, x) => {
                            return {title: r.Cells[x].Members[1].Attributes.Caption}
                                ;
                        },
                        (r, x) => {
                            return {title: r.Cells[x].FormattedValue};
                        },
                        (r, x) => {
                            return {
                                value: r.Cells[x + 1].FormattedValue,
                                ordinal: x + 1,
                                minRange: r.Cells[x + 2].FormattedValue,
                                maxRange: r.Cells[x + 3].FormattedValue,
                                smallIncrement: r.Cells[x + 4].FormattedValue,
                                largeIncrement: r.Cells[x + 5].FormattedValue,
                            };
                        },
                        (r, x) => {
                            return {value: r.Cells[x + 6].FormattedValue, ordinal: x + 6};
                        },
                        (r, x) => {
                            return r.Cells[x + 7].HasPicklist === true ?
                                {
                                    items: r.Cells[x + 7].PicklistValues.map(t => {
                                        return {name: t, on: t === r.Cells[x + 7].FormattedValue ? true : false};
                                    }), ordinal: x + 7
                                }
                                :
                                {items: [], ordinal: x + 7};
                        },
                        (r, x) => {
                            return {title: r.Cells[x + 8].FormattedValue};
                        },
                        (r, x) => {
                            return {title: r.Cells[x + 9].FormattedValue};
                        },
                        (r, x) => {
                            return {title: r.Cells[x + 10].FormattedValue};
                        },
                        (r, x) => {
                            return {title: r.Cells[x + 11].FormattedValue};
                        },
                        (r, x) => {
                            return {
                                value: r.Cells[x + 12].FormattedValue,
                                ordinal: x + 12,
                                minRange: r.Cells[x + 13].FormattedValue,
                                maxRange: r.Cells[x + 14].FormattedValue,
                                smallIncrement: r.Cells[x + 15].FormattedValue,
                                largeIncrement: r.Cells[x + 16].FormattedValue,
                            };
                        },
                        (r, x) => {
                            return {value: r.Cells[x + 17].FormattedValue, ordinal: x + 17};
                        },
                        (r, x) => {
                            return r.Cells[x + 18].HasPicklist === true ?
                                {
                                    items: r.Cells[x + 18].PicklistValues.map(t => {
                                        return {name: t, on: t === r.Cells[x + 18].FormattedValue ? true : false};
                                    }), ordinal: x + 18
                                }
                                :
                                {items: [], ordinal: x + 18};
                        },
                        (r, x) => {
                            return {title: r.Cells[x + 19].FormattedValue};
                        },
                        (r, x) => {
                            return {title: r.Cells[x + 20].FormattedValue};
                        },
                        (r, x) => {
                            return {title: r.Cells[x + 21].FormattedValue};
                        }
                    ]
                }
            }

    }
};