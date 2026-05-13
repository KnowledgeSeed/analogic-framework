Extensions
==========

SharePoint Upload Widget Configuration Guide
-------------------------------------------

This guide explains how to create and configure a SharePoint upload widget in the Analogic environment. It covers the ``app.json`` settings, the project folder structure, the backend configuration (YAML), and the registration of the front-end components.

1. Requirements and Overview
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The SharePoint widget consists of two main components:

#. **Backend endpoints** provided by the ``analogic_sharepoint.sharepoint_endpoints`` module. These handle upload and download requests and decide based on the ``_share_points`` configuration whether to use SharePoint, UNC, or local storage. See ``analogic_sharepoint/sharepoint_endpoints.py``.
#. **Frontend widget and controller logic** located in ``static/assets/js/sharepoint-upload-widget.js`` and ``static/assets/js/sharepoint-upload.js``. The widget loads files into a ``FormData`` object, handles rendering, and triggers events.

2. Folder Structure
~~~~~~~~~~~~~~~~~~~

Create (or copy) the following folder structure under your application. A working example is available in ``analogic_sharepoint/tests/apps/sharepointtest``, which provides a good starting point for your own project.


.. code-block:: text

   <project_root>/
   |- app.json
   |- app.py
   |- server/
   |  \- configs/
   |     \- repository.yml
   \- static/
      \- assets/
         |- js/
         |  \- configs/
         |     |- widget-config.js
         |     |- repository.js
         |     \- event-map.js
         \- skin/
            \- css/




* ``app.json`` - global configuration for the application.
* ``static/assets/js/configs/widget-config.js`` - registers widgets on the page.
* ``static/assets/js/configs/repository.js`` - repository-specific logic (for example, triggering uploads).
* ``server/configs/repository.yml`` - configuration for TM1/backend processes and permissions.

3. Configuring ``app.json``
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``app.json`` file stores all connection profiles under the ``_share_points`` key. The following example is taken from the test application (with sensitive values removed):

.. code-block:: json

   {
     "projectName": "Sharepoint test",
     "projectId": "sharepointest",
     "_share_points": {
       "connection1": {
         "url": "https://<sharepoint-site>",
         "client": "<appId>",
         "secret": "<appSecret>",
         "folder": "<documentLibrary>",
         "type": "Sharepoint"
       },
       "connection3": {
         "url": "\\\\<server>\\<share>",
         "client": "<domain\\user>",
         "secret": "<password>",
         "type": "UNC"
       },
       "connection5": {
         "url": "\\\\<server>\\public",
         "type": "UNC",
         "disable_call_process": true
       }
     }
   }

3.1 Required Keys
^^^^^^^^^^^^^^^^^

* ``url`` - the SharePoint site URL, UNC path, or local directory root.
* ``type`` - connection type (``Sharepoint``, ``UNC``, or ``Local``).
* ``folder`` - for SharePoint connections, the document library name; optional for UNC (it can be part of the path); for local connections, the target folder or path.

3.2 Optional Keys
^^^^^^^^^^^^^^^^^

* ``client`` and ``secret`` - application-level credentials for SharePoint or network credentials for UNC. The ``secret`` can be omitted if it is stored in the Analogic environment keyring under the ``analogic_sharepoint_{instance}/{identifier}`` key; in that case the backend loads the password automatically.
* ``disable_call_process`` - when set to ``true``, the upload skips calling a TM1 process (only the file is stored).

3.3 Required Request Parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For each upload, the widget automatically sends a ``share_point_id`` field whose value is the key defined under ``_share_points``. The backend uses this field to select the connection profile.

4. Backend Configuration (``repository.yml``)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To complete an upload, you typically trigger a TM1 process that performs authorization checks and business logic. In ``repository.yml``, specify the process URL and body via the ``<connection>_analogic_sharepoint_upload_process_url`` and ``<connection>_analogic_sharepoint_upload_process_body`` keys.

Example:

.. code-block:: yaml

   connection1_analogic_sharepoint_upload_process_url: "/api/v1/Processes('zSYS Analogic File Upload')/tm1.ExecuteWithReturn"

   connection1_analogic_sharepoint_upload_process_body: >
     {
       "Parameters": [
         {"Name": "pUniqueName", "Value": "$uniqueName"},
         {"Name": "pDisplaysName", "Value": "$displayName"}
       ]
     }

During the upload the backend substitutes ``$uniqueName`` and ``$displayName`` with the actual file names, then invokes the TM1 process.

If no TM1 process is required for a specific connection, set ``disable_call_process: true`` under ``_share_points``.

5. Widget and Repository Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

5.1 Registering the Widget
^^^^^^^^^^^^^^^^^^^^^^^^^^

Register the widget in ``widget-config.js``. At minimum you need an upload widget and a trigger element (for example, a button):

.. code-block:: javascript

   {
       id: 'spUp',
       type: SharePointUploadWidget,
       skin: 'template1',
       marginBottom: 20
   },
   {
       id: 'doUpload',
       type: ButtonWidget,
       skin: 'template1',
       label: 'Upload'
   }

The widget supports various visual and behavioural options (for example, ``label``, ``icon``, ``maxFileSize``, ``convertXlsxToCsv``). The full list is at the beginning of the ``SharePointUploadWidget`` class's ``getHtml`` method.

5.2 Repository Logic
^^^^^^^^^^^^^^^^^^^^

The ``Repository.spUp.sharepointUpload`` function selects which ``_share_points`` connection the widget should use. You can also return additional fields in the object for the upload (for example, parameters for the TM1 process).

The ``Repository.doUpload.launch`` method triggers the widget's ``sharepointUpload`` event on button click, starting the actual upload.

5.3 Event Handling and Feedback
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* The widget builds a ``FormData`` object from the selected files and sends an AJAX request to the ``sharepoint/upload`` endpoint.
* During the upload, the percentage progress is written to the ``.progress-bar`` element.
* After a successful upload, the widget can display a popup (``uploadSuccessMessage``), fire an event (``eventMap.finished``), and reset the form.

6. File Download
~~~~~~~~~~~~~~~~

To download a file, send a GET request to the ``sharepoint/download`` endpoint with the following parameters:

* ``share_point_id`` - key under ``_share_points``.
* ``displayName`` - file name shown to the user.
* ``uniqueName`` - unique file name on storage (returned to you during upload).

The backend automatically fetches the file from the correct storage based on the connection type.

7. Tips and Troubleshooting
~~~~~~~~~~~~~~~~~~~~~~~~~~~

* **Handling credentials** - if you do not want to store ``secret`` in ``app.json``, use the system keyring. The module automatically reads it when only ``client`` is present in ``app.json``.
* **Maximum file size** - the ``maxFileSize`` option is interpreted in MB. If the total size of the selected files exceeds the limit, the widget raises an error and does not send the files.
* **Excel -> CSV conversion** - set ``convertXlsxToCsv: true`` to convert ``.xlsx`` files to CSV before upload. The backend performs the conversion using the ``openpyxl`` and ``csv`` modules.
* **Loader behaviour** - if additional asynchronous work should continue after the upload, set ``skipStoppingTheLoaderAfterSuccessUpload: true`` so the loader stays visible.

8. Summary Steps
~~~~~~~~~~~~~~~~

#. Configure the ``_share_points`` section in ``app.json`` with the required connections.
#. Set up TM1 processes in ``server/configs/repository.yml``.
#. Register the widget and trigger control in ``widget-config.js``, and add the repository logic in ``repository.js``.
#. Prepare the front-end assets (skin, CSS, and so on) and ensure ``event-map.js`` contains the necessary events (empty by default).
#. Test uploads and downloads through the ``sharepoint/upload`` and ``sharepoint/download`` endpoints.

Following these steps allows you to integrate the SharePoint upload widget into any Analogic-based project quickly.

Analogic File Upload Extension – Comprehensive Guide
----------------------------------------------------

1. Overview
~~~~~~~~~~~

The ``analogic-ext-file-upload`` project delivers a secure file-upload pipeline with optional validation and preprocessing for business data loading scenarios. The main entry point is the ``/upload`` endpoint, built on the Flask-based Analogic endpoint system and orchestrated by the ``FileUploadManager`` class, which coordinates the upload, validation, and file-movement steps. See ``analogic_file_upload/file_upload_endpoints.py`` and ``analogic_file_upload/upload.py`` for the implementation details.

2. Prerequisites and dependencies
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The extension relies on the following components:

* **Analogic platform** – classes such as ``AnalogicEndpoint`` and ``get_authentication_provider`` come from the Analogic ecosystem, so the application must run inside this framework. (``analogic_file_upload/file_upload_endpoints.py``)
* **Flask** – upload handling uses Flask's ``request`` object. (``analogic_file_upload/file_upload_endpoints.py``)
* **TM1/TM1py** – preprocessing rules are retrieved from a TM1 service via TM1py's ``build_pandas_dataframe_from_cellset`` helper. (``analogic_file_upload/upload.py``)
* **Pandas, chardet, PyYAML** – Pandas powers file parsing, chardet infers character encoding, and PyYAML loads ``mdx.yml``. (``analogic_file_upload/upload.py``)
* **File-system access** – ensure the configured ``target`` and optional ``staging`` directories exist and are writable.

3. Installation and packaging
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Follow the steps in the root ``README.md`` (building, uploading to devpi, installing) to install the project. When publishing the package, bump the version and copy ``setup.py``, ``MANIFEST.in``, and ``pyproject.toml`` to the required locations.

4. Core components
~~~~~~~~~~~~~~~~~~

4.1 ``FileUploadManager``
^^^^^^^^^^^^^^^^^^^^^^^^^

``FileUploadManager`` orchestrates every phase of the upload process:

* ``upload(target, staging, sub_folder, files, excel_header_row_end, float_format_number)`` – saves incoming files to the specified staging or target directory, optionally creating a sub-folder, and converts Excel files to CSV. Both decimal precision and header range are configurable. (``analogic_file_upload/upload.py``)
* ``pre_process(tm1_service, preprocess_template, target)`` – loads preprocessing rules via MDX, then validates files in the target directory (extension, empty content, column counts, and more). (``analogic_file_upload/upload.py``)
* ``move(target, staging, sub_folder)`` – moves files from staging to the final ``target`` directory and removes the temporary folder afterwards. (``analogic_file_upload/upload.py``)
* ``_check_*`` helpers – perform detailed checks for extensions, non-empty contents, delimiters, quotes, headers, and encodings. (``analogic_file_upload/upload.py``)

4.2 ``mdx.yml``
^^^^^^^^^^^^^^^

Stores the MDX query used to fetch preprocessing rules along with configuration for index/value fields. The ``$preprocess_template`` placeholder is replaced by the template value supplied in the request. (``analogic_file_upload/mdx.yml``)

4.3 ``file_upload_endpoints``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Registers the ``/upload`` route and coordinates authentication, validation, and preprocessing by delegating to ``FileUploadManager``. (``analogic_file_upload/file_upload_endpoints.py``)

5. Process walkthrough
~~~~~~~~~~~~~~~~~~~~~~

#. The client sends a POST request to ``/upload`` with the required form fields and files.
#. The endpoint authenticates the user and calls ``FileUploadManager.upload``.
#. If provided, custom validation logic (``validation`` parameter) is loaded and executed.
#. When preprocessing is requested, files are validated according to MDX-based rules.
#. If a staging directory is specified, files are moved to the final target at the end.
#. The response is ``ok`` or an HTML-formatted error message when something fails.

6. HTTP endpoint and parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``/upload`` endpoint accepts HTTP ``POST`` requests with ``multipart/form-data`` content. Supported form fields:

.. list-table::
   :header-rows: 1

   * - Parameter
     - Type
     - Required
     - Description
   * - ``target``
     - string
     - yes
     - Final destination directory for the uploaded files (write permissions required). (``analogic_file_upload/file_upload_endpoints.py``)
   * - ``staging``
     - string
     - no
     - Temporary directory used during validation and preprocessing; when omitted, files go straight to ``target``. (``analogic_file_upload/upload.py``)
   * - ``subFolder``
     - string
     - no
     - Name of the subdirectory created under staging/target to isolate each upload. (``analogic_file_upload/upload.py``)
   * - ``excelHeaderRowEnd``
     - int
     - no
     - Last index of the header rows for multi-line Excel headers, passed to the Pandas ``header`` parameter. (``analogic_file_upload/file_upload_endpoints.py``)
   * - ``floatFormatNumber``
     - int
     - no
     - Decimal precision when converting Excel to CSV (default: 2). (``analogic_file_upload/file_upload_endpoints.py``)
   * - ``validation``
     - string
     - no
     - Key of a custom validation object defined in Analogic settings; the ClassLoader executes the referenced logic. Leave blank to skip extra validation. (``analogic_file_upload/file_upload_endpoints.py``)
   * - ``preProcessTemplate``
     - string
     - no
     - MDX template name for preprocessing rules; leave blank to skip preprocessing. (``analogic_file_upload/file_upload_endpoints.py``)
   * - ``files``
     - file(s)
     - yes
     - One or more files to upload.

7. Validation hooks
~~~~~~~~~~~~~~~~~~~

* The ``validation`` parameter points to an Analogic custom object. Based on the retrieved ``description``, ``ClassLoader().call(...)`` executes the referenced Python code, which receives the Flask request, TM1 service, settings, authentication provider, and temporary file path. (``analogic_file_upload/file_upload_endpoints.py``)
* The validator returns an HTML-formatted string; when non-empty, the endpoint responds with ``ERROR!`` followed by the message.

8. Preprocessing rules and checks
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* The ``upload_preprocess`` entry in ``mdx.yml`` determines which TM1 measures are read (extension, expected column counts, headers, quotes, emptiness, and more). (``analogic_file_upload/mdx.yml``)
* ``_pre_process_validate`` runs the following checks for each file: ``_check_extension``, ``_check_not_empty``, and ``_check_content`` (delimiter, quote pairs, column counts, headers, optional encoding). (``analogic_file_upload/upload.py``)
* On errors, offending files are removed from staging and users receive a detailed HTML-formatted error message. (``analogic_file_upload/upload.py``)

9. Directory and file management
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* When ``subFolder`` is provided, ``upload`` creates the directory if it does not already exist. (``analogic_file_upload/upload.py``)
* Using staging helps isolate incoming files and only move them to the target after successful validation via ``move``. (``analogic_file_upload/upload.py``)
* If the upload fails, the staging directory can remain for troubleshooting; cleanup is up to the caller.

10. Extending and customizing the code
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. **Create a custom validator** – add a Python module within your project and register it as a custom object in the Analogic admin interface. The function can accept ``request``, ``tm1_service``, ``setting``, ``auth_provider``, and ``path``, returning a string.

   .. code-block:: python

      def validate_sales_upload(request, tm1_service, setting, auth_provider, path, **kwargs):
          """Example: ensure at least one CSV is provided."""
          files = [f for f in os.listdir(path) if f.lower().endswith('.csv')]
          if not files:
              return 'At least one CSV file must be uploaded.'
          return ''

2. **Add a new preprocessing template** – extend your TM1 cube with the required rules, then record the corresponding measures in the MDX query.
3. **Adjust Excel → CSV conversion** – supply ``excelHeaderRowEnd`` and ``floatFormatNumber`` from the client to control formatting.
4. **Error handling** – the endpoint logs every exception via the authentication provider's logger before returning a generic error. Inspect the logs for deeper analysis. (``analogic_file_upload/file_upload_endpoints.py``)

11. Developer tips
~~~~~~~~~~~~~~~~~~

* **Permissions** – ensure the ``target`` and ``staging`` directories are accessible before running the upload.
* **Environment differences** – Pandas' Excel support may require ``openpyxl`` or ``xlrd``, depending on the environment.
* **Testing** – use isolated staging folders and automated fixture files so the validation logic is easier to verify.

This guide summarises how the Analogic file upload extension works, its integration points, and customisation opportunities to accelerate onboarding and project integration.
