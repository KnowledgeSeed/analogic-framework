navigálj a source-t tartalmazó mappába:

py -3 -m venv virtualenvneve

virtualenvneve/Scripts/activate

pip install -r requirements.txt

set FLASK_APP=app.py

set FLASK_ENV=development

flask run

sc create redis-server binPath="c:\Program Files\redis-3.0\msvs\x64\Debug\redis-server.exe --service-run" DisplayName="Redis Server" start=auto