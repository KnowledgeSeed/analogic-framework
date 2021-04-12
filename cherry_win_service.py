import sys
import os
import site

project_name = "flaskapp"  # Change this for your own project !!!!!!!!!!!!!!
venv_folder_name = "venv"  # Change this for your own venv path !!!!!!!!!!!!!!

if sys.executable.lower().endswith("pythonservice.exe"):

    # Get root path for the project
    service_directory = os.path.abspath(os.path.dirname(__file__))
    project_directory = service_directory[:service_directory.find(project_name)+len(project_name)]

    # Get venv path for the project
    def file_path(x): return os.path.join(project_directory, x)
    venv_base = file_path(venv_folder_name)
    venv_scripts = os.path.join(venv_base, "Scripts")
    venv_packages = os.path.join(venv_base, 'Lib', 'site-packages')

    # Change current working directory from PythonService.exe location to something better.
    os.chdir(project_directory)
    sys.path.append(".")
    prev_sys_path = list(sys.path)

    # Manually activate a virtual environment inside an already initialized interpreter.
    os.environ['PATH'] = venv_scripts + os.pathsep + os.environ['PATH']

    site.addsitedir(venv_packages)
    sys.real_prefix = sys.prefix
    sys.prefix = venv_base

    # Move some sys path in front of others
    new_sys_path = []
    for item in list(sys.path):
        if item not in prev_sys_path:
            new_sys_path.append(item)
            sys.path.remove(item)
    sys.path[:0] = new_sys_path

import win32serviceutil
import win32service
import win32event
import servicemanager
import socket
import threading
import ctypes
from DimensionFramework import app as application
from cheroot.wsgi import Server as WSGIServer


class ServerThread(threading.Thread):

    def __init__(self):
        threading.Thread.__init__(self)

    def run(self):
        print('thread start\n')
        self.server = WSGIServer(bind_addr=('localhost', 8887), wsgi_app=application, numthreads=100)
        self.server.start()
        print('thread done\n')

    def get_id(self):
        # returns id of the respective thread
        if hasattr(self, '_thread_id'):
            return self._thread_id
        for id, thread in threading._active.items():
            if thread is self:
                return id

    def exit(self):
        thread_id = self.get_id()
        self.server.stop()
        res = ctypes.pythonapi.PyThreadState_SetAsyncExc(thread_id, ctypes.py_object(SystemExit))
        if res > 1:
            ctypes.pythonapi.PyThreadState_SetAsyncExc(thread_id, 0)
            print('Exception raise failure')


class SMWinservice(win32serviceutil.ServiceFramework):
    _svc_name_ = 'DimensionFrameworkCherryPyServer'
    _svc_display_name_ = 'Dimension Framework CherryPy Server'
    _svc_description_ = 'Python cherrypy WSGI service'

    @classmethod
    def parse_command_line(cls):
        win32serviceutil.HandleCommandLine(cls)

    def __init__(self, args):
        win32serviceutil.ServiceFramework.__init__(self, args)
        self.stopEvt = win32event.CreateEvent(None, 0, 0, None)
        socket.setdefaulttimeout(60000)

    def SvcStop(self):
        servicemanager.LogMsg(servicemanager.EVENTLOG_INFORMATION_TYPE,
                              servicemanager.PYS_SERVICE_STOPPED,
                              (self._svc_name_, ''))
        self.ReportServiceStatus(win32service.SERVICE_STOP_PENDING)
        win32event.SetEvent(self.stopEvt)

    def SvcDoRun(self):
        servicemanager.LogMsg(servicemanager.EVENTLOG_INFORMATION_TYPE,
                              servicemanager.PYS_SERVICE_STARTED,
                              (self._svc_name_, ''))
        self.main()

    def main(self):
        print('main start')
        self.server = ServerThread()
        self.server.start()
        print('waiting on win32event')
        win32event.WaitForSingleObject(self.stopEvt, win32event.INFINITE)
        self.server.exit()
        print('waiting on thread')
        self.server.join()
        print('main done')


if __name__ == '__main__':
    SMWinservice.parse_command_line()
