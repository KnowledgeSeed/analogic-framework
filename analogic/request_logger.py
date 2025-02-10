import logging
from flask import current_app
import os
import orjson


class RequestLogger:

    def __init__(self):
        self.request_logger = logging.getLogger('request_logger')
        self.write_request_logger = logging.getLogger('write_request_logger')

    def log_request(self, **kwargs):
        self.request_logger.info('request log', extra={'request': kwargs})

    def log_write_request(self, **kwargs):
        self.write_request_logger.info(kwargs)

    def get_request_log(self, journey_id=''):
        path = os.path.join(current_app.instance_path, 'logs', 'request_json.log')
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                data = f.read()
                data = data.split("}\n")
                data = [d.strip() + "}" for d in data]
                data = list(filter(("}").__ne__, data))
                data = [orjson.loads(d) for d in data]

                if journey_id != '':
                    data = list(filter(lambda x: x.get('journey_id') == journey_id, data))

                return data

        else:
            raise Exception('Log file not found')
