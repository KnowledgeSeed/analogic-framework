navigálj a source-t tartalmazó mappába:

py -3 -m venv virtualenvneve

virtualenvneve/Scripts/activate

pip install -r requirements.txt

set FLASK_APP=app.py

set FLASK_ENV=development

flask run