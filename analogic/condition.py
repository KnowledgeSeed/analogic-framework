from abc import ABC, abstractmethod


class Condition(ABC):

    @abstractmethod
    def get_authentication_provider_name(self, config):
        pass
