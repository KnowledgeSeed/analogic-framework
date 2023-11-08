from abc import ABC, abstractmethod
class LongRunningTaskExecutor(ABC):

    @abstractmethod
    def send_long_running_request(self, url, method, data, headers, cookies, encode_content) -> dict:
        pass

    @abstractmethod
    def on_long_running_request_canceled(self, **kwargs):
        pass

    @abstractmethod
    def on_long_running_request_completed(self, **kwargs):
        pass

    @abstractmethod
    def check_long_running_request(self, **kwargs) -> bool:
        pass