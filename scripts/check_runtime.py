"""Exercise an installed Analogic environment without external services."""
import argparse
import atexit
import importlib
import json
import logging
import os
from pathlib import Path
import secrets
import sys
import tempfile
from io import BytesIO


def check_runtime(packages):
    os.environ['ANALOGIC_SECRET_KEY'] = secrets.token_hex(32)
    os.environ['ANALOGIC_LOAD_SAMPLE_APPS'] = 'False'
    os.environ['MPLBACKEND'] = 'Agg'

    import numpy as np
    import pandas as pd
    import matplotlib.pyplot as plt
    import orjson
    import yaml
    from analogic import create_app
    from analogic.task import scheduler

    for package in packages:
        importlib.import_module(package)

    frame = pd.DataFrame({'value': np.array([1, 2, 3])})
    workbook = BytesIO()
    frame.to_excel(workbook, index=False, engine='openpyxl')
    workbook.seek(0)
    assert pd.read_excel(workbook)['value'].tolist() == [1, 2, 3]
    assert orjson.loads(orjson.dumps({'value': 6})) == yaml.safe_load('value: 6')
    figure, axes = plt.subplots()
    axes.plot(frame['value'])
    chart = BytesIO()
    figure.savefig(chart, format='png')
    plt.close(figure)
    assert chart.getvalue().startswith(b'\x89PNG')

    with tempfile.TemporaryDirectory() as instance:
        app = None
        try:
            app = create_app(instance, start_scheduler=False, initialize_auth_providers=False)
            assert not scheduler.running
            assert app.test_client().get('/__compatibility_missing__').status_code == 404
            if 'analogic_ldap_pool' in packages:
                assert 'LdapPool' in app.authentication_providers
            if 'analogic_seeder' in packages:
                assert any('/seeder_connector/' in rule.rule for rule in app.url_map.iter_rules())
            print(json.dumps({'python': sys.version.split()[0], 'extensions': len(packages),
                              'providers': len(app.authentication_providers),
                              'routes': len(list(app.url_map.iter_rules()))}))
        finally:
            # create_app owns logging handlers for its instance directory.
            logging.shutdown()
            if app is not None:
                atexit.unregister(app.on_exit)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--extensions', action='store_true', help='Require all nonempty extension repositories')
    parser.add_argument('--package', action='append', default=[], help='Require a selected extension module')
    args = parser.parse_args()
    packages = args.package
    if args.extensions:
        manifest = Path(__file__).resolve().parents[1] / 'extensions/manifest.json'
        packages = list(json.loads(manifest.read_text(encoding='utf-8')).values())
    check_runtime(packages)
