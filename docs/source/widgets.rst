Widgets and widget parameters
================================


The function of widget-config.js
---------------------------------

- describes the parameters of widget types
- defines which widget is connected to TM1 backend
- every widget can be modified by changing parameters in widget-config
   during deployment time
- every widget parameter could be override during a user session in
   data-repository pressing control, this allow dynamic widget
   parameterization depend on data query results
- the config file is case-sensitive
- listen is a valid parameter in all widget types, structure of listen:
   [{event, method, (parameter)}…]

Methods
--------

- refresh
- refreshWithWaitingForEvent: waits for specified event in parameter
- parameter is valid only for method refreshWithWaitingForEvent
- updateContent: updates only the data, not refresh the HTML code

Common Parameters
-----------------

- marginTop\ **:** pixel count or percent of padding position
- marginRight\ **:** pixel count or percent of padding position
- marginBottom\ **:** pixel count or percent of padding position
- marginLeft\ **:** pixel count or percent of padding position
- paddingTop\ **:** pixel count or percent of padding position
- paddingRight\ **:** pixel count or percent of padding position
- paddingBottom\ **:** pixel count or percent of padding position
- paddingLeft\ **:** pixel count or percent of padding position
- width
- height
- visible


ActionButtonRowWidget
---------------------

Overview
~~~~~~~~

``ActionButtonRowWidget`` is a sub-widget for
``HorizontalTableWidget`` rows that renders an action button at the end
of the row.

Configuration
~~~~~~~~~~~~~

- ``id`` (**required**): unique widget identifier used by the framework.
- ``type`` (**required**): must be ``ActionButtonRowWidget``.
- ``action``: action to execute when the button is pressed.
- ``icon``: icon displayed on the action button.
- ``align``: alignment inside the row (``left`` or ``right``).
- ``position``: order of the action button within the horizontal table.

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: NO

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- When the parent ``HorizontalTableWidget`` loads data from TM1 and the
  row button triggers actions, the queries run as part of the parent
  table request.
- ``active`` and ``choose`` queries use only ``url``, ``body`` and
  ``type`` properties; ``parsingControl`` is ignored.

ButtonWidget
------------

Overview
~~~~~~~~

``ButtonWidget`` renders an interactive button that can trigger actions,
open URLs or start repository processes. Labels and icons are both
supported.

Configuration
~~~~~~~~~~~~~

- ``backgroundColor``: button background colour.
- ``borderColor``: border colour.
- ``borderWidth``: border thickness.
- ``cornerRadius``: corner radius.
- ``contextMenuEnabled``: enables the context menu.
- ``dividerWidth``: divider width within button groups.
- ``effect``: visual effect applied on click.
- ``enabled``: ``true`` when the button is clickable.
- ``fontBold``: renders the label in bold when ``true``.
- ``fontColor``: label colour.
- ``fontSize``: label font size.
- ``gradient``: gradient configuration for the background.
- ``icon``: icon identifier.
- ``iconColor``: icon colour.
- ``iconFontSize``: icon font size.
- ``iconHeight``: explicit icon height.
- ``iconPosition``: icon placement (``left`` or ``right``).
- ``iconWidth``: explicit icon width.
- ``isInfo``: enables informational styling.
- ``label``: button label text.
- ``paste``: paste action configuration.
- ``skin``: CSS skin applied to the widget.
- ``url``: external URL to open when clicked.
- ``visible``: ``true`` to render the button.

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: NO

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- Optional ``launch`` queries can call TM1 processes or other services.
- Only the ``url``, ``body`` and ``type`` fields are used; the
  repository ignores ``parsingControl``.

Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

   // widget-config.js
   {
       id: 'hrdemoGroupsRow1Cell1Button',
       type: ButtonWidget,
       icon: 'icon-menu',
       marginTop: '8px',
       iconFontSize: '20',
       iconColor: '#007AFF'
   }

   // repository.js
   {
       hrdemoGroupsRow1Cell1Button: {
           launch() {
               Api.openPage('hrdemoMain');
           }
       }
   }





ComboChartWidget
------------------

Overview
~~~~~~~~

A chart widget that allows to combine the features of a
bar chart and a line chart.



Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

   {
        type:string,
        label:string,
        borderColor:string,
        backgroundColor:string,
        pointRadius:int,
        borderWidth:int,
        fill:boolean,
        stack:int
   }

Configuration
~~~~~~~~~~~~~

- ``data``:
- ``datasets``:
- ``paddingTop``:
- ``paddingRight``:
- ``padding Bottom``:
- ``PaddingLeft``:
- ``tooltipsEnabled``: true or false, parameters of dataset are shown on mouse hover
- ``tooltipsMode``: mode of hover tooltip menu
- ``legendGroupByStack``: makes group from dataset legends
- ``skin``: Selected skin of widget
- ``plot``: true or false, not just y, but x values are also given (not just categories, like years, types, etc.)
- ``id``: widget id which used for reference in framework
- ``xAxesLabel``: label of X axes
- ``xAxesDisplay``: true or false,, default true, display the x axes
- ``xAxesGridLinesDisplay``: true or false, display the x axes grid lines
- ``xAxesGridLinesDrawBorder``: true or false, display the x axes grid lines drow border
- ``xAxesGridLinesDrawOnChartArea``: true or false, display the x axes grid lines draw on chart are
- ``xAxesGridLinesDrawTicks``: true or false, display the x axes grid lines draw ticks
- ``xAxesGridLinesColor``: color of the x axes grid lines
- ``xAxesTicksFontSize``: size of the x axes ticks
- ``xAxesTicksFontFamily``: string, default 'imago, sans-serif'
- ``xAxesTicksFontStyle``: string, default 'bold'
- ``xAxesTicksFontColor``: color of the x axes ticks
- ``xAxesTicksPadding``: padding between X axes ticks
- ``xAxesTicksOffset``:
- ``xAxesLabelDisplay``: true or false, display the x axes label
- ``xAxesLabelFontSize``: size of the x axes label
- ``xAxesLabelFontFamily``: font family of the x axes label
- ``xAxesLabelFontColor``: color of the a axes label
- ``xAxesLabelFontStyle``: style of the x axes label
- ``xAxesLabelPadding``: padding between X axes label
- ``xAxesLabelRotation``: vertical, horizontal
- ``xAxesStacked``: stack datasets on X axes
- ``xAxesTicksBegintAtZero``: true or false, begin the x axes at zero
- ``xAxesOffsetGridLines``: if true, grid lines will be shifted to be between labels
- ``xAxesZeroLineColor``: color of the X axes zero line
- ``leftYAxesDisplay``: true or false, display the left y axes
- ``leftYAxesBorderDash``: length and spacing of dashes on grid lines
- ``leftYAxesStacked``: stack datasets on Y axes
- ``leftYAxesMin``: minimum of the left y axes
- ``leftYAxesMax``: max of the left y axes
- ``leftYAxesStepSize``: step size of the left y axes
- ``leftYAxesZeroLineColor``: color of the left Y axes zero line
- ``leftYAxesGridLinesDisplay``: true or false, display the left y axes grid lines
- ``leftYAxesGridLinesDrawBorder``: first grid line is visible, even if others are not
- ``leftYAxesGridLinesColor``: color of the left y axes grid lines
- ``leftYAxesGridLinesDrawOnChartArea``: true or false, display the y axes grid lines draw on chart are
- ``leftYAxesGridLinesDrawTicks``: true or false, display the left y axes grid line ticks
- ``leftYAxesLabel``: label of the left y axes
- ``leftYAxesLabelConcat``: str to add to the left Y axes ticks
- ``leftYAxesLabelFontSize``: font size of the left y axes label
- ``leftYAxesLabelFontFamily``: font family of the left y axes label
- ``leftYAxesLabelFontColor``: font color of the left y axes label
- ``leftYAxesLabelFontStyle``: font style of the left y axes label
- ``leftYAxesLabelPadding``: padding between Y axes label
- ``leftYAxesLabelRotation``: vertical, horizontal
- ``leftYAxesTicksBegintAtZero``: true or false, begin the left y axes with zero
- ``leftYAxesTicksFontSize``: font size of the left y axes ticks
- ``leftYAxesTicksFontFamily``: font family of the left y axes ticks
- ``leftYAxesTicksFontStyle``: font style of the left y axes ticks
- ``leftYAxesTicksFontColor``: font color of the left y axes ticks
- ``leftYAxesTicksPadding``: padding between Y axes ticks
- ``leftYAxesTicksDisplay``: true or false, display the left y axes ticks
- ``leftYAxesTicksOffset``: offset (distance) between ticks of left Y axes
- ``leftYAxesLabelSeparatesThousands``: Separates the Y Axes
- ``rightYAxesBorderDash``: length and spacing of dashes on grid lines
- ``rightYAxesTicksBegintAtZero``: begin at zero the right y axes ticks
- ``rightYAxesTicksPadding``: padding between Y axes ticks
- ``rightYAxesTicksDisplay``: true or false, display the right y axes ticks
- ``rightYAxesGridLinesDisplay``: true or false display the right y axes grid lines
- ``rightYAxesLabel``: label of the right y axes label
- ``rightYAxesLabelDisplay``: true or false, display the right y axes label
- ``rightYAxesLabelFontColor``: color of the right y axes label
- ``rightYAxesLabelFontFamily``: font family of the right y axes label
- ``rightYAxesLabelFontSize``: size of the right y axes label
- ``rightYAxesLabelFontStyle``: style of the right y axes label
- ``rightYAxesLabelPadding``: padding between Y axes label
- ``rightYAxesLabelRotation``: vertical, horizontal
- ``rightYAxesStacked``: stack datasets on Y axes
- ``rightYAxesDisplay``: true or false, display the right y axes display
- ``rightYAxesGridLinesColor``: color of the right y axes grid lines
- ``rightYAxesGridLinesDrawBorder``: border of the right y axes grid lines
- ``rightYAxesTicksFontColor``: color of the right y axes ticks
- ``rightYAxesTicksFontFamily``: font family of the right y axes ticks
- ``rightYAxesTicksFontSize``: size of the right y axes ticks
- ``rightYAxesTicksFontStyle``: style of the right y axes ticks
- ``rightYAxesTicksOffset``: offset (distance) between ticks of right Y axes
- ``canvasHeight``: height of the canvas
- ``canvasWidth``: width of the canvas
- ``draggable``: true or false, if chart is draggable and moveable
- ``responsive``: true or false, chart size depends on screen size
- ``aspectRatio``:
- ``maintainAspectRatio``: true or false, width depends on height
- ``bezierCurve``: true or false, display the bezier curve
- ``showLinearXAxes``: true or false, display the linear x axes
- ``customLabelsForYAxes``: Labels For Y Axes like %
- ``tooltipsSeparatesThousands``: Separates the the tooltips

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: YES

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- 2 init queries:

1. query for X-axis labels Structure: {value:, label:}

**parsingControl type:** list

2. query for data Structure: {value:}

**parsingControl type:** matrix


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

   {
    Widgetconfig:

    {
            id: 'hrdemoReportChart1',
            type: ComboChartWidget,
            width: '800',
            height: '400',
            title: '',
            datasets: [{
                "type": "line",
                "backgroundColor": "rgba(52,199,89,0.4)",
                "borderColor": "#34C759",
                "borderWidth": 1,
                "pointRadius": 0,
                "stack": 1,
                legendBackgroundColor: "#34C759",
                "dataLabelFontColor": "#fff",
                "dataLabelVisible": false,
                "fill": true,
                dataLabelBorderRadius: 5,
                "legendLabel": "Base"
            },
                {
                    "type": "line",
                    "backgroundColor": "rgba(0,122,255,0.4)",
                    "borderColor": "#007AFF",
                    "borderWidth": 2,
                    "pointRadius": 0,
                    legendBackgroundColor: "#007AFF",
                    "stack": 2,
                    dataLabelBorderRadius: 5,
                    "dataLabelFontColor": "#fff",
                    "dataLabelVisible": false,
                    "fill": true,
                    "legendLabel": "Budget"
                }],
            tooltipsEnabled: true,
            marginBottom: '50',
            skin: 'combochartFTE',
            legendGroupByStack: true,
            bezierCurve: false,
            xAxesGridLinesDisplay: true,
            xAxesGridLinesDrawBorder: true,
            xAxesTicksFontSize: 14,
            xAxesTicksFontFamily: 'SFCompactDisplay, sans-serif',
            xAxesTicksFontColor: '#333333',
            xAxesTicksBegintAtZero: false,
            xAxesTicksPadding: 10,
            xAxesLabelFontSize: 12,
            xAxesLabelFontFamily: 'imago, sans-serif',
            xAxesLabelFontColor: '#747b85',
            xAxesZeroLineColor: '#dee1e5',
            leftYAxesDisplay: true,
            leftYAxesStacked: false,
            leftYAxesZeroLineColor: '#dee1e5',
            leftYAxesGridLinesDisplay: true,
            leftYAxesGridLinesDrawBorder: true,
            leftYAxesGridLinesColor: '#dee1e5',
            leftYAxesGridLinesDrawOnChartArea: true,
            leftYAxesGridLinesDrawTicks: true,
            leftYAxesLabelFontSize: 12,
            leftYAxesLabelFontFamily: 'imago, sans-serif',
            leftYAxesLabelFontColor: '#747b85',
            leftYAxesLabelFontStyle: 'normal',
            leftYAxesLabelPadding: 10,
            leftYAxesTicksFontSize: 21,
            leftYAxesTicksPadding: 20,
            leftYAxesTicksFontStyle: 'normal',
            leftYAxesTicksFontFamily: 'SFCompactDisplay, sans-serif',
            leftYAxesTicksFontColor: '#333333',
            leftYAxesTicksDisplay: true,
            rightYAxesLabelFontSize: 12,
        }

    // repository.js
     init: [
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoReportChart1_init_1',
                        year: v('hrdemoReportRow1Cell3SegmentedControl').selected === '2024' ? '2024' : '2023'
                    };
                },
                parsingControl: {
                    type: 'list',
                    query:
                        (r, x) => {
                            return {
                                value: (r.Cells[x].Members[4].Name).slice(4, 6),
                                label: (r.Cells[x].Members[4].Name).slice(4, 6)
                            };
                        }
                }
            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoReportChart1_init_2',
                        year: v('hrdemoReportRow1Cell3SegmentedControl').selected === '2024' ? '2024' : '2023'
                    };
                },
                parsingControl: {
                    type: 'matrix',
                    length: 2,
                    query: [
                        (r, x) => {
                            return {value: parseInt(r.Cells[x].FormattedValue)};
                        },
                        (r, x) => {
                            return {value: parseInt(r.Cells[x + 1].FormattedValue)};
                        }
                    ]
                }
            }
        ]
   }

ContainerWidget
----------------

Overview
~~~~~~~~

A logical widget that allows the creation of
multi-layered applications. A ContainerWidget provides the same
functionality as a page widget (contains other widgets) but on top of
the main application UI layer. The widget does not necessarily covers
the whole available screen: it can be in a small area (for example a
popup)



Configuration
~~~~~~~~~~~~~

- ``id``: widget id which used for reference in framework
- ``anchor``: anchor to link the container
- ``widthStr``:
- ``heightStr``: height of widget (in % or px)
- ``offset``: size of the offset
- ``bgColor``: background color of the widget
- ``anchorVisible``: if anchor visible (flag)
- ``anchorOnClick``: toggle backdrop (flag)
- ``visible``: if widget visible (flag)
- ``bgScrollable``: scrollability of the background (flag)
- ``closeBtn``: if widget has a close button(flag)
- ``fixed``: if widget fixed (flag)
- ``position``: position of the widget
- ``skin``: skin of the widget
- ``backdrop``: boolean if display backdrop, default false
- ``closeOnClickBackdrop``: boolean, default true
- ``heightFixed``: boolean, default true
- ``positionAndCalculateBestSpace``: string (right, left)
- ``fadingSpeed``: int, default 300

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: NO


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
         {
                id: 'hrdemoSimulationVersionSelectorPopUp',
                type: ContainerWidget,
                anchorVisible: false,
                anchorOnClick: true,
                backdrop: true,
                visible: false,
                closeBtn: false,
                width: '285px',
                heightFixed: false,
                bgScrollable: true,
                fixed: true,
                behaviour: 'popup',
                positionAndCalculateBestSpace: 'bottom',
                skin: 'version_popup4',
                fadingSpeed: 0,
                widgets: [
                    {
                        id: 'hrdemoSimulationVersionSelectorPopUpDropbox',
                        type: DropBoxWidget,
                        skin: 'version_dropbox',
                        multiSelect: false,
                        hideIfNoData: false,
                        selectFirst: true,
                    }
                ]
            },
   }

   }

DatePickerWidget
------------------

Overview
~~~~~~~~

This widget allows users to select a date



Configuration
~~~~~~~~~~~~~

- ``allowEmptyDate``: Allows selecting no date (empty value)
- ``closeAfterSelectingTheDate``: Closes the calendar popup after a date is selected
- ``datePicked``: Initially selected date in the widget (format: yyyy.mm.dd or yyyy.mm)
- ``editable``: Determines if the input field is editable manually
- ``fullYearButtonText``: Label of the full year selection button
- ``fullYearButtonVisible``: Whether the full year button is visible
- ``local``: Locale used for formatting the displayed date
- ``maxDate``: Maximum selectable date
- ``minDate``: Minimum selectable date
- ``monthLocale``: Locale used for displaying month names (e.g. 'en-US')
- ``monthPicker``: Enables month-only selection mode (year + month, no days)
- ``ordinal``: Unique string to distinguish pick actions (used internally)
- ``panelFixed``: Prevents the calendar popup from closing automatically
- ``skin``: Selected skin of the widget (affects visual appearance)
- ``title``: Title text displayed above the date field
- ``titleVisible``: Determines if the title should be shown


TM1 integration
~~~~~~~~~~~~~~~

- Data connection: OPTIONAL

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- state query or init query, if no min and max date defined, used query
   is init then:

   -  **parsingControl type:** object

      -  datePicked
      -  minDate
      -  maxDate

- pick query:

   -  optional query, that will be fired every time, once a date is
      selected


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
          id: 'hrdemoSimulationHireOrganisationPopUpGridRow4DatePicker',
          type: DatePickerWidget,
          width: '319px',
          skin: 'headcount_popup_datepicker',
          icon: 'icon-calendar',
          label: '',
          panelFixed: true,
          multiSelect: false,
          hideIfNoData: false,
          selectFirst: true,
   }

    // repository.js


     hrdemoAddDummyPopupGridRow5Cell2DatePicker: {
        pick() {
            Api.updateWidgetsContent(['hrdemoAddDummyPopupGridRow9Cell2Text', 'hrdemoAddDummyPopupGridRow11Cell2Text', 'hrdemoAddDummyPopupGridRow10Cell2TextBox']);
        }
    },

   }


DeleteButtonRowWidget
---------------------

Overview
~~~~~~~~

A sub-widget built specifically for the
HorizontalTableWidget. It provides delete row functionality at the end
of the rows.

Configuration
~~~~~~~~~~~~~

- ``id``: widget id which used for reference in framework
- ``type``: type of widget
- ``action``: executed action. currently choose only (only action is delete)
- ``deleteMessage``: 'Are you sure to clear all data of this product?'
- ``align``: left or right side of horizontal table
- ``position``: position of widget in horizontal table

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: *NO*

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- state or init query if HorizontalTableWidget data feed from TM1 and
   any action defined in widget-config:

   -  the query is part of its parent Horizontal table query

- choose query:
- only url, body and type settings are used, parsingControl settings is
   not available


DropBoxWidget
-------------

Overview
~~~~~~~~

This widget is used to select one single or multiple
items at a time from a given list of items.



Configuration
~~~~~~~~~~~~~

- ``backdrop``: boolean, default false, whether the backdrop is displayed
- ``editable``: boolean, default true
- ``itemIconOff``: string, icon
- ``itemIconOn``: string, icon
- ``disableSearch``: disable search function
- ``panelWidth``: Width of the panel
- ``placeHolder``:
- ``selectFirst``: boolean, default false, if there is no selected item the first displayed as selected
- ``serverSideFilter``:
- ``titleFontSize``: font size of the title
- ``titleFontColor``: font color of the title
- ``textFontSize``: font size of the text
- ``textFontColor``: font color of the text
- ``titleTextAlignment``: alignment of the title
- ``textAlignment``: alignment of the text
- ``title``: title of the drop-down
- ``titleVisible``: if widget title visible (flag)
- ``multiselect``: simple or multiple options can be selected (flag)
- ``hideIfNoData``: hide widget if no data inside (flag)
- ``skin``: skin of the widget

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: OPTIONAL

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- state query or init query. If no items used query is init then:

   -  **parsingControl type:** list or object (in case of
      PicklistValues)

      -  name
      -  on

- choose query:

   -  optional query, that will be fired every time, once an element is
      selected or deselected


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // repository.js

   {
          hrdemoSimulationCompensationChangePopUpGridRow6Cell2DropBox: {
        choose() {
            Utils.setWidgetValue('compChangePosition', v('hrdemoAddDummyPopupGridRow6Cell2DropBox').value);
            Utils.setWidgetValue('systemValueNewBonusValue', '0');
            Api.updateWidgetsContent(['hrdemoSimulationCompensationChangePopUpGridRow9Cell2Text', 'hrdemoSimulationCompensationChangePopUpGridRow11Cell2Text', 'hrdemoSimulationCompensationChangePopUpGridRow10Cell2TextBox']);
        },
        init() {
            return new RestRequest(this.restRequest)
        },
        restRequest:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoAddDummyPopupGridRow6Cell2DropBox_init'
                    };
                },
                parsingControl: {
                    type: 'list',
                    query:
                        (r, x) => {
                            let selected = v('compChangePosition');
                            return {
                                name: r.Cells[x].FormattedValue,
                                on: r.Cells[x].FormattedValue === selected
                            };
                        }
                }
            }
    },
   }

GaugeWidget
-----------

Overview
~~~~~~~~

A gauge chart primary used in executive dashboard
reports to show KPI-s.



Configuration
~~~~~~~~~~~~~

- ``canvasId``:
- ``title``: Widget title text
- ``colors``: color of the widget
- ``skin``: Selected skin of widget
- ``values``: The values on the chart
- ``valueLabels``:
- ``labels``: the labels on the chart
- ``minRange``: the minimum value on the chart
- ``maxRange``: the maximum value on the chart
- ``showAxisValues``: It's a boolean, default true
- ``separatesThousands``: It's separates the values
- ``fontFamily``: font family of the chart

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: YES

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- **1 init query:**

   -  **query for data Structure: {values: [x, y, z], labels:,
      minRange:, maxRange:}**
   -  **parsingControl type: matrix**
       


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
           id: 'hrdemoSimulationRow3CellGauge',
           type: GaugeWidget,
           width: '200',
           showAxisValues: true,
           colors: ["#007AFF", "#858686"],
           fontFamily: 'imago, sans-serif',
           skin: 'simulation_gauge',
           separatesThousands: true
   }

    // repository.js


      hrdemoSimulationCompensationChangePopUpGridRow6Cell2DropBox: {
        choose() {
            Utils.setWidgetValue('compChangePosition', v('hrdemoAddDummyPopupGridRow6Cell2DropBox').value);
            Utils.setWidgetValue('systemValueNewBonusValue', '0');
            Api.updateWidgetsContent(['hrdemoSimulationCompensationChangePopUpGridRow9Cell2Text', 'hrdemoSimulationCompensationChangePopUpGridRow11Cell2Text', 'hrdemoSimulationCompensationChangePopUpGridRow10Cell2TextBox']);
        },
        init() {
            return new RestRequest(this.restRequest)
        },
        restRequest:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoAddDummyPopupGridRow6Cell2DropBox_init'
                    };
                },
                parsingControl: {
                    type: 'list',
                    query:
                        (r, x) => {
                            let selected = v('compChangePosition');
                            return {
                                name: r.Cells[x].FormattedValue,
                                on: r.Cells[x].FormattedValue === selected
                            };
                        }
                }
            }
    },

GridCellWidget
----------------

Overview
~~~~~~~~

Logical widget type representing one cell of a
GridRowWidget



Configuration
~~~~~~~~~~~~~

- ``id``: widget id which used for reference in framework
- ``type``: type of widget
- ``marginLeft``: left margin
- ``marginRight``: right margin
- ``marginTop``: top margin
- ``marginBottom``: bottom margin
- ``width``: width of the widget (in % or px)
- ``height``: height of the widget
- ``visible``: if widget visible (flag)
- ``skin``: skin of the widget
- ``alignment``: alignment of the widget (dropbox)
- ``listen``: {event, method} events for the widget listen to and method to do

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: NO


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
        id: 'hrdemoSimulationRow3Cell2',
        type: GridCellWidget,
        alignment: 'center-left',
        width: '65%',
        widgets: []
   }




GridRowWidget
-------------

Overview
~~~~~~~~

Logical widget type representing one row of a
GridWidget



Configuration
~~~~~~~~~~~~~

- ``id``: Widget Id which used for reference in framework
- ``type``: Type of Widget
- ``visible``: Toggle visibility of panel content
- ``width``: width of the widget
- ``height``: height of widget
- ``marginLeft``: pixel count of margin position
- ``marginRight``: pixel count of margin position
- ``marginTop``: pixel count of margin position
- ``marginBottom``: pixel count of margin position
- ``alignment``: left, center or right side
- ``listen``: {event, method} events for the widget listen to and method to do
- ``skin``: Selected skin of widget
- ``widgets``: [{id: 'tab1name',label: 'text',action: 'text',selected: true},…

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: NO
~~~~~~~~~~~~~~~

- Data connection: NO


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
           id: 'hrdemoSimulationRow4',
           type: GridRowWidget,
           width: '100%',
           height: '70px',
           widgets: []
   }




GridTableCellWidget
----------------------

Overview
~~~~~~~~

Logical widget type representing one cell of a
GridTableWidget. Main purpose: contain one widget from the
followingtypes text, textbox, dropBox, slider, toggle, datepicker  



Configuration
~~~~~~~~~~~~~

- ``borderLeft``:
- ``borderRight``:
- ``cellBackgroundColor``
- ``cellVisible``:
- ``cellSkin``:
- ``cellWidth``:
- ``cellPaddingRight``:
- ``cellPaddingLeft``:
- ``paddingRight``
- ``paddingLeft``
- ``skin``: skin of the widget
- ``alignment``: string, default center-center alignment of the contained widget (dropbox)
     - ``top-left``
     - ``center-left``
     - ``bottom-left``
     - ``top-center``
     - ``center-center``
     - ``bottom-center``
     - ``top-right``
     - ``center-right``
     - ``bottom-right``
     - ``top-space-between``
     - ``center-space-between``
     - ``bottom-space-between``
- ``borderLeft``: if widget has a left border (flag)
- ``borderRight``: if widget has a right border (flag)
- ``width``

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: NO



Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
           id: 'hrdemoSimulationCell4',
           type: GridTableCellWidget,
           width: '100%',
           height: '70px',
           widgets: []
   }



GridTableHeaderCellWidget
-------------------------

Overview
~~~~~~~~

Logical widget type representing one cell of a
GridTableHeaderRowWidget.



Configuration
~~~~~~~~~~~~~

- ``cellHeaderSkin``:
- ``cellVisible``:
- ``alignment``: alignment of the widget

   - ``top-left``
   - ``center-left``
   - ``bottom-left``
   - ``top-center``
   - ``center-center``
   - ``bottom-center``
   - ``top-right``
   - ``center-right``
   - ``bottom-right``
   - ``top-space-between``
   - ``center-space-between``
   - ``bottom-space-between``

- ``borderLeft``: true or false, toggle the left border visibility of the table
- ``borderRight``: true or false, toggle the right border visibility of the table
- ``width``:

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: 1


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
           id: 'hrdemoSimulationHeaderCell4',
           type: GridTableHeaderCellWidget,
           width: '100%',
           height: '70px',
           widgets: []
   }


GridTableHeaderRowWidget
------------------------

Overview
~~~~~~~~

A technical sub-widget built specifically for the
GridTableWidget. It provides the ability to make and customize a header
for a GridTable. Main purpose: group together
GridTableHeaderCellWidgets.



Configuration
~~~~~~~~~~~~~

- ``alignment``: alignment of the widget (dropbox)
- ``borderBottom``: if widget has a bottom border (flag)
- ``borderTop``: if widget has a top border (flag)
- ``height``:

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: NO



Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
           id: 'hrdemoSimulationHeaderRow4',
           type: GridTableHeaderRowWidget,
           width: '100%',
           height: '70px',
           widgets: []
   }


GridTableLightWidget
--------------------

Overview
~~~~~~~~

``GridTableLightWidget`` is the lightweight successor of
``GridTableWidget``. Instead of creating individual child widgets per
cell it renders the entire table directly from the data returned by the
repository. This dramatically simplifies widget configuration while the
runtime still supports:

- sticky/frozen headers and columns,
- copy-to-clipboard support that respects the user's current selection,
- paging with context aware requests,
- Excel export (full dataset or current page),
- the familiar event map for ``launch``, ``change`` and ``text_change``
  events.

The widget is ideal for large datasets, grids generated from TM1 MDX
responses, or any scenario where the classic grid widgets caused
configuration bloat. The `helloanalogic` demo application showcases three
flavours of the widget (interactive, compact card-style and plain text)
so the examples below reference those assets for consistency.

Typical use cases
~~~~~~~~~~~~~~~~~

- **Planning dashboards:** render multi-thousand row TM1 cubes without
  pre-creating child widgets and still offer inline editing for text
  fields or combo boxes.
- **Operations consoles:** blend button, select and custom HTML cells to
  trigger repository logic (launching detail pages, reassigning owners,
  etc.).
- **Read-only reports:** emit a simple ``columns`` + matrix ``content``
  payload to display an existing table with frozen columns.

Widget configuration
~~~~~~~~~~~~~~~~~~~~

Only a handful of parameters are defined in ``widget-config.js`` because
almost every behaviour is described by the repository payload:

- ``id`` (**required**): unique identifier used by events and the
  repository.
- ``type`` (**required**): always ``GridTableLightWidget``.
- ``skin`` (optional): CSS skin applied to the widget container.
- ``pageSize`` (optional): default page size override when the
  repository honours paging metadata.

Example from ``apps/helloanalogic/static/assets/js/configs/widget-config.js``:


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

   {
       id: 'gridTableLightDemoTable',
       type: GridTableLightWidget,
       skin: 'gridTableLightDemo'
   }

   {
       id: 'gridTableLightCompactTable',
       type: GridTableLightWidget,
       skin: 'gridTableLightCompact'
   }

   {
       id: 'gridTableLightTextTable',
       type: GridTableLightWidget,
       skin: 'gridTableLightText'
   }

   // Commented examples demonstrating server driven paging
   // {
   //     id: 'gridTableLightServerTable',
   //     type: GridTableLightWidget,
   //     skin: 'gridTableLightDemo'
   // },
   // {
   //     id: 'gridTableLightServerTable2',
   //     type: GridTableLightWidget,
   //     skin: 'gridTableLightDemo',
   //     pageSize: 20
   // }

Repository contract
~~~~~~~~~~~~~~~~~~~

The repository (``apps/helloanalogic/static/assets/js/configs/repository.js``)
drives almost everything:

- ``init`` must return an object with ``columns`` and ``content``. The
  ``columns`` array describes column keys, titles and optional sizing or
  alignment. ``content`` is a list of rows; each row can either be a
  shorthand array of raw values (text only) or an object with ``cells``
  describing individual cell types.
- Optional metadata extends behaviour without updating the widget
  config: ``totalCount``, ``page``, ``pageSize``,
  ``allowCopyToClipBoard``, ``freezeHeader``, ``freezeFirstColumns``,
  ``enableExport`` or ``exportConfig``.
- Styling hooks accept strings, plain objects or arrays at multiple
  levels (root container, table, rows, cells, rendered element).
- Event handlers ``launch``, ``change`` and ``text_change`` receive the
  familiar grid context (``ctx.getRow()``, ``ctx.getColumn()``,
  ``ctx.getCell()``) so repository logic can coordinate updates across
  widgets.

The ``gridTableLightDemoTable`` repository entry demonstrates interactive
cells, paging, export and styling:


GpuTableWidget
--------------

Overview
~~~~~~~~

``GpuTableWidget`` is a WebGPU-powered table surface inspired by
``GridTableLightWidget``. Instead of composing DOM nodes for every cell it
uses GPU pipelines to paint a dense grid directly into a canvas, which
keeps rendering costs predictable even with many rows or columns. A
lightweight fallback message is shown automatically when WebGPU is not
available in the user's browser.

Widget configuration
~~~~~~~~~~~~~~~~~~~~

- ``id`` (**required**): unique identifier that links the widget to
  repository events and event map actions.
- ``type`` (**required**): ``GpuTableWidget``.
- ``width`` (optional): container width, defaults to ``100%``.
- ``height`` (optional): container height, defaults to ``320px``.
- ``skin`` (optional): CSS skin name; ``default`` and ``contrast`` are
  built-in.
- ``columns`` (optional): column descriptors with ``field`` keys used to
  locate values in row objects.
- ``rows`` (optional): array of row objects or value arrays to render.

Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

   {
       id: 'gpuTableDemo',
       type: GpuTableWidget,
       width: '100%',
       height: '360px',
       skin: 'contrast',
       columns: [
           {field: 'name'},
           {field: 'value'},
           {field: 'delta'}
       ],
       rows: [
           {name: 'Alpha', value: 0.1, delta: 0.3},
           {name: 'Beta', value: 0.6, delta: 0.4},
           {name: 'Gamma', value: 0.9, delta: 0.8}
       ]
   }

Notes
~~~~~

- Cells are colourised on the GPU based on numeric values or hashed
  string content for quick visual clustering.
- The widget auto-resizes with its container and will re-render whenever
  the repository updates the column or row payload.

Repository example
~~~~~~~~~~~~~~~~~~

``GpuTableWidget`` can consume the same MDX responses as
``GridTableLightWidget`` without paging metadata. The repository entry
below requests a wide slice of the dataset, converts the MDX response
with ``Utils.transformMdxResponseToGridTableLight`` and maps the result
into ``columns``/``rows`` pairs expected by the GPU renderer:

.. code-block:: javascript

   gpuTableServerTable: {
       init(ctx) {
           return new RestRequest(this.request);
       },
       request: {
           url: (widgets, ctx) => {
               const baseUrl = '/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Editable))';
               const result = Utils.buildMdxQueryUrl(baseUrl, {
                   includeCount: false,
                   columnCount: 24,
                   defaultRowCount: 2500,
                   metadataKey: '__gpuTableServerTable',
                   returnMetadata: true
               }, ctx);

               return result && result.url ? result.url : baseUrl;
           },
           type: 'POST',
           server: true,
           body: () => ({key: 'safariAssetRegister2_mdx'}),
           parsingControl: {
               type: 'script',
               script: (data) => {
                   const transformed = Utils.transformMdxResponseToGridTableLight(data);
                   if (!transformed.columns.length && !transformed.content.length) {
                       return {columns: [], rows: []};
                   }

                   const columns = transformed.columns.map((column, index) => ({
                       field: column.key || `col${index + 1}`,
                       title: column.title || column.key || `Column ${index + 1}`
                   }));

                   const rows = transformed.content.map((row) => {
                       const rowObject = {};
                       const cells = Array.isArray(row && row.cells) ? row.cells : [];

                       for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
                           const columnDefinition = columns[columnIndex];
                           const cell = cells[columnIndex] || {};
                           rowObject[columnDefinition.field] = cell.displayValue || cell.rawValue || '';
                       }

                       return rowObject;
                   });

                   return {
                       columns: columns,
                       rows: rows,
                       skin: 'contrast',
                       zebra: true
                   };
               }
           }
       }
   }


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

   gridTableLightDemoTable: {
       init(ctx) {
           const extra = ctx && ctx.getExtraParams ? ctx.getExtraParams() : {};
           const DEFAULT_PAGE_SIZE = 100;
           const requestedPageSize = typeof extra.pageSize === 'number' ? extra.pageSize : DEFAULT_PAGE_SIZE;
           const pageSize = requestedPageSize === 0 ? 0 : (requestedPageSize || DEFAULT_PAGE_SIZE);
           const totalCount = 20000;
           const page = extra.page ? Math.max(1, parseInt(extra.page, 10) || 1) : 1;
           const startIndex = pageSize ? Math.max(0, (page - 1) * pageSize) : 0;
           const endIndex = pageSize ? Math.min(totalCount, startIndex + pageSize) : totalCount;

           const columns = [];
           for (let idx = 0; idx < Math.min(30, Math.max(6, v('gridTableLightDemoColumnCount') || 20)); idx++) {
               // ...push column descriptors (record, status, owner, etc.)
           }

           const content = [];
           for (let index = startIndex; index < endIndex; index++) {
               // ...compose cells with text/combo/button/custom types and styling
           }

           return {
               columns,
               content,
               totalCount,
               page,
               pageSize,
               allowCopyToClipBoard: true,
               freezeHeader: true,
               freezeFirstColumns: 2,
               enableExport: true,
               exportConfig: {fileName: 'grid-table-light-demo.xlsx'},
               rootClasses: ['grid-table-light-demo-root'],
               tableClasses: 'grid-table-light-demo-table',
               bodyStyle: 'max-height:520px'
           };
       },
       launch(ctx) { /* update info banner */ },
       change(ctx) { /* owner select change */ },
       text_change(ctx) { /* inline rename */ }
   }

Other repository entries show specialised payloads:

- ``gridTableLightCompactTable`` builds rows entirely in memory, returns
  a ``pageSize`` that matches the total row count, and logs events.
- ``gridTableLightTextTable`` sends a ``columns`` array and a plain
  two-dimensional ``content`` array for read-only scenarios.
- ``gridTableLightDemoInfoText`` reacts to widget events to display the
  last user action.

Server backed MDX examples
~~~~~~~~~~~~~~~~~~~~~~~~~~

Two commented repository entries document how to connect a
``GridTableLightWidget`` directly to TM1 MDX queries. Although disabled
in the demo, the snippets are production ready:


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

   gridTableLightServerTable: {
       init() {
           return new RestRequest(this.request);
       },
       request: {
           url: () => '/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Editable))',
           type: 'POST',
           server: true,
           body: () => ({key: 'safariAssetRegister2_mdx'}),
           parsingControl: {
               type: 'script',
               script: (data) => {
                   const transformed = Utils.transformMdxResponseToGridTableLight(data);
                   return Object.assign({
                       freezeHeader: true,
                       allowCopyToClipBoard: true,
                       enableExport: true,
                       exportConfig: {fileName: 'safari-asset-register.xlsx'}
                   }, transformed);
               }
           }
       }
   }

   gridTableLightServerTable2: {
       init() {
           return new RestRequest(this.request);
       },
       request: {
           url: (widgets, ctx) => {
               const baseUrl = '/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Editable))';
               const result = Utils.buildMdxQueryUrl(baseUrl, {
                   includeCount: true,
                   columnCount: GRID_TABLE_LIGHT_SERVER_TABLE2_COLUMN_COUNT,
                   defaultRowCount: GRID_TABLE_LIGHT_SERVER_TABLE2_DEFAULT_ROW_COUNT,
                   metadataKey: GRID_TABLE_LIGHT_SERVER_TABLE2_METADATA_KEY,
                   returnMetadata: true
               }, ctx);
               return result && result.url ? result.url : baseUrl;
           },
           type: 'POST',
           server: true,
           body: () => ({key: 'safariAssetRegister2_mdx'}),
           parsingControl: {
               type: 'script',
               script: (data, widgetId, repoObj, ctx) => {
                   const transformed = Utils.transformMdxResponseToGridTableLight(data);
                   const metadata = ctx && ctx[GRID_TABLE_LIGHT_SERVER_TABLE2_METADATA_KEY] ? ctx[GRID_TABLE_LIGHT_SERVER_TABLE2_METADATA_KEY] : {};
                   const pageSize = Number.isFinite(metadata.rowCount) && metadata.rowCount > 0 ? metadata.rowCount : GRID_TABLE_LIGHT_SERVER_TABLE2_DEFAULT_ROW_COUNT;
                   const page = Number.isFinite(metadata.page) && metadata.page > 0
                       ? metadata.page
                       : (metadata.exportAll ? 1 : (pageSize > 0 ? Math.floor((metadata.skipRows || 0) / pageSize) + 1 : 1));
                   const countValue = data ? data['Cells@odata.count'] : undefined;
                   const parsedCountValue = typeof countValue === 'number' ? countValue : Number.parseInt(countValue, 10);
                   const totalCount = Number.isFinite(parsedCountValue)
                       ? Math.ceil(parsedCountValue / (metadata.columnCount || GRID_TABLE_LIGHT_SERVER_TABLE2_COLUMN_COUNT))
                       : Math.max(0, (transformed.content || []).length + (metadata.exportAll ? 0 : (metadata.skipRows || 0)));
                   return Object.assign({
                       pageSize,
                       page,
                       totalCount,
                       freezeHeader: true,
                       allowCopyToClipBoard: true,
                       enableExport: true,
                       exportConfig: {fileName: 'safari-asset-register-paged.xlsx'}
                   }, transformed);
               }
           }
       }
   }

The first example performs a one-shot MDX execution and enriches the
transformed payload with clipboard and export toggles. The second
example shows how to honour paging metadata stored on the context object
(``ctx``) so Excel export can temporarily request ``pageSize: 0`` and the
client can fetch all rows.

Implementation checklist
~~~~~~~~~~~~~~~~~~~~~~~~

1. Add the widget to ``widget-config.js`` with the desired skin.
2. Implement a repository ``init`` method that returns ``columns`` and
   ``content`` (plus optional metadata).
3. Wire event handlers to update auxiliary widgets (see
   ``gridTableLightDemoInfoText`` in the demo).
4. When loading data from TM1 or another REST source, wrap the request
   with ``RestRequest`` and convert the payload using
   ``Utils.transformMdxResponseToGridTableLight``.
5. Optionally store paging/column settings in ``ctx`` or widget values to
   persist user selections across refreshes.

By following the above steps you can replace verbose ``GridTableWidget``
setups with a single lightweight configuration while retaining full
control over styling, behaviour and TM1 integrations.

GridTablePlusWidget
-------------------

Overview
~~~~~~~~

``GridTablePlusWidget`` embeds a full `Tabulator <https://tabulator.info>`_
instance inside Analogic. It accepts high level column and cell metadata
from the repository, translates them to Tabulator column definitions and
renders the grid with built-in support for grouping, selection, inline
editing and clipboard integration. Compared to
``GridTableLightWidget`` it targets interactive dashboards where Tabulator's
rich feature set (re-sizable columns, range selection, context menus,
custom formatters/editors) is required out of the box.

Typical use cases
~~~~~~~~~~~~~~~~~

- **Portfolio tables:** grouped, filterable project lists with context
  menus and inline editing as showcased by
  ``analogicTableDemoTable`` in ``helloanalogic``.【F:apps/helloanalogic/static/assets/js/configs/repository.js†L964-L1035】【F:apps/helloanalogic/static/assets/js/configs/widget-config.js†L6433-L6484】
- **Ad-hoc data grids:** quickly render TM1 payloads or custom arrays
  with editors/filters for each column, such as the
  ``analogicTableDemoSimpleTable`` example.【F:apps/helloanalogic/static/assets/js/configs/repository.js†L1102-L1284】【F:apps/helloanalogic/static/assets/js/configs/widget-config.js†L6485-L6529】
- **Embedded analytics:** mix standard Tabulator options (grouping,
  clipboard, tooltips) with Analogic skins to build rich analysis
  panels without wiring dozens of child widgets.【F:apps/helloanalogic/static/assets/js/configs/repository.js†L977-L1003】【F:apps/helloanalogic/static/assets/js/configs/widget-config.js†L6459-L6479】

Widget configuration
~~~~~~~~~~~~~~~~~~~~

Only a minimal configuration lives in ``widget-config.js`` because
Tabulator behaviour is mostly repository-driven:

- ``id`` (**required**): unique widget identifier.
- ``type`` (**required**): must be ``GridTablePlusWidget``.
- ``title``: optional caption displayed above the table.
- ``minWidth``/``width``/``height``: sizing hints passed to the widget
  container.【F:apps/helloanalogic/static/assets/js/configs/widget-config.js†L6465-L6484】【F:apps/helloanalogic/static/assets/js/configs/widget-config.js†L6506-L6527】
- ``hideIfNoData``: hides the widget when the repository returns no
  rows.【F:apps/helloanalogic/static/assets/js/configs/widget-config.js†L6465-L6484】
- ``tabulatorOptions``: default Tabulator options merged with
  repository-supplied settings (for example layout, selection mode or
  tooltips).【F:apps/helloanalogic/static/assets/js/configs/widget-config.js†L6468-L6480】【F:analogic/static/assets/js/widgets/grid-table-plus/grid-table-plus.js†L51-L96】
- ``tabulatorColumnOptions``/``tabulatorEvents``: optional overrides for
  individual columns or Tabulator callbacks that are merged with the
  repository payload.【F:analogic/static/assets/js/widgets/grid-table-plus/grid-table-plus.js†L47-L96】

Widget behaviour
~~~~~~~~~~~~~~~~

At runtime ``GridTablePlusWidget`` merges three sources of options: the
widget configuration, repository payload and data-driven column/cell
metadata. Columns returned by the repository are normalised, default
formatters are wrapped to ensure Analogic styling, and the widget keeps a
``cellData`` matrix for quick access to the underlying metadata during
events.【F:analogic/static/assets/js/widgets/grid-table-plus/grid-table-plus.js†L53-L124】 Tabulator receives the combined
definition via ``prepareTabulatorSetup`` and is recreated when the
repository sends fresh data.【F:analogic/static/assets/js/widgets/grid-table-plus/grid-table-plus.js†L69-L124】

Repository contract
~~~~~~~~~~~~~~~~~~~

The repository entry must return an object with the following keys:

- ``columns``: an array of column definitions (``title``, ``field``,
  optional formatter/editor, alignment etc.). The widget augments each
  column with Tabulator-specific defaults and merges overrides from
  ``tabulatorColumnOptions``.【F:apps/helloanalogic/static/assets/js/configs/repository.js†L965-L1002】【F:analogic/static/assets/js/widgets/grid-table-plus/grid-table-plus.js†L69-L111】
- ``data``: either plain values or Analogic cell objects (``value``,
  ``displayValue``, ``metadata``). Each row is converted into Tabulator
  data while preserving the ``__analogicCells`` map for event handlers.
  【F:apps/helloanalogic/static/assets/js/configs/repository.js†L1005-L1048】【F:analogic/static/assets/js/widgets/grid-table-plus/grid-table-plus.js†L96-L124】
- ``options``: additional Tabulator options (grouping, clipboard, height
  etc.) that are merged with widget and default settings.【F:apps/helloanalogic/static/assets/js/configs/repository.js†L976-L1003】【F:analogic/static/assets/js/widgets/grid-table-plus/grid-table-plus.js†L102-L124】
- ``events``: map of Tabulator event names to repository functions (for
  example ``tableBuilt`` or ``cellEdited``). The widget binds them and
  exposes helpers like ``ctx.getTabulator()``, ``ctx.getRowComponent()``
  or ``ctx.getCell()`` for deeper integrations.【F:apps/helloanalogic/static/assets/js/configs/repository.js†L1003-L1067】【F:analogic/static/assets/js/widgets/grid-table-plus/grid-table-plus.js†L47-L124】

Usage example
~~~~~~~~~~~~~

``helloanalogic`` demonstrates two variations:

.. code-block:: javascript

   // widget-config.js
   {
       id: 'analogicTableDemoTable',
       type: GridTablePlusWidget,
       title: 'Project Portfolio Overview',
       minWidth: 960,
       hideIfNoData: false,
       tabulatorOptions: {
           height: '520px',
           layout: 'fitDataStretch',
           movableColumns: true,
           resizableColumnFit: true,
           selectable: true,
           selectableRangeMode: 'drag',
           tooltipGenerationMode: 'hover'
       }
   }

   // repository.js
   {
       analogicTableDemoTable: {
           init() {
               return {
                   columns,
                   data: rows,
                   options: {
                       groupBy: 'department',
                       placeholder: 'No project portfolio data available',
                       clipboard: true
                   },
                   events: {
                       tableBuilt: 'tableBuilt',
                       rowSelectionChanged: 'selectionChanged',
                       cellClick: 'cellClicked',
                       cellEdited: 'cellEdited'
                   }
               };
           }
       }
   }

The simplified table follows the same contract but returns synthetic
cells and only subscribes to ``cellEdited`` events, proving that the
widget can handle both complex and lightweight use cases with the same
API.【F:apps/helloanalogic/static/assets/js/configs/repository.js†L1102-L1284】

GridTableWidget
---------------

 

Overview
~~~~~~~~

A table-type widget for displaying data in rows and
columns. Unlike the HorizontalTableWidget the content is not read-only
and the gridTableCells can contain nearly any type of widgets. The main
difference between the GridWidget and the GridTableWidget is that in the
GridTableWidget the cells in the same column always contain the same
widget (except for the header row).



Configuration
~~~~~~~~~~~~~

- ``hideIfNoData``:
- ``skin``: Selected skin of widget
- ``maxRows``:
- ``minWidth``:
- ``allowFullContentUpdated``:
- ``allowChangedDataUpdate``:
- ``allowCopyToClipBoard``:
- ``disableRefreshGridCell``:
- ``width``:
- ``borderTop``: true or false, toggle the top border visibility of the table
- ``borderBottom``: true or false, toggle the bottom border visibility of the table
- ``rowHeight``: toggle the height of the row

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: YES

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- all data query of widgets in grid table are written here
- init/state query for each widget (label for button, title/body for
   text, value for slider, etc.)
- parsing control: matrix, widgets in columns
- column visibility is also defined here: cellVisible parameter in
   parsing
- cell background color: cellBackgroundColor parameter in parsing




GridWidget
----------

Overview
~~~~~~~~

Logical widget type to contain other widgets arranged
in an orthogonal grid. 



Configuration
~~~~~~~~~~~~~

- ``id``: widget id which used for reference in framework
- ``type``: type of widget
- ``skin``: skin of the widget
- ``listen``: {event, method} events for the widget listen to and method to do

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: NO


HistogramComboChartWidget
----------------------------

Overview
~~~~~~~~

A combination chart which combines the features of a
histogram and a line chart.





Configuration
~~~~~~~~~~~~~

- ``id``: Widget Id which used for reference in framework
- ``type``: Type of Widget
- ``title``: title of the widget
- ``paddingTop``:
- ``paddingRight``:
- ``paddingBottom``:
- ``paddingLeft``:
- ``datasets``:
- ``xAxesGridLinesDrawOnChartArea``:
- ``yAxesGridLinesDrawOnChartArea``:
- ``xAxesLabelRotation``:
- ``yAxesLabelRotation``:
- ``xAxesDisplay``: Display of the x Axes
- ``yAxesGridLinesDrawBorder``: display the lines on y axes
- ``xAxesGridLinesDrawBorder``: display the lines on x axes
- ``yAxesTicksPadding``: Padding of the y Axes ticks
- ``xAxesTicksPadding``: Padding of the x Axes ticks
- ``xAxesTicksOffset``: Off sett of the x Axes ticks
- ``yAxesTicksOffset``: Off sett of the y Axes ticks
- ``xAxesLabelDisplay``: Boolean, display of the x Axes label
- ``yAxesLabelDisplay``: Boolean, display of the y Axes label
- ``xAxesLabelFontSize``: Font size of the x Axes label
- ``yAxesLabelFontSize``: Font size of the y Axes label
- ``yAxesLabelPadding``: Padding of the y axes label
- ``xAxesLabelPadding``: Padding of the x axes label
- ``aspectRatio``:
- ``maintainAspectRatio``:
- ``datasetHistogram``: dataset of the histogram
- ``datasetsLine``: dataset of the line(s)
- ``listen``: {event, method} events for the widget listen to and method to do
- ``xAxesGridLinesDisplay``: true or false, display the x axes grid lines
- ``xAxesGridLinesColor``: color of the x axes grid lines
- ``xAxesTicksFontSize``: size of the x axes ticks
- ``xAxesTicksFontFamily``: font family of the x axes ticks
- ``xAxesTicksFontStyle``: font style of the x axes ticks
- ``xAxesTicksFontColor``: color of the x axes ticks
- ``yAxesDisplay``: true or false, display the y axes
- ``yAxesGridLinesDisplay``: true or false, display the y axes grid lines
- ``yAxesGridLinesColor``: color of the y axes grid lines
- ``yAxesTicksFontSize``: size of the y axes ticks
- ``yAxesTicksFontFamily``: font family of the y axes ticks
- ``yAxesTicksFontStyle``: font style of the y axes ticks
- ``yAxesTicksFontColor``: color of the y axes ticks
- ``xAxesLabelFontFamily``: font family of x axes label
- ``xAxesLabelFontColor``: color of the x axes label
- ``yAxesLabelFontFamily``: font family y axes label
- ``yAxesLabelFontColor``: color of the y axes label
- ``yAxisStacked``: stack datasets on Y axes
- ``xAxisLabel``: label of the x axis
- ``yAxisLabel``: y axis label
- ``histYAxisBufferTop``: buffer on the top of the maximum value (%) on the histogram
- ``histYAxisBufferBottom``: buffer on the bottom of the minimum value (%) on the histogram
- ``lineYAxisBufferTop``: buffer on the top of the maximum value (%) on the line
- ``lineYAxisBufferBottom``: buffer on the bottom of the minimum value (%) on the line
- ``yAxesGridLinesNum``: number of grid line on Y axes
- ``widgets``: segmentedBar widget ID (see on figure)

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: YES

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- 2 init queries:

1. query for X-axis labels Structure: {value:, label:}

**parsingControl type:** list

2. query for data Structure: {x: left side of histogram bar, /x value of
line point, y: height of histogram bar/y value of line point}

**parsingControl type:** matrix


HorizontalTableWidget
---------------------

Overview
~~~~~~~~

A table-type widget for displaying data in rows and
columns. Includes some limited interactive functionality (buttons,
search field), but the content of the cells is read-only.



Configuration
~~~~~~~~~~~~~

- ``columnNames``: list of column name: ['column1', 'column2',...]
- ``columnTypes``: list of column type: ['int', 'string',...]
- ``columnWidths``: list of column width(pixel): ['200', '300',...]
- ``searchField``: toggle Search widget component visibility
- ``selectFirst``:
- ``fadeOutNum``: max displayed rows without scrolling, default 10
- ``hideIfNoData``:
- ``multiselect``:
- ``skin``: skin of the widget
- ``selectedRowBackgroundColor``

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: YES

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- state or init query if data feed from TM1:

   -  **parsingControl type:** matrix

      -  value
      -  editable
      -  ordinal

- cellEdit query: 

   -  fired every time, once a cell is editable and edited by the user
      {value: r.Cells[x].FormattedValue, editable: false, ordinal: x};
      return {active: true}


ImageUploadWidget
------------

Overview
~~~~~~~~

This widget is used for uploading images and photos.


Configuration
~~~~~~~~~~~~~

- ``allowedMimeTypes``: Allowed MIME types for file upload
- ``allowedWidthInPixel``: Maximum allowed width of uploaded image in pixels
- ``allowedHeightInPixel``: Maximum allowed height of uploaded image in pixels
- ``backgroundColor``: Background color of the widget
- ``borderColor``: Color of the border around the widget
- ``borderWidth``: Width of the border in pixels
- ``cornerRadius``: Radius of the widget's corners in pixels
- ``dividerWidth``: Width of the divider line between elements
- ``effect``: Visual effect applied to the widget
- ``fontBold``: Whether the text should be bold
- ``fontColor``: Color of the text
- ``fontSize``: Size of the font used for text
- ``gradient``: Background gradient style
- ``icon``: Icon of the widget
- ``iconHeight``: Height of the icon in pixels
- ``iconPosition``: Position of the icon (e.g., left, right)
- ``iconWidth``: Width of the icon in pixels
- ``label``: Text label shown on the widget
- ``maxFileSize``: Maximum total upload size in megabytes
- ``maxFileSizePerFile``: Maximum file size per individual file in megabytes
- ``progressVisible``: Show progress bar during upload
- ``skin``: Selected skin of the widget
- ``uploadSuccessMessage``: Message shown after successful upload
- ``showUploadSuccessMessage``: Whether to show success message after upload
- ``skipStoppingTheLoaderAfterSuccessUpload``: Skip hiding the loader after successful upload


TM1 integration
~~~~~~~~~~~~~~~

- Data connection: NO

ImageWidget
------------

Overview
~~~~~~~~

This widget is used for displaying images and photos.



Configuration
~~~~~~~~~~~~~

- ``icon``: Icon of widget
- ``fileName``: if image is not an icon, name of the image file needs to be uploaded under ..AnalogicDeploymentstemplateSkins *usedSkin*images.
- ``title``: title of the image widget
- ``skin``: Selected skin of widget

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: NO


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
          id: 'hrdemoSettingsRow1Cell1Logo',
          type: ImageWidget,
          titleFontColor: '#AEAEB2',
          fileName: 'knowledgeseed_stratos.png',
          titleFontSize: '22px',
          width: 290,
          height: 90
   }

LineAreaChartWidget
----------------------



Configuration
~~~~~~~~~~~~~

- ``id``: widget id which used for reference in framework
- ``type``: Type of Widget
- ``title``: Widget title text
- ``listen``: {event, method} events for the widget listen to and method to do
- ``skin``: Selected skin of widget
- ``datasets``: [{legendLabel: string, borderColor: string, borderWidth: int, backgroundColor: string, fill: boolean, lineTension: float, pointRadius: int},…]
- ``legendSkin``: Selected skin of widget
- ``xAxisLabel``: label of X axes
- ``xAxesDisplay``: true or false,, default true, display the x axes
- ``xAxesGridLinesDisplay``: true or false, display the x axes grid lines
- ``xAxesTicksDisplay``: the ticks of the X axes
- ``xAxesTicksLabelDisplay``: the labes of the ticks of the Y axes
- ``xAxesGridLinesDrawBorder``: true or false, display the x axes grid lines drow border
- ``xAxesGridLinesColor``: color of the x axes grid lines
- ``xAxesTicksFontSize``: size of the x axes ticks
- ``xAxesTicksFontFamily``: string, default 'imago, sans-serif'
- ``xAxesTicksFontStyle``: string, default 'bold'
- ``xAxesTicksFontColor``: color of the x axes ticks
- ``xAxesTicksPadding``: padding between X axes ticks
- ``xAxesLabelDisplay``: true or false, display the x axes label
- ``xAxesLabelFontSize``: size of the x axes label
- ``xAxesLabelFontFamily``: font family of the x axes label
- ``xAxesLabelFontColor``: color of the a axes label
- ``xAxesLabelFontStyle``: style of the x axes label
- ``xAxesLabelPadding``: padding between X axes label
- ``xAxesLabelRotation``: vertical, horizontal
- ``xAxesTicksOffset``: Off sett of the x Axes ticks
- ``xAxesOffset``: Off sett of the X
- ``xAxesOffsetGridLines``: if true, grid lines will be shifted to be between labels
- ``xAxesOffsetRight``: Off sett of the X on right
- ``xAxesOffsetLeft``: Off sett of the X on left
- ``xMin``: the max value of theX axis
- ``yAxisLabel``: label of Y axes
- ``yAxisDisplay``: true or false, display the left y axes
- ``yAxesGridLinesDisplay``: true or false, display the left y axes grid lines
- ``yAxesGridLinesDrawBorder``: first grid line is visible, even if others are not
- ``yMin``: the max value of the Y axis
- ``yAxesTicksDisplay``: the ticks of the Y axes
- ``yAxesTicksLabelDisplay``: the labes of the ticks of the Y axes
- ``yAxesGridLinesColor``: color of the left y axes grid lines
- ``yAxesLabel``: label of the left y axes
- ``yAxesLabelDisplay``: true or false, display the y axes label
- ``yAxesLabelConcat``: str to add to the left Y axes ticks
- ``yAxesLabelFontSize``: font size of the left y axes label
- ``yAxesLabelFontFamily``: font family of the left y axes label
- ``yAxesLabelFontColor``: font color of the left y axes label
- ``yAxesLabelFontStyle``: font style of the left y axes label
- ``yAxesLabelPadding``: padding between Y axes label
- ``yAxesLabelRotation``: vertical, horizontal
- ``yAxesTicksOffset``: Off sett of the Y Axes ticks
- ``yAxesTicksBegintAtZero``: true or false, begin the left y axes with zero
- ``yAxesStacked``: true or false,
- ``yAxesUnit``:
- ``yAxesDecimalNum``:
- ``yAxesSeparatesThousands``: true or false,
- ``yAxesTicksPrecisionFixed``: true or false,
- ``yAxesTicksFontSize``: font size of the left y axes ticks
- ``yAxesTicksFontFamily``: font family of the left y axes ticks
- ``yAxesTicksFontStyle``: font style of the left y axes ticks
- ``yAxesTicksFontColor``: font color of the left y axes ticks
- ``yAxesTicksPadding``: padding between Y axes ticks
- ``yAxesTicksDisplay``: true or false, display the left y axes ticks
- ``yAxesTicksOffset``: offset (distance) between ticks of left Y axes
- ``data``
- ``defaultBezierCurveTension``
- ``labelClickPopup``
- ``manualLabelAlignment``
- ``openPopupOnLabelClick``
- ``openendPopupOffsetLeft``
- ``openendPopupOffsetTop``
- ``yAxesOffset``
- ``yAxesOffsetBottom``
- ``yAxesOffsetTop``
- ``yMax``
- ``tooltipsEnabled``: Boolean , it's enable the mouse over info
- ``tooltipsMode``:
- ``tooltipsIntersect``: Boolean
- ``aspectRatio``:
- ``maintainAspectRatio``: Boolean




TM1 integration
~~~~~~~~~~~~~~~

- Data connection: 1

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- 2 init queries:

1. query for X-axis labels Structure: {value:, label:}

**parsingControl type:** list

2. query for data Structure: {value:}

**parsingControl type:** matrix


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
            id: 'hrdemoReportChart9',
            type: LineAreaChartWidget,
            width: '1000',
            height: '600',
            title: 'Base Business',
            datasets: [
                {
                    "legendLabel": "Marketing and Management",
                    "borderColor": "#f8bfd1",
                    "borderWidth": 2,
                    "backgroundColor": "#f8bfd1",
                    "fill": false,
                    "lineTension": 0.5,
                    "pointRadius": 2
                },
                {
                    "legendLabel": "Finance and HR",
                    "borderColor": "#8a8a8a",
                    "borderWidth": 0,
                    "backgroundColor": "#8a8a8a",
                    "fill": false,
                    "lineTension": 0.5,
                    "pointRadius": 2
                },

            ],
            legendSkin: 'pieChart',
            visible: true,
            defaultFontFamily: 'imago, sans-serif',
            yAxisLabel: 'Sales',
            xAxesDisplay: true,
            xAxesGridLinesDisplay: false,
            xAxesGridLinesDrawBorder: false,
            yAxesDisplay: true,
            yAxesGridLinesDisplay: false,
            yAxesGridLinesDrawBorder: false,
            xAxesTicksDisplay: true,
            yAxesTicksDisplay: true,
            xAxesTicksLabelDisplay: true,
            yAxesTicksLabelDisplay: true,
            xAxesLabelDisplay: true,
            yAxesLabelDisplay: true
   }

    // repository.js


          hrdemoReportChart9: {
        init: [
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {};
                },
                parsingControl: {
                    type: 'list',
                    query:
                        (r, x) => {
                            return {
                                value: r.Cells[x].Value,
                                label: r.Cells[x].Members[4].Name
                            };
                        }
                }
            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {};
                },
                parsingControl: {
                    type: 'matrix',
                    length: 5,
                    query: [
                        (r, x) => {
                            return {value: r.Cells[x].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 1].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 2].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 3].FormattedValue};
                        }, (r, x) => {
                            return {value: r.Cells[x + 4].FormattedValue};
                        }]
                }
            }
        ],
    },
    },



LineScatterComboWidget
----------------------

Overview
~~~~~~~~

A combination chart which combines the features of a
scatter plot diagram and a line chart.

Configuration
~~~~~~~~~~~~~

- ``datasets``:
- ``legendVisible``: Boolean, Set the visibility of the legend
- ``canvasPaddingTop``:
- ``canvasPaddingRight``:
- ``canvasPaddingBottom``:
- ``canvasPaddingLeft``:
- ``tooltipsEnabled``: Boolean, Mouse Over
- ``tooltipsMode``:
- ``aspectRatio``:
- ``maintainAspectRatio``:
- ``xAxisVisible``: Boolean, It's set the visibility of the x Axis
- ``xAxisGridLinesDisplay``: Boolean, It's set the visibility of the x Axis Grid Lines
- ``xAxisGridLinesDrawOnChartArea``: Boolean, It's set the visibility of the x Axis GridLines on chart
- ``xAxisTicksDisplay``: Boolean, It's set the visibility of the x Axis ticks
- ``xAxisTicksLabelDisplay``: Boolean, It's set the visibility of the x Axis ticks label
- ``xAxisTicksStepSize``: It's set the step of the x Axis ticks
- ``xAxisOffsetGridLines``: Boolean, It's set the off sett of the y axis
- ``yAxisVisible``: Boolean, It's set the visibility of the x Axis
- ``yAxisGridLinesDisplay``: Boolean, It's set the visibility of the y Axis Grid Lines
- ``yAxisGridLinesDrawOnChartArea``: Boolean, It's set the visibility of the y Axis GridLines on chart
- ``yAxisTicksDisplay``: Boolean, It's set the visibility of the y Axis ticks
- ``yAxisTicksLabelDisplay``: Boolean, It's set the visibility of the y Axis ticks label
- ``xAxisTicksFontSize``: It's set the size of the x axis ticks font size
- ``yAxisTicksFontSize``: It's set the size of the y axis ticks font size
- ``xAxisTicksFontFamily``: It's set the size of the x axis ticks font family
- ``yAxisTicksFontFamily``: It's set the size of the y axis ticks font family
- ``xAxisTicksFontStyle``: It's set the size of the x axis ticks font style
- ``yAxisTicksFontStyle``: It's set the size of the y axis ticks font style
- ``xAxisTicksFontColor``: It's set the size of the x axis ticks font color
- ``yAxisTicksFontColor``: It's set the size of the y axis ticks font color
- ``xAxisTicksPadding``: It's set the size of the x axis ticks padding
- ``yAxisTicksPadding``: It's set the size of the y axis ticks padding
- ``xAxisTicksOffset``: It's set the size of the x axis ticks off set
- ``yAxisTicksOffset``: It's set the size of the y axis ticks off set
- ``yAxisTicksPrecision``: It's set the size of the y axis ticks precision
- ``yAxisTicksPrecisionFixed``: Boolean, It's set the size of the y axis ticks precision
- ``yAxisGridLinesNum``: Boolean, It's set the size of the y axis gird line nuzms
- ``rightBorderVisible``: Boolean, It's set the visibility of the right border
- ``topBorderVisible``: Boolean, It's set the visibility of the top border
- ``xMin``: It's set the size of the x axis min value
- ``xMax``: It's set the size of the x axis max value
- ``yMin``: It's set the size of the y axis min value
- ``yMax``: It's set the size of the y axis max value
- ``xAxisOffset``: Boolean, It's set the visibility of the x axes off set
- ``xAxisOffsetRight``: It's set the visibility of the x axes off set right
- ``xAxisOffsetLeft``: It's set the visibility of the x axes off set left
- ``yAxisSeparatesThousand``: It's seperate the y axis
- ``yAxisTicksPrecision``:
- ``yAxisTicksPrecisionFixed``:
- ``yAxisSeparatesThousands``:
- ``yAxisGridLinesNum``:
- ``yAxisUnit``:
- ``bezierCurveBorderWidth``:
- ``bezierCurveTension``:
- ``auxLineColor``:
- ``auxLineWidth``:
- ``auxLineDash``:


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
           id: 'hrdemoReportChart10',
           type: LineScatterComboWidget,
           yAxisGridLinesDisplay: false,
           width: '1000',
           height: '440',
           tooltipsEnabled: false,
           maintainAspectRatio: false,
           yAxisGridLinesNum: 9,
           //xAxisOffset: 0.5,
           xAxisTicksLabelDisplay: true,
           xAxisTicksDisplay: false
   }

    // repository.js


      hrdemoReportChart10: {
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
            type: 'POST',
            server: true,
            body: (db) => {
                return {
                    key: 'hrdemoReportChart10_init_2'
                };
            },
            parsingControl: {
                type: 'script',
                script: (data, object) => {
                    let items = [{
                        label: data.Cells[0].Members[5].Name,
                        pointRadius: 5,
                        showLine: true,
                        static: false,
                        selected: true,
                        color: '#009FDA',
                        hidden: false,
                        values: []
                    }, {
                        label: data.Cells[1].Members[5].Name,
                        pointRadius: 5,
                        showLine: false,
                        static: false,
                        selected: true,
                        color: '#747678',
                        hidden: false,
                        values: []
                    }];
                    let start = 202300;
                    for (let i = 0; i < data.Cells.length; i += 2) {
                        items[0].values.push({
                            x: i / 2 + 1,
                            y: Utils.parseNumber(data.Cells[i].FormattedValue, 'HU-hu')
                        })
                        items[1].values.push({
                            x: i / 2 + 1,
                            y: Utils.parseNumber(data.Cells[i + 1].FormattedValue, 'HU-hu')
                        })
                    }
                    let values = [...items[0].values, ...items[1].values];
                    return {
                        datasets: items, legendVisible: true, legendSkin: 'combochartFTE',
                        yMax: Utils.precisionRound(Math.max(...values.map(e => e.y)), 0),
                        yMin: Utils.precisionRound(Math.min(...values.map(e => e.y)), 0)
                    };
                }
            }
        }
    },
    },


PageWidget
-----------

Overview
~~~~~~~~

Logical widget type to contain every widget that are
displayed in a single page. 

Configuration
~~~~~~~~~~~~~

- ``id``: widget id which used for reference in framework
- ``type``: type of widget
- ``listen``: {event, method} events for the widget listen to and method to do
- ``widgets``: contains all widgets on the page (eg.: BusinessCaseDashboard, BusinessCaseDashboardDraft, etc.)

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: NO

PanelWidget
-----------

Overview
~~~~~~~~

Logical widget type for containing other widgets. A
legacy widget type from the 1.0 version of the framework (currently the
GridWidget provides the same functionality.

Configuration
~~~~~~~~~~~~~

- ``id``: Widget Id which used for reference in framework
- ``type``: Type of Widget
- ``widgets``: widget list, contains all widget on selected page
- ``width``: width of widget
- ``listen``: {event, method} events for the widget listen to and method to do
- ``skin``:

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: NO


PasswordTextWidget
------------

Overview
~~~~~~~~

This widget is used for Passwords

Configuration
~~~~~~~~~~~~~

- ``id``: Unique identifier of the widget, used for binding value and events
- ``skin``: Selected skin style for the widget (affects styling via class name)
- ``value``: Initial value of the password field (optional, not explicitly used here but can be set programmatically)



TM1 integration
~~~~~~~~~~~~~~~

- Data connection: NO


PieChartWidget
--------------

Overview
~~~~~~~~

A standard pie chart to show relative sizes of data.



Configuration
~~~~~~~~~~~~~

- ``id``: Widget Id which used for reference in framework
- ``type``: Type of Widget
- ``canvasHeight``:
- ``canvasWidth``:
- ``data``:
- ``skin``: selected skin of widget
- ``legendSkin``: selected skin of legend
- ``labelAlign``: alignment of label on chart (center, end, start)
- ``labelDisplay``: toggle visibility of label
- ``labelBorderColor``: border color of label rectangle
- ``labelBackgroundColor``: background color of label rectangle
- ``labelBorderWidth``: border width of label rectangle in pixel
- ``labelBorderRadius``: border radius of label rectangle in pixel
- ``labelTextAlign``:
- ``labelAnchor``: defines the anchor point of label (center, end , start)
- ``labelPaddingTop``: label top padding in pixel
- ``labelPaddingRight``: label right padding in pixel
- ``labelPaddingLeft``: label left padding in pixel
- ``labelPaddingBottom``: label bottom padding in pixel
- ``labelFontSize``: label font size
- ``labelFontColor``: color of font
- ``labelFontWeight``: weight of fon(normal, bold)
- ``aspectRatio``:
- ``maintainAspectRatio``:

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: YES

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- 1 init query:

1. query for data Structure: {value:,
label:,backgroundColor:,borderWidth:,borderColor:}

**parsingControl type:** list

example response:


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
          id: 'hrdemoReportChart6',
         type: PieChartWidget,
         width: '1000',
         height: '600',
         title: '',
         tooltipsEnabled: true,
         marginBottom: '50',
         skin: 'skin4',
         legendSkin: 'pieChart',
         legendGroupByStack: false,
         labelAlign: 'end',
         labelAnchor: 'end',
         labelDisplay: true,
         labelBackgroundColor: '#FFFFFF',
         labelFontColor: '#000',
   }

    // repository.js


      hrdemoReportChart6: {
        init: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Long_name))`,
            type: 'POST',
            server: true,
            body: (db) => {
                return {
                    key: 'hrdemoReportChart6_init_2',
                    year: v('hrdemoReportRow1Cell3SegmentedControl').selected === '2024' ? '2024' : '2023'
                };
            },
            parsingControl: {
                type: 'script',
                script: (data, object) => {
                    let items = [];
                    for (let i = 0; i < data.Cells.length; i++) {
                        items.push({
                            value: Utils.parseNumber(data.Cells[i].FormattedValue, "HU-hu"),
                            label: data.Cells[i].Members[4].Attributes['Long_name'],
                            backgroundColor: Repository.hrdemoReportChart6.iconColor[i]
                        })
                    }
                    return {dataset: items};
                }
            }
        },
        iconColor: {
            '0': '#F44336',
            '1': '#673AB7',
            '2': '#03A9F4',
            '3': '#4CAF50',
            '4': '#FFC107',
            '5': '#015D52',
            '6': '#6A5D4D',
            '7': '#DE4C8A',
        }
    },
    },



PivotTableWidget
-----------------

Overview
~~~~~~~~

Configuration
~~~~~~~~~~~~~

- ``id``: Widget Id which used for reference in framework
- ``selectorTreeColNames``: ['Dimensions', 'Hierarchies', 'Subsets', 'Elements']
- ``colors``:
- ``data``:
- ``presetData``:
- ``tree``:

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: YES

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- No repository specifics documented.
RadarChartWidget
------------------

Overview
~~~~~~~~

A radar chart is a way of showing multiple data points
and the variation between them. They are often useful for comparing the
points of two or more different data sets.

Configuration
~~~~~~~~~~~~~

*Global parameters:*

- min: minimum value of the axis
- max: maximum value of the axis
- stepSize: step size on the axis
- ticks: labels of the ticks on the axis
- tickColor: color of the tick labels
- tickFontFamily: font family of the tick labels
- tickFontSize: font size of the tick labels
- tickFontStyle: font style of the tick labels
- canvasHeight: height of the canvas
- canvasWidth: width of the canvas
- bezierCurveBorderWidth:
- bezierCurveTension:
- paddingTop:
- paddingRight:
- paddingBottom:
- paddingLeft:
- tooltipsEnabled:
- tooltipsMode:
- canvas Width: width of the canvas
- legendSkin: skin of the legend
- legendVisible: legend visible flag
- datasets

*Dataset parameters:*

- backgroundColor: The line fill color.
- borderCapStyle: Cap style of the line.
- borderColor: The line color.
- borderDash: Length and spacing of dashes.
- borderDashOffset: Offset for line dashes.
- borderJoinStyle: Line joint style.
- borderWidth: The line width (in pixels).
- clip: How to clip relative to chartArea. Positive value allows
   overflow, negative value clips that many pixels inside chartArea.
   ``0`` = clip at chartArea. Clipping can also be configured per side:
   ``clip: {left: 5, top: false, right: -2, bottom: 0}``
- data: Specified as an array of numbers. Each point in the data array
   corresponds to the label at the same index.
- fill: How to fill the area under the line.
- label: The label for the dataset which appears in the legend and
   tooltips.
- order: The drawing order of dataset. Also affects order for tooltip
   and legend.
- tension: Bezier curve tension of the line. Set to 0 to draw straight
   lines.
- pointBackgroundColor: The fill color for points.
- pointBorderColor: The border color for points.
- pointBorderWidth: The width of the point border in pixels.
- pointHitRadius: The pixel size of the non-displayed point that reacts
   to mouse events.
- pointRadius: The radius of the point shape. If set to 0, the point is
   not rendered.
- pointRotation: The rotation of the point in degrees.
- pointStyle: Style of the point.
- spanGaps: If true, lines will be drawn between points with no or null
   data. If false, points with ``null`` data will create a break in the
   line.

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: YES

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

1. init query:

   1. query for data Structure: {value:}
   2. parsingControl type: matrix


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
         id: 'hrdemoReportChart12',
         type: RadarChartWidget,
         skin: 'skin3',
         title: '',
         titleVisible: true,
         visible: true,
         canvasWidth: '750',
         canvasHeight: '750',
         height: '750',
         width: '750',
         legendVisible: true,
         legendSkin: 'skin3'
   }

    // repository.js


      hrdemoGroupsRow1Cell1Button: {
        launch() {
            Api.openPage('hrdemoMain');
        }
    },


RadioButtonRowWidget
-----------------------

Overview
~~~~~~~~

A sub-widget built specifically for the
HorizontalTableWidget. It provides radio button functionality when
selecting rows of the HorizontalTableWidget

Configuration
~~~~~~~~~~~~~

- ``id``: widget id which used for reference in framework
- ``type``: type of widget
- ``action``: executed action. currently choose only
- ``align``: left or right side of horizontal table
- ``position``: position of widget in horizontal table

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: 1

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- state or init query if HorizontalTableWidget data feed from TM1 and
   any action defined in widget-config:

   -  the query is part of its parent Horizontal table query

      -  active

- choose query:

   -  only url, body and type settings are used, parsingControl settings
      is not available


RichTextWidget
------------

Overview
~~~~~~~~

This widget is used for text editing

Configuration
~~~~~~~~~~~~~

- ``bold``: Enables bold text formatting in the editor
- ``italic``: Enables italic text formatting in the editor
- ``underline``: Enables underline formatting
- ``leftAlign``: Enables left text alignment
- ``centerAlign``: Enables center text alignment
- ``rightAlign``: Enables right text alignment
- ``justify``: Enables justified text alignment
- ``ol``: Enables ordered (numbered) list formatting
- ``ul``: Enables unordered (bullet) list formatting
- ``heading``: Enables heading/title formatting
- ``fonts``: Allows changing fonts in the editor
- ``fontList``: List of available font families
- ``fontColor``: Enables font color selection
- ``backgroundColor``: Enables background color selection
- ``fontSize``: Enables font size selection
- ``imageUpload``: Allows inserting uploaded images
- ``fileUpload``: Allows uploading and inserting files
- ``videoEmbed``: Allows embedding videos
- ``urls``: Enables hyperlink insertion
- ``table``: Enables inserting tables into the editor
- ``removeStyles``: Allows removing inline styles
- ``code``: Enables HTML source code editing
- ``colors``: Custom color palette for text and background
- ``youtubeCookies``: Whether to allow YouTube cookies in embedded videos
- ``preview``: Enables live preview mode
- ``undoRedo``: Enables undo and redo functionality
- ``placeholder``: Placeholder text shown when editor is empty
- ``skin``: Selected skin style for the editor appearance




TM1 integration
~~~~~~~~~~~~~~~

- Data connection: NO

ScrollTableWidget
-------------------

Overview
~~~~~~~~

A table-type widget for displaying data in rows and
columns. It provides Excel-like functionality including editing cells 



Configuration
~~~~~~~~~~~~~

- ``id``: widget id which used for reference in framework
- ``type``: type of widget
- ``headerWidth``: width of header in pixel
- ``format``: W-B-N format for default formatting
- ``startYear``: Name of the starting year in numbers
- ``endYear``: Name of the ending year in numbers
- ``ribbons (hidden in current version)``:

   - ``bar1``: {name, textColor, backgroundColor}
   - ``bar2``: {name, textColor, backgroundColor}
   - ``..bar5``: {name, textColor, backgroundColor}

- ``listen``: {event, method} events for the widget listen to and method to do

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: YES

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- 4 init queries:
- **parsingControl type:** list

   -  1. query for date labels for all column / Structure: {value:,
      label:}
   -  2. query for table left section  / Structure: {labelId: ,label:,
      comment:, childrenIds:, expandable:, children:, expanded:,
      format:}
   -  3. query for cell data / Structure:{value:, disabled:,ordinal:}
   -  4. query for formatting / Structure: {value:, ordinal:}

- cellEdit

   -  query: normal cell edit

- pasteCells

   -  query: in case of paste

Data repository specifics (Comment functionality working with 2 special
event commentEdit and commentShow, these events transfer the clicked
scroll table row information to the comment container's widgets).


SegmentedBarWidget
------------------

Overview
~~~~~~~~

A special multi-section bar chart widget primary used
for statistical analysis



Configuration
~~~~~~~~~~~~~

- ``id``: Widget Id which used for reference in framework
- ``type``: Type of Widget
- ``hideIfNoData``: boolean if true the widget will hide with empty content
- ``listen``: {event, method} events for the widget listen to and method to do
- ``skin``: Selected button skin
- ``dataset``: [dataset1: {value:-300,color:color1,bgColor:color2,separatorVisible:true}

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: YES

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- **1 init query:**

   -  **query for data Structure: {value:}**
   -  **parsingControl type: matrix**


SegmentedControlItemWidget
--------------------------

Overview
~~~~~~~~

Logical widget type to represent the
SegmentedControlWidget options. 



Configuration
~~~~~~~~~~~~~

- ``id``: Widget Id which used for reference in framework
- ``type``: Type of Widget
- ``skin``: Selected skin of widget
- ``value``: '1' if the default value is ON, and '0' if the default vaule is OFF
- ``label``: Label of the widget
- ``action``: Action of Segmented Control Item (scroll, open or launch)
- ``selected``: true false value: sign which Item of SegmentedControl is active

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: NO



SegmentedControlWidget
------------------

Overview
~~~~~~~~

This widget is used to switch between displaying
different sets of data.



Configuration
~~~~~~~~~~~~~

- ``id``: widget id which used for reference in framework
- ``type``: type of widget
- ``skin``: skin of the widget
- ``listen``: {event, method} events for the widget listen to and method to do

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: NO


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
            id: 'hrdemoPeopleServiceTeamEditorRow2Cell1SegmentedControl',
            type: SegmentedControlWidget,
            width: '320',
            skin: 'segmented',
            marginBottom: '5px',
            widgets: [

                {
                    id: 'hrdemoPeopleServiceTeamEditorRow2Cell1SegmentedControlItem1',
                    type: SegmentedControlItemWidget,
                    action: 'segmentedControlTab1',
                    skin: 'segmented_left_hrdemo',
                    selected: true,
                    label: 'Editor',
                },
                {
                    id: 'hrdemoPeopleServiceTeamEditorRow2Cell1SegmentedControlItem2',
                    type: SegmentedControlItemWidget,
                    action: 'segmentedControlTab2',
                    skin: 'segmented_right_hrdemo',
                    selected: false,
                    label: 'List',
                }
   }

    // repository.js


      hrdemoPeopleServiceTeamEditorRow2Cell1SegmentedControl: {
        switch(db) {
            Utils.setWidgetValue('systemValueTeamEditorTableData', false);
            Utils.setWidgetValue('systemValueClickedElementGroup', false);
            Utils.setWidgetValue('systemValueClickedRow', false);
            Repository.hrdemoPeopleServiceTeamEditorRow1Cell1Button.clearValues();
            Api.openPage('hrdemoPeopleServiceTeamList');
        }
    },
    },


ShadowWidget
-------------

Overview
~~~~~~~~

This widget is not displayed. Its purpose is background data query.


Configuration
~~~~~~~~~~~~~

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: NO


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
          id: 'hrdemoPeopleServiceTeamEditorShadow',
          type: ShadowWidget
   }

    // repository.js


      hrdemoPeopleServiceTeamEditorShadow: {
        initFinished() {
            Api.forceRefresh('hrdemoPeopleServiceTeamEditorLevel1GridTable');
        },
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Caption, Attributes/Normal_Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        group: v('systemValueSelectedGroup')
                    };
                },
                parsingControl: {
                    type: 'object',
                    query:
                        {
                            value: (r, x) => {
                                for (let i = 0; i < r.Cells.length; ++i) {
                                    v('systemValueSelectedEmployees').push(r.Cells[i].Members[0].Name);
                                    v('systemValueSelectedEmployeeHierarchy').push({
                                        department: r.Cells[i + 1].FormattedValue,
                                        team: r.Cells[i].FormattedValue,
                                        employee: r.Cells[i].Members[0].Name
                                    });
                                    i++;
                                }
                                return true;
                            }
                        }
                }
            }
    },
    },

SimulationPanelSliderWidget
------------------------------

Overview
~~~~~~~~

Configuration
~~~~~~~~~~~~~

- ``id``: widget id which used for reference in framework
- ``type``: type of widget
- ``minValue``:
- ``maxValue``:
- ``currentValue``:
- ``unit``:
- ``ordinal``:
- ``parentWidgetId``:

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: NO



SimulationPanelWidget
-----------------------

Overview
~~~~~~~~

Configuration
~~~~~~~~~~~~~

- ``id``: widget id which used for reference in framework
- ``type``: type of widget
- ``skin``: skin of the widget
- ``listen``: {event, method} events for the widget listen to and method to do

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: NO

SliderWidget
-------------

Overview
~~~~~~~~

This widget allows users to set or adjust a value.  



Configuration
~~~~~~~~~~~~~

- ``id``: Widget Id which used for refeerence in framework
- ``type``: Type of Widget
- ``width``: width of the button (%), if hasLayout == true, default: 50%
- ``hideIfNoData``: boolean if true the widget will hide with empty content
- ``largeIncrement``: The larger value you can increase
- ``listen``: {event, method} events for the widget listen to and method to do
- ``unit``:
- ``updateableWidgetId``:
- ``updateableWidgetValueHandler``:
- ``updateCallBack``:
- ``originalValue``:
- ``maxRange``: Maximal value
- ``minRange``: Minimal value
- ``skin``: Selected skin of the widget
- ``smallIncrement``: The smaller value you can increase
- ``title``: title of the widget
- ``trackValueFontColor``: color of the track value label font
- ``trackValueFontSize``: size of the track value label font
- ``trackValueMagnifierLabelFontColor``: color of the magnifier label font
- ``trackValueMagnifierLabelFontSize``: size of the magnifier label font
- ``value``: default value of slider (can be array)
- ``buttonsVisible``: if buttons visible (flag)
- ``legend``: gives a description of each series. ([{name: 'First Val', color: 'red'}, {name: 'Second Val', color: 'pink'}, {name: 'Third Val', color: 'orange'}])
- ``visible``: if widget visible (flag)

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: 1

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- state or init query if data feed from TM1:

   -  **parsingControl type:** matrix

      -  cols
      -  minValue
      -  maxValue
      -  currentValue
      -  unit
      -  ordinal


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
           id: 'hrdemoUpdateValueGridRow4Slider',
            type: SliderWidget,
            width: '320px',
            hideIfNoData: false,
            skin: 'hrdemo_cell_value',
            minRange: -100,
            maxRange: 100,
            alignment: 'center',
            unit: '%',
            updateableWidgetId: 'hrdemoUpdateValueGridRow3TextBox',
            trackFillStartValue: -100,
            buttonsVisible: false,
            listen: [
                {
                    event: 'launch.hrdemoUpdateValueGridRow3Button.finished',
                    method: 'refreshWithoutLoader'
                }
                                        ]
   }

    // repository.js


       hrdemoUpdateValueGridRow4Slider: {
        getOriginalValue() {
            return Utils.parseNumber(Utils.replaceDecimal(v('hrdemoUpdateValueGridRow2Text2').value), 'HU-hu');
        },
        init() {
            if (v('hrdemoUpdateValueGridRow2Text2').value) {
                return {
                    value: 0,
                    updateableWidgetValueHandler: (sliderValue) => {
                        let originalValue = this.getOriginalValue(),
                            newValue;

                        if (sliderValue === 0) {
                            newValue = originalValue;
                        } else {
                            newValue = (originalValue * (1 + (sliderValue / 100))).toFixed(2);
                        }

                        return newValue;
                    },
                    calculateSliderValue: (value) => {
                        let sliderWidgetValue = v('hrdemoUpdateValueGridRow4Slider');
                        sliderWidgetValue.value = value;

                        Utils.setWidgetValue('hrdemoUpdateValueGridRow4Slider', sliderWidgetValue);

                        let originalValue = this.getOriginalValue();

                        if (originalValue === 0) {
                            return originalValue;
                        }

                        return ((value / originalValue) - 1) * 100;
                    }
                };
            }
            return {};
        }
    },
    },



StackedColumnChartWidget
----------------
Overview
~~~~~~~~

A chart widget used to show how a net value is arrived
at, by breaking down the aggregate effect of negative and positive contributions.

Configuration
~~~~~~~~~~~~~

- ``fontFamily``: font family of the chart
- ``fontSize``: font size of the chart
- ``fontStyle``: font style of the chart
- ``fontWeight``: font weight of the chart
- ``fontLineHeight``: font line height of the chart
- ``fontColor``: font color of the chart
- ``gridColor``: grid color of the chart
- ``gridWidth``: gird Width of the chart
- ``xAxisGridDisplay``: true or false
- ``yAxisGridDisplay``: true or false
- ``aspectRatio``:
- ``maintainAspectRatio``: true or false
- ``tooltipsEnabled``: true or false
- ``animationEnabled``: true or false
- ``rightBorderVisible``: true or false, visible of the right border
- ``rightBorderWidth``: width of the right border
- ``rightBorderColor``: color of the right border
- ``topBorderVisible``: true or false, visible of the top border
- ``topBorderWidth``: width of the top border
- ``topBorderColor``: color of the top border
- ``interactionMode``:
- ``interactionAxis``:
- ``interactionIsIntersect``: true or false
- ``lineColor``: color of the line
- ``lineWidth``: width of the line
- ``lineTension``: Tension of the line
- ``barBorderColor``: Color of the border bar
- ``barBorderRadius``: Radius of the border bar
- ``barBorderWidth``: width of the border bar
- ``barInflateAmount``:
- ``barPercentage``: percentage of the bar
- ``barCategoryPercentage``:
- ``barThickness``: thickness of the bar
- ``barMaxThickness``: max thickness of the bar
- ``barMinLength``: min length of the bar
- ``canvasPaddingTop``: paddingTop of the canvas
- ``canvasPaddingRight``: paddingRight of the canvas
- ``canvasPaddingBottom``: paddingBottom of the canvas
- ``canvasPaddingLeft``: paddingLeft of the canvas
- ``legendVisible``: true or false, Visible of the legend
- ``legendPosition``: position of the legend
- ``legendAlign``: alignment of the legend
- ``legendFontFamily``: family of the legend
- ``legendFontSize``: font size of the legend
- ``legendFontStyle``: font style of the legend
- ``legendFontWeight``: font weight of the legend
- ``legendFontLineHeight``: font line height of the legend
- ``xAxisBorderDisplay``: true or false, display the border of x axis
- ``xAxisDisplay``: true or false, display the x axis
- ``xAxisAlignToPixels``: true or false, align the x axis to pixels
- ``xAxisStacked``: true or false
- ``xAxisBorderColor``: Color of the x axis border
- ``xAxisBorderWidth``: width of the x axis border
- ``xAxisTicksLabelDisplay``: true or false, display the ticks of the x axis label
- ``xAxisTicksFontColor``: Color of the x axis ticks
- ``xAxisTicksFontFamily``: Font family of the x axis ticks
- ``xAxisTicksFontSize``: Font size of the x axis ticks
- ``xAxisTicksFontStyle``: Font style of the x axis ticks
- ``xAxisTicksFontWeight``: Font weight of the x axis ticks
- ``xAxisTicksFontLineHeight``: Font line height of the x axis ticks
- ``xAxisTicksLabelPadding``: Padding of the x axis ticks label
- ``xAxisGridDisplay``: display of the x axis grid
- ``xAxisGridColor``: color of the x axis grid
- ``xAxisGridOffset``: true or false, offset of the x axis grid
- ``xAxisTicksDisplay``: display of the x axis ticks
- ``xAxisGridDrawOnChartArea``: Draw on chart area of the x axis
- ``xAxisGridLineWidth``: line width of the x axis grid
- ``yMin``: minimum value of the y axis
- ``yMax``: maximum value of the y axis
- ``yMarginTop``: margin top of the y axis
- ``yMarginBottom``: margin bottom of y axis
- ``yMarginLeft``: margin left of the y axis
- ``yMarginRight``: margin right of the y axis
- ``yAxisDisplay``: ture or false, display the y axis
- ``yAxisAlignToPixels``: true or false, align to pixels of the y axis
- ``yAxisStacked``: true or false
- ``yAxisBorderDisplay``: true or false, display the y axis
- ``yAxisBorderColor``: Color of the y axis border
- ``yAxisBorderWidth``: width of the y axis border
- ``yAxisGridDisplay``: display the y axis grid
- ``yAxisGridDrawOnChartArea``:
- ``yAxisGridLineWidth``: width of the y axis gird line
- ``yAxisTicksDisplay``: display of the y axis ticks
- ``yAxisTicksLabelDisplay``: display of the y axis ticks labels
- ``yAxisTicksFontColor``: font color of the y axis ticks
- ``yAxisTicksFontFamily``: font family of the y axis ticks
- ``yAxisTicksFontSize``: font size of the y axis ticks
- ``yAxisTicksFontStyle``: font style of the y axis ticks
- ``yAxisTicksFontWeight``: font weight of the y axis ticks
- ``yAxisTicksFontLineHeight``: font line height of the y axis ticks
- ``yAxisTicksLabelPadding``: padding of the y axis ticks labels
- ``yAxisTicksCount``: number of y axis ticks
- ``yAxisTicksLimit``: limit of the y axis ticks
- ``yAxisGridColor``: color of the y axis
- ``yAxisGridLinesNum``: number of y axis lines
- ``yAxisShowOnlyZeroLine``: true or false,show only zero line
- ``yAxisUnit``: unit of the y axis
- ``yAxisDecimalNum``: decimal number of the y axis
- ``yAxisSeparatesThousands``: true or false
- ``yAxiyAxisTicksPrecisionFixed``: true or false
- ``labelColor``: Color of the label
- ``labelBackgroundColor``: Color of the label background
- ``labelFontFamily``: Font family of the label
- ``labelFontSize``: Font size of the label
- ``labelFontStyle``: Font style of the label
- ``labelFontWeight``: Font weight of the label
- ``labelFontLineHeight``: Font line height of the label
- ``labelPaddingTop``: padding top of the label
- ``labelPaddingLeft``: padding left of the label
- ``labelPaddingRight``: padding right of the label
- ``labelPaddingBottom``: padding bottom of the label
- ``labelAlign``: align of the label
- ``labelOffset``: offset of the label
- ``labelAnchor``: anchor of the label
- ``labelClamp``: true or false, clamp of the label
- ``labelClip``: true or false, clip of the label
- ``labelBorderRadius``: border radius of the label
- ``arrowEnabled``: true or false
- ``arrowMarginTop``: margin top of the arrow
- ``arrowMarginMiddle``: margin middle of the arrow
- ``arrowMarginBottom``: margin bottom of the arrow
- ``arrowLength``: length of the arrow
- ``arrowLineColor``: line color of the arrow
- ``arrowLineWidth``: line width of the arrow
- ``arrowCircleColor``: circle color of the arrow
- ``arrowCircleRadius``: circle radius of the arrow
- ``arrowCircleWidth``: circle width of the arrow
- ``arrowTriangleColor``: Trinagle color of the arrow
- ``arrowTriangleSize``: triangle size of the arrow
- ``arrowLabelVisible``: true or false
- ``arrowLabelColor``: label color of the arrow
- ``arrowLabelBackgroundColor``: background color of the arrow
- ``arrowLabelFontFamily``: font family of the arrow
- ``arrowLabelFontSize``: font size of the arrow
- ``arrowLabelFontStyle``: font style of the arrow
- ``arrowLabelFontWeight``: font weight of the arrow
- ``arrowLabelFontLineHeight``: font line height of the arrow
- ``arrowLabelPaddingTop``: padding top of the arrow label
- ``arrowLabelPaddingLeft``: padding left of the arrow label
- ``arrowLabelPaddingRight``: padding right of the arrow label
- ``arrowLabelPaddingBottom``: padding bottom of the arrow label
- ``arrowLabelAlign``: align of the arrow label
- ``arrowLabelOffset``: offset of the arrow label
- ``arrowLabelAnchor``: anchor of the arrow label
- ``arrowLabelClamp``: true or false, clamp of the arrow label
- ``arrowLabelClip``: true or false, clip of the arrow label
- ``arrowLabelBorderRadius``: border radius of the arrow label
- ``data``: Data series to be displayed in the widget
- ``hideZeroBars``: true or false, hide bars with zero value
- ``yAxisTicksLimit``: Maximum number of tick lines on Y axis
- ``labelDataPointVisible``: true or false, show label directly at data point
- ``labelDataLabelVisible``: true or false, show label text for data
- ``labelAlignments``: Label alignment direction (e.g. 'start', 'center', 'end')
- ``lalelsForceDisplay``: true or false, force label visibility even in tight spaces
- ``showZeroValueLabels``: true or false, show labels for zero values
- ``manualLabelAlignmentSetting``: true or false, allow manual alignment of labels
- ``labelClickPopup``: ID of the popup to open when label is clicked
- ``openPopupOnLabelClick``: true or false, enable label click to open popup
- ``openendPopupOffsetLeft``: Horizontal offset in pixels for popup opening
- ``openendPopupOffsetTop``: Vertical offset in pixels for popup opening





TextAreaWidget
----------------

Overview
~~~~~~~~

This widget is used for entering multiple lines of
text. The widget is resizable by bottom right corner drag and drop



Configuration
~~~~~~~~~~~~~

- ``id``: widget id which used for reference in framework
- ``type``: type of widget
- ``listen``: {event, method} events for the widget listen to and method to do
- ``editable``: Boolean, It's set editable true or false
- ``skin``: Selected skin of widget:
- ``title``: title of the textbox
- ``titleVisible``: visibility
- ``defaultText``: shown default
- ``tooltip``: Widget tool tip text
- ``tooltipTitle``: WidgetTootTip Title
- ``visible``: if widget visible (flag)
- ``width``: width of the button (%), if hasLayout == true, default: 50%
- ``icon``:
- ``highlight``:
- ``placeholder``:
- ``textAlignment``: alignment of the text
- ``textFontColor``: font color of the text
- ``textFontSzite``: font size of the text
- ``titleFontColor``: font color of the title
- ``titleFontSize``: font size of the title
- ``titleTextAlignment``: alignment of the title

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: YES

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- state or init if text coming from TM1 backend:

   -  **parsingControl type:** object

      -  text
      -  ordinal


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
           id: 'hrdemoSimulationCommentPopupCommentInput',
            type: TextAreaWidget,
            placeholder: 'Add comment ...',
            marginBottom: '30',
            width: '280px',
            height: '105px',
            icon: 'icon-send.png',
            skin: 'comment_message
   }

    // repository.js


          hrdemoSimulationCommentPopupCommentInput: {
        save: {
            url: (db) => {
                return `/api/v1/Processes('zSYS Analogic UI Add Comment')/tm1.ExecuteWithReturn`;
            },
            type: 'POST',
            server: true,
            body: (db) => {
                let parameters = Repository.hrdemoSimulationGridTable.getCommentSaveProcessParameters();
                parameters['comment'] = v('hrdemoSimulationCommentPopupCommentInput.value');
                parameters['activeUser'] = v('activeUser').replace(/\\/g, '/');
                Utils.setWidgetValue('hrdemoSimulationCommentPopupCommentAdded', true);
                return parameters;
            },
            callback() {
                Api.executeQueryRequest(['hrdemoSimulationCommentPopupCommentInput', 'reloadComment']);
            }
        },
        reloadComment: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue)`,
            type: 'POST',
            server: true,
            body: (db) => {
                return Repository.hrdemoSimulationGridTable.getCommentReloadParametersAfterSave();
            },
            parsingControl: {
                type: 'script',
                script: (data) => {
                    let r = {
                        previousCommentId: data.Cells[0].FormattedValue,
                        commentId: data.Cells[1].FormattedValue,
                        text: data.Cells[2].FormattedValue,
                        user: data.Cells[3].FormattedValue,
                        date: data.Cells[4].FormattedValue
                    };
                    Utils.setWidgetValue('hrdemoSimulationCommentPopupLoadedComments', v('hrdemoSimulationCommentPopupLoadedComments').length !== 0 ? [r].concat(v('hrdemoSimulationCommentPopupLoadedComments')) : [r]);
                    Utils.setWidgetValue('hrdemoSimulationCommentPopupLoadFromLoadedComments', true);
                    Api.forceRefresh('hrdemoSimulationCommentPopupPreviousCommentsGridTable');
                    Api.forceRefresh('hrdemoSimulationCommentPopupCommentInput');
                    Api.forceRefresh('hrdemoSimulationCommentPopupControlPanelLoadMoreButton');
                    return {};
                }
            }
        }
    },
    },


TextBoxWidget
-------------

Overview
~~~~~~~~

This widget is used for entering a single line of text.



Configuration
~~~~~~~~~~~~~

- ``id``: widget ID used for reference in framework
- ``type``: type of widget
- ``titleFontSize``: font size of the title
- ``titleFontColor``: font color of the title
- ``textFontSize``: font size of the text
- ``textFontColor``: font color of the text
- ``title``: title of the textbox
- ``titleVisible``: if widget title visible (flag)
- ``defaultText``: shown by default in an empty cell, like a hint for expected content
- ``visible``: if widget visible (flag)
- ``hideIfNoData``: boolean if true the widget will hide with empty content
- ``listen``: {event, method} events for the widget listen to and method to do
- ``skin``: skin of the widget
- ``textBoxType``: type of the textbox (drop-down)
- ``titleTextAlignment``: alignment of the title
- ``textAlignment``: alignment of the text
- ``icon``: icon of the widget (drop-down)n to and method to do
- ``highlight``:
- ``defaultText``:
- ``editable``: Boolean, It's set editable true or false
- ``skin``:


TM1 integration
~~~~~~~~~~~~~~~

- Data connection: OPTIONAL

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- state query or init query. If query is init then:

   -  **parsingControl type:** object

      -  value

- writeEnd query:

   -  optional query, that will be fired every time, once finished
      editing the TextBox (clicked out from the textbox area)


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
         id: 'hrdemoSimulationCompensationChangePopUpGridRow12Cell2TextBox',
         type: TextBoxWidget,
         width: 350,
         marginTop: '10px',
         editable: true,
         skin: 'custom_group',
         height: '40px'
   }

    // repository.js


      hrdemoSimulationCompensationChangePopUpGridRow12Cell2TextBox: {
        init() {
            if (Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').yearAndMonth) {
                return new RestRequest(this.restRequest);
            }
            return [];
        },
        restRequest: {
            url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
            type: 'POST',
            server: true,
            body: (db) => {
                return {
                    version: v('systemValueSelectedVersion2'),
                    period: Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').yearAndMonth,
                    employee: Utils.getGridTableCurrentRow('hrdemoSimulationGridTable')[0].employeeNumber,
                    group: v('hrdemoSimulationGroupSelectorPopUpDropbox').value
                };
            },
            parsingControl: {
                type: 'object',
                query:
                    {
                        value: (r, x) => {
                            Utils.setWidgetValue('systemValueNewBonusValue', r.Cells[x].FormattedValue);
                            Api.updateWidgetsContent(['hrdemoSimulationCompensationChangePopUpGridRow9Cell2Text', 'hrdemoSimulationCompensationChangePopUpGridRow11Cell2Text', 'hrdemoSimulationCompensationChangePopUpGridRow10Cell2TextBox']);
                            return 0;
                        },
                        defaultText: (r, x) => {
                            return 0;
                        }
                    }
            }
        }
    },
    },


TextWidget
----------

Overview
~~~~~~~~

This widget is used to display text



Configuration
~~~~~~~~~~~~~

- ``id``: widget id which used for reference in framework
- ``type``: type of widget
- ``icon``:
- ``iconColor``:
- ``iconCustomEventName``:
- ``iconHeight``:
- ``iconPosition``:
- ``iconWidth``:
- ``title``: title of the widget
- ``body``: text in the body of the widget
- ``titleFontSize``: size of the text in the title
- ``titleFontColor``: color of the text in the title
- ``titleBackgroundColor``:
- ``titleCursor``:
- ``titleFontWeight``:
- ``bodyFontSize``: size of the text in the body
- ``bodyFontColor``: color of the text in the body
- ``bodyBackgroundColor``:
- ``bodyCursor``:
- ``bodyFontWeight``:
- ``skin``: skin of the widget
- ``titleAlignment``: alignment of the title
- ``bodyAlignment``: the alignment of the text in the body
- ``editable``: If the text in the body is editable (flag)
- ``performable``:
- ``visible``: if widget is visible (flag)
- ``ordinal``:
- ``listen``: {event, method} events for the widget listen to and method to do

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: OPTIONAL

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- state query or init query:

   -  **parsingControl type:** object

      -  text


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
         id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow2Text1',
         type: TextWidget,
         titleFontSize: '13',
         title: 'Group - 2023. June',
         marginTop: '15px',
         marginBottom: '15px',
         marginLeft: '9px',
   }

    // repository.js


      hrdemoSimulationCompensationChangeGroupPopUpGridRow2Text1: {
        init() {
            let m = Utils.getGridTableCurrentCell('hrdemoSimulationGridTable').yearAndMonth,
                months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            if (m) {
                let y = m.slice(0, 4) + '. ' + months[Utils.parseNumber(m.slice(4, 6)) - 1];
                return {
                    title: v('hrdemoSimulationGroupSelectorPopUpDropbox').value + ' - ' + '<b style=color:#747B85>' + y + '</b>',
                }
            }
            return {};
        }
    },
    },



ToggleWidget
------------

Overview
~~~~~~~~

The purpose of this widget is to permit the user to
make a binary choice, i.e. a choice between one of two possible mutually
exclusive options. (for example: on-off choice)



Configuration
~~~~~~~~~~~~~

- ``id``: Widget Id which used for reference in framework
- ``type``: Type of Widget
- ``action``: action if button clicked, name of action in repository
- ``confirmMessage``: what confirm message should pop up
- ``groupId``: ID of the connected toggle's, each toggle has to be refer to the same group naming
- ``icon``: selected icon of toggle when ON
- ``iconOff``: selected icon of toggle when OFF
- ``listen``: {event, method} events for the widget listen to and method to do
- ``skin``: Selected button skin
- ``titleFontColor``: color of the button label font
- ``titleFontSize``: size of the button label font
- ``titleOff``: title of OFF state
- ``titleOn``: title of ON state
- ``value``: '1' if the default value is ON, and '0' if the default value is OFF
- ``visible``: if widget visible (flag)
- ``width``: width of the button (%), if hasLayout == true, default: 5
- ``backgroundColor``:
- ``isGridTableHierarchyExpander``:
- ``editable``:
- ``groupId``:
- ``icon``:
- ``iconOff``:
- ``icontFontSize``:
- ``icontFontColor``:
- ``skin``:
- ``titleFontColor``:
- ``titleFontSize``:
- ``titleOn``:
- ``titleOff``:
- ``value``:
- ``backgroundColor``:
- ``editable``:
- ``iconFontSize``:
- ``iconFontColor``:

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: OPTIONAL

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- optional switch query, that can switch for example processes
- optional query for value (0 or 1)
- only url, body and type settings are used. parsingControl settings is
   not available


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
         id: 'hrdemoViewGroupGridTableCell01Toggle1',
             type: ToggleWidget,
             titleFontSize: '13',
             skin: 'page_toggle',
             iconColor: '#007AFF',
             icon: 'icon-checkbox-on11',
             iconOff: 'icon-checkbox-off1',
             titleFontWeight: '600'
   }

    // repository.js


      hrdemoGroupsRow1Cell1Button: {
        launch() {
            Api.openPage('hrdemoMain');
        }
    },

TornadoChartWidget
------------------

Overview
~~~~~~~~

A special bar chart widget used for sensitivity
analysis

Configuration
~~~~~~~~~~~~~

- ``id``: widget id which used for reference in framework
- ``type``: type of widget
- ``title``: title of the widget
- ``xAxisLabel``: label of the x-axis
- ``baseValue``: base value of the chart
- ``xMin``: minimum value of the x-axis
- ``xMax``: maximum value of the x-axis
- ``range``: range of the chart (= xMax - xMin)
- ``zoomable``: if the widget can be enlarged (flag)
- ``skin``: skin of the widget
- ``dataset``: $.extend(true, o.dataset || [], data.dataset || demo)
- ``listen``: {event, method} events for the widget listen to and method to do
- ``legendsVisible``: if legends visible
- ``dataset``:
- ``xAxisLabel``:
- ``baseValue``:
- ``legendVisible``:
- ``skin``:
- ``xMin``:
- ``range``:

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: YES

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- 2 init queries:

1. query for base value

**parsingControl type:** object

2. query for data Structure: {leftValue:, leftColor:, rightValue:,
rightColor:, legendLabel:}

**parsingControl type:**

 matrix


Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
          id: 'hrdemoReportChart11',
         type: TornadoChartWidget,
         width: '1700',
         height: '400',
         marginLeft: '1600px',
         dataset: [
             {
                 leftColor: '#F44336',
                 rightColor: '#F44336'
             },
             {
                 leftColor: '#673AB7',
                 rightColor: '#673AB7'
             },

         ],
         xMin: 0,
         xMax: 150,
         skin: ''
   }

    // repository.js


       hrdemoReportChart11: {
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoReportChart11_init'
                    };
                },
                parsingControl: {
                    type: 'script',
                    script: (r) => {
                        let results = [], maxValue = 0, minValue = 0, leftValue, rightValue;
                        for (let x = 0; x < r.Cells.length; x += 2) {
                            leftValue = Utils.parseNumber(r.Cells[x].FormattedValue, 'HU-hu');
                            rightValue = Utils.parseNumber(r.Cells[x + 1].FormattedValue, 'HU-hu');
                            results.push({
                                leftValue: 0 - leftValue,
                                rightValue: rightValue,
                            });
                            if (rightValue > maxValue) {
                                maxValue = rightValue;
                            }
                            if (leftValue > minValue) {
                                minValue = leftValue;
                            }
                        }
                        return {dataset: results, baseValue: 0, xMin: 0, xMax: maxValue * 1.3};
                    }
                }

    },


VerticalLineBoxWidget
------------------------

Overview
~~~~~~~~

Sub-widget of LineAreaChartWidget

Configuration
~~~~~~~~~~~~~

- ``id``: Widget Id which used for reference in framework
- ``type``: Type of Widget
- ``listen``: {event, method} events for the widget listen to and method to do
- ``dataset``: [{lineVisible: boolean, lineStyle: 'dotted'/'solid'/'dashed', lineWidth: int, labelVisible: boolean, titleVisible: int, value: float, label: string, lineColor: string, labelColor: string, titleColor: string, titleBgColor: string},…]

TM1 integration
~~~~~~~~~~~~~~~

- Data connection: YES

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

1. **init query:**

   1. **query for data Structure: {value:}**
   2. **parsingControl type: matrix**

WaterfallWidget
----------

Overview
~~~~~~~~

A chart widget used to show how a net value is arrived
at, by breaking down the aggregate effect of negative and positive
contributions.



Configuration
~~~~~~~~~~~~~

- ``id``: widget id which used for reference in framework
- ``dataset1``: $.extend(true, dataset1Config, d.dataset1 || {legendLabel: 'Dataset One', legendColor: 'pink', datapoints: [{value: 9.06}, {value: -0.06}, {value: 0.5}, {value: 0}, {value: 9.5}]})
- ``dataset2``: $.extend(true, dataset2Config, d.dataset2 || {legendLabel: 'Dataset One', legendColor: 'red', datapoints: [{value: 8.06}, {value: -3.06}, {value: 1.5}, {value: 5}, {value: 4.5}]})
- ``xAxisLabels``: labels of the x-axis
- ``labelVisible``: if label visible (flag)
- ``legendVisible``: if legend visible (flag)
- ``minYAxis``: minimum value of the y-axis
- ``maxYAxis``: maximum value of the y-axis
- ``yAxisGridLineNum``: number of horizontal grid lines
- ``yAxisDecimalNum``:
- ``yAxisUnit``:
- ``defaultColor``: default color of the widget (currently #F3F4F6)
- ``skin``: skin of the widget
- ``yAxisTicksPrecisionFixed``: true or false,
- ``yAxisSeparatesThousands``: true or false,
- ``height``: height of the chart
- ``allowLastColumnToZero``: true or false
- ``allowLastColumnToZero``: true or false, allow the last column to show zero value
- ``labelFontSize``: Font size of the labels
- ``labelHasAction``: true or false, indicates if label has a click action
- ``openPopupOnLabel``: true or false, open a popup when clicking the label
- ``popupToOpenId``: ID of the popup to be opened when label is clicked
- ``xAxisFontSize``: Font size of the X axis labels
- ``yAxisFontSize``: Font size of the Y axis labels


TM1 integration
~~~~~~~~~~~~~~~

- Data connection: not specified

Repository behaviour
~~~~~~~~~~~~~~~~~~~~

- No repository specifics documented.

Usage example
~~~~~~~~~~~~~

.. code-block:: javascript

    // widget-config.js

   {
            id: 'hrdemoReportWaterFall',
         type: WaterFallWidget,
            width: '1600',
            height: '400',
            title: '',
            minYAxis: 0,
            maxYAxis: 200000,
            dataset1 : {showConnectionLines: true, legendLabel: 'Dataset One', legendColor: '#007AFF',
            datapoints:
          [
          {value: 84000, positiveColor: '#B1B3B3', negativeColor: '#B1B3B3'},
          {value: 76000, positiveColor: '#007AFF', negativeColor: '#CFE0F5'},
          {value: -190000, positiveColor: '#007AFF', negativeColor: '#CFE0F5'},
          {value: -210000, displayValue: 210000, positiveColor: '#007AFF', negativeColor: '#CFE0F5'},
          {value: 128300, isTotal: true, positiveColor: '#B1B3B3', negativeColor: '#B1B3B3'},
          {value: 84000, displayValue: -84000, positiveColor: '#007AFF', negativeColor: '#CFE0F5'},
          {value: -75000, displayValue: 75000, positiveColor: '#007AFF', negativeColor: '#CFE0F5'},
          {value: -100000, displayValue: 100000, positiveColor: '#007AFF', negativeColor: '#CFE0F5'},
          {value: 101600, positiveColor: '#B1B3B3', negativeColor: '#B1B3B3'}
            ]
            },
            marginTop: '150',
            marginBottom: '50',
            marginLeft: 300,
            labelVisible: true,
            legendVisible: false,
            yAxisGridLineNum: 4,
            yAxisSeparatesThousands: true,
            xAxisLabels : [
      {value: 'Total Cost 2022'},
      {value: 'Calculated Salary'},
      {value: 'Bonus'},
      {value: 'Auto Allowance'},
      {value: 'Other Benefits'},
      {value: 'Employer Contributions'},
      {value: 'Social Security'},
      {value: 'Pension Fund'},
      {value: 'Health Insurance'}
            ]
   }

    // repository.js

   
          hrdemoReportWaterFall: {
        init: [
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Long_NameENG))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoReportWaterFall_init'
                    };
                },
                parsingControl: {
                    type: 'script',
                    script(r) {
                        let values = r.Cells.map(
                            (elem, index) => r.Cells.slice(
                                0, index + 1).map(
                                e => Utils.parseNumber(e.FormattedValue, 'HU-hu')).reduce(
                                (a, b) => a + b));


                        values.splice(-1, 1);
                        const max = Math.max.apply(this, values),
                            min = Math.min.apply(this, values);

                        return {
                            maxYAxis: String(Math.round((max * 1.01))),
                            minYAxis: String(Math.round((min * 0.99)))
                        };
                    }
                }
            },
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Long_NameENG))`,
                type: 'POST',
                server: true,
                body: (db) => {
                    return {
                        key: 'hrdemoReportWaterFall_init'
                    };
                },
                parsingControl: {
                    type: 'script',
                    script(r) {
                        const process = function (cell, index) {
                            const val = Utils.parseNumber(cell.FormattedValue, 'HU-hu')

                            return {
                                value: val,
                                displayValue: Utils.separatesThousands(val)
                            };
                        }
                        return Utils.getGridtableMatrix(r.Cells, 9, process);
                    }
                }
            }
        ]
    },
    },
   

