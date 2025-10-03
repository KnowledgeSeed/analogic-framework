Widget Event Reference
======================

This guide complements the :doc:`Developer_doc` by listing the widget-level
events that can be wired up in repository scripts. For each widget you will
find the event names exposed by the framework and practical guidance on when
to trigger them.

ButtonWidget
------------

``ButtonWidget`` instances raise ``launch`` events when the user clicks the
button. Repository-side ``launch`` handlers are the right place to navigate to
another page, call TM1 processes, or perform other actions that should execute
as soon as the control is pressed.

DatePickerWidget
----------------

Date pickers emit a ``pick`` event every time the selection changes. Bind
repository ``pick`` handlers when the chosen date needs to refresh dependent
widgets or update calculated values immediately after the user picks a day.

DropBoxWidget
-------------

Drop-downs (``DropBoxWidget``) call the ``choose`` event whenever an option is
selected or deselected. Use ``choose`` handlers to persist the new selection,
synchronise other widgets, or pre-load related TM1 data as soon as the user
changes the active item.

GridTableLightWidget
--------------------

``GridTableLightWidget`` supports the familiar trio of ``launch``, ``change``
and ``text_change`` events. All three receive grid context helpers (row,
column, cell) so repository handlers can react to button cells, inline select
changes, or text edits inside the table. The demo repository shows how to
perform inline updates and keep info banners in sync with these hooks.

SegmentedControlWidget
----------------------

Segmented controls invoke the ``switch`` event when the user activates a
segment. Handle ``switch`` to adjust state variables, clear cached selections,
or open other pages based on the chosen segment. Because the widget itself has
no TM1 connection, all behavioural changes happen in the repository handler.

TextWidget
----------

Text widgets expose two interaction points. Clicking the main text region
emits ``text_click``, while enabling the ``performable`` flag turns the icon
into a ``perform`` action. The widget markup wires the inner container to the
``text_click`` action and toggles the icon between ``perform`` and a custom
icon event, while the runtime registers editable/performable behaviour based on
those flags.

Repository ``perform`` handlers let you centralise complex cascades—such as
resetting filters or triggering shared logic—without duplicating code across
multiple cells.

TextBoxWidget
-------------

``TextBoxWidget`` supports an optional ``writeEnd`` event that fires after the
user finishes editing and blurs the field. Implement ``writeEnd`` handlers to
validate the input, persist it via TM1 writes, or refresh dependent widgets.
Standard ``init``/``state`` queries still load the textbox value; only the
post-edit hook is special.

ToggleWidget
------------

Toggle switches can run an optional ``switch`` query whenever the user flips
the control. Use it to call lightweight processes or persist the ON/OFF state;
only the basic request metadata (URL, body, type) is evaluated, so keep the
handler focused on side effects rather than response parsing.
