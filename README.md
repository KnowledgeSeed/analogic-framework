# Analogic Framework

|CI Build & Tests|PyPI stable version| Codecov | Cypress e2e tests | License|
|:---:|:---:|:---:|:---:|:---:|
|[![CI Build](https://github.com/KnowledgeSeed/analogic/actions/workflows/main.yml/badge.svg)](https://github.com/KnowledgeSeed/analogic/actions/workflows/main.yml?query=branch%3Amain++) | [![PyPI version](https://badge.fury.io/py/analogic-framework.svg)](https://badge.fury.io/py/analogic-framework) | [![codecov](https://codecov.io/gh/KnowledgeSeed/analogic-framework/branch/main/graph/badge.svg?token=NQWFP5QD5X)](https://codecov.io/gh/KnowledgeSeed/analogic-framework) | [![analogic-framework](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/i4hkps&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/i4hkps/runs) | [![License](https://img.shields.io/:license-Apache%202-blue.svg)](https://github.com/KnowledgeSeed/Analogic/blob/opensource/LICENSE) |


The Analogic Framework is a software development framework for building advanced financial planning and business simulation applications using the IBM Planning Analytics Engine as a database. 

The framework consists of the following main parts:

1. #### JS Frontend framework

The frontend framework is in essence a collection of JavaScript elements called “widgets”.  [Widgets](https://analogic-framework.readthedocs.io/en/latest/widgets) are the main building blocks of the applications built using the Analogic Framework. Every element in the final application UI is always an instance of a widget. Some widgets are very simple both in appearance and function (eg. a Button widget or a Text widget) some can be complex and can contain other widgets (e.g. a GridTable widget). The widgets usually communicate directly with the Planning Analytics database using REST API calls sending MDX queries as requests and getting JSONs as responses.

2. #### Python middleware

The Python middleware is a Flask-based application layer between the frontend and the database. It enables functions that cannot be implemented (securely) in JavaScript, such as file uploads, export functions and complex widget-backend communications.
   
 3. #### Sample applications
 
A sample application called `helloanalogic` comes with the framework. This application intents to demonstrate the Web UI features without needing to
install and hook up with a TM1 server.


## Requirements

The framework requires 3.11 > Python >= 3.9.

## Getting Started

### Running from code

To launch the framework including the sample web-applications from code, Python >= 3.9 must be available. Then the repository needs to be cloned to a local development environment, a virtualenv created, some environment variables set and the main entry point `run.py` executed:

1. Clone repository:
```
git clone https://github.com/KnowledgeSeed/analogic-framework
cd analogic-framework
```

2. Create python virtual env and activate it:
```
python -m venv venv

# git bash
source venv/Scripts/activate 

# command line
venv\Scripts\activate.bat 
```

3. Install requirements:
```
pip install -r requirements.txt
```

4. Set up the following env variable for loading sample apps:
```
# git bash
export ANALOGIC_LOAD_SAMPLE_APPS=True

# command line
set ANALOGIC_LOAD_SAMPLE_APPS=True
```
5. Launch analogic:
```
py run.py
 ``` 
6. Open the following url in browser: http://localhost:5000/helloanalogic

### Using stable version from PyPI

1. Clone repository:
```
git clone https://github.com/KnowledgeSeed/analogic-framework
 ```

2. Create a folder for the application and copy helloanalogic app from the GitHub repository:
``` 
# git bash
mkdir -p analogic-sample-app/apps/helloanalogic
cd analogic-sample-app
cp -r ../analogic-framework/apps/helloanalogic/* apps/helloanalogic

# command line
mkdir analogic-sample-app\apps\helloanalogic
cd analogic-sample-app
xcopy ..\analogic-framework\apps\helloanalogic apps\helloanalogic /s /e
```

3. Create python virtual env and activate it
```
python -m venv venv

# git bash
source venv/Scripts/activate 

# command line
venv\Scripts\activate.bat 
``` 

4. Install analogic-framework with pip
```
pip install analogic-framework
```

5. Create a `run.py` file in analogic-sample-app folder with the following content:

```
from analogic import create_app
import os

site_root = os.path.realpath(os.path.dirname(__file__))
app = create_app(site_root)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000')
```

5. Set up the following env variable for loading sample apps:
```
# git bash
export ANALOGIC_LOAD_SAMPLE_APPS=True

# command line
set ANALOGIC_LOAD_SAMPLE_APPS=True
```
6. Launch analogic:
```
py run.py
 ``` 
7. Open the following url in browser: http://localhost:5000/helloanalogic

### Running in Docker

#### Before you begin

Follow these steps to install the necessary tools.

1. Install Docker Desktop for Linux or Mac(macOS) or Windows on your workstation. [Links here.](https://docs.docker.com/engine/install/) Please refer to the Resources section if using Docker how to fine-tune Docker Desktop.
2. docker-compose is installed as part of Docker Desktop. Make sure `docker` and `docker-compose` are available in command line or git bash, etc.  
	```
	$ docker --version
	Docker version 20.10.16, build aa7e414
	```
	 ```
	 $ docker-compose -v
	Docker Compose version v2.6.0
	 ```
#### Launching Analogic 

There are some sample `docker-compose` recipes provided in this repository to begin with.
It's important to note that these are considered samples and patterns. 
Your deployment setup might require further customizations or extensions.

###### 1. Single - Flask-based mode (`docker-compose-flask.yml`):

Launches Analogic in Flask dev mode without WSGI. It is useful for the development of Analogic framework itself.

	$ docker-compose -f docker-compose-flask.yml up -d

The `helloanalogic` sample application is available at http://localhost:5000/helloanalogic

###### 2. Single - bjoern-based mode (`docker-compose-bjoern.yml`)

Launches Analogic using bjoern WSGI. More info about [bjoern here](https://github.com/jonashaag/bjoern). 
It serves as a production-grade base setup of Analogic framework to start further customization with. 

	$ docker-compose -f docker-compose-bjoern.yml up -d

The `helloanalogic` sample application is available at http://localhost:5000/helloanalogic

###### 3. Multi - Flask-based mode with Apache front controller (`docker-compose-bjoern-apache.yml`)

Simulates an environment where Analogic is deployed as reverse proxy behind a front web server that defines URL path mappings, SSL for HTTPS, etc.
In this setup, Analogic runs in Flask dev mode.

	$ docker-compose -f docker-compose-flask-apache.yml up -d

The `helloanalogic` sample application is available at http://localhost:8080/proxy/helloanalogic

###### 4. Multi - bjoern-based mode with Apache front controller (`docker-compose-bjoern-apache.yml`)

Simulates an environment where Analogic is deployed as reverse proxy behind a front web server that defines URL path mappings, SSL for HTTPS, etc.

	$ docker-compose -f docker-compose-bjoern-apache.yml up -d

The `helloanalogic` sample application is available at http://localhost:8080/proxy/helloanalogic

---

###### Dev mode

When developing in Pycharm, you may want to bind the code base as volume into Docker.
It makes sure that any code change in your IDE will directly be present Docker.
Leveraging the stacking nature of `docker-compose`, simply add `docker-compose-dev.yml` when launching the framework.
	
	$ docker-compose -f docker-compose-flask.yml up -f docker-compsose.dev.yml -d

The other bjoern and apache setups work likewise, although in development mode these are rarely useful. 

---

###### Apache front web server setups

Apache-based `docker-compose-*-apahce.yml` files mount `apache-proxy.conf` to define  *vhost* redirecting calls to Analogic reverse-proxy server. 

The main parts are 1) setting up a base url `/proxy` and 2) routing the static web assets through the base url using `mod_rewrite`  `RewriteRule`.  


	...
	ProxyPreserveHost On
	ProxyRequests off

	RewriteEngine on
	RewriteRule    "^/static/(.*)$"  "/proxy/static/$1"  [R]
	#LogLevel alert rewrite:trace6

	<Location /proxy>
			ProxyPass http://analogic:5000
			ProxyPassReverse http://analogic:5000
			RequestHeader set X_FORWARDED_PREFIX /proxy
			Order allow,deny
			Allow from all
	</Location>
	...

## Creating a new application

There is a bare application skeleton located at https://github.com/KnowledgeSeed/analogic/blob/main/app_structure.zip.

Follow the steps at [Using stable version from PyPI](https://github.com/KnowledgeSeed/analogic-framework#using-stable-version-from-pypi)  to set up the application environment and add the content of app_structure.zip into the `apps` folder.

## Contribution

Contributions to the framework as well as the widgets are welcomed!

#### For external contributors

1. Create a fork
2. Create a feature branch on the fork
3. Complete the development
4. Create a PR into the main repository's main branch
5. If you're a first-time external contributor, wait for the repository maintainer to approve the CI build to run upon the PR. If you already have at least one approved PR, the CI build on the PR will run automatically.
6. Wait for the repository maintainers (a.k.a code owners) to review and approve the PR.
6. If every status check is complete, the reposiotry maintainer will merge the PR.

#### For internal contributors

KnowledgSeed team members are considered internal contributors. In addition, the most active external contributors are promoted as internal contributors.
Internal contributors can create feature branches in the main repository and merge PR-s that pass the status checks.


## Links

[Analogic Framework Codecov Dashboard](https://app.codecov.io/github/KnowledgeSeed/analogic-framework)
 
[Analogic Framework Cypress Dashboard](https://dashboard.cypress.io/projects/i4hkps)

[Analogic Widgets Reference Documentation](https://analogic-framework.readthedocs.io/en/latest/widgets)
