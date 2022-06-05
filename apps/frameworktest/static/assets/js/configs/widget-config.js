/* global app */
'use strict';
app.widgetConfig = {
      frameworktestMain: {
          id: 'frameworktestMain',
          type: PageWidget,
          widgets: [
              {
                  id: 'frameworktestMainGrid',
                  type: GridWidget,
                  marginLeft: '10',
                  marginRight: '10',
                  width: '100%',
                  widgets: [
                      {
                          id: 'frameworktestMainRow1',
                          type: GridRowWidget,
                          marginTop: '1.3%',
                          marginBottom: '0%',
                          width: '100%',
                          height: '10%',
                          skin: 'bottomborder',
                          widgets: [
                              {
                                  id: 'frameworktestMainRow1Cell1',
                                  type: GridCellWidget,
                                  marginLeft: '10',
                                  marginTop: '0',
                                  marginBottom: '0',
                                  alignment: 'center-left',
                                  width: '10%',
                                  widgets: [
                                      {
                                          id: 'frameworktestMainRow1Cell1Logo',
                                          type: ButtonWidget,
                                          icon: 'icon-hays',
                                          iconColor: '#092E74',
                                          iconFontSize: 25,
                                          marginLeft: '30%',
                                          width: 100,
                                          height: 30
                                      }
                                  ]
                              },
                          ]
                      },
                       {
                        id: 'frameworktestMainRow3',
                        type: GridRowWidget,
                        marginTop: '0.75%',
                        marginBottom: '0%',
                        width: '100%',
                        widgets: [
                            {
                                id: 'frameworktestMainRow3Cell1',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginRight: '0',
                                marginTop: '0',
                                alignment: 'top-right',
                                width: '17%',
                                skin: '',
                                height: '18%',
                                widgets: []
                            },
                            {
                                id: 'frameworktestMainRow3Cell2',
                                type: GridCellWidget,
                                marginLeft: '5',
                                marginRight: '0',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '12%',
                                height: '18%',
                                widgets: [
                                    {
                                        id: 'frameworktestMainRow3Cell2Button',
                                        type: ButtonWidget,
                                        label: '',
                                        action: '',
                                        width: '145',
                                        icon: 'icon-table',
                                        fontColor: 'white',
                                        height: '145'
                                    }
                                ]
                            },
                            {
                                id: 'frameworktestMainRow3Cell3',
                                type: GridCellWidget,
                                marginLeft: '10',
                                marginRight: '0',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '12%',
                                height: '18%',
                                widgets: [
                                    {
                                        id: 'frameworktestMainRow3Cell5Button',
                                        type: ButtonWidget,
                                        label: 'test',
                                        action: '',
                                        width: '145',
                                        title: 'test',
                                        icon: 'icon-table',
                                        fontSize: 12,
                                        fontColor: '#000',
                                        height: '145'
                                    }
                                ]
                            },
                            {
                                id: 'frameworktestMainRow3Cell4',
                                type: GridCellWidget,
                                marginLeft: '5',
                                marginRight: '0',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '12%',
                                height: '18%',
                                widgets: [
                                    {
                                        id: 'frameworktestMainRow3Cell4Button',
                                        type: ButtonWidget,
                                        label: '',
                                        action: '',
                                        width: '145',
                                        icon: 'icon-table',
                                        fontColor: 'white',
                                        height: '145'
                                    }
                                ]
                            },
                            {
                                id: 'frameworktestMainRow3Cell5',
                                type: GridCellWidget,
                                marginLeft: '5',
                                marginRight: '0',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '12%',
                                height: '18%',
                                 widgets: [
                                    {
                                        id: 'frameworktestMainRow3Cell5Button',
                                        type: ButtonWidget,
                                        label: '',
                                        action: '',
                                        width: '145',
                                        icon: 'icon-table',
                                        fontColor: 'white',
                                        height: '145'
                                    }
                                ]
                            },
                            {
                                id: 'frameworktestMainRow3Cell6',
                                type: GridCellWidget,
                                marginLeft: '5',
                                marginRight: '0',
                                marginTop: '1%',
                                alignment: 'top-center',
                                width: '12%',
                                height: '18%',
                                widgets: [
                                    {
                                        id: 'frameworktestMainRow3Cell6Button',
                                        type: ButtonWidget,
                                        label: '',
                                        action: '',
                                        width: '145',
                                        icon: 'icon-table',
                                        fontColor: 'white',
                                        height: '145'
                                    }
                                ]
                            },
                            {
                                id: 'frameworktestMainRow3Cell7',
                                type: GridCellWidget,
                                marginLeft: '5',
                                marginRight: '0',
                                marginTop: '0',
                                alignment: 'top-right',
                                width: '23%',
                                skin: '',
                                height: '18%',
                                widgets: []
                            }
                        ]
                    },
                  ]
              }
          ]
      }



}
;