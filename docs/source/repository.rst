Data repository
===============

Function
--------

- connection between JS front-end and TM1 back-end
- loads data into widgets from TM1
- the config file is case-sensitive

Structure
---------

::

   <widged id>: {
       <action 1>: {
         <action parameter 1>: (db) => {...},
         ...
         <action parameter n>: (db) => {...}
       },
       ...
   }

**Example:**

.. code-block:: javascript

    textWidget1: {
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,Value)`,
                type: 'POST',
                body: (db) => `{"MDX":"..."}`,
                parsingControl: {
                    type: 'object',
                    query:
                        {
                            title: (r, x) => {
                                return r.Cells[0].Value;
                            }
                        }
                }
            }
    },
    textWidget2: {
       init(ctx) {
         return {title: ctx.getWidgetId()};
       }
    },
    buttonWidget1: {
        launch:
            {
                url: (ctx) => `/api/v1/Processes('processname')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (ctx) => `{
                        "Parameters": [
                                {"Name": "pParam1", "Value": "${ctx.activeUserName}"},
                                {"Name": "pParam2", "Value": "${v('systemValueSomething')}"}
                        ]
                    }`
            },
    },
    buttonWidget2: {
        launch(ctx) {
            Api.updateContent('otherWidgetId');
        }
    }

Actions
-------

Init
----

- initialization of widget, with TM1
- loading data into widget while rendering
- if init is not defined widget is rendered based on widget-config
- the result of init overwrite widget-config parameters

**Rest request action parameters**

- url: URL of the request
- body: body of the request
- type: type of request (POST, GET,..)
- parsingControl: parsing data from TM1 response
- server: boolean (optional, default false) if mdx stored on the server side in repository.yml

**Examples**

**Client side mdx rest request**

.. code-block:: javascript

    textWidget1: {
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,Value)`,
                type: 'POST',
                body: (db) => `{"MDX":"..."}`,
                parsingControl: {
                    type: 'object',
                    query:
                        {
                            title: (r, x) => {
                                return r.Cells[0].Value;
                            }
                        }
                }
            }
    },

**Server side mdx rest request**

.. code-block:: javascript

    textWidget1: {
        init:
            {
                url: (db) => `/api/v1/ExecuteMDX?$expand=Cells($select=Ordinal,Value)`,
                type: 'POST',
                body: (db) => {
                    return {
                        param1: 'value'
                    };
                },
                parsingControl: {
                    type: 'object',
                    query:
                        {
                            title: (r, x) => {
                                return r.Cells[0].Value;
                            }
                        }
                }
            }
    },

repository.yml

.. code-block:: yaml

    textWidget1_init: >
      {"MDX":"SELECT
                  {
                        [sys_parameters].[something]
                  } on COLUMNS FROM [SYS_PARAMETERS] WHERE ([sys_data].[$param1])
      "}


**Client side init from application ctx**

.. code-block:: javascript

    textWidget1: {
       init(ctx) {
         return {title: v('otherWidgetId.value')};
       }
    },

Parsing Control
---------------

**Object**

Result will be an object.

.. code-block:: javascript

    parsingControl: {
                    type: 'object',
                    query:
                        {
                            title: (r, x) => {
                                return r.Cells[0].Value;
                            },
                            body: (r, x) => {
                                return r.Cells[1].Value;
                            }
                        }
                }

It will return:

::

    {
     title: 'value from tm1 response in position 0',
     body: 'value from tm1 response in position 1'
    }

**List**

Result will be a list

.. code-block:: javascript

    parsingControl: {
                    type: 'list',
                    query:
                        (r, x) => {
                            return {name: r.Cells[x].FormattedValue, on: x === 0};
                        }
                }

Result will be:

::

    [
        {name: 'value from tm1 response in position 0', on: true},
        ...,
        {name: 'value from tm1 response in position x', on: false},
        ...,
        {name: 'value from tm1 response in position last', on: false}
    ]

**Matrix**

Result will be matrix.

.. code-block:: javascript

    parsingControl: {
                    type: 'matrix',
                    length: 2,
                    query: [
                        (r, x) => {
                            return {value: r.Cells[x].FormattedValue};
                        },
                        (r, x) => {
                            return {value: r.Cells[x].FormattedValue + ' 2022'};
                        }
                    ]
                }

Result will be:

::

    [
        [{value: 'tm1 response pos 0'}, {value: 'tm1 response pos 1 concatenated with 2022 string'}],
        ...
    ]


**Script**

This type enable you to write you own parsing logic.

.. code-block:: javascript

                    parsingControl: {
                        type: 'script',
                        script: (data, widgetId, object, ctx) => {
                          data // response from tm1
                        }
                    }


InitCondition
-------------

- condition, dependency on init event
- if true: init will be executed
- if false: initDefault will be executed

.. code-block:: javascript

    initCondition(ctx) {
        if(..) {
            return true;
        }
        return false;
    },
    initDefault(ctx) {
       return {};
    }


Launch
------

Action of ButtonWidget.

**Action parameters**

- url: URL of the request
- body: body of the request
- type: type of request (POST, GET,...)
- validation: validation of current state. if success = false -> no request, warning message
- server: boolean (optional, default false) if mdx stored on the server side in repository.yml

.. code-block:: javascript

    widget1: {
        launch:
            {
                validation(ctx) {
                    if(...) {
                        return {
                          success: false,
                          message: 'validation failed'
                        };
                    }
                    return {success: true};
                },
                url: (ctx) => `/api/v1/Processes('processname')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (ctx) => `{
                        "Parameters": [
                                {"Name": "pParam1", "Value": "${ctx.activeUserName}"},
                                {"Name": "pParam2", "Value": "${v('systemValueSomething')}"}
                        ]
                    }`
            },
    },
    widget2: {
        launch(ctx) {
            Api.updateContent('otherWidgetId');
        }
    }


Choose
------

Action of DropboxWidget.

**Action parameters**

- url: URL of the request
- body: body of the request
- type: type of request (POST, GET,...)
- validation: validation of current state. if success = false -> no request, warning message
- server: boolean (optional, default false) if mdx stored on the server side in repository.yml

.. code-block:: javascript

    widget1: {
        choose:
            {
                validation(ctx) {
                    if(...) {
                        return {
                          success: false,
                          message: 'validation failed'
                        };
                    }
                    return {success: true};
                },
                url: (ctx) => `/api/v1/Processes('processname')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (ctx) => `{
                        "Parameters": [
                                {"Name": "pParam1", "Value": "${ctx.activeUserName}"},
                                {"Name": "pParam2", "Value": "${v('widget1.choose.value')}"}
                        ]
                    }`
            },
    },
    widget2: {
        choose(ctx) {
            Api.updateContent('otherWidgetId');
        }
    }

cellEdit
------

Action of HorizontalTableWidget and ScrollTableWidget.

**Action parameters**

- url: URL of the request
- body: body of the request
- type: type of request (POST, GET,...)
- validation: validation of current state. if success = false -> no request, warning message
- server: boolean (optional, default false) if mdx stored on the server side in repository.yml

.. code-block:: javascript

    widget1: {
        cellEdit:
            {
                validation(ctx) {
                    if(...) {
                        return {
                          success: false,
                          message: 'validation failed'
                        };
                    }
                    return {success: true};
                },
                url: (ctx) => `/api/v1/Processes('processname')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (ctx) => `{
                        "Parameters": [
                                {"Name": "pParam1", "Value": "${ctx.activeUserName}"},
                                {"Name": "pParam2", "Value": "${v('widget1.cellEdit.value')}"}
                        ]
                    }`
            },
    },
    widget2: {
        cellEdit(ctx) {
            Api.updateContent('otherWidgetId');
        }
    }


pick
------

Action of DatePickerWidget

**Action parameters**

- url: URL of the request
- body: body of the request
- type: type of request (POST, GET,...)
- validation: validation of current state. if success = false -> no request, warning message
- server: boolean (optional, default false) if mdx stored on the server side in repository.yml

.. code-block:: javascript

    widget1: {
        pick:
            {
                validation(ctx) {
                    if(...) {
                        return {
                          success: false,
                          message: 'validation failed'
                        };
                    }
                    return {success: true};
                },
                url: (ctx) => `/api/v1/Processes('processname')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (ctx) => `{
                        "Parameters": [
                                {"Name": "pParam1", "Value": "${ctx.activeUserName}"},
                                {"Name": "pParam2", "Value": "${v('widget1.pick.value')}"}
                        ]
                    }`
            },
    },
    widget2: {
        pick(ctx) {
            Api.updateContent('otherWidgetId');
        }
    }


pasteCells
------

Action of ScrollTableWidget

**Action parameters**

- url: URL of the request
- body: body of the request
- type: type of request (POST, GET,...)
- validation: validation of current state. if success = false -> no request, warning message
- server: boolean (optional, default false) if mdx stored on the server side in repository.yml

.. code-block:: javascript

    widget1: {
        pasteCells:
            {
                validation(ctx) {
                    if(...) {
                        return {
                          success: false,
                          message: 'validation failed'
                        };
                    }
                    return {success: true};
                },
                url: (ctx) => `/api/v1/Cellsets('${ctx.getObject().init[2].cellsetId}')/Cells`,
                type: 'PATCH',
                body: (ctx) => `[${v('widget1').pastedCellValues.map((t, i) => `{"Ordinal": ${t.ordinal},"Value": \"${t.value}\"}`)}]`
            },
    }


switch
------

Action of SegmentedControlWidget and ToggleWidget.

**Action parameters**

- url: URL of the request
- body: body of the request
- type: type of request (POST, GET,...)
- validation: validation of current state. if success = false -> no request, warning message
- server: boolean (optional, default false) if mdx stored on the server side in repository.yml

.. code-block:: javascript

    widget1: {
        switch:
            {
                validation(ctx) {
                    if(...) {
                        return {
                          success: false,
                          message: 'validation failed'
                        };
                    }
                    return {success: true};
                },
                url: (ctx) => `/api/v1/Processes('processname')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (ctx) => `{
                        "Parameters": [
                                {"Name": "pParam1", "Value": "${ctx.activeUserName}"},
                                {"Name": "pParam2", "Value": "${v('widget1.switch.value')}"}
                        ]
                    }`
            },
    },
    widget2: {
        switch(ctx) {
            Api.updateContent('otherWidgetId');
        }
    }


slide
------

Action of SliderWidget.

**Action parameters**

- url: URL of the request
- body: body of the request
- type: type of request (POST, GET,...)
- validation: validation of current state. if success = false -> no request, warning message
- server: boolean (optional, default false) if mdx stored on the server side in repository.yml

.. code-block:: javascript

    widget1: {
        slide:
            {
                validation(ctx) {
                    if(...) {
                        return {
                          success: false,
                          message: 'validation failed'
                        };
                    }
                    return {success: true};
                },
                url: (ctx) => `/api/v1/Processes('processname')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (ctx) => `{
                        "Parameters": [
                                {"Name": "pParam1", "Value": "${ctx.activeUserName}"},
                                {"Name": "pParam2", "Value": "${v('widget1.slide.value')}"}
                        ]
                    }`
            },
    },
    widget2: {
        slide(ctx) {
            Api.updateContent('otherWidgetId');
        }
    }

write
------

Action of TextWidget.

**Action parameters**

- url: URL of the request
- body: body of the request
- type: type of request (POST, GET,...)
- validation: validation of current state. if success = false -> no request, warning message
- server: boolean (optional, default false) if mdx stored on the server side in repository.yml

.. code-block:: javascript

    widget1: {
        write:
            {
                validation(ctx) {
                    if(...) {
                        return {
                          success: false,
                          message: 'validation failed'
                        };
                    }
                    return {success: true};
                },
                url: (ctx) => `/api/v1/Processes('processname')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (ctx) => `{
                        "Parameters": [
                                {"Name": "pParam1", "Value": "${ctx.activeUserName}"},
                                {"Name": "pParam2", "Value": "${v('widget1.write.value')}"}
                        ]
                    }`
            },
    },
    widget2: {
        write(ctx) {
            Api.updateContent('otherWidgetId');
        }
    }


save
------

Action of TextAreaWidget.

**Action parameters**

- url: URL of the request
- body: body of the request
- type: type of request (POST, GET,...)
- validation: validation of current state. if success = false -> no request, warning message
- server: boolean (optional, default false) if mdx stored on the server side in repository.yml

.. code-block:: javascript

    widget1: {
        save:
            {
                validation(ctx) {
                    if(...) {
                        return {
                          success: false,
                          message: 'validation failed'
                        };
                    }
                    return {success: true};
                },
                url: (ctx) => `/api/v1/Processes('processname')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (ctx) => `{
                        "Parameters": [
                                {"Name": "pParam1", "Value": "${ctx.activeUserName}"},
                                {"Name": "pParam2", "Value": "${v('widget1.save.value')}"}
                        ]
                    }`
            },
    },
    widget2: {
        save(ctx) {
            Api.updateContent('otherWidgetId');
        }
    }


writeEnd
------

Action of TextBoxWidget.

**Action parameters**

- url: URL of the request
- body: body of the request
- type: type of request (POST, GET,...)
- validation: validation of current state. if success = false -> no request, warning message
- server: boolean (optional, default false) if mdx stored on the server side in repository.yml

.. code-block:: javascript

    widget1: {
        writeEnd:
            {
                validation(ctx) {
                    if(...) {
                        return {
                          success: false,
                          message: 'validation failed'
                        };
                    }
                    return {success: true};
                },
                url: (ctx) => `/api/v1/Processes('processname')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (ctx) => `{
                        "Parameters": [
                                {"Name": "pParam1", "Value": "${ctx.activeUserName}"},
                                {"Name": "pParam2", "Value": "${v('widget1.writeEnd.value')}"}
                        ]
                    }`
            },
    },
    widget2: {
        writeEnd(ctx) {
            Api.updateContent('otherWidgetId');
        }
    }

writeKey
------

Action of TextBoxWidget.

**Action parameters**

- url: URL of the request
- body: body of the request
- type: type of request (POST, GET,...)
- validation: validation of current state. if success = false -> no request, warning message
- server: boolean (optional, default false) if mdx stored on the server side in repository.yml

.. code-block:: javascript

    widget1: {
        writeKey:
            {
                validation(ctx) {
                    if(...) {
                        return {
                          success: false,
                          message: 'validation failed'
                        };
                    }
                    return {success: true};
                },
                url: (ctx) => `/api/v1/Processes('processname')/tm1.ExecuteWithReturn`,
                type: 'POST',
                body: (ctx) => `{
                        "Parameters": [
                                {"Name": "pParam1", "Value": "${ctx.activeUserName}"},
                                {"Name": "pParam2", "Value": "${v('widget1.writeKey.value')}"}
                        ]
                    }`
            },
    },
    widget2: {
        writeKey(ctx) {
            Api.updateContent('otherWidgetId');
        }
    }






