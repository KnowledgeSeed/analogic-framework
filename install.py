import os
import sys
from os.path import exists
from analogic import create_app
from rich.prompt import Prompt
from rich.console import Console
from rich.text import Text

root = os.path.realpath(os.getcwd())
extensions = os.path.join(root, 'extensions')

if exists(extensions):
    sys.path.insert(0, root)
    sys.path.insert(0, os.path.join(root, 'extensions'))

analogic_app_name = ''
if len(sys.argv) > 1:
    analogic_app_name = sys.argv[1]


app = create_app(root, False, False)

console = Console()
text = Text("Available apps: " + ','.join(app.analogic_applications.keys()))
text.stylize("bold magenta", 0, 20)
console.print(text)


if analogic_app_name == '':
    analogic_app_name = Prompt.ask('Please enter app name', choices=app.analogic_applications.keys())

analogic_app = app.analogic_applications.get(analogic_app_name)


if analogic_app is not None:
    analogic_app.install(sys.argv[2:])


