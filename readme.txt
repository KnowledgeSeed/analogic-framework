1st time task:
open CMD
navigate to the source folder
run command: py -3 -m venv venv

1st time + any time you want to run local:
venv\Scripts\activate
pip install -r requirements.txt
OR
run.bat

One-time task to add new application to be able to run locally:
open CMD
navigate to the source folder
venv\Scripts\activate
navigate into the DimensionFramework/Install folder
run: py setup_local_with_default_credential.py bpsp pwd
Note: last 2 paramters: 1st is the app name, second is your user password

Running local server:
navigate to the source folder
run.bat
OR venv\Scripts\activate
run2.bat
OR manually:
set FLASK_APP=DimensionFramework\__init__.py
set FLASK_ENV=development
flask run

pypi build:

py -m build
py -m twine upload --repository testpypi dist/*


<VirtualHost *:5000>
    WSGIScriptAlias / C:/Repos/flaskProject3/apache.wsgi
	Alias /applications/ C:/Repos/flaskProject3/applications/
	Alias /static/ C:/Repos/flaskProject3/analogic/static/
	Alias /templates/ C:/Repos/flaskProject3/analogic/templates/
	LogLevel debug
	ErrorLog logs/seeder_error.log
	CustomLog logs/seeder_custom.log combined
    <Directory C:/Repos/flaskProject3>
        Require all granted
    </Directory>
</VirtualHost>

pip:

<VirtualHost *:5000>
    WSGIScriptAlias / C:/Repos/flaskProject4/apache.wsgi
	Alias /applications/ C:/Repos/flaskProject4/applications/
	Alias /static/ C:/Repos/flaskProject4/venv/Lib/site-packages/DimensionFramework/static/
	Alias /templates/ C:/Repos/flaskProject4/venv/Lib/site-packages/DimensionFramework/templates/
	LogLevel debug
	ErrorLog logs/seeder_error.log
	CustomLog logs/seeder_custom.log combined
    <Directory C:/Repos/flaskProject4>
        Require all granted
    </Directory>
</VirtualHost>


