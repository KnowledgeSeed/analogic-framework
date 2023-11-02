from analogic.signal_receiver import SignalReceiver
from flask import current_app
import os
import sys
import logging
class DefaultSignalReceiver(SignalReceiver):

    def initialize(self):
        for name, analogic_app in current_app.analogic_applications.items():

            if analogic_app.get_setting().get_config().get('authenticationMode') == 'MultiAuthenticationProvider':

                for n, sub_analogic_app in analogic_app.authentication_providers.items():

                    self._connect_signal_and_handler(sub_analogic_app)
            else:

               self._connect_signal_and_handler(analogic_app)

    def _connect_signal_and_handler(self, analogic_app):

        setting = analogic_app.get_setting()

        path = os.path.join(setting.site_root, 'server', 'configs', 'signal_subscriptions.json')

        if os.path.exists(path):

            sub = setting._get_json_setting(os.path.join('server', 'configs', 'signal_subscriptions'))

            for subscription in sub.get('subscriptions'):
                try:
                    signal_params = subscription.get('signal')

                    handler_params = subscription.get('handler')

                    named_signal = getattr(sys.modules[signal_params.get('namespace')], signal_params.get('name'))

                    if handler_params.get('class') is None:

                        handler = getattr(sys.modules[handler_params.get('namespace')], handler_params.get('method'))

                    else:

                        handler = getattr(getattr(sys.modules[handler_params.get('namespace')], handler_params.get('class')), handler_params.get('method'))

                    getattr(named_signal, 'connect')(handler, analogic_app)

                except Exception as e:
                    logger = logging.getLogger(__name__)
                    logger.error(f'Unable to connect signal {setting.get_instance()}')
                    logger.error(e, exc_info=True)

