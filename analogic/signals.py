from blinker import Namespace

my_signals = Namespace()

logged_in = my_signals.signal('logged_in')

before_call_do_proxy = my_signals.signal('before_call_do_proxy')
