from __future__ import print_function

import os
import sys
import threading
import atexit

try:
    import Queue as queue
except ImportError:
    import queue

_interval = 1.0
_times = {}
_files = ['path_to (venv) change_monitor.py']

_running = False
_queue = queue.Queue()
_lock = threading.Lock()


def _restart(path):
    _queue.put(True)
    prefix = 'monitor (pid=%d):' % os.getpid()
    print('%s Change detected to \'%s\'.' % (prefix, path), file=sys.stderr)
    print('%s Triggering Apache restart.' % prefix, file=sys.stderr)
    import ctypes
    ctypes.windll.LoadLibrary('c:\\Install\\Apache24VS16\\bin\\libhttpd.dll').ap_signal_parent(1)


def _modified(path):
    try:

        if not os.path.isfile(path):
            return path in _times


        mtime = os.stat(path).st_mtime
        if path not in _times:
            _times[path] = mtime

        if mtime != _times[path]:
            return True
    except:

        return True

    return False


def _monitor():
    while 1:

        try:
            # for module in sys.modules.values():
            #     if not hasattr(module, '__file__'):
            #         continue
            #     path = getattr(module, '__file__')
            #     if not path:
            #         continue
            #     if os.path.splitext(path)[1] in ['.pyc', '.pyo', '.pyd']:
            #         path = path[:-1]
            #     if _modified(path):
            #         return _restart(path)

            for path in _files:
                if _modified(path):
                    return _restart(path)

            return _queue.get(timeout=_interval)
        except:
            pass


_thread = threading.Thread(target=_monitor, deamon=True)


def _exiting():
    try:
        _queue.put(True)
    except:
        pass
    _thread.join()


atexit.register(_exiting)


def track(path):
    if not path in _files:
        _files.append(path)


def start(interval=1.0):
    global _interval
    if interval < _interval:
        _interval = interval

    global _running
    _lock.acquire()
    if not _running:
        prefix = 'monitor (pid=%d):' % os.getpid()
        print('%s Starting change monitor.' % prefix)
        _running = True
        _thread.start()
    _lock.release()
