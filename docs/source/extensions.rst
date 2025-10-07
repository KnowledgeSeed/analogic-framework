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
   ├── app.json
   ├── app.py
   ├── server/
   │   └── configs/
   │       └── repository.yml
   └── static/
       └── assets/
           ├── js/
           │   └── configs/
           │       ├── widget-config.js
           │       ├── repository.js
           │       └── event-map.js
           └── skin/
               └── css/

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
