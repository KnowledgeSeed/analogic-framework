from knowledgeseed.AuthenticationProviders.LoginPool import LoginPool
from knowledgeseed.AuthenticationProviders.NoAuth import NoAuth
from knowledgeseed.AuthenticationProviders.NoAuthPool import NoAuthPool
from knowledgeseed.AuthenticationProviders.Cam import Cam
from knowledgeseed.AuthenticationProviders.SSOPool import SSOPool


class AuthenticationProviderFactory:

    @staticmethod
    def getProvider(config, cache, site_root, instance='default'):
        if config['authenticationMode'] == "LoginPool":
            return LoginPool(cache, site_root, instance)
        if config['authenticationMode'] == "NoAuth":
            return NoAuth(cache, site_root, instance)
        if config['authenticationMode'] == "NoAuthPool":
            return NoAuthPool(cache, site_root, instance)
        if config['authenticationMode'] == "Cam":
            return Cam(cache, site_root, instance)
        if config['authenticationMode'] == "SSOPool":
            return SSOPool(cache, site_root, instance)
