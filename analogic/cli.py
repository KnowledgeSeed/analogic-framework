import os
import sys
from os.path import exists
from analogic.analogic import create_app
from rich.prompt import Prompt
from rich.console import Console
from rich.text import Text
import argparse


def run_cli():
    root = os.path.realpath(os.getcwd())
    extensions = os.path.join(root, 'extensions')

    if exists(extensions):
        sys.path.insert(0, root)
        sys.path.insert(0, os.path.join(root, 'extensions'))

    app = create_app(root, False, False)

    ap = argparse.ArgumentParser()

    ap.add_argument("-a", "--application", required=False,
                    help="Name of the app")

    ap.add_argument("-m", "--method", required=False,
                    help="Backend method to call on selected app")
    try:
        ap.add_argument("-m", "--method", required=False,
                    help="Backend method to call on selected app")
    except Exception:
        pass

    for n, analogic_app in app.analogic_applications.items():
        analogic_app.add_command_line_parameters(ap)

    args = vars(ap.parse_args())

    if args.get('application') is None:
        console = Console()
        text = Text("Available apps: " + ','.join(app.analogic_applications.keys()))
        text.stylize("bold magenta", 0, 1000)
        console.print(text)
        args['application'] = Prompt.ask('Please enter app name', choices=app.analogic_applications.keys())

    selected_analogic_app = app.analogic_applications.get(args.get('application'))

    if args.get('method') is None:
        args['method'] = Prompt.ask('Please enter {0} app backend method'.format(args.get('application')),
                                    choices=selected_analogic_app.get_available_backend_methods())
    with app.app_context():
        getattr(selected_analogic_app, args.get('method'))(args)

