Widgets and widget parameters
================================


The function of widget-config.js
---------------------------------

-  describes the parameters of widget types
-  defines which widget is connected to TM1 backend
-  every widget can be modified by changing parameters in widget-config
   during deployment time
-  every widget parameter could be override during a user session in
   data-repository pressing control, this allow dynamic widget
   parameterization depend on data query results
-  the config file is case-sensitive
-  listen is a valid parameter in all widget types, structure of listen:
   [{event, method, (parameter)}…]

Methods
--------

-  refresh
-  refreshWithWaitingForEvent: waits for specified event in parameter
-  parameter is valid only for method refreshWithWaitingForEvent
-  updateContent: updates only the data, not refresh the HTML code

Common Parameters
-----------------

-  marginTop\ **:** pixel count or percent of padding position
-  marginRight\ **:** pixel count or percent of padding position
-  marginBottom\ **:** pixel count or percent of padding position
-  marginLeft\ **:** pixel count or percent of padding position
-  paddingTop\ **:** pixel count or percent of padding position
-  paddingRight\ **:** pixel count or percent of padding position
-  paddingBottom\ **:** pixel count or percent of padding position
-  paddingLeft\ **:** pixel count or percent of padding position
-  width
-  height
-  visible


ActionButtonRowWidget
---------------------

**Description:** A sub-widget built specifically for the
HorizontalTableWidget. It provides action button functionality at the
end of the rows.

**Example:**

|image0|

**Config Parameters:**

-  id\ **:** widget id which used for reference in framework
-  type\ **:** type of widget
-  action\ **:** Performed action on click
-  icon\ **:** icon of action button
-  align\ **:** left or right side of horizontal table
-  **position: position of widget in horizontal table**

**Data connection to TM1:**\ NO

**Data repository specifics:**

-  state or init query if HorizontalTableWidget data feed from TM1 and
   any action defined in widget-config:

-  the query is part of its parent Horizontal table query

-  active

-  choose query:

-  only url, body and type settings are used, parsingControl settings
      is not available

ButtonWidget
-------------

**Description:** With this widget users can make actions (e.g. opening a
site, starting processes etc..) upon touching the button. It can be
labelled with both texts and icons.

|image1|

**Example**:

|image2|

**Config Parameters:**

-  backgroundColor: Background color of the button
-  borderColor: Border color of the button
-  borderWidth: Border width of the button
-  cornerRadius: Corner radius of the button
-  contextMenuEnabled:
-  dividerWidth: Divider width of the button
-  effect: What effect does the button have
-  enabled: true or false, if the button clickable
-  fontBold: font of the labelis bold or not (flag)
-  fontColor: font color of the label
-  fontSize: font size of the label
-  gradient:
-  icon: icon of the button
-  iconColor: color of the icon
-  iconFontSize: font size of the icon
-  iconHeight: height of the icon
-  iconPosition: position of the icon (left or right)
-  iconWidth: width of the icon
-  isInfo: true or false, if the button has info
-  label: label of the button
-  paste:
-  skin: skin of the widget
-  url: if button links to an URL, not an action
-  visible: if widget visible (flag)

**Data connection to TM1:**\ NO

**Data repository specifics:**

-  optional launch query, that can launch for example processes.
-  only url, body and type settings are used. parsingControl settings is
   not available.

.. code-block:: javascript

    Widget Config:

   {
          id: 'hrdemoGroupsRow1Cell1Button',
          type: ButtonWidget,
          icon: 'icon-menu',
          marginTop: '8px',
          iconFontSize: '20',
          iconColor: '#007AFF'
   }

    Repository.js:

   {
      hrdemoGroupsRow1Cell1Button: {
        launch() {
            Api.openPage('hrdemoMain');
        }
    },
   }





ComboChartWidget
------------------

**Description:** A chart widget that allows to combine the features of a
bar chart and a line chart.

|image3|

**Example:**

|image4|

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

**Config Parameters:** 

-  data:
-  datasets:
- paddingTop:
- paddingRight:
- padding Bottom:
- PaddingLeft:
-  tooltipsEnabled\ **:** true or false, parameters of dataset are shown
   on mouse hover
-  tooltipsMode\ **:** mode of hover tooltip menu
-  legendGroupByStack\ **:** makes group from dataset legends
-  skin\ **:** Selected skin of widget
-  plot\ **:** true or false, not just y, but x values are also given
   (not just categories, like years, types, etc.)
-  id\ **:** widget id which used for reference in framework
-  xAxesLabel\ **:** label of X axes
-  xAxesDisplay\ **:** true or false,, default true, display the x axes
-  xAxesGridLinesDisplay\ **:**  true or false, display the x axes grid
   lines
-  xAxesGridLinesDrawBorder\ **:**  true or false, display the x axes
   grid lines drow border
-  xAxesGridLinesDrawOnChartArea\ **:**  true or false, display the x
   axes grid lines draw on chart are
-  xAxesGridLinesDrawTicks\ **:**  true or false, display the x axes
   grid lines draw ticks
-  xAxesGridLinesColor\ **:** color of the x axes grid lines
-  xAxesTicksFontSize\ **:** size of the x axes ticks
-  xAxesTicksFontFamily\ **:** string, default ‘imago, sans-serif’
-  xAxesTicksFontStyle\ **:** string, default ‘bold’
-  xAxesTicksFontColor\ **:** color of the x axes ticks
-  xAxesTicksPadding\ **:** padding between X axes ticks
-  xAxesTicksOffset:
-  xAxesLabelDisplay\ **:**  true or false, display the x axes label
-  xAxesLabelFontSize\ **:** size of the x axes label
-  xAxesLabelFontFamily\ **:** font family of the x axes label
-  xAxesLabelFontColor\ **:** color of the a axes label
-  xAxesLabelFontStyle\ **:** style of the x axes label
-  xAxesLabelPadding\ **:** padding between X axes label
-  xAxesLabelRotation\ **:** vertical, horizontal
-  xAxesStacked\ **:** stack datasets on X axes
-  xAxesTicksBegintAtZero\ **:** true or false, begin the x axes at zero
-  xAxesOffsetGridLines\ **:** if true, grid lines will be shifted to be
   between labels
-  xAxesZeroLineColor\ **:** color of the X axes zero line
-  leftYAxesDisplay\ **:**  true or false, display the left y axes
-  leftYAxesBorderDash\ **:** length and spacing of dashes on grid lines
-  leftYAxesStacked\ **:** stack datasets on Y axes
-  leftYAxesMin\ **:** minimum of the left y axes
-  leftYAxesMax\ **:** max of the left y axes
-  leftYAxesStepSize\ **:** step size of the left y axes
-  leftYAxesZeroLineColor\ **:** color of the left Y axes zero line
-  leftYAxesGridLinesDisplay\ **:**  true or false, display the left y
   axes grid lines
-  leftYAxesGridLinesDrawBorder\ **:** first grid line is visible, even
   if others are not
-  leftYAxesGridLinesColor\ **:** color of the left y axes grid lines
-  leftYAxesGridLinesDrawOnChartArea\ **:** true or false, display the y
   axes grid lines draw on chart are
-  leftYAxesGridLinesDrawTicks\ **:** true or false, display the left y
   axes grid line ticks
-  leftYAxesLabel\ **:** label of the left y axes
-  leftYAxesLabelConcat\ **:** str to add to the left Y axes ticks
-  leftYAxesLabelFontSize\ **:** font size of the left y axes label
-  leftYAxesLabelFontFamily\ **:** font family of the left y axes label
-  leftYAxesLabelFontColor\ **:** font color of the left y axes label
-  leftYAxesLabelFontStyle\ **:** font style of the left y axes label
-  leftYAxesLabelPadding\ **:** padding between Y axes label
-  leftYAxesLabelRotation\ **:** vertical, horizontal
-  leftYAxesTicksBegintAtZero\ **:**  true or false, begin the left y
   axes with zero
-  leftYAxesTicksFontSize\ **:** font size of the left y axes ticks
-  leftYAxesTicksFontFamily\ **:** font family of the left y axes ticks
-  leftYAxesTicksFontStyle\ **:** font style of the left y axes ticks
-  leftYAxesTicksFontColor\ **:** font color of the left y axes ticks
-  leftYAxesTicksPadding\ **:** padding between Y axes ticks
-  leftYAxesTicksDisplay\ **:** true or false, display the left y axes
   ticks
-  leftYAxesTicksOffset\ **:** offset (distance) between ticks of left Y
   axes
-  leftYAxesLabelSeparatesThousands\ **:** Separates the Y Axes
-  rightYAxesBorderDash\ **:**  length and spacing of dashes on grid
   lines
-  rightYAxesTicksBegintAtZero\ **:** begin at zero the right y axes
   ticks
-  rightYAxesTicksPadding\ **:** padding between Y axes ticks
-  rightYAxesTicksDisplay\ **:** true or false, display the right y axes
   ticks
-  rightYAxesGridLinesDisplay\ **:** true or false display the right y
   axes grid lines
-  rightYAxesLabel\ **:** label of the right y axes label
-  rightYAxesLabelDisplay\ **:**  true or false, display the right y
   axes label
-  rightYAxesLabelFontColor\ **:**  color of the right y axes label
-  rightYAxesLabelFontFamily\ **:** font family of the right y axes
   label
-  rightYAxesLabelFontSize\ **:** size of the right y axes label
-  rightYAxesLabelFontStyle\ **:** style of the right y axes label
-  rightYAxesLabelPadding\ **:**  padding between Y axes label
-  rightYAxesLabelRotation\ **:**  vertical, horizontal
-  rightYAxesStacked\ **:** stack datasets on Y axes
-  rightYAxesDisplay\ **:** true or false, display the right y axes
   display
-  rightYAxesGridLinesColor\ **:** color of the right y axes grid lines
-  rightYAxesGridLinesDrawBorder\ **:** border of the right y axes grid
   lines
-  rightYAxesTicksFontColor\ **:** color of the right y axes ticks
-  rightYAxesTicksFontFamily\ **:** font family of the right y axes
   ticks
-  rightYAxesTicksFontSize\ **:** size of the right y axes ticks
-  rightYAxesTicksFontStyle\ **:** style of the right y axes ticks
-  rightYAxesTicksOffset\ **:** offset (distance) between ticks of right
   Y axes
-  canvasHeight\ **:** height of the canvas
-  canvasWidth\ **:** width of the canvas
-  draggable\ **:** true or false, if chart is draggable and moveable
-  responsive\ **:** true or false, chart size depends on screen size
-  aspectRatio:
-  maintainAspectRatio\ **:** true or false, width depends on height
-  bezierCurve\ **:** true or false, display the bezier curve
-  showLinearXAxes\ **:**  true or false, display the linear x axes
-  customLabelsForYAxes:\ **:** Labels For Y Axes like %
-  tooltipsSeparatesThousands:\ **:** Separates the the tooltips

**Data connection to TM1:**\ YES

**Data repository specifics:**

-  2 init queries:

1. query for X-axis labels Structure: {value:, label:}

**parsingControl type:** list

2. query for data Structure: {value:}

**parsingControl type:** matrix

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

    Repository.js
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

**Description:** A logical widget that allows the creation of
multi-layered applications. A ContainerWidget provides the same
functionality as a page widget (contains other widgets) but on top of
the main application UI layer. The widget does not necessarily covers
the whole available screen: it can be in a small area (for example a
popup)

|image5|

**Example:** 

|image6|

**Config Parameters:** 

-  id: widget id which used for reference in framework
-  anchor: anchor to link the container
-  widthStr:
-  heightStr: height of widget (in % or px)
-  offset: size of the offset
-  bgColor: background color of the widget
-  anchorVisible: if anchor visible (flag)
-  anchorOnClick: toggle backdrop (flag)
-  visible:  if widget visible (flag)
-  bgScrollable: scrollability of the background (flag)
-  closeBtn: if widget has a close button(flag)
-  fixed: if widget fixed (flag)
-  position: position of the widget
-  skin: skin of the widget
-  backdrop: boolean if display backdrop, default false
-  closeOnClickBackdrop: boolean, default true
-  heightFixed: boolean, default true
-  positionAndCalculateBestSpace: string (right, left)
-  fadingSpeed: int, default 300

**Data connection to TM1:** NO

.. code-block:: javascript

    Widget Config:

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

**Description:** This widget allows users to select a date

|image7|

**Example:**

|image8|

**Config Parameters:** 

-  allowEmptyDate: Allows selecting no date (empty value)
-  closeAfterSelectingTheDate: Closes the calendar popup after a date is selected
-  datePicked: Initially selected date in the widget (format: yyyy.mm.dd or yyyy.mm)
-  editable: Determines if the input field is editable manually
-  fullYearButtonText: Label of the full year selection button
-  fullYearButtonVisible: Whether the full year button is visible
-  local: Locale used for formatting the displayed date
-  maxDate: Maximum selectable date
-  minDate: Minimum selectable date
-  monthLocale: Locale used for displaying month names (e.g. 'en-US')
-  monthPicker: Enables month-only selection mode (year + month, no days)
-  ordinal: Unique string to distinguish pick actions (used internally)
-  panelFixed: Prevents the calendar popup from closing automatically
-  skin: Selected skin of the widget (affects visual appearance)
-  title: Title text displayed above the date field
-  titleVisible: Determines if the title should be shown


**Data connection to TM1:**\ OPTIONAL

**Data repository specifics:**

-  state query or init query, if no min and max date defined, used query
   is init then:

   -  **parsingControl type:** object

      -  datePicked
      -  minDate
      -  maxDate

-  pick query:

   -  optional query, that will be fired every time, once a date is
      selected

.. code-block:: javascript

    Widget Config:

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

    Repository.js:


     hrdemoAddDummyPopupGridRow5Cell2DatePicker: {
        pick() {
            Api.updateWidgetsContent(['hrdemoAddDummyPopupGridRow9Cell2Text', 'hrdemoAddDummyPopupGridRow11Cell2Text', 'hrdemoAddDummyPopupGridRow10Cell2TextBox']);
        }
    },

   }


DeleteButtonRowWidget
---------------------

**Description:** A sub-widget built specifically for the
HorizontalTableWidget. It provides delete row functionality at the end
of the rows.

**Example:**

|image10|

**Config Parameters:** 

-  id\ **:** widget id which used for reference in framework
-  type\ **:** type of widget
-  action\ **:** executed action. currently choose only (only action is
   delete)
-  deleteMessage\ **:** ‘Are you sure to clear all data of this
   product?’
-  align\ **:** left or right side of horizontal table
-  position\ **:** position of widget in horizontal table

**Data connection to TM1:**\ *NO*

**Data repository specifics:**

-  state or init query if HorizontalTableWidget data feed from TM1 and
   any action defined in widget-config:

   -  the query is part of its parent Horizontal table query

-  choose query:
-  only url, body and type settings are used, parsingControl settings is
   not available


DropBoxWidget
-------------

**Description:** This widget is used to select one single or multiple
items at a time from a given list of items.

|image11|

**Example:**

|image12|

**Config Parameters:** 

-  backdrop: boolean, default false, whether the backdrop is displayed
-  editable: boolean, default true
-  itemIconOff: string, icon
-  itemIconOn: string, icon
-  disableSearch: disable search function
-  panelWidth:\ **:** Width of the panel
-  placeHolder:
-  selectFirst: boolean, default false, if there is no selected item the first displayed as selected
-  serverSideFilter:
-  titleFontSize\ **:** font size of the title
-  titleFontColor\ **:** font color of the title
-  textFontSize\ **:** font size of the text
-  textFontColor\ **:** font color of the text
-  titleTextAlignment\ **:** alignment of the title
-  textAlignment\ **:** alignment of the text
-  title: title of the drop-down
-  titleVisible: if widget title visible (flag)
-  multiselect\ **:** simple or multiple options can be selected (flag)
-  hideIfNoData\ **:** hide widget if no data inside (flag)
-  skin\ **:** skin of the widget

**Data connection to TM1:**\ OPTIONAL

**Code example:**

|image13|

**Data repository specifics:**

-  state query or init query. If no items used query is init then:

   -  **parsingControl type:** list or object (in case of
      PicklistValues)

      -  name
      -  on

-  choose query:

   -  optional query, that will be fired every time, once an element is
      selected or deselected

.. code-block:: javascript

    Repository.js:

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

**Description:** A gauge chart primary used in executive dashboard
reports to show KPI-s.

|image14|

**Example:**

|image15|

**Config Parameters:** 

-  canvasId\ **:**
-  title: Widget title text
-  colors: color of the widget
-  skin\ **:** Selected skin of widget
-  values: The values on the chart
-  valueLabels:
-  labels: the labels on the chart
-  minRange: the minimum value on the chart
-  maxRange: the maximum value on the chart
-  showAxisValues: It's a boolean, default true
-  separatesThousands: It's separates the values
-  fontFamily: font family of the chart

**Data connection to TM1:**\ YES

**Data repository specifics:**

-  **1 init query:**

   -  **query for data Structure: {values: [x, y, z], labels:,
      minRange:, maxRange:}**
   -  **parsingControl type: matrix**
       

.. code-block:: javascript

    Widget Config:

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

    Repository.js:


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

**Description:** Logical widget type representing one cell of a
GridRowWidget

|image16|

**Config Parameters:** 

-  id\ **:** widget id which used for reference in framework
-  type\ **:** type of widget
-  marginLeft\ **:** left margin
-  marginRight\ **:** right margin
-  marginTop\ **:** top margin
-  marginBottom\ **:** bottom margin
-  width\ **:** width of the widget (in % or px)
-  height\ **:** height of the widget
-  visible\ **:**  if widget visible (flag)
-  skin:skin of the widget
-  alignment\ **:** alignment of the widget (dropbox)
-  listen:{event, method} events for the widget listen to and method to
   do

**Data connection to TM1:**\ NO

.. code-block:: javascript

    Widget Config:

   {
        id: 'hrdemoSimulationRow3Cell2',
        type: GridCellWidget,
        alignment: 'center-left',
        width: '65%',
        widgets: []
   }




GridRowWidget
-------------

**Description:** Logical widget type representing one row of a
GridWidget

|image17|

**Config Parameters:** 

-  id\ **:** Widget Id which used for reference in framework
-  type\ **:** Type of Widget
-  visible: Toggle visibility of panel content
-  width: width of the widget
-  height: height of widget
-  marginLeft: pixel count of margin position
-  marginRight: pixel count of margin position
-  marginTop: pixel count of margin position
-  marginBottom: pixel count of margin position
-  alignment: left, center or right side
-  listen: {event, method} events for the widget listen to and method to
   do
-  skin: Selected skin of widget
-  widgets: [{id: ‘tab1name’,label: ‘text’,action: ‘text’,selected:
   true},…

**Data connection to TM1:** 

**Data connection to TM1:**\ NO

.. code-block:: javascript

    Widget Config:

   {
           id: 'hrdemoSimulationRow4',
           type: GridRowWidget,
           width: '100%',
           height: '70px',
           widgets: []
   }




GridTableCellWidget
----------------------

**Description:** Logical widget type representing one cell of a
GridTableWidget. Main purpose: contain one widget from the
followingtypes text, textbox, dropBox, slider, toggle, datepicker  

|image18|

**Example:**

|image19|

**Config Parameters:** 

-  borderLeft:
-  borderRight:
-  cellBackgroundColor
-  cellVisible:
-  cellSkin:
-  cellWidth:
-  cellPaddingRight:
-  cellPaddingLeft:
-  paddingRight
-  paddingLeft
-  skin\ **:** skin of the widget
-  alignment\ **:** string, default center-center alignment of the contained widget (dropbox)
     - top-left
     - center-left
     - bottom-left
     - top-center
     - center-center
     - bottom-center
     - top-right
     - center-right
     - bottom-right
     - top-space-between
     - center-space-between
     - bottom-space-between
-  borderLeft\ **:** if widget has a left border (flag)
-  borderRight\ **:** if widget has a right border (flag)
-  width

**Data connection to TM1:**\ NO


.. code-block:: javascript

    Widget Config:

   {
           id: 'hrdemoSimulationCell4',
           type: GridTableCellWidget,
           width: '100%',
           height: '70px',
           widgets: []
   }



GridTableHeaderCellWidget
-------------------------

**Description:** Logical widget type representing one cell of a
GridTableHeaderRowWidget.

|image20|

**Example:**

|image21|

**Config Parameters:** 

-  cellHeaderSkin:
-  cellVisible:
-  alignment: alignment of the widget

   -  top-left
   -  center-left
   -  bottom-left
   -  top-center
   -  center-center
   -  bottom-center
   -  top-right
   -  center-right
   -  bottom-right
   -  top-space-between
   -  center-space-between
   -  bottom-space-between

-  borderLeft: true or false, toggle the left border visibility of the
   table
-  borderRight: true or false, toggle the right border visibility of the
   table
-  width:

**Data connection to TM1:**\ NO

.. code-block:: javascript

    Widget Config:

   {
           id: 'hrdemoSimulationHeaderCell4',
           type: GridTableHeaderCellWidget,
           width: '100%',
           height: '70px',
           widgets: []
   }


GridTableHeaderRowWidget
------------------------

**Description:**  A technical sub-widget built specifically for the
GridTableWidget. It provides the ability to make and customize a header
for a GridTable. Main purpose: group together
GridTableHeaderCellWidgets.

|image22|

**Example:**

|image23|

**Config Parameters:** 

-  alignment\ **:** alignment of the widget (dropbox)
-  borderBottom\ **:** if widget has a bottom border (flag)
-  borderTop\ **:** if widget has a top border (flag)
-  height:

**Data connection to TM1:** NO


.. code-block:: javascript

    Widget Config:

   {
           id: 'hrdemoSimulationHeaderRow4',
           type: GridTableHeaderRowWidget,
           width: '100%',
           height: '70px',
           widgets: []
   }


GridTableWidget
---------------

 

**Description:** A table-type widget for displaying data in rows and
columns. Unlike the HorizontalTableWidget the content is not read-only
and the gridTableCells can contain nearly any type of widgets. The main
difference between the GridWidget and the GridTableWidget is that in the
GridTableWidget the cells in the same column always contain the same
widget (except for the header row).

|image24|

**Example:**

|image25|

**Config Parameters:** 

-  hideIfNoData:
-  skin: Selected skin of widget
-  maxRows:
-  minWidth:
-  allowFullContentUpdated:
-  allowChangedDataUpdate:
-  allowCopyToClipBoard:
-  disableRefreshGridCell:
-  width:
-  borderTop\ **:** true or false, toggle the top border visibility of
   the table
-  borderBottom\ **:** true or false, toggle the bottom border
   visibility of the table
-  rowHeight\ **:** toggle the height of the row

**Data connection to TM1:**\ YES

**Data repository specifics:** 

-  all data query of widgets in grid table are written here
-  init/state query for each widget (label for button, title/body for
   text, value for slider, etc.)
-  parsing control: matrix, widgets in columns
-  column visibility is also defined here: cellVisible parameter in
   parsing
-  cell background color: cellBackgroundColor parameter in parsing




GridWidget
----------

**Description:** Logical widget type to contain other widgets arranged
in an orthogonal grid. 

|image26|

**Config Parameters:** 

-  id\ **:** widget id which used for reference in framework
-  type\ **:** type of widget
-  skin\ **:** skin of the widget
-  listen\ **:** {event, method} events for the widget listen to and
   method to do

**Data connection to TM1:**\ NO


HistogramComboChartWidget
----------------------------

**Description:** A combination chart which combines the features of a
histogram and a line chart.

|image27|

|image28|

**Config Parameters:** 

-  **id:** Widget Id which used for reference in framework
-  type\ **:** Type of Widget
-  title\ **:** title of the widget
-  paddingTop:
-  paddingRight:
-  paddingBottom:
-  paddingLeft:
-  datasets:
-  xAxesGridLinesDrawOnChartArea:
-  yAxesGridLinesDrawOnChartArea:
-  xAxesLabelRotation:
-  yAxesLabelRotation:
-  xAxesDisplay: Display of the x Axes
-  yAxesGridLinesDrawBorder: display the lines on y axes
-  xAxesGridLinesDrawBorder: display the lines on x axes
-  yAxesTicksPadding: Padding of the y Axes ticks
-  xAxesTicksPadding: Padding of the x Axes ticks
-  xAxesTicksOffset: Off sett of the x Axes ticks
-  yAxesTicksOffset: Off sett of the y Axes ticks
-  xAxesLabelDisplay: Boolean, display of the x Axes label
-  yAxesLabelDisplay: Boolean, display of the y Axes label
-  xAxesLabelFontSize: Font size of the x Axes label
-  yAxesLabelFontSize: Font size of the y Axes label
-  yAxesLabelPadding: Padding of the y axes label
-  xAxesLabelPadding: Padding of the x axes label
-  aspectRatio:
-  maintainAspectRatio:
-  datasetHistogram\ **:** dataset of the histogram
-  datasetsLine\ **:** dataset of the line(s)
-  listen\ **:** {event, method} events for the widget listen to and
      method to do
-  xAxesGridLinesDisplay\ **:** true or false, display the x axes
      grid lines
-  xAxesGridLinesColor\ **:** color of the x axes grid lines
-  xAxesTicksFontSize\ **:** size of the x axes ticks
-  xAxesTicksFontFamily\ **:** font family of the x axes ticks
-  xAxesTicksFontStyle\ **:** font style of the x axes ticks
-  xAxesTicksFontColor\ **:**  color of the x axes ticks
-  yAxesDisplay\ **:**\ true or false, display the y axes
-  yAxesGridLinesDisplay\ **:**   true or false, display the y axes
      grid lines
-  yAxesGridLinesColor\ **:** color of the y axes grid lines
-  yAxesTicksFontSize\ **:** size of the y axes ticks
-  yAxesTicksFontFamily\ **:** font family of the y axes ticks
-  yAxesTicksFontStyle\ **:** font style of the y axes ticks 
-  yAxesTicksFontColor\ **:**  color of the y axes ticks
-  xAxesLabelFontFamily\ **:** font family of x axes label
-  xAxesLabelFontColor\ **:** color of the x axes label
-  yAxesLabelFontFamily\ **:** font family y axes label
-  yAxesLabelFontColor\ **:** color of the y axes label
-  yAxisStacked\ **:**  stack datasets on Y axes
-  xAxisLabel\ **:** label of the x axis
-  yAxisLabel\ **:** y axis label
-  histYAxisBufferTop\ **:** buffer on the top of the maximum value
      (%) on the histogram
-  histYAxisBufferBottom\ **:** buffer on the bottom of the minimum
      value (%) on the histogram
-  lineYAxisBufferTop\ **:** buffer on the top of the maximum value
      (%) on the line
-  lineYAxisBufferBottom\ **:** buffer on the bottom of the minimum
      value (%) on the line
-  yAxesGridLinesNum\ **:** number of grid line on Y axes
-  widgets\ **:** segmentedBar widget ID (see on figure)

**Data connection to TM1:** YES

**Data repository specifics:**

-  2 init queries:

1. query for X-axis labels Structure: {value:, label:}

**parsingControl type:** list

2. query for data Structure: {x: left side of histogram bar, /x value of
line point, y: height of histogram bar/y value of line point}

**parsingControl type:** matrix


HorizontalTableWidget
---------------------

**Description:** A table-type widget for displaying data in rows and
columns. Includes some limited interactive functionality (buttons,
search field), but the content of the cells is read-only.

|image29|

**Example:**

|image30|

**Config Parameters:** 

-  columnNames: list of column name: ['column1', 'column2',...]
-  columnTypes: list of column type: ['int', 'string',...]
-  columnWidths: list of column width(pixel): ['200', '300',...]
-  searchField\ **:** toggle Search widget component visibility
-  selectFirst:
-  fadeOutNum\ **:** max displayed rows without scrolling, default 10
-  hideIfNoData:
-  multiselect:
-  skin\ **:** skin of the widget
-  selectedRowBackgroundColor

**Data connection to TM1:**\ YES

**Data repository specifics:**

-  state or init query if data feed from TM1:

   -  **parsingControl type:** matrix

      -  value
      -  editable
      -  ordinal

-  cellEdit query: 

   -  fired every time, once a cell is editable and edited by the user
      {value: r.Cells[x].FormattedValue, editable: false, ordinal: x};
      return {active: true}


ImageWidget
------------

**Description:** This widget is used for displaying images and photos.

|image31|

**Config Parameters:** 

-  icon: Icon of widget
-  fileName: if image is not an icon, name of the image file needs to be
   uploaded under
   ..\AnalogicDeployments\template\Skins\\\ *usedSkin*\\images\.
-  title: title of the image widget
-  skin: Selected skin of widget

**Data connection to TM1:** NO

.. code-block:: javascript

    Widget Config:

   {
          id: 'hrdemoSettingsRow1Cell1Logo',
          type: ImageWidget,
          titleFontColor: '#AEAEB2',
          fileName: 'knowledgeseed_stratos.png',
          titleFontSize: '22px',
          width: 290,
          height: 90
   }

ImageUploadWidget
------------

**Description:** This widget is used for uploading images and photos.


**Config Parameters:** 

-  allowedMimeTypes: Allowed MIME types for file upload
-  allowedWidthInPixel: Maximum allowed width of uploaded image in pixels
-  allowedHeightInPixel: Maximum allowed height of uploaded image in pixels
-  backgroundColor: Background color of the widget
-  borderColor: Color of the border around the widget
-  borderWidth: Width of the border in pixels
-  cornerRadius: Radius of the widget's corners in pixels
-  dividerWidth: Width of the divider line between elements
-  effect: Visual effect applied to the widget
-  fontBold: Whether the text should be bold
-  fontColor: Color of the text
-  fontSize: Size of the font used for text
-  gradient: Background gradient style
-  icon: Icon of the widget
-  iconHeight: Height of the icon in pixels
-  iconPosition: Position of the icon (e.g., left, right)
-  iconWidth: Width of the icon in pixels
-  label: Text label shown on the widget
-  maxFileSize: Maximum total upload size in megabytes
-  maxFileSizePerFile: Maximum file size per individual file in megabytes
-  progressVisible: Show progress bar during upload
-  skin: Selected skin of the widget
-  uploadSuccessMessage: Message shown after successful upload
-  showUploadSuccessMessage: Whether to show success message after upload
-  skipStoppingTheLoaderAfterSuccessUpload: Skip hiding the loader after successful upload


**Data connection to TM1:** NO

PasswordTextWidget
------------

**Description:** This widget is used for Passwords

**Config Parameters:** 

-  id: Unique identifier of the widget, used for binding value and events
-  skin: Selected skin style for the widget (affects styling via class name)
-  value: Initial value of the password field (optional, not explicitly used here but can be set programmatically)



**Data connection to TM1:** NO


RichTextWidget
------------

**Description:** This widget is used for text editing

**Config Parameters:** 

-  bold: Enables bold text formatting in the editor
-  italic: Enables italic text formatting in the editor
-  underline: Enables underline formatting
-  leftAlign: Enables left text alignment
-  centerAlign: Enables center text alignment
-  rightAlign: Enables right text alignment
-  justify: Enables justified text alignment
-  ol: Enables ordered (numbered) list formatting
-  ul: Enables unordered (bullet) list formatting
-  heading: Enables heading/title formatting
-  fonts: Allows changing fonts in the editor
-  fontList: List of available font families
-  fontColor: Enables font color selection
-  backgroundColor: Enables background color selection
-  fontSize: Enables font size selection
-  imageUpload: Allows inserting uploaded images
-  fileUpload: Allows uploading and inserting files
-  videoEmbed: Allows embedding videos
-  urls: Enables hyperlink insertion
-  table: Enables inserting tables into the editor
-  removeStyles: Allows removing inline styles
-  code: Enables HTML source code editing
-  colors: Custom color palette for text and background
-  youtubeCookies: Whether to allow YouTube cookies in embedded videos
-  preview: Enables live preview mode
-  undoRedo: Enables undo and redo functionality
-  placeholder: Placeholder text shown when editor is empty
-  skin: Selected skin style for the editor appearance




**Data connection to TM1:** NO

LineAreaChartWidget
----------------------

|image32|

**Example:**

|image33|

**Config Parameters:** 

-  id\ **:** widget id which used for reference in framework
-  type: Type of Widget
-  title: Widget title text
-  listen: {event, method} events for the widget listen to and method to
   do
-  skin: Selected skin of widget
-  datasets: [{legendLabel: string, borderColor: string, borderWidth:
   int, backgroundColor: string, fill: boolean, lineTension: float,
   pointRadius: int},…]
-  legendSkin\ **:** Selected skin of widget
-  xAxisLabel\ **:** label of X axes
-  xAxesDisplay\ **:** true or false,, default true, display the x axes
-  xAxesGridLinesDisplay\ **:**  true or false, display the x axes grid
   lines
-  xAxesTicksDisplay: the ticks of the X axes
-  xAxesTicksLabelDisplay: the labes of the ticks of the Y axes
-  xAxesGridLinesDrawBorder\ **:**  true or false, display the x axes
   grid lines drow border
-  xAxesGridLinesColor\ **:** color of the x axes grid lines
-  xAxesTicksFontSize\ **:** size of the x axes ticks
-  xAxesTicksFontFamily\ **:** string, default ‘imago, sans-serif’
-  xAxesTicksFontStyle\ **:** string, default ‘bold’
-  xAxesTicksFontColor\ **:** color of the x axes ticks
-  xAxesTicksPadding\ **:** padding between X axes ticks
-  xAxesLabelDisplay\ **:**  true or false, display the x axes label
-  xAxesLabelFontSize\ **:** size of the x axes label
-  xAxesLabelFontFamily\ **:** font family of the x axes label
-  xAxesLabelFontColor\ **:** color of the a axes label
-  xAxesLabelFontStyle\ **:** style of the x axes label
-  xAxesLabelPadding\ **:** padding between X axes label
-  xAxesLabelRotation\ **:** vertical, horizontal
-  xAxesTicksOffset: Off sett of the x Axes ticks
-  xAxesOffset: Off sett of the X
-  xAxesOffsetGridLines\ **:** if true, grid lines will be shifted to be
   between labels
-  xAxesOffsetRight: Off sett of the X on right
-  xAxesOffsetLeft: Off sett of the X on left
-  xMin: the max value of theX axis
-  yAxisLabel\ **:** label of Y axes
-  yAxisDisplay\ **:**  true or false, display the left y axes
-  yAxesGridLinesDisplay\ **:**  true or false, display the left y axes
   grid lines
-  yAxesGridLinesDrawBorder\ **:** first grid line is visible, even if
   others are not
-  yMin: the max value of the Y axis
-  yAxesTicksDisplay: the ticks of the Y axes
-  yAxesTicksLabelDisplay: the labes of the ticks of the Y axes
-  yAxesGridLinesColor\ **:** color of the left y axes grid lines
-  yAxesLabel\ **:** label of the left y axes
-  yAxesLabelDisplay\ **:**  true or false, display the y axes label
-  yAxesLabelConcat\ **:** str to add to the left Y axes ticks
-  yAxesLabelFontSize\ **:** font size of the left y axes label
-  yAxesLabelFontFamily\ **:** font family of the left y axes label
-  yAxesLabelFontColor\ **:** font color of the left y axes label
-  yAxesLabelFontStyle\ **:** font style of the left y axes label
-  yAxesLabelPadding\ **:** padding between Y axes label
-  yAxesLabelRotation\ **:** vertical, horizontal
-  yAxesTicksOffset: Off sett of the Y Axes ticks
-  yAxesTicksBegintAtZero\ **:**  true or false, begin the left y axes
   with zero
-  yAxesStacked: true or false,
-  yAxesUnit:
-  yAxesDecimalNum:
-  yAxesSeparatesThousands: true or false,
-  yAxesTicksPrecisionFixed: true or false,
-  yAxesTicksFontSize\ **:** font size of the left y axes ticks
-  yAxesTicksFontFamily\ **:** font family of the left y axes ticks
-  yAxesTicksFontStyle\ **:** font style of the left y axes ticks
-  yAxesTicksFontColor\ **:** font color of the left y axes ticks
-  yAxesTicksPadding\ **:** padding between Y axes ticks
-  yAxesTicksDisplay\ **:** true or false, display the left y axes ticks
-  yAxesTicksOffset\ **et:** offset (distance) between ticks of left Y
   axes
-  data
-  defaultBezierCurveTension
-  labelClickPopup
-  manualLabelAlignment
-  openPopupOnLabelClick
-  openendPopupOffsetLeft
-  openendPopupOffsetTop
-  yAxesOffset
-  yAxesOffsetBottom
-  yAxesOffsetTop
-  yMax
-  tooltipsEnabled: Boolean , it's enable the mouse over info
-  tooltipsMode:
-  tooltipsIntersect: Boolean
-  aspectRatio:
-  maintainAspectRatio: Boolean




**Data connection to TM1:**\ YES

**Data repository specifics:**

-  2 init queries:

1. query for X-axis labels Structure: {value:, label:}

**parsingControl type:** list

2. query for data Structure: {value:}

**parsingControl type:** matrix

.. code-block:: javascript

    Widget Config:

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

    Repository.js:


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

**Description:** A combination chart which combines the features of a
scatter plot diagram and a line chart.

**Example**:

|image34|

**Config Parameters:** 

-  datasets:
-  legendVisible: Boolean, Set the visibility of the legend
-  canvasPaddingTop:
-  canvasPaddingRight:
-  canvasPaddingBottom:
-  canvasPaddingLeft:
-  tooltipsEnabled: Boolean, Mouse Over
-  tooltipsMode:
-  aspectRatio:
-  maintainAspectRatio:
-  xAxisVisible: Boolean, It's set the visibility of the x Axis
-  xAxisGridLinesDisplay:  Boolean, It's set the visibility of the x Axis Grid Lines
-  xAxisGridLinesDrawOnChartArea:  Boolean, It's set the visibility of the x Axis GridLines on chart
-  xAxisTicksDisplay: Boolean, It's set the visibility of the x Axis ticks
-  xAxisTicksLabelDisplay: Boolean, It's set the visibility of the x Axis ticks label
-  xAxisTicksStepSize: It's set the step of the x Axis ticks
-  xAxisOffsetGridLines: Boolean, It's set the off sett of the y axis
-  yAxisVisible: Boolean, It's set the visibility of the x Axis
-  yAxisGridLinesDisplay:  Boolean, It's set the visibility of the y Axis Grid Lines
-  yAxisGridLinesDrawOnChartArea: Boolean, It's set the visibility of the y Axis GridLines on chart
-  yAxisTicksDisplay: Boolean, It's set the visibility of the y Axis ticks
-  yAxisTicksLabelDisplay: Boolean, It's set the visibility of the y Axis ticks label
-  xAxisTicksFontSize: It's set the size of the x axis ticks font size
-  yAxisTicksFontSize: It's set the size of the y axis ticks font size
-  xAxisTicksFontFamily: It's set the size of the x axis ticks font family
-  yAxisTicksFontFamily: It's set the size of the y axis ticks font family
-  xAxisTicksFontStyle: It's set the size of the x axis ticks font style
-  yAxisTicksFontStyle: It's set the size of the y axis ticks font style
-  xAxisTicksFontColor: It's set the size of the x axis ticks font color
-  yAxisTicksFontColor: It's set the size of the y axis ticks font color
-  xAxisTicksPadding: It's set the size of the x axis ticks padding
-  yAxisTicksPadding: It's set the size of the y axis ticks padding
-  xAxisTicksOffset: It's set the size of the x axis ticks off set
-  yAxisTicksOffset: It's set the size of the y axis ticks off set
-  yAxisTicksPrecision: It's set the size of the y axis ticks precision
-  yAxisTicksPrecisionFixed: Boolean, It's set the size of the y axis ticks precision
-  yAxisGridLinesNum: Boolean, It's set the size of the y axis gird line nuzms
-  rightBorderVisible: Boolean, It's set the visibility of the right border
-  topBorderVisible: Boolean, It's set the visibility of the top border
-  xMin: It's set the size of the x axis min value
-  xMax: It's set the size of the x axis max value
-  yMin: It's set the size of the y axis min value
-  yMax: It's set the size of the y axis max value
-  xAxisOffset: Boolean, It's set the visibility of the x axes off set
-  xAxisOffsetRight: It's set the visibility of the x axes off set right
-  xAxisOffsetLeft: It's set the visibility of the x axes off set left
-  yAxisSeparatesThousand: It's seperate the y axis
-  yAxisTicksPrecision:
-  yAxisTicksPrecisionFixed:
-  yAxisSeparatesThousands:
-  yAxisGridLinesNum:
-  yAxisUnit:
-  bezierCurveBorderWidth:
-  bezierCurveTension:
-  auxLineColor:
-  auxLineWidth:
-  auxLineDash:

.. code-block:: javascript

    Widget Config:

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

    Repository.js:


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

**Description:** Logical widget type to contain every widget that are
displayed in a single page. 

**Example:**

|image35|

**Config Parameters:** 

-  id\ **:** widget id which used for reference in framework
-  type\ **:** type of widget
-  listen\ **:** {event, method} events for the widget listen to and
   method to do
-  **widgets: contains all widgets on the page (eg.:
   BusinessCaseDashboard, BusinessCaseDashboardDraft, etc.)**

**Data connection to TM1:**\ NO

PanelWidget
-----------

**Description:** Logical widget type for containing other widgets. A
legacy widget type from the 1.0 version of the framework (currently the
GridWidget provides the same functionality.

**Config Parameters:** 

-  id\ **:** Widget Id which used for reference in framework
-  type\ **:** Type of Widget
-  widgets: widget list, contains all widget on selected page
-  width: width of widget
-  listen: {event, method} events for the widget listen to and method to
   do
-  skin:

**Data connection to TM1:** NO


PieChartWidget
--------------

**Description:** A standard pie chart to show relative sizes of data.

|image36|

**Example**:

|image37|

**Config Parameters:** 

-  id\ **:** Widget Id which used for reference in framework
-  type\ **:** Type of Widget
-  canvasHeight:
-  canvasWidth:
-  data:
-  skin\ **:** selected skin of widget
-  legendSkin\ **:** selected skin of legend
-  labelAlign\ **:** alignment of label on chart (center, end, start)
-  labelDisplay\ **:** toggle visibility of label
-  labelBorderColor\ **:** border color of label rectangle
-  labelBackgroundColor\ **:** background color of label rectangle
-  labelBorderWidth\ **:** border width of label rectangle in pixel
-  labelBorderRadius\ **:** border radius of label rectangle in pixel
-  labelTextAlign:
-  labelAnchor\ **:** defines the anchor point of label (center, end ,
   start)
-  labelPaddingTop\ **:** label top padding in pixel
-  labelPaddingRight\ **:** label right padding in pixel
-  labelPaddingLeft\ **:** label left padding in pixel
-  labelPaddingBottom\ **:** label bottom padding in pixel
-  labelFontSize\ **:** label font size
-  labelFontColor\ **:** color of font
-  labelFontWeight\ **:** weight of fon(normal, bold)
-  aspectRatio:
-  maintainAspectRatio:

**Data connection to TM1:** YES

**Data repository specifics:**

-  1 init query:

1. query for data Structure: {value:,
label:,backgroundColor:,borderWidth:,borderColor:}

**parsingControl type:** list

example response:

.. code-block:: javascript

    Widget Config:

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

    Repository.js:


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

**Description:** 

**Example**:

**Config Parameters:** 

-  id\ **:** Widget Id which used for reference in framework
-  selectorTreeColNames: [‘Dimensions’, ‘Hierarchies’, ‘Subsets’,
   ‘Elements’]
-  colors:
-  data:
-  presetData:
-  tree:

**Data connection to TM1:** YES

**Data repository specifics:**


RadarChartWidget
------------------

**Description:** A radar chart is a way of showing multiple data points
and the variation between them. They are often useful for comparing the
points of two or more different data sets.

**Example:**

|image39|

**Config Parameters:** 

*Global parameters:*

-  min: minimum value of the axis
-  max: maximum value of the axis
-  stepSize: step size on the axis
-  ticks: labels of the ticks on the axis
-  tickColor: color of the tick labels
-  tickFontFamily: font family of the tick labels
-  tickFontSize: font size of the tick labels
-  tickFontStyle: font style of the tick labels
-  canvasHeight: height of the canvas
-  canvasWidth: width of the canvas
-  bezierCurveBorderWidth:
-  bezierCurveTension:
-  paddingTop:
-  paddingRight:
-  paddingBottom:
-  paddingLeft:
-  tooltipsEnabled:
-  tooltipsMode:
-  canvas Width: width of the canvas
-  legendSkin: skin of the legend
-  legendVisible: legend visible flag
-  datasets

*Dataset parameters:*

-  backgroundColor: The line fill color.
-  borderCapStyle: Cap style of the line.
-  borderColor: The line color.
-  borderDash: Length and spacing of dashes.
-  borderDashOffset: Offset for line dashes.
-  borderJoinStyle: Line joint style.
-  borderWidth: The line width (in pixels).
-  clip: How to clip relative to chartArea. Positive value allows
   overflow, negative value clips that many pixels inside chartArea.
   ``0`` = clip at chartArea. Clipping can also be configured per side:
   ``clip: {left: 5, top: false, right: -2, bottom: 0}``
-  data: Specified as an array of numbers. Each point in the data array
   corresponds to the label at the same index.
-  fill: How to fill the area under the line.
-  label: The label for the dataset which appears in the legend and
   tooltips.
-  order: The drawing order of dataset. Also affects order for tooltip
   and legend.
-  tension: Bezier curve tension of the line. Set to 0 to draw straight
   lines.
-  pointBackgroundColor: The fill color for points.
-  pointBorderColor: The border color for points.
-  pointBorderWidth: The width of the point border in pixels.
-  pointHitRadius: The pixel size of the non-displayed point that reacts
   to mouse events.
-  pointRadius: The radius of the point shape. If set to 0, the point is
   not rendered.
-  pointRotation: The rotation of the point in degrees.
-  pointStyle: Style of the point.
-  spanGaps: If true, lines will be drawn between points with no or null
   data. If false, points with ``null`` data will create a break in the
   line.

**Data connection to TM1:**\ YES

**Data repository specifics:**

1. init query:

   1. query for data Structure: {value:}
   2. parsingControl type: matrix

.. code-block:: javascript

    Widget Config:

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

    Repository.js:


      hrdemoGroupsRow1Cell1Button: {
        launch() {
            Api.openPage('hrdemoMain');
        }
    },


RadioButtonRowWidget
-----------------------

**Description:** A sub-widget built specifically for the
HorizontalTableWidget. It provides radio button functionality when
selecting rows of the HorizontalTableWidget

**Example:**

|image40|

**Config Parameters:** 

-  id\ **:** widget id which used for reference in framework
-  type\ **:** type of widget
-  action\ **:** executed action. currently choose only
-  align\ **:** left or right side of horizontal table
-  position\ **:** position of widget in horizontal table

**Data connection to TM1:**\ NO

**Data repository specifics:**

-  state or init query if HorizontalTableWidget data feed from TM1 and
   any action defined in widget-config:

   -  the query is part of its parent Horizontal table query

      -  active

-  choose query:

   -  only url, body and type settings are used, parsingControl settings
      is not available


ScrollTableWidget
-------------------

**Description:** A table-type widget for displaying data in rows and
columns. It provides Excel-like functionality including editing cells 

|image41|

**Example:**

|image42|

**Config Parameters:** 

-  id\ **:** widget id which used for reference in framework
-  type\ **:** type of widget
-  headerWidth\ **:** width of header in pixel
-  format\ **:** W-B-N format for default formatting
-  startYear\ **:** Name of the starting year in numbers
-  endYear\ **:** Name of the ending year in numbers
-  **ribbons (hidden in current version):**

   -  bar1:  {name, textColor, backgroundColor}
   -  bar2:  {name, textColor, backgroundColor}
   -  ..bar5: {name, textColor, backgroundColor}

-  listen\ **:** {event, method} events for the widget listen to and
   method to do

**Data connection to TM1:**\ YES

**Data repository specifics:**

-  4 init queries:
-  **parsingControl type:** list

   -  1. query for date labels for all column / Structure: {value:,
      label:}
   -  2. query for table left section  / Structure: {labelId: ,label:,
      comment:, childrenIds:, expandable:, children:, expanded:,
      format:}
   -  3. query for cell data / Structure:{value:, disabled:,ordinal:}
   -  4. query for formatting / Structure: {value:, ordinal:}

-  cellEdit

   -  query: normal cell edit

-  pasteCells

   -  query: in case of paste

Data repository specifics (Comment functionality working with 2 special
event commentEdit and commentShow, these events transfer the clicked
scroll table row information to the comment container’s widgets).


SegmentedBarWidget
------------------

**Description:** A special multi-section bar chart widget primary used
for statistical analysis

|image43|

**Example:**

|image44|

**Config Parameters:** 

-  id\ **:** Widget Id which used for reference in framework
-  type\ **:** Type of Widget
-  hideIfNoData\ **:** boolean if true the widget will hide with empty
   content
-  listen: {event, method} events for the widget listen to and method to
   do
-  skin: Selected button skin
-  dataset\ **:** [dataset1:
   {value:-300,color:color1,bgColor:color2,separatorVisible:true}

**Data connection to TM1:** YES

**Data repository specifics:**

-  **1 init query:**

   -  **query for data Structure: {value:}**
   -  **parsingControl type: matrix**


SegmentedControlItemWidget

**Description:** Logical widget type to represent the
SegmentedControlWidget options. 

|image45|

**Config Parameters:** 

-  id\ **:** Widget Id which used for reference in framework
-  type\ **:** Type of Widget
-  skin: Selected skin of widget
-  value\ **:**  ‘1’ if the default value is ON, and ‘0’ if the default
   vaule is OFF
-  label\ **:** Label of the widget
-  action\ **:** Action of Segmented Control Item (scroll, open or
   launch)
-  selected\ **:** true false value: sign which Item of SegmentedControl
   is active

**Data connection to TM1:** NO



SegmentedControlWidget
------------------

**Description**: This widget is used to switch between displaying
different sets of data.

|image46|

**Example**:

|image47|

**Config Parameters:** 

-  id\ **:** widget id which used for reference in framework
-  type\ **:** type of widget
-  skin\ **:** skin of the widget
-  listen\ **:** {event, method} events for the widget listen to and
   method to do

**Data connection to TM1:**\ NO 

.. code-block:: javascript

    Widget Config:

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

    Repository.js:


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

**Description**: This widget is not displayed. Its purpose is background data query.


**Example**:

**Config Parameters:** 

**Data connection to TM1:**\ NO 

.. code-block:: javascript

    Widget Config:

   {
          id: 'hrdemoPeopleServiceTeamEditorShadow',
          type: ShadowWidget
   }

    Repository.js:


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

SimulationPanelWidget
-----------------------

**Description**: 

**Example**:

**Config Parameters:** 

-  id\ **:** widget id which used for reference in framework
-  type\ **:** type of widget
-  skin\ **:** skin of the widget
-  listen\ **:** {event, method} events for the widget listen to and
   method to do

**Data connection to TM1:**\ NO 

SimulationPanelSliderWidget
------------------------------

**Description**: 

**Example**:

**Config Parameters:** 

-  id\ **:** widget id which used for reference in framework
-  type\ **:** type of widget
-  minValue:
-  maxValue:
-  currentValue:
-  unit:
-  ordinal:
-  parentWidgetId:

**Data connection to TM1:**\ NO 



SliderWidget
-------------

**Description:** This widget allows users to set or adjust a value.  

|image66|

**Example:**

|image50|

|image67|

**Config Parameters:** 

-  id\ **:** Widget Id which used for refeerence in framework
-  type: Type of Widget
-  width: width of the button (%), if hasLayout == true, default: 50%
-  hideIfNoData: boolean if true the widget will hide with empty content
-  largeIncrement: The larger value you can increase
-  listen: {event, method} events for the widget listen to and method to
   do
-  unit:
-  updateableWidgetId:
-  updateableWidgetValueHandler:
-  updateCallBack:
-  originalValue:
-  maxRange\ **:** Maximal value
-  minRange\ **:** Minimal value
-  skin: Selected skin of the widget
-  smallIncrement\ **:** The smaller value you can increase
-  title\ **:** title of the widget
-  trackValueFontColor: color of the track value label font
-  trackValueFontSize: size of the track value label font
-  trackValueMagnifierLabelFontColor: color of the magnifier label font
-  trackValueMagnifierLabelFontSize: size of the magnifier label font
-  value: default value of slider (can be array)
-  buttonsVisible: if buttons visible (flag)
-  legend: gives a description of each series. ([{name: ‘First Val’,
   color: ‘red’}, {name: ‘Second Val’, color: ‘pink’}, {name: ‘Third
   Val’, color: ‘orange’}])
-  visible: if widget visible (flag)

**Data connection to TM1:**\ YES

**Data repository specifics:**

-  state or init query if data feed from TM1:

   -  **parsingControl type:** matrix

      -  cols
      -  minValue
      -  maxValue
      -  currentValue
      -  unit
      -  ordinal

.. code-block:: javascript

    Widget Config:

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

    Repository.js:


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



TextAreaWidget
----------------

**Description:** This widget is used for entering multiple lines of
text. The widget is resizable by bottom right corner drag and drop

|image51|

**Example:**

|image52|

**Config Parameters:** 

-  id\ **:** widget id which used for reference in framework
-  type\ **:** type of widget
-  listen: {event, method} events for the widget listen to and method to
   do
-  editable: Boolean, It's set editable true or false
-  skin: Selected skin of widget:
-  title: title of the textbox
-  titleVisible: visibility
-  defaultText: shown default
-  tooltip: Widget tool tip text
-  tooltipTitle: WidgetTootTip Title
-  visible: if widget visible (flag)
-  width: width of the button (%), if hasLayout == true, default: 50%
-  icon:
-  highlight:
-  placeholder:
-  textAlignment: alignment of the text
-  textFontColor: font color of the text
-  textFontSzite: font size of the text
-  titleFontColor: font color of the title
-  titleFontSize: font size of the title
-  titleTextAlignment: alignment of the title

**Data connection to TM1:** YES

**Data repository specifics:**

-  state or init if text coming from TM1 backend:

   -  **parsingControl type:** object

      -  text
      -  ordinal

.. code-block:: javascript

    Widget Config:

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

    Repository.js:


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

**Description:** This widget is used for entering a single line of text.

|image53|

**Example:**

|image54|

**Config Parameters:** 

-  id\ **:** widget ID used for reference in framework
-  type\ **:** type of widget
-  titleFontSize\ **:** font size of the title
-  titleFontColor\ **:** font color of the title
-  textFontSize\ **:** font size of the text
-  textFontColor\ **:** font color of the text
-  title\ **:** title of the textbox
-  titleVisible\ **:** if widget title visible (flag)
-  defaultText\ **:** shown by default in an empty cell, like a hint for
   expected content
-  visible\ **:** if widget visible (flag)
-  hideIfNoData\ **:** boolean if true the widget will hide with empty
   content
-  listen\ **:** {event, method} events for the widget listen to and
   method to do
-  skin\ **:** skin of the widget
-  textBoxType\ **:** type of the textbox (drop-down)
-  titleTextAlignment\ **:** alignment of the title
-  textAlignment\ **:** alignment of the text
-  icon\ **:** icon of the widget (drop-down)n to and method to do
-  highlight:
-  defaultText:
-  editable: Boolean, It's set editable true or false
-  skin:


**Data connection to TM1:**\ OPTIONAL

**Data repository specifics:**

-  state query or init query. If query is init then:

   -  **parsingControl type:** object

      -  value

-  writeEnd query:

   -  optional query, that will be fired every time, once finished
      editing the TextBox (clicked out from the textbox area)

.. code-block:: javascript

    Widget Config:

   {
         id: 'hrdemoSimulationCompensationChangePopUpGridRow12Cell2TextBox',
         type: TextBoxWidget,
         width: 350,
         marginTop: '10px',
         editable: true,
         skin: 'custom_group',
         height: '40px'
   }

    Repository.js:


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

**Description:** This widget is used to display text

|image56|

**Example**:

|image57|

**Config Parameters:** 

-  id\ **:** widget id which used for reference in framework
-  type\ **:** type of widget
-  icon:
-  iconColor:
-  iconCustomEventName:
-  iconHeight:
-  iconPosition:
-  iconWidth:
-  title\ **:** title of the widget
-  body\ **:** text in the body of the widget
-  titleFontSize\ **:** size of the text in the title
-  titleFontColor\ **:** color of the text in the title
-  titleBackgroundColor:
-  titleCursor:
-  titleFontWeight:
-  bodyFontSize\ **:** size of the text in the body
-  bodyFontColor\ **:** color of the text in the body
-  bodyBackgroundColor:
-  bodyCursor:
-  bodyFontWeight:
-  skin\ **:** skin of the widget
-  titleAlignment\ **:** alignment of the title
-  bodyAlignment\ **:** the alignment of the text in the body
-  editable\ **:** If the text in the body is editable (flag)
-  performable:
-  visible\ **:** if widget is visible (flag)
-  ordinal:
-  listen\ **:** {event, method} events for the widget listen to and
   method to do

**Data connection to TM1:**\ OPTIONAL

**Data repository specifics:**

-  state query or init query:

   -  **parsingControl type:** object

      -  text

.. code-block:: javascript

    Widget Config:

   {
         id: 'hrdemoSimulationCompensationChangeGroupPopUpGridRow2Text1',
         type: TextWidget,
         titleFontSize: '13',
         title: 'Group - 2023. June',
         marginTop: '15px',
         marginBottom: '15px',
         marginLeft: '9px',
   }

    Repository.js:


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

**Description**: The purpose of this widget is to permit the user to
make a binary choice, i.e. a choice between one of two possible mutually
exclusive options. (for example: on-off choice)

|image59|

**Example**:

|image60|

|image61|

**Config Parameters:** 

-  id\ **:** Widget Id which used for reference in framework
-  type: Type of Widget
-  action: action if button clicked, name of action in repository
-  confirmMessage: what confirm message should pop up
-  groupId: ID of the connected toggle’s, each toggle has to be refer to
   the same group naming
-  icon: selected icon of toggle when ON
-  iconOff: selected icon of toggle when OFF
-  listen: {event, method} events for the widget listen to and method to
   do
-  skin: Selected button skin
-  titleFontColor: color of the button label font
-  titleFontSize: size of the button label font
-  titleOff: title of OFF state
-  titleOn: title of ON state
-  **value: ‘1’ if the default value is ON, and ‘0’ if the default value
   is OFF**
-  visible: if widget visible (flag)
-  width: width of the button (%), if hasLayout == true, default: 5
-  backgroundColor:
-  isGridTableHierarchyExpander:
-  editable:
-  groupId:
-  icon:
-  iconOff:
-  icontFontSize:
-  icontFontColor:
-  skin:
-  titleFontColor:
-  titleFontSize:
-  titleOn:
-  titleOff:
-  value:
-  backgroundColor:
-  editable:
-  iconFontSize:
-  iconFontColor:

**Data connection to TM1:**\ OPTIONAL 

**Data repository specifics:**

-  optional switch query, that can switch for example processes
-  optional query for value (0 or 1)
-  only url, body and type settings are used. parsingControl settings is
   not available

.. code-block:: javascript

    Widget Config:

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

    Repository.js:


      hrdemoGroupsRow1Cell1Button: {
        launch() {
            Api.openPage('hrdemoMain');
        }
    },

TornadoChartWidget
------------------

**Description:** A special bar chart widget used for sensitivity
analysis

**Example:** 

|image62|

**Config Parameters:** 

-  id\ **:** widget id which used for reference in framework
-  type\ **:** type of widget
-  title\ **:** title of the widget
-  xAxisLabel\ **:** label of the x-axis
-  baseValue\ **:** base value of the chart
-  xMin\ **:** minimum value of the x-axis
-  xMax\ **:** maximum value of the x-axis
-  range\ **:** range of the chart (= xMax - xMin)
-  zoomable\ **:** if the widget can be enlarged (flag)
-  skin\ **:** skin of the widget
-  dataset\ **:** $.extend(true, o.dataset \|\| [], data.dataset \|\|
   demo)
-  listen\ **:** {event, method} events for the widget listen to and
   method to do
-  legendsVisible\ **:** if legends visible
-  dataset:
-  xAxisLabel:
-  baseValue:
-  legendVisible:
-  skin:
-  xMin:
-  range:

**Data connection to TM1:**\ YES

**Data repository specifics:**

-  2 init queries:

1. query for base value

**parsingControl type:** object

2. query for data Structure: {leftValue:, leftColor:, rightValue:,
rightColor:, legendLabel:}

**parsingControl type:**

 matrix

.. code-block:: javascript

    Widget Config:

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

    Repository.js:


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

**Description:** Sub-widget of LineAreaChartWidget

**Example:**

|image63|

**Config Parameters:** 

-  id\ **:** Widget Id which used for reference in framework
-  type\ **:** Type of Widget
-  listen: {event, method} events for the widget listen to and method to
   do
-  dataset\ **:** [{lineVisible: boolean, lineStyle:
   ‘dotted’/’solid’/’dashed’, lineWidth: int, labelVisible: boolean,
   titleVisible: int, value: float, label: string,  lineColor: string,
   labelColor: string, titleColor: string, titleBgColor: string},…]

**Data connection to TM1:** YES

**Data repository specifics:**

1. **init query:**

   1. **query for data Structure: {value:}**
   2. **parsingControl type: matrix**

StackedColumnChartWidget
----------------
**Description:** A chart widget used to show how a net value is arrived
at, by breaking down the aggregate effect of negative and positive contributions.

**Config Parameters:** 

-  fontFamily : font family of the chart
-  fontSize : font size of the chart
-  fontStyle :font style of the chart
-  fontWeight : font weight of the chart
-  fontLineHeight : font line height of the chart
-  fontColor : font color of the chart
-  gridColor : grid color of the chart
-  gridWidth : gird Width of the chart
-  xAxisGridDisplay : true or false
-  yAxisGridDisplay : true or false
-  aspectRatio:
-  maintainAspectRatio: true or false
-  tooltipsEnabled: true or false
-  animationEnabled: true or false
-  rightBorderVisible: true or false, visible of the right border
-  rightBorderWidth: width of the right border
-  rightBorderColor: color of the right border
-  topBorderVisible: true or false, visible of the top border
-  topBorderWidth: width of the top border
-  topBorderColor: color of the top border
-  interactionMode:
-  interactionAxis:
-  interactionIsIntersect: true or false
-  lineColor: color of the line
-  lineWidth: width of the line
-  lineTension: Tension of the line
-  barBorderColor: Color of the border bar
-  barBorderRadius: Radius of the border bar
-  barBorderWidth: width of the border bar
-  barInflateAmount:
-  barPercentage: percentage of the bar
-  barCategoryPercentage:
-  barThickness: thickness of the bar
-  barMaxThickness: max thickness of the bar
-  barMinLength: min length of the bar
-  canvasPaddingTop: paddingTop of the canvas
-  canvasPaddingRight: paddingRight of the canvas
-  canvasPaddingBottom: paddingBottom of the canvas
-  canvasPaddingLeft: paddingLeft of the canvas
-  legendVisible: true or false, Visible of the legend
-  legendPosition: position of the legend
-  legendAlign: alignment of the legend
-  legendFontFamily: family of the legend
-  legendFontSize: font size of the legend
-  legendFontStyle: font style of the legend
-  legendFontWeight: font weight of the legend
-  legendFontLineHeight: font line height of the legend
-  xAxisBorderDisplay: true or false, display the border of x axis
-  xAxisDisplay: true or false, display the x axis
-  xAxisAlignToPixels: true or false, align the x axis to pixels
-  xAxisStacked: true or false
-  xAxisBorderColor: Color of the x axis border
-  xAxisBorderWidth: width of the x axis border
-  xAxisTicksLabelDisplay: true or false, display the ticks of the x axis label
-  xAxisTicksFontColor: Color of the x axis ticks
-  xAxisTicksFontFamily: Font family of the x axis ticks
-  xAxisTicksFontSize: Font size of the x axis ticks
-  xAxisTicksFontStyle: Font style of the x axis ticks
-  xAxisTicksFontWeight: Font weight of the x axis ticks
-  xAxisTicksFontLineHeight: Font line height of the x axis ticks
-  xAxisTicksLabelPadding: Padding of the x axis ticks label
-  xAxisGridDisplay: display of the x axis grid
-  xAxisGridColor: color of the x axis grid
-  xAxisGridOffset: true or false, offset of the x axis grid
-  xAxisTicksDisplay: display of the x axis ticks
-  xAxisGridDrawOnChartArea: Draw on chart area of the x axis
-  xAxisGridLineWidth: line width of the x axis grid
-  yMin: minimum value of the y axis
-  yMax: maximum value of the y axis
-  yMarginTop: margin top of the y axis
-  yMarginBottom: margin bottom of y axis
-  yMarginLeft: margin left of the y axis
-  yMarginRight: margin right of the y axis
-  yAxisDisplay: ture or false, display the y axis
-  yAxisAlignToPixels: true or false, align to pixels of the y axis
-  yAxisStacked: true or false
-  yAxisBorderDisplay: true or false, display the y axis
-  yAxisBorderColor: Color of the y axis border
-  yAxisBorderWidth: width of the y axis border
-  yAxisGridDisplay: display the y axis grid
-  yAxisGridDrawOnChartArea:
-  yAxisGridLineWidth: width of the y axis gird line
-  yAxisTicksDisplay: display of the y axis ticks
-  yAxisTicksLabelDisplay: display of the y axis ticks labels
-  yAxisTicksFontColor: font color of the y axis ticks
-  yAxisTicksFontFamily: font family of the y axis ticks
-  yAxisTicksFontSize: font size of the y axis ticks
-  yAxisTicksFontStyle: font style of the y axis ticks
-  yAxisTicksFontWeight: font weight of the y axis ticks
-  yAxisTicksFontLineHeight: font line height of the y axis ticks
-  yAxisTicksLabelPadding: padding of the y axis ticks labels
-  yAxisTicksCount: number of y axis ticks
-  yAxisTicksLimit: limit of the y axis ticks
-  yAxisGridColor: color of the y axis
-  yAxisGridLinesNum: number of y axis lines
-  yAxisShowOnlyZeroLine: true or false,show only zero line
-  yAxisUnit: unit of the y axis
-  yAxisDecimalNum: decimal number of the y axis
-  yAxisSeparatesThousands: true or false
-  yAxiyAxisTicksPrecisionFixed: true or false
-  labelColor: Color of the label
-  labelBackgroundColor: Color of the label background
-  labelFontFamily: Font family of the label
-  labelFontSize: Font size of the label
-  labelFontStyle: Font style of the label
-  labelFontWeight: Font weight of the label
-  labelFontLineHeight: Font line height of the label
-  labelPaddingTop: padding top of the label
-  labelPaddingLeft: padding left of the label
-  labelPaddingRight: padding right of the label
-  labelPaddingBottom: padding bottom of the label
-  labelAlign: align of the label
-  labelOffset: offset of the label
-  labelAnchor: anchor of the label
-  labelClamp: true or false, clamp of the label
-  labelClip: true or false, clip of the label
-  labelBorderRadius: border radius of the label
-  arrowEnabled: true or false
-  arrowMarginTop: margin top of the arrow
-  arrowMarginMiddle: margin middle of the arrow
-  arrowMarginBottom: margin bottom of the arrow
-  arrowLength: length of the arrow
-  arrowLineColor: line color of the arrow
-  arrowLineWidth: line width of the arrow
-  arrowCircleColor: circle color of the arrow
-  arrowCircleRadius: circle radius of the arrow
-  arrowCircleWidth: circle width of the arrow
-  arrowTriangleColor: Trinagle color of the arrow
-  arrowTriangleSize: triangle size of the arrow
-  arrowLabelVisible: true or false
-  arrowLabelColor: label color of the arrow
-  arrowLabelBackgroundColor: background color of the arrow
-  arrowLabelFontFamily: font family of the arrow
-  arrowLabelFontSize: font size of the arrow
-  arrowLabelFontStyle: font style of the arrow
-  arrowLabelFontWeight: font weight of the arrow
-  arrowLabelFontLineHeight: font line height of the arrow
-  arrowLabelPaddingTop: padding top of the arrow label
-  arrowLabelPaddingLeft: padding left of the arrow label
-  arrowLabelPaddingRight: padding right of the arrow label
-  arrowLabelPaddingBottom: padding bottom of the arrow label
-  arrowLabelAlign: align of the arrow label
-  arrowLabelOffset: offset of the arrow label
-  arrowLabelAnchor: anchor of the arrow label
-  arrowLabelClamp: true or false, clamp of the arrow label
-  arrowLabelClip: true or false, clip of the arrow label
-  arrowLabelBorderRadius: border radius of the arrow label
-  data: Data series to be displayed in the widget
-  hideZeroBars: true or false, hide bars with zero value
-  yAxisTicksLimit: Maximum number of tick lines on Y axis
-  labelDataPointVisible: true or false, show label directly at data point
-  labelDataLabelVisible: true or false, show label text for data
-  labelAlignments: Label alignment direction (e.g. 'start', 'center', 'end')
-  lalelsForceDisplay: true or false, force label visibility even in tight spaces
-  showZeroValueLabels: true or false, show labels for zero values
-  manualLabelAlignmentSetting: true or false, allow manual alignment of labels
-  labelClickPopup: ID of the popup to open when label is clicked
-  openPopupOnLabelClick: true or false, enable label click to open popup
-  openendPopupOffsetLeft: Horizontal offset in pixels for popup opening
-  openendPopupOffsetTop: Vertical offset in pixels for popup opening





WaterfallWidget
----------

**Description:** A chart widget used to show how a net value is arrived
at, by breaking down the aggregate effect of negative and positive
contributions.

|image64|

**Example:**

|image65|

**Config Parameters:** 

-  id\ **:** widget id which used for reference in framework
-  dataset1\ **:** $.extend(true, dataset1Config, d.dataset1 \|\|
   {legendLabel: ‘Dataset One’, legendColor: ‘pink’, datapoints:
   [{value: 9.06}, {value: -0.06}, {value: 0.5}, {value: 0}, {value:
   9.5}]})
-  dataset2\ **:** $.extend(true, dataset2Config, d.dataset2 \|\|
   {legendLabel: ‘Dataset One’, legendColor: ‘red’, datapoints: [{value:
   8.06}, {value: -3.06}, {value: 1.5}, {value: 5}, {value: 4.5}]})
-  xAxisLabels\ **:** labels of the x-axis
-  labelVisible\ **:** if label visible (flag)
-  legendVisible\ **:** if legend visible (flag)
-  minYAxis\ **:** minimum value of the y-axis
-  maxYAxis\ **:** maximum value of the y-axis
-  yAxisGridLineNum\ **:** number of horizontal grid lines
-  yAxisDecimalNum:
-  yAxisUnit:
-  defaultColor\ **:** default color of the widget (currently #F3F4F6)
-  skin\ **:** skin of the widget
-  yAxisTicksPrecisionFixed: true or false,
-  yAxisSeparatesThousands: true or false,
-  height: height of the chart
-  allowLastColumnToZero: true or false
-  allowLastColumnToZero: true or false, allow the last column to show zero value
-  labelFontSize: Font size of the labels
-  labelHasAction: true or false, indicates if label has a click action
-  openPopupOnLabel: true or false, open a popup when clicking the label
-  popupToOpenId: ID of the popup to be opened when label is clicked
-  xAxisFontSize: Font size of the X axis labels
-  yAxisFontSize: Font size of the Y axis labels


**Data connection to TM1:** 

**Data repository specifics:**

.. code-block:: javascript

    Widget Config:

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

    Repository.js:

   
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
   

.. |image0| image:: https://lh6.googleusercontent.com/Y_aekcROYQHVtXePeqcNS2pjy3kSgO5DF4Y0wWTFLogYmCWdC3i55yXHexkbJuZ4dv8ecpIGhUsrz_1jJURnMOin1NBMNnhlGMiYk-lAIzVHkiPY4hz9cwLGK58Yb3Rg018xc0PH
.. |image1| image:: https://lh6.googleusercontent.com/jfMcQEj7QHtK7vPeQeg0QIqCs4SQiHmhdAzRZI2lS-wucQvZgc7F5FiX1zgxEL7TTSNh6zHVl3gmbTZ8HHxjtMtBzoNKFUWr9NjEl9yegG24LyzQ_qFOFrzI7DfEUF-yfd6vmRtV
.. |image2| image:: https://lh6.googleusercontent.com/lT0rdiUGxjZibMn_Ha1m2jTdat2yBziamtlG6eMNnByCsA0FHx3UMnLfql05B5KDK4yLcZ7mQpGEI9sJpNfOGHpsud4BYPKg2WmGI-G9r1uREUo01fPrr6mOmXnnrC34OrESWbci
.. |image3| image:: https://lh5.googleusercontent.com/QdTkKSLdtw8tOVVnvAcYNIITqUCbrb8_GTigG2eqTW3GnVQQZmXpFQ6x04U8HwK4RgXUKQsMfgE-wRKtM49syv9JUI2NKgIxEFcicnoT_2oD8mmX98HcQL5AgR1F_mWAF6OAluc9
.. |image4| image:: https://lh5.googleusercontent.com/YrYmh63EPGI_hGCFlK4YAZm2A0XaVUGb29b_nyxPjNAX_ROiCu8bvWCMR2XM3ETMtZJt-ou-Oj8LlMB3_YUscMDMVAWf0ms8UzV3kz8e9wQ77zbhhaOpWzUf5z8sivsZRIB7aJJz
.. |image5| image:: https://lh4.googleusercontent.com/IT5DV7gnu59cQ1MRrpJDSrHpWTOozSR5kDDP7R6WdM2joQ8JyHGlkagCgtqd1hHVFU-JzyndmpEmZ7bz8KGCzsIuX_G2S2ZQjYX7wMhs23jiy0z3CNHNQJ23bQfrRvdZ7ktDP52t
.. |image6| image:: https://lh4.googleusercontent.com/OjCCptPS7RusAPyYXESoDg7JtQxpnRRVZdLlJAPBd8FY-8WLdfTawwXc8a_EU0W0WUMwF1pLqZvGD23H_i8owLUM5i3MIfjJDR10bkdrtQG_6H8X59ef0FacY225z9yyLU9Rt-7E
.. |image7| image:: https://lh6.googleusercontent.com/eF2D2G4i5J6QVmhPkkAU_9ZnJu2Ik42XTzGyWoJyfOwCwja9LJPBQMyN5fR0a4VbWKrrBKfxxgGbL64dpdWxopkhZ-uD0aYy0fIiuStA2V1Zmg9HaL4EIZl178eOvbswDCEt_Z5C
.. |image8| image:: https://lh5.googleusercontent.com/MnUD3dvv4xKw01sVd8-Uuuo3ZcJnsmEKtaPkXmciH6VqbiPSAtmv1nhQRbaxbFt2rUtn5li2OHdM7xoxIyp7NHM4wdYu0Ygiwn03bzQb7qNF_HyaAHYC1K7GPkUnIh0UwoOO2lzS
.. |image9| image:: https://lh6.googleusercontent.com/4V2YLwDjCK4lduBY-ezNqRDvk_0keawiRowFWrivXx9xNg1oyaRRQIHblfvFPtmQUVxQgyj-sQXFePDecsackZHVGQAPg5Xd7wL4DQNUvd5MXOzB2GeAXI7K5leKVwt_Q25FNhe5
.. |image10| image:: https://lh6.googleusercontent.com/UtsnKm5FSbWc0UgJRSL2vKS6LEGj23yBxw7racZzVUCPEQ1VgLb8y2rwFVNsjHkeEH4CmNKW7R7tYf8H42rcmoQs-ThB1ZnP7LybEenhPhHNzci63dgkEi2YiOqxP6F5jrnSzd25
.. |image11| image:: https://lh3.googleusercontent.com/tnnDAukitVTt2gBlt0Po_zZ86YyEgK6t5gGOJKpNDc9h4WeOPDAOpWcWCEMn5L2EVMZWQRJhdXeOpWBjpY_uZdTVy6-gCUI1ppF_P_WOaYRXfYJ60DIs1re1P_iKzE6iBOXzmwmD
.. |image12| image:: https://lh6.googleusercontent.com/95h_2r-AgYUn17PO24pJWBGbzMzuQPDsvyF6NKDG5hBBO3QxAsvm7ubN7H_5zAEITpIkMJ8rdKxUXxUE4e0D26xImIgPJXoBdwr1xhK5uH1bTL6sLJ_XugFraYbuwOmTX6n4J9f7
.. |image13| image:: https://lh4.googleusercontent.com/ZipS2BnukhRrqhbgsLLZL3ZY5hZLwHUDwhPzWQ-9VIPA1P-kHzPACMErzaN9dYowuVNIubSnspe14d4Q0XChQeLsjQqtOjElFR5cQ5q9c2fHHAjw_OVdoMpqKsTvPZktFli_6efd
.. |image14| image:: https://lh6.googleusercontent.com/e-iV3KGa0iLvD6zdKZ8e5C5CxvbSe5JUKcGsf3ci-zpAEPR-X4Vif91SOHaDR3ujPfu7r_c7ANiHOmmRqlvLoFiM67nh47P7y0piBY4DB4hNDfrRe2VKo72mZNyDCn18fPDDYBvT
.. |image15| image:: https://lh4.googleusercontent.com/Y-sJAxwfDpzA2qSAd8rqnWIA8HO2OoQW1H0Yb6PhqGoyG1Uh4FrqbPsxj1fiuuxpz_N2DTjnnfxuWROlwxsZ3-0ZqJq29J4qTpDc7Io9WX8ryUQxsJ-JyE-beS1jkGG5MHlBoaXH
.. |image16| image:: https://lh5.googleusercontent.com/_7WOSf39BPz9h5mFcN6FL1voE_iszwbpzPZ0Yey_lKpaM7bo6u41DmO3y9hW-CanybDvVw3t0godM-o1OC7M3vUHr71obX4AlyKQ6JocYKkii5iDXrdoq-VEvNkQNQNEvLmUKeHS
.. |image17| image:: https://lh6.googleusercontent.com/o701ztV9rMSPAq4kUDpr7iwiqpKk1AZ0A0_es2ME9Ku8IELSsVLh0JUlstqmoT6Qf4QJ3HwMC4eoCLAbBHUZuhpgs5c2DUg7Mjv7ScRcMRX1N8V7H_frZ_ogkhwa9XkvSKKV7fKE
.. |image18| image:: https://lh4.googleusercontent.com/FY3XYW1LH1xnW8_mPvKxfmT5iCBFeqnoJFQ0GdTLNX7b1lXpCTeLV9TqHvDtA1PwhcpZktmhBHO6duA7Bc6j9nSBiqgdqyrHoZcqsdMpld8yCtHtrqXME1Ms9QyBoYNP1Gl0V4d8
.. |image19| image:: https://lh4.googleusercontent.com/kWSkAc-t3_WQOGwcP_dmq4CuK6AKuTmNz8AS8K7iwgK38AesE1N1vFKYcj1yUy-C299gTmf2zdibNRQp_6dG8saO5XY6iJXR_nq2LGrmQEN6s2uOO7YnVfb4v-U0xV6AoprDyP3s
.. |image20| image:: https://lh4.googleusercontent.com/FY3XYW1LH1xnW8_mPvKxfmT5iCBFeqnoJFQ0GdTLNX7b1lXpCTeLV9TqHvDtA1PwhcpZktmhBHO6duA7Bc6j9nSBiqgdqyrHoZcqsdMpld8yCtHtrqXME1Ms9QyBoYNP1Gl0V4d8
.. |image21| image:: https://lh4.googleusercontent.com/EMzl0nlyCrAuVlHaLOtUAsj5K_JsAFM0qtu7L1BPZYGmPvNWH2G1r9qpmjYIStuaJjoyaGjrpuUNwAO1Vx6Sd0Ckhj7u5OgO9oghCBAkoG8COQNgkwQVzA-MHr3-VVKty5TsQiIF
.. |image22| image:: https://lh5.googleusercontent.com/-8XNHMz8hOoKxBFXzxDSCi3mkbpONh6UWRbqV-nI3NY_6Ek91EYwqp320vvJOsKYjhwSwThrKn-v3XeJEooRk6U2B_uFyLQmpEzoH20vc4KiMg1HGP9VRdPVV0-1uUkYLDSUnaRr
.. |image23| image:: https://lh6.googleusercontent.com/AeOxDlOWJVMtrPJvCWkCpV8ccGbEOYt5vaUlqN7CsmqfIR8Phei30GF8F27qHPFGh9sn-04QTSRlnwDZJ6W-93V0hVSYIsSm3EFgEJ6no7f6OjKI6ucupLLTJk-e9uk6rV0lxTl0
.. |image24| image:: https://lh5.googleusercontent.com/Hin4tQx54qH7_6bChUEd-g7IIcaJrVBnZj78zLrT5f_x-1NEAkl8EiLWyIdRpBbycPUhQLB4s0OdH7PvVhPofxiTj_npqdUXFA7Dgwuf5sKxH9O2Nzvgw3cQgZTfXgT8GimPr0vS
.. |image25| image:: https://lh5.googleusercontent.com/Gt8f4weGb5K0l72LW4WSCajPTd_JYXQhJrGNC7vo18mZkD-xabMRRVhsnRimY7cY6qo-X7Sm6EzsTfbFWWxPwgu4hNP2iXsjUp3r3tKJXyLz0QN6bO_ThIGqiGY1mWm4trrY_iG-
.. |image26| image:: https://lh6.googleusercontent.com/yXDMzGFjN-jFdXZDem96ySCIbxJKxzDLioccv2dOu6UJ07cUOI4GDOpMLoieUu3cHDjBVGE46DIwLgUZyz5KlXVrow-Te481Crtlt_NMJynnCXMgLURxgRyjGnXIOnpBM_OiXPnU
.. |image27| image:: https://lh5.googleusercontent.com/ktlq5VFb4K2q6AR5M-l5YmxxglDXUT6Adfkeikow2VSunw_YJgM2zI1s9tbda1JiIs8DLYw10z5lc-9tBlOrdHEomSffAP48W11241ENkLSZAp8YBqvnpsAWZkdFTDaPofyHSGTy
.. |image28| image:: https://lh5.googleusercontent.com/9Cx5vnhWwBVMIZ43nGxl-kIpqL7MjqOD0BxgoPsSClZM1glz4SqCJ-xowHmBQGYNVWljBXIWutAODKwzbKMb8ZvuIymolnFyng_ahIsD-7iErJ0r52k9TorOkLyhWK9DB3hnEmP3
.. |image29| image:: https://lh4.googleusercontent.com/KxCraucClm4SfhI_LqFfyCBVnOeXgWqI3eErV6FIcQKzF0ItA2lYRwTXy_x-2FLoXGauOJPOvY8jcAZcG9NT7Fa0oXW6OFEFGKye-1PPykQbkZntK0WO_B8DWkE_wdoVhDDhEuZD
.. |image30| image:: https://lh6.googleusercontent.com/KpZTLDG52ZO71t7nzD916uEZPYhfjKrXqe4Op9ccnsAmY28y3zokq4Vce74RQHVrs2AbhylgTwDTasxHpjl4HjUUm3I1mnC9_zblohfGyjAgpBgJ-Fnr0DiMfiadQEuDC4HwyfEN
.. |image31| image:: https://lh3.googleusercontent.com/OcF5N0tRDkkgoME0i3EfuiOIvDw6fRCmsgOnyFx5Jm4jt7pGduLPYjW3U-59nC-F-mQ1YFCztDfPaUHHqEzNb_7Uxvt4dWA8ZNsMpb9y1Xepn79LCYNNBdBQKg8ljjFGUDH9X9Ss
.. |image32| image:: https://lh6.googleusercontent.com/Mr0NltbgmXNdS_kXi7CI5w7lhYwhzkXeU4m1d9QpH0XBEEN2Ov-R5fzpGJJbjdQ8HFTp5G2mL5oUDbeQJSjJrs7S0H3ccyNWvxT0B5FY7vq37GKiLRAU9ntTjBhfHFhkyHv57Wgk
.. |image33| image:: https://lh6.googleusercontent.com/4ZhmiZ3XaeXxdH3OmZ4ZITkP3zlZ1QGkCAOCxvze-qJwIWeXRRLK_LXJfs2RNUpC_nME8e0IF1bx4gJYJcLVq6L4maAxS6bwKOVk5KfjHF8PIP4ZPsH6gOO6kMnsjuGPgB4LEU32
.. |image34| image:: https://lh6.googleusercontent.com/s6y-Q3WuQzRYJQNMIhTsWG1_JSLOu0HtafZ0APACYcv31RBsRTkY6BKe3Mk8lqWvYDnIyrcdhp2hohIVBFZE8kTdTkijKFAfB81BoaxxZACgcnUEBexL5FLU-wZ7_BXgDvejlkCq
.. |image35| image:: /page_widget.jpg
.. |image36| image:: https://lh6.googleusercontent.com/EnLN3juFGijG6DGbfmYXbd5ji4ZpUJF9mctX9E8e6USkqIcfC05DvS_CmYVYp9ehZiUpXdYuQ3i99gpcyaqSzZogjuqDC_JJafd-cQHb-3aHJgBsgLC2VopQpfZ2tDxZTOrByuMP
.. |image37| image:: https://lh4.googleusercontent.com/AeYNu17E0r-ZokbV_ngf_QFqgZuj7_AXTSD9pHQJZ-E9kD6OnWLrvTpIM9GDWKM8HVqgxbRX9p0OCFsBg9iyY6HK8jyRCoVUPE218DWsxp5wLqFgFIXs5uOUFcIQbFi006KOEw09
.. |image38| image:: https://lh3.googleusercontent.com/iVaWEJL8ZoDo_RsuVAD-tN7EKnXpB8Z_gReioUiLoR07JVhchlePSh6vnJpFD4Lq42OaUCOAfr3rRjz6nwAcCcWLMsCOrg-nAAZteLCn79VjOpQ14bHZhmhi3ueZGoOUu2Grn2kC
.. |image39| image:: /radarchart_widget.jpg
.. |image40| image:: https://lh4.googleusercontent.com/sQtvd1XVnidGPT9mPe3HhcaaTu19Y-u_Fwi6SnsZYkLz6cJgSkvrsjlJrfVv6Wy_csbmrPwrUevl72TlqbIM2EV7rByVuAKAUkFb-65nNnDgkKMzpKuYcKxf30JzBywGdjsvwj0E
.. |image41| image:: https://lh5.googleusercontent.com/5yfcGi1VwbuV9wLhUyylB1KenlBUGO62WliPXPd5EcwnTXefZ_DxdzZsWTCF_RYFjdE0soOXJaD-G5tJJcyIcLA5lnvS9vWI-Gt0oG79wnTG2gqvyT3ynU2ePbqiyfCbD21PYH0S
.. |image42| image:: https://lh4.googleusercontent.com/gba2CVkOGLwh1Jcf4C8dOd4yqJ6ogUYNG0h4IcvfpRuF0roA13EbgMwMR3etLPKqI9AUehv3zbjQ8V1zMkSTz6pFgk7_SThtrcdClyxEZo86ev_y1bFSR6ZJY_IMLvUouSQL1Pel
.. |image43| image:: https://lh3.googleusercontent.com/sn5uKT7M9-m_hEGEt9gS4pQHmTqnGp2xedWeeOb2WllmkLq4nxOC30ptuahmh-t6duhiIaNYjyLf9mxemrpa706CSFORTeAPu8qmfHT3KIFfbbKHteWpHxYlqER8gJMuvAPFEXI-
.. |image44| image:: https://lh6.googleusercontent.com/haAnUjIu76D8jZGgmoLvo4kCmXROm3OK5u45U8Mg2_xpbhAhFBzbeXZFclMMTZSHfoRFNIYLWmIIkYTLjTbkGM_n8qjlno4j3KIVM-06sIA2mvsoO-G3wYr1i7H2TDgL9RJ1D98j
.. |image45| image:: https://lh5.googleusercontent.com/aTqgkGAYgdt9Hb1WHSsWQrl6AQ5dQfhQRh4nKMxksk0CJnnxLug4fT4G7K_1y7ShPK6IDg7EFE892m3itAe2Kvjb5UR8l1uhH80UAQIXo589QA6_ZGkd9Y1sELBlZeicA8NPEjC7
.. |image46| image:: https://lh3.googleusercontent.com/u1ncALsQMhN41jxoGbvdit0wTMSfNMKpU1cmu75A1KVZfbx0qLrbIQSxdToHdXQWYHQkIWM8WWNfRCrapdm5p8aQnkhblJcESRhso05xSjVnyAhKcxn1Qm_UZhmR1UOSjRCTL-Su
.. |image47| image:: https://lh3.googleusercontent.com/b17ao77dGIUV0Qq4WkWFv7ebY00C0Kd74JlgwkL7TRZvW3axLMMtBiyZHqv4yUmEVDoeuiaxJUKak5fgyZ_wfFOKBqSwXhDSORF5ySQEqGwB6DSUz84FDk00UFya7OrzRz6UA5EB
.. |image48| image:: https://lh5.googleusercontent.com/hnESQgWec9uUJI5GJDntTbl5Bv94sxqMMFZ5zlVxUTJT_aX-Xd8aYygAfMTm1hdG6HFjIt4N3mj6p-zDFPGvU2Edkrehn33BQUkfY-34UNbf7jgdupQWYxfCHVmJ8pbfhC9X4ObX
.. |image49| image:: https://lh3.googleusercontent.com/vx1K2O5a677mTpyL1SbsL1Co8Qm0q_olIxelQzKRzcHGKo7KqxM7mH7_DgF35GrveElUH8s5gTChS75ANPfx7LHQ4gH2OeoWdWmH-7vv_X27FcNLMwOrTYEQEPCr_vL5pNgdRPkw
.. |image50| image:: /slider_new.jpg
.. |image51| image:: https://lh6.googleusercontent.com/yh2-4s8ccz_heZIhqiO4QwgDvbehTD2CErLwU316hDOqjQwo8XztOSTL6108hZM-8AgKmyA_lr6Vm0yOPnMd5epCPdGAYjzbZBQW69woapqoOCfSsYNssx_rANVxhnsGzB__841d
.. |image52| image:: https://lh4.googleusercontent.com/6QdiCJwom41bn7aJ9G9qCrZwXY3pnpoRBH1k88lf1Ugpat13UEtTV4Ea0mSHAHCPe8xKhrEfb3jG1uQQPPtIiAIlPJFrxFBphYDAvezeJYOch-Z_F9SKvXssTNuXxg4JnhesRFXM
.. |image53| image:: https://lh5.googleusercontent.com/lYSacyW2TQjvkiu5rxrY_rPmxxM6BgDZVCvyKndKKL-DkqRG9s8TZiqxtB2l37JPYN6LUlKPOcjUTbNbkbzobsHcAY5QtPaFYL10vuTKIEPjSNFKSMn9QE1WdGYBp-CJHzaRDYVj
.. |image54| image:: https://lh4.googleusercontent.com/ROG0ODYqxIa4xOZs-lVrv98L5Nvcl559w_V8auyzPB3vZYQ2E5zoHluahk2i3yVKGgUrfeujgChsjlu-dLE4P6tPnGAos66TR3rDz8pK-o7W90o9lbWd5ZW1Z-0TEptpLdO04dsl
.. |image55| image:: https://lh5.googleusercontent.com/Q4M120TRKvJ7bECipHL_4tsW9ux2XZ5rCKDSXlPHTnmeT_EbD3IoaC7i5SZyMzWTrmWIgt2gcij2Y7uk_fL6w-rC1nbxKWYwLVhp0wF0ErjQEXWya-HYZe12yeSPQ98egOBgR4g3
.. |image56| image:: https://lh5.googleusercontent.com/987oUhUhA1u06-w7LGNwlElMWbzO0KpNYpwK-m0V9UIQTYeHtieJ41JyXBuOhzc0pjC1lltsOEikqmb7CYnGlpAV7Ueqx45LEZJ4dZOF0j_ozS-2J0N72QdnUtsr-V4bHRFOgDA9
.. |image57| image:: https://lh3.googleusercontent.com/mh33Lukw3rQtmFlgJIeZMalSUX9rJjMhh87_AyOL7eVFE3-s6BenPMnsBT0wpq89YbUZbzTKErvHjuG1YXjVwGxUxuiUWYeg3Rru2hIjxQR2kILUGaFXKnGa9nJaNchxrjPj4zlz
.. |image58| image:: https://lh3.googleusercontent.com/Vdj0Vt0lqGZmWfm-UhxKs5NCHkOc9zfCinvgyCtxGANm2d0WWwov_ZQz8SOLgG2ONa39cBzVgLUYFlpKWq3EFugiahjvJkG0PurEagtAxuruLFuxovsj_0H95PCUMnzkYCIO97ft
.. |image59| image:: https://lh3.googleusercontent.com/F-LRXpKzICqRgIa82sVTx5SYaj9-OO_6-wAw1SZ5-An79mJZ5z9CB8NhFrsqGZPXGqamYwsufsJ4G_9oXiieclb1VvdUDKn8uSg2GNzPPK9QZ6vcsqvfuy84mKeIpYsPazi5jVcw
.. |image60| image:: https://lh4.googleusercontent.com/xbfgbGUUErDccnpyPhoAe5pwsdiMmJMZITNkSYMm-93ewJESAxKIz1josUCCDJTTqvb8-gJUkoTH7A6qbVya6ypxG1zsOxLRafmgatS7osPbdQOUtJGIf1QSmgV-RsvSoO_3s4hn
.. |image61| image:: https://lh5.googleusercontent.com/pLq6N-2HrXD-5rw6P4a-VI0ocPyZLZNy0OsuEmNyEwC7ETniDbCCp04SOpWKF7FzB4RTzd8JTEkfqVBXT3OFiCm9zwrOmUXu9He1wvDhOAcmsdR0x96rGgRq9ruK5twfDmvK8STq
.. |image62| image:: https://lh5.googleusercontent.com/KWm4aLIS0pziHpYeakwi-V6IirYv-tCm9fedA4cJ2ENhXGg8lpAWjJIsc7pIwm0QztTvvoNAHTjeEl7exvAYklvidZ5XqKwiscwpgSIfRmkMeGZDI5OnSx4ZVmAmoI7FwGNllMVX
.. |image63| image:: https://lh4.googleusercontent.com/qn0VURLVI__xeHG5ZF2Z3CwPqFnpfovccqlwok1rTVe4zI2bMApfR9QMnpFWYf9QXe0AROleB8ax39T0lvLznrRyUipFygElsfYXUh1lg2v9a7ttJrWmrj7UJa4ji2yBNNOT5VZ7
.. |image64| image:: https://lh6.googleusercontent.com/Z47O3S4XF5QcSNokqtw0EIbJCF_B1_z625HUrAdCdFFAugqIPgXiJPBe1ijL0Qpg1s03XZrexelY5EDh27aPjuSzvBTAWauUnSx7oiOXh4FKqyeZn5Q_5q3L9_sdH5jUAZGSXyNB
.. |image65| image:: https://lh3.googleusercontent.com/DPgcnvbo5Qut_aHamNCFazuYMp42w3ZATT1adkAGEg9W07haPd1p9cAxzDIJkQKUiHsKvJBMHy27Nyc0CEHCq8kwfvLE6Liuo3PCLbyTf2HdajbGu9GtzotF1IE7DMU3UEChXox-
.. |image66| image:: /sliderWidget.png
.. |image67| image:: /slider_example.png

GridTablePlusWidget
-------------------

Overview
~~~~~~~~

``GridTablePlusWidget`` layers the Analogic widget framework on top of
the `Tabulator <https://tabulator.info/>`_ grid. It accepts repository
payloads that describe ``columns``, ``data``, ``options`` and
``events``, normalises each cell into ``value``/``displayValue``
metadata and persists that metadata alongside the Tabulator row so
Analogic actions can reuse it later. The widget merges global defaults,
widget configuration and repository overrides for Tabulator options,
column options and event handlers, then stores the resulting definition
for later refreshes.

Key capabilities include:

- Parameter driven sizing and skinning via ``minWidth``, ``width``,
  ``height``, ``hideIfNoData`` and ``skin`` options inherited from the
  widget config or repository payload.
- Normalisation of repository data into a cell matrix and
  ``__analogicCells`` map for each row, preserving ``value``,
  ``displayValue`` and metadata for later use.
- Automatic wiring of Tabulator events (``cellClick``, ``cellEdited``
  and any custom mappings) to repository handlers with a rich context
  object that exposes the Tabulator components, indices and event
  arguments.
- Metadata synchronisation after edits, ensuring the stored cell state,
  table definition and DOM stay aligned with user changes.

Typical use cases
~~~~~~~~~~~~~~~~~

- Rich analytical tables that need the full Tabulator feature set
  (selection, grouping, context menus) while still delegating business
  logic to the repository.
- Inline editing scenarios that need to capture the edited value and
  keep the repository payload in sync without rebuilding the table from
  scratch.
- Composite dashboards where a repository wants to control Tabulator
  column definitions but let designers tweak styling or behaviour
  through widget overrides.

Widget configuration
~~~~~~~~~~~~~~~~~~~~

Define the widget in ``widget-config.js`` with
``type: GridTablePlusWidget``. The following parameters are recognised:

- ``minWidth`` / ``width`` / ``height``: sizing hints applied to the
  wrapper element before Tabulator initialises.
- ``hideIfNoData``: hides the widget container when the repository
  returns an empty dataset.
- ``skin``: CSS skin suffix appended to the widget root element.
- ``tabulatorOptions``: Tabulator constructor options merged with the
  defaults and repository supplied options.
- ``tabulatorColumnOptions``: per-column overrides merged onto
  repository column definitions before the table is created.
- ``tabulatorEvents``: mapping of Tabulator event names to repository
  handler names combined with any repository provided event map.

Example configuration from the demo application:

.. code-block:: javascript

   {
       id: 'analogicTableDemoTable',
       type: GridTablePlusWidget,
       title: 'Project Portfolio Overview',
       minWidth: 960,
       tabulatorOptions: {
           height: '520px',
           layout: 'fitDataStretch',
           movableColumns: true
       }
   }

Repository contract
~~~~~~~~~~~~~~~~~~~

Repository handlers must return an object with:

- ``columns``: Tabulator column definitions (``title``, ``field``,
  sizing, formatters, editors, etc.). Widget-level
  ``tabulatorColumnOptions`` can override formatter/editor behaviour per
  field.
- ``data``: Array of rows where each property matches a column
  ``field`` and can be either a primitive or an object describing
  ``value``, ``displayValue`` and optional metadata.
- ``options``: Additional Tabulator options to merge into the final
  table configuration.
- ``events``: Map of Tabulator event names to repository handler
  function names. Those functions receive the context described above
  together with the raw Tabulator event arguments.

The ``analogicTableDemo`` entry in
``apps/helloanalogic/static/assets/js/configs/repository.js``
demonstrates grouping, context menus and inline edits:

.. code-block:: javascript

   analogicTableDemoTable: {
       init() {
           return {
               columns,
               data: rows,
               options,
               events: {
                   tableBuilt: 'tableBuilt',
                   rowSelectionChanged: 'selectionChanged',
                   cellClick: 'cellClicked',
                   cellEdited: 'cellEdited'
               }
           };
       },
       tableBuilt(ctx) {
           const table = ctx.getTabulator();
           const rowCount = table && typeof table.getData === 'function' ? table.getData().length : 0;
           console.log('[GridTablePlusDemo] table built with', rowCount, 'rows');
       }
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
    {
        id: 'gridTableLightServerTable',
        type: GridTableLightWidget,
        skin: 'gridTableLightDemo'
    },
    {
        id: 'gridTableLightServerTable2',
        type: GridTableLightWidget,
        skin: 'gridTableLightDemo',
        pageSize: 20
    }

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

.. code-block:: javascript

   gridTableLightServerTable: {
       init() {
           return new RestRequest(this.request);
       },
       request: {
           url: () => '/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,FormattedValue;$expand=Members($select=Name, Attributes/Editable))',
           type: 'POST',
           server: true,
           body: () => ({key: 'custom_widget_id_mdx'}),
           parsingControl: {
               type: 'script',
               script: (data) => {
                   const transformed = Utils.transformMdxResponseToGridTableLight(data);
                   return Object.assign({
                       freezeHeader: true,
                       allowCopyToClipBoard: true,
                       enableExport: true,
                       exportConfig: {fileName: 'export-asset-register.xlsx'}
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
           body: () => ({key: 'custom_widget_id_mdx'}),
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
                       exportConfig: {fileName: 'export-asset-register-paged.xlsx'}
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

