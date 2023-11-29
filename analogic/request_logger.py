import logging

class RequestLogger:

    def __init__(self):
        self.request_logger = logging.getLogger('request_logger')
        self.write_request_logger = logging.getLogger('write_request_logger')

    def log_request(self, **kwargs):
        self.request_logger.info(kwargs)

    def log_write_request(self, **kwargs):
        self.write_request_logger.info(kwargs)
