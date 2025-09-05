GridTableLightWidget
====================

A lightweight table widget intended for fast rendering and minimal configuration. The widget renders its own cell content instead of embedding individual widgets in every cell.

Parameters
----------

- ``pageSize``: number, default ``25``. Maximum number of rows shown on a page. Use ``0`` to disable paging.
- ``freezeHeader``: boolean, default ``true``. Keeps the table header visible during vertical scrolling.
- ``freezeFirstColumns``: number, default ``0``. Count of leftmost columns that remain fixed during horizontal scrolling.
- ``enableExport``: boolean, default ``false``. Shows an export icon that creates an Excel file of the full data set.
- ``bandiTest``: boolean, default ``false``. When ``true``, displays an alert message "bandi teszt".

Example
-------

::

    {
        id: 'sampleGridLight',
        type: GridTableLightWidget,
        pageSize: 50,
        freezeHeader: true,
        freezeFirstColumns: 1,
        enableExport: true,
        bandiTest: true
    }

