Event map
=========

Function
--------

- events inside framework, without TM1 connection
- interaction between widgets
- the config file is case-sensitive
- subscribing on a widget event:

.. code-block:: javascript

    'init.widgetId.finished': {
       action: Api.showWidgets,
       argument: ['otherWidget1', 'otherWidget2']
    }

Event schema before repository execution:

[init|refresh|updateContent|launch|pick|...].widgetId


Event schema after repository execution:

[init|refresh|updateContent|launch|pick|...].widgetId.finished

**Api functions**

Api.showWidgets Api.hideWidgets
-------------------------------

- shows/hides widgets listed
- input: list with widget ids

Api.showWidget Api.hideWidget
-----------------------------

- shows/hides widget
- input: string widget id

Api.scrollTo
------------

- scrolls to widget on page
- input: str widget id

Api.jumpTo
----------

- jumps to widget on page (no visible scrolling)
- input: str widget id

Api.openPage
------------

- opens PageWidget
- input: str widget id

Api.backToMain
--------------

- opens the main page
- input: no input

Api.openPrevPage
----------------

- opens the main page
- input: no input

Api.openPrevPageWithState
--------------------------

- opens last cached page
- no input

Api.openPageWithWaitingForEvent
-------------------------------

- waits for event, after opens page
- input: list[eventName to wait, page widget id]

Api.openPageAndScrollToSection
------------------------------

- opens PageWidget and after that scrolls to selected widget
- input: list[page widget id, widget id scroll to]

Api.openPageWithWaitingForEventAndScrollToSection
-------------------------------------------------

- waits for event, after opens page, and after scrolls to widget
- input: list[eventName to wait, page widget id, widget id scroll to]

Api.openPageWithState
---------------------

- opens PageWidget with cache
- input option 1: str widget id
- input option 2: list[page widget id, widgets to refresh from server[..]]

Api.openPageWithStateAndScrollToSection
----------------------------------------

- opens cached page, after scrolls to widget
- input: list[page widget id, widget id scroll to, widget ids to refresh from server]

Api.openPageWithStateAndWaitingForEvent
---------------------------------------

- waits for event, after opens cached page
- input: list[eventName, page id, widget ids to refresh from server]

Api.openPageWithStateAndWaitingForEventAndScrollToSection
---------------------------------------------------------

- waits for event, after opens cached page, and after scrolls to widget
- input: list[eventName, page widget id, widget id scroll to, widget ids to refresh from server]

Api.removeWidgetValues
----------------------

- resets values from widget
- input: list of widget ids

Api.removePageValues
--------------------

- resets values from all widgets on selected page
- input: str page widget id

Api.removeValuesRecursively
---------------------------

- resets values from the widget and recursively from the child widgets
- input: str page widget id

Api.forceRefresh
----------------

- force refreshes(rerendering) widget
- input: str widget id

Api.forceRefreshWithoutLoader
-----------------------------

- force refreshes(rerendering) widget without loader animation
- input: str widget id

Api.forceRefreshWidgets
-----------------------

- force refreshes(rerendering) widgets
- input: list[widget ids]

Api.forceRefreshWithDelay
-------------------------

- force refreshes(rerendering) widget with delay
- input: list[widget id, how much to wait until it refreshes in ms ]


Api.goToUrl
-----------

- navigates to given URL on the same browser tab
- input: str URL

Api.goToUrlNewTab
-----------------

- navigates to given URL on new tab
- input: str URL

Api.openPopup
-------------

- display container widget
- input: str container widgetID

Api.closePopup
---------------

- closes widget
- input: str container widgetID

Api.togglesPopup
---------------

- toggles visibility of Popup
- input: str container widgetID

Api.updateContent
------------------

- refreshes the values of the content without rerendering the widget
- input: str widgetID


Api.updateContentWithoutLoader
------------------------------

- refreshes the values of the content without rerendering the widget without loader
- input: str widgetID

Api.updateWidgetsContent
------------------

- refreshes the values of the content without rerendering the widget
- input: list [widget ids]


Api.updateContentWithoutLoader
------------------------------

- refreshes the values of the content without rerendering the widget without loader
- input: list [widget ids]
