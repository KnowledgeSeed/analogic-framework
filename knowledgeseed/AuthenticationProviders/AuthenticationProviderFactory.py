from knowledgeseed.AuthenticationProviders.LoginPool import LoginPool
from knowledgeseed.AuthenticationProviders.DevAuth import DevAuth
from knowledgeseed.AuthenticationProviders.DevAuthPool import DevAuthPool
from knowledgeseed.AuthenticationProviders.Cam import Cam
from knowledgeseed.AuthenticationProviders.SSOPool import SSOPool


class AuthenticationProviderFactory:

    @staticmethod
    def getProvider(config, cache, site_root, instance='default'):
        if config['authenticationMode'] == "LoginPool":
            return LoginPool(cache, site_root, instance)
        if config['authenticationMode'] == "DevAuth":
            return DevAuth(cache, site_root, instance)
        if config['authenticationMode'] == "DevAuthPool":
            return DevAuthPool(cache, site_root, instance)
        if config['authenticationMode'] == "Cam":
            return Cam(cache, site_root, instance)
        if config['authenticationMode'] == "SSOPool":
            return SSOPool(cache, site_root, instance)
