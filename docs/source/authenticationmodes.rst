App configuration
=================

You can configure the application in app.json. This file cached on the server side.
Any modification will be applied if the content of cache folder deleted or
http://localhost:5000/appname/clearcache called.

Cam authentication mode
--------------------------

.. code-block:: json

    {
      "projectName": "Your application displayed name",
      "projectId": "yourappname",
      "authenticationMode": "Cam",
      "authenticationBridge": "https://yourdns:9610/ibmcognos/bi/v1?b_action=xts.run&m=portal/bridge.xts&c_env=portal/variables_TM1.xml&c_cmd=../tm1/web/tm1web.html&ps=http://localhost:5000&pg=../yourappname/auth&host=yourdns&server=modelname",
      "apiHost": "https://your_tm1_restapi_url",
      "camNamespace": "yournamespace",
      "mainPage": "start page id in your widget-config.js",
      "proxy": {
        "target": "https://your_tm1_restapi_url"
      }
    }


LoginBasic authentication mode
------------------------------

.. code-block:: json

    {
      "projectName": "Your application displayed name",
      "projectId": "yourappname",
      "authenticationMode": "LoginBasic",
      "camNamespace": "yournamespace",
      "mainPage": "start page id in your widget-config.js",
      "proxy": {
        "target": "https://your_tm1_restapi_url"
      }
    }


