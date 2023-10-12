from blinker import Namespace
my_signals = Namespace()

logged_in = my_signals.signal('logged_in')