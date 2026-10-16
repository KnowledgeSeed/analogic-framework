"""Check the container's real WSGI startup and existing proxy-prefix behavior."""
import http.client
import os
from pathlib import Path
import secrets
import subprocess
import sys
import time


if __name__ == '__main__':
    root = Path(__file__).resolve().parents[1]
    environment = dict(os.environ, ANALOGIC_SECRET_KEY=secrets.token_hex(32),
                       ANALOGIC_LOAD_SAMPLE_APPS='True')
    process = subprocess.Popen([sys.executable, str(root / 'run.py')], cwd=root,
                               env=environment, stdout=subprocess.DEVNULL,
                               stderr=subprocess.PIPE, text=True)
    try:
        deadline = time.monotonic() + 30
        while True:
            if process.poll() is not None:
                raise RuntimeError('WSGI process exited before readiness: ' + process.stderr.read())
            connection = http.client.HTTPConnection('127.0.0.1', 5000, timeout=2)
            try:
                connection.request('GET', '/helloanalogic/')
                response = connection.getresponse()
                response.read()
                assert response.status == 200, response.status
                break
            except (OSError, http.client.HTTPException):
                if time.monotonic() >= deadline:
                    raise
                time.sleep(0.2)
            finally:
                connection.close()

        connection = http.client.HTTPConnection('127.0.0.1', 5000, timeout=5)
        try:
            connection.request('GET', '/helloanalogic', headers={
                'X-Forwarded-Host': 'compatibility.example.test',
                'X-Forwarded-Proto': 'https',
                'X-Forwarded-Prefix': '/prefix',
            })
            response = connection.getresponse()
            response.read()
            assert response.status in (301, 302, 307, 308), response.status
            assert response.getheader('Location') == 'https://compatibility.example.test/prefix/helloanalogic/'
        finally:
            connection.close()
        print(f'PASS HTTP and proxy prefix on Python {sys.version.split()[0]}')
    finally:
        process.terminate()
        try:
            process.wait(timeout=10)
        except subprocess.TimeoutExpired:
            process.kill()
            process.wait(timeout=5)
        process.stderr.close()
