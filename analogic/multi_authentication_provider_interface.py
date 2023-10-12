from abc import ABC, abstractmethod


class MultiAuthenticationProviderInterface(ABC):

    @abstractmethod
    def do_login(self, user_name, password):
        pass
