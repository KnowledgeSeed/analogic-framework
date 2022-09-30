# Analogic

[![CircleCI](https://circleci.com/gh/KnowledgeSeed/Analogic/tree/opensource.svg?style=svg&circle-token=06a3190fab78aa16c209796996ab9c14b5edab17)](https://circleci.com/gh/KnowledgeSeed/Analogic/tree/opensource)
[![License](https://img.shields.io/:license-Apache%202-blue.svg)](https://github.com/KnowledgeSeed/Analogic/blob/opensource/LICENSE)

The Analogic Framework is a software development framework for building advanced financial planning and business simulation applications using the IBM Planning Analytics Engine as a database. 

## Project Focus

## Requirements

Python >= 3.9

## Getting Started

### Running from code

1. Clone Repository
	```
	git clone https://github.com/KnowledgeSeed/analogic
 	```
2. 
	```
	cd analogic
 	```
3. Create python virtual env and activate it
	```
	py -m venv venv
 	```
 
 	```
	 source venv/Scripts/activate
 	```
4. Install requirements 
	```
	pip install -r requirements.txt
 	```
5. Set up the following env variable for loading sample apps
	```
	export ANALOGIC_LOAD_SAMPLE_APPS=True
 	```
6. Launch analogic
	```
	py run.py
 	``` 
8. open the following url in browser: http://localhost:5000/helloanalogic

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

A sample application called `helloanalogic` is shipped with the framework.
This application indents to demonstrate the Web UI features without needing to
install and hook up with a TM1 server.

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

## Architecture