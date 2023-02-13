from TM1py import TM1Service


class AnalogicTM1Service(TM1Service):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def get_session(self):
        return self._tm1_rest._s

    def close_session(self):
        self._tm1_rest._s.close()

