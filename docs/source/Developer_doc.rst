Repository Function Documentation
=================================

This document describes common functions found in the ``repository.js`` examples. Each function is summarised with its purpose, typical parameters, and usage patterns.

init
----

``init()`` runs when a widget or page is first created. It often sets default values (such as selected year or company) or returns a configuration object that describes how to fetch data from the server.

launch
------

``launch()`` is usually bound to buttons or icons. It performs navigation or activates features, typically by calling ``Api.openPage()`` and optionally adjusting widget values beforehand.

perform
-------

``perform()`` is usually bound to icons. It performs navigation or activates features.

text_click
----------

Handles click events on text widgets. Common uses include navigating back to a main page or triggering context-specific actions.

switch
------

Executed when a segmented control changes state. It is responsible for refreshing or updating related widgets to reflect the new segment.

initCondition
-------------

Evaluates whether the main ``init`` logic should run. Returning a truthy value allows initialization; otherwise it may be skipped.

initDefault
-----------

Provides a fallback initialization when no specific condition is met, ensuring the component has baseline data.

refreshFinished and initFinished
--------------------------------

Run after initial loading or a refresh has completed. These hooks typically force dependent widgets to reload or synchronise state.

download
--------

``download()`` constructs parameters for exporting data, such as file name, segment selections, and query keys. Returned values are passed to the export service to generate a file.

upload
------

``upload()`` prepares configuration for uploading files. It sets paths, validation settings, and optional callbacks to trigger processes after the upload completes.

execute
-------

``execute()`` performs an action immediately, often returning option lists for segmented controls or executing logic when a switch or init event fires.

script
------

``script()`` transforms raw query results into custom structures when default parsing is insufficient. Used when ``parsingControl.type`` is ``script``.

callback
--------

``callback()`` runs after an action (like upload or process execution) finishes. It is typically used to trigger refreshes or follow-up requests.

choose
------

``choose()`` runs when a user selects an item in widgets like drop-downs. It typically sends the chosen value to the server and may refresh widgets or close popups afterwards.

write
-----

``write()`` submits edited values to the server. It patches cellsets or calls processes so grid or form changes persist.

writeEnd
--------

``writeEnd()`` fires after editing completes. It stores the final value and refreshes any dependent widgets or charts.

save
----

``save()`` commits text box or single-field edits to the server, usually by patching a specific cell ordinal with a new value.

rightclick
----------

``rightclick()`` handles context menu actions on grid cells, often capturing the clicked cell and opening a popup with options.

RestRequest
-----------

``RestRequest`` creates a configurable request object for server-side processes or writes, defining URL, method, payload, and callbacks.

Api functions
-------------

- ``Api.openPage(page)`` navigates to the specified page.
- ``Api.openPopup(id)`` displays a popup dialog.
- ``Api.showPopup(id)`` reveals an already defined popup.
- ``Api.closePopup(id)`` closes the given popup.
- ``Api.goToStartPage()`` returns the user to the application's start screen.
- ``Api.logout()`` signs the current user out.
- ``Api.forceRefresh(widget)`` reloads a widget's data.
- ``Api.forceRefreshWidgets([widgets])`` reloads multiple widgets at once.
- ``Api.forceRefreshWithoutLoader(widget)`` refreshes a widget without showing a loading indicator.
- ``Api.updateContent(widget)`` updates the content of a single widget.
- ``Api.updateContentWithoutLoader(widget)`` updates a widget without a loader.
- ``Api.updateWidgetsContent([widgets])`` updates several widgets.
- ``Api.updateWidgetsContentWithoutLoader([widgets])`` updates several widgets without loaders.
- ``Api.removeWidgetValues([widgets])`` clears cached values for the specified widgets.
- ``Api.executeRequest(name)`` runs a named process or write request.
- ``Api.executeQueryRequest(name)`` runs a query request and returns data.
- ``Api.triggerWidgetEvent(widget, event)`` triggers a specific event on a widget.
- ``Api.openPageWithState(page, state)`` opens a page and applies the provided state object.
- ``Api.goToUrlNewTab(url)`` opens the specified URL in a new browser tab.
- ``Api.hideWidgets([widgets])`` hides the given widgets.
- ``Api.showWidgets([widgets])`` shows the specified widgets.
- ``Api.togglePopup(id)`` toggles a popup's visibility.
- ``Api.toggleWidget(widget)`` toggles the visibility of a widget.

Utils functions
---------------

- ``Utils.openPopup(id)`` opens a client-side popup without server round trips.
- ``Utils.closePopup(id)`` closes the specified popup.
- ``Utils.togglePopup(id)`` toggles a popup's visibility.
- ``Utils.setWidgetValue(widget, value)`` assigns a value to a widget.
- ``Utils.setWidgetValueIfNotExist(widget, value)`` assigns a value only if the widget is empty.
- ``Utils.getGridTableCurrentCell(table)`` returns information about the currently selected cell.
- ``Utils.getGridTableCurrentRow(table)`` returns the current row object or index.
- ``Utils.getGridTableCellByRowAndColumn(table, row, column)`` retrieves a cell by coordinates.
- ``Utils.isGridTableLoaded(table)`` checks whether a grid table has finished loading.
- ``Utils.getDropBoxSelectedItemAttribute(dropbox, attribute)`` reads an attribute from the selected dropdown item.
- ``Utils.getFormattedDate(date)`` converts a Date object to a formatted string.
- ``Utils.parseNumber(text)`` converts a formatted string to a numeric value.
- ``Utils.separatesThousands(number)`` adds thousand separators to a number.
- ``Utils.modifyFileName(name)`` adjusts file names, often appending timestamps or context.
- ``Utils.getImpersonatingUserName()`` returns the username being impersonated.
- ``Utils.isImpersonated()`` indicates whether the current session is impersonated.
- ``Utils.reloadApp()`` reloads the entire application.
- ``Utils.getGridTableCell(table, column)`` gets a cell from the current row at the specified column.
- ``Utils.getGridTableToggleValue(table, row)`` retrieves the toggle state for a row in a grid table.
- ``Utils.saveGridTableToggles(table, column)`` saves the current toggle states for later use.
- ``Utils.getNavigationUrl(params)`` builds a navigation URL based on the provided parameters.
- ``Utils.getDecimalFromPercentString(text)`` converts a percentage string into a decimal number.
- ``Utils.escapeText(text)`` escapes special characters in a string, useful for pasted data.
- ``Utils.toTitleCase(text)`` converts a string to title case.

Additional widget events
------------------------

Beyond the common handlers above, repository files often define supplementary widget events:

- ``pick()`` handles DatePicker selections so that repository logic can push calendar choices back to TM1 or refresh related widgets.
- ``cellEdit()`` captures inline edits from grid-style widgets and forwards the changes to processes or PATCH requests.
- ``pasteCells()`` batches clipboard pastes into scrollable grids, combining the payload before sending a single write request.
- ``text_change()`` and ``change()`` respond to live text edits in grid tables, allowing repositories to validate or persist keystrokes.
- ``slide()`` fires when slider widgets move, which is useful for updating dependent calculations immediately.
- ``writeKey()`` triggers on specific key presses in text boxes, enabling actions before focus leaves the field.

Additional Api helpers
----------------------

The framework exposes further navigation and refresh helpers that appear in event-map driven integrations:

- ``Api.scrollTo(widget)`` scrolls the viewport to the given widget while triggering its refresh event.
- ``Api.jumpTo(widget)`` jumps to a widget without animated scrolling.
- ``Api.openPrevPage()`` returns to the previously viewed page, and ``Api.openPrevPageWithState()`` restores it with cached state.
- ``Api.openPageWithWaitingForEvent(...)`` and its "scroll to section" variant delay navigation until a specified widget event completes.
- ``Api.forceRefreshWithDelay([widget, delay])`` schedules a refresh after waiting for the supplied milliseconds.
- ``Api.openPageAndScrollToSection(...)`` and related helpers combine navigation with scrolling and optional refresh lists.
- ``Api.removePageValues(page)`` clears stored values for every widget on a page, while ``Api.removeValuesRecursively(page)`` also resets nested widgets.

Additional Utils helpers
------------------------

Utility helpers extend far beyond value setters. Common patterns include:

- ``Utils.sleep(ms)`` to pause async flows before chaining more repository actions.
- ``Utils.stopEvent(event)`` to cancel DOM bubbling when custom controls wrap native inputs.
- ``Utils.clone(object, deep)`` to create safe copies before mutating payloads.
- ``Utils.scrollTop(duration)`` and ``Utils.scrollTo(target, duration, offset)`` for viewport management.
- ``Utils.getRandomId()`` to generate stable identifiers for dynamic widget elements.
- ``Utils.parseFormatStringToCSSClasses(text)`` to convert TM1-style format strings into CSS helper classes.
- ``Utils.getTimestamp(date, forwardTime)`` and ``Utils.getToday(delimiter)`` to build TM1 friendly date strings.
- ``Utils.stripHtml(text)`` and ``Utils.nl2br(text)`` when sanitising or reformatting rich text responses.
- ``Utils.precisionRound(number, precision, toFixed)`` for consistent rounding logic in charting or grid summaries.
