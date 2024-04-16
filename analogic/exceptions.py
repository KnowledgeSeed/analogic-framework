class AnalogicException(Exception):
    def __init__(self, message):
        self.message = message

    def __str__(self):
        return self.message


class AnalogicProxyException(Exception):
    def __init__(self, message: str):
        super(AnalogicProxyException, self).__init__(message)


class AnalogicAccessDeniedException(Exception):
    def __init__(self, message: str):
        super(AnalogicAccessDeniedException, self).__init__(message)


class AnalogicTM1ServiceException(Exception):
    def __init__(self, message):
        self.message = message

    def __str__(self):
        return self.message

class AnalogicAcceptedException(Exception):
    def __init__(self, message):
        self.message = message

    def __str__(self):
        return self.message

class AnalogicMaintenanceException(Exception):
    def __init__(self, authentication_provider):
        self.authentication_provider = authentication_provider

