from AuthenticationProviders.LoginPool import LoginPool
from AuthenticationProviders.NoAuth import NoAuth
from AuthenticationProviders.NoAuthPool import NoAuthPool
from AuthenticationProviders.Cam import Cam
from AuthenticationProviders.SSOPool import SSOPool


class AuthenticationProviderFactory:

    @staticmethod
    def getProvider(config, cache, site_root):
        if config['authenticationMode'] == "LoginPool":
            return LoginPool(cache, site_root)
        if config['authenticationMode'] == "NoAuth":
            return NoAuth(cache, site_root)
        if config['authenticationMode'] == "NoAuthPool":
            return NoAuthPool(cache, site_root)
        if config['authenticationMode'] == "Cam":
            return Cam(cache, site_root)
        if config['authenticationMode'] == "SSOPool":
            return SSOPool(cache, site_root)
