from abc import ABC, abstractmethod
class SignalReceiver(ABC):
    @abstractmethod
    def initialize(self):
        pass