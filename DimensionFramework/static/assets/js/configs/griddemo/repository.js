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