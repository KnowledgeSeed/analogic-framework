Developer reference
===================

This page summarises the repository event handlers, helper executors and
utility APIs that Analogic widgets rely on at runtime. Use it as a quick
reference while extending existing screens or adding new behaviours.

Lifecycle hooks
---------------

* ``init`` loads the initial payload for a widget. It can call REST
  endpoints, transform TM1 responses and even pull values from other
  widgets before render time.【F:docs/source/repository.rst†L73-L159】
* ``initCondition`` and ``initDefault`` let a repository entry decide at
  runtime whether the normal ``init`` logic should execute or fall back
  to a lightweight default payload.【F:docs/source/repository.rst†L261-L278】
* ``initFinished`` fires after the very first render completes, allowing
  follow-up actions (for example, event-map subscriptions) to run only
  when the widget is fully ready.【F:analogic/static/assets/js/widgets/base/widget.js†L160-L207】【F:analogic/static/assets/js/widgets/base/widget.js†L405-L417】
* ``refresh`` requests rerender the widget and trigger
  ``refreshFinished`` once the new HTML is in place, making it ideal for
  loader-backed updates that rebuild the DOM.【F:analogic/static/assets/js/widgets/base/widget.js†L90-L153】【F:analogic/static/assets/js/widgets/base/widget.js†L405-L417】
* ``updateContent`` keeps the widget structure intact while swapping the
  data model. Upon completion ``updateContentFinished`` emits a finished
  event that can drive chained refreshes.【F:analogic/static/assets/js/widgets/base/widget.js†L201-L210】【F:analogic/static/assets/js/widgets/base/widget.js†L409-L417】

Interaction events
------------------

* ``launch`` executes button actions, including validations, POST/GET
  calls and optional server-side MDX lookups.【F:docs/source/repository.rst†L281-L322】
* ``perform`` runs when a text widget icon is activated. The HTML markup
  exposes the custom event name, and repository handlers often wrap the
  work inside an ``execute`` function for reuse across multiple cells.【F:analogic/static/assets/js/widgets/text.js†L48-L55】【F:apps/helloanalogic/static/assets/js/configs/repository.js†L910-L951】
* ``text_click`` is the default click action for text content, making it
  easy to drive navigation or open popups from inline labels.【F:analogic/static/assets/js/widgets/text.js†L48-L55】
* ``change`` and ``text_change`` are emitted by grid-style widgets when a
  user edits an inline value. Repository handlers receive the column,
  row and cell metadata so they can coordinate UI updates or persist the
  change elsewhere.【F:apps/helloanalogic/static/assets/js/configs/repository.js†L175-L225】
* ``choose`` reacts to drop-down selections and supports the same
  validation, body and server flags as ``launch``.【F:docs/source/repository.rst†L325-L366】
* ``cellEdit`` captures single cell edits from horizontal or scrollable
  grids, forwarding the entered value to TM1 or other services.【F:docs/source/repository.rst†L368-L409】
* ``pick`` handles DatePicker selections and can trigger follow-up
  updates just like button events.【F:docs/source/repository.rst†L412-L453】
* ``pasteCells`` batches bulk paste operations from scrollable grids and
  sends them to TM1 via a PATCH request.【F:docs/source/repository.rst†L456-L487】
* ``switch`` drives segmented controls and toggles, supporting optional
  validation and REST execution.【F:docs/source/repository.rst†L490-L531】
* ``slide`` is emitted by Slider widgets so repository logic can persist
  or react to the numeric change.【F:docs/source/repository.rst†L534-L575】
* ``write`` captures inline text edits, while ``save`` targets multiline
  text areas. Both share the validation/REST contract described above.【F:docs/source/repository.rst†L577-L662】
* ``writeEnd`` and ``writeKey`` allow fine-grained handling of textbox
  edits—either on blur or specific key presses—before refreshing related
  widgets.【F:docs/source/repository.rst†L665-L748】
* ``rightclick`` is fired by context menu interactions, storing the
  clicked cell information so custom menus or repository logic can act
  on it.【F:analogic/static/assets/js/widgets/grid-table-light/grid-table-light.js†L789-L806】

Data operations and executors
-----------------------------

* ``download`` event handlers can return download descriptors that the
  framework passes to ``Server.download``, which streams the file and
  saves it with the provided name.【F:analogic/static/assets/js/framework/write-executor/download.js†L3-L6】【F:analogic/static/assets/js/framework/server.js†L4-L98】
* ``uploadImage`` handlers prepare ``FormData`` payloads, optional
  callbacks and success messaging before the framework posts the file to
  the backend.【F:analogic/static/assets/js/framework/server.js†L102-L180】
* ``execute`` functions run immediately instead of issuing REST calls.
  They are resolved by the write executor, which also invokes optional
  callbacks once execution completes.【F:analogic/static/assets/js/framework/write-executor/base.js†L9-L106】
* ``callback`` provides post-processing hooks that receive the original
  context plus the handler response, making it easy to trigger chained
  refreshes or popups.【F:analogic/static/assets/js/framework/write-executor/base.js†L68-L105】
* ``script`` parsing controls enable bespoke transformation of TM1
  responses when the built-in object/list/matrix parsers are not
  sufficient.【F:docs/source/repository.rst†L247-L258】
* ``RestRequest`` wrappers describe reusable REST calls that can be
  returned from ``init`` or other handlers whenever the repository needs
  to defer execution to the loader pipeline.【F:analogic/static/assets/js/framework/rest-request.js†L3-L11】

API helpers
-----------

The client ``Api`` object offers navigation, refresh and popup helpers
that can be triggered from repository handlers or event-map entries. Key
methods include navigation helpers (``openPage``, ``openPageWithState``
variants, ``goToUrl``/``goToUrlNewTab``), refresh utilities
(``forceRefresh*`` and ``updateContent*``) and popup controls
(``openPopup``, ``closePopup``). Each method lists its parameters in the
Event Map reference.【F:docs/source/eventmap.rst†L48-L205】

Utility helpers
---------------

``Utils`` centralises formatting, widget state access and grid table
helpers. Highlights include number/date utilities such as
``parseNumber`` and ``getFormattedDate``, grid-table accessors like
``getGridTableCurrentCell``/``getGridTableCurrentRow``, and widget value
setters like ``setWidgetValue``/``setWidgetValueIfNotExist``. These tools
make it easy to read or update widget values without manually traversing
the DOM.【F:analogic/static/assets/js/framework/utils.js†L47-L140】【F:analogic/static/assets/js/framework/utils.js†L207-L320】【F:analogic/static/assets/js/framework/utils.js†L374-L399】
