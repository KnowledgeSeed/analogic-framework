/* global app, Utils*/

'use strict';

app.repository = {
    haysKamForecastingDepartmentPopUpGridTable:
        {
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => {
                        return `{"MDX":"
                        SELECT 
                           {[}ElementAttributes_Organization Units].[}ElementAttributes_Organization Units].[Department]} 
                          ON COLUMNS , 
                          NON EMPTY 
                           {[Organization Units].[Organization Units].Members} 
                          ON ROWS 
                        FROM [}ElementAttributes_Organization Units] 


                                    "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 1,
                        query: [
                            (r, x) => {
                                return {
                                    label: r.Cells[x].FormattedValue
                                }
                            }


                        ]
                    }
                },
        },

    haysKamForecastingBusinessPopUpGridTable:
        {
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => {
                        return `{"MDX":"
                        SELECT 
                           {[}ElementAttributes_Organization Units].[}ElementAttributes_Organization Units].[Department]} 
                          ON COLUMNS , 
                          NON EMPTY 
                           {[Organization Units].[Organization Units].Members} 
                          ON ROWS 
                        FROM [}ElementAttributes_Organization Units] 


                                    "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 1,
                        query: [
                            (r, x) => {
                                return {
                                    label: r.Cells[x].FormattedValue
                                }
                            }


                        ]
                    }
                },
        },

    haysKamForecastingAreaPopUpGridTable:
        {
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => {
                        return `{"MDX":"
                        SELECT 
                           {[}ElementAttributes_Organization Units].[}ElementAttributes_Organization Units].[Department]} 
                          ON COLUMNS , 
                          NON EMPTY 
                           {[Organization Units].[Organization Units].Members} 
                          ON ROWS 
                        FROM [}ElementAttributes_Organization Units] 


                                    "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 1,
                        query: [
                            (r, x) => {
                                return {
                                    label: r.Cells[x].FormattedValue
                                }
                            }


                        ]
                    }
                },
        },

    haysKamForecastingTeamPopUpGridTable:
        {
            init:
                {
                    url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption))`,
                    type: 'POST',
                    body: (db) => {
                        return `{"MDX":"
                        SELECT 
                           {[}ElementAttributes_Organization Units].[}ElementAttributes_Organization Units].[Department]} 
                          ON COLUMNS , 
                          NON EMPTY 
                           {[Organization Units].[Organization Units].Members} 
                          ON ROWS 
                        FROM [}ElementAttributes_Organization Units] 


                                    "}`;

                    },
                    parsingControl: {
                        type: 'matrix',
                        length: 1,
                        query: [
                            (r, x) => {
                                return {
                                    label: r.Cells[x].FormattedValue
                                }
                            }


                        ]
                    }
                },
        },
};