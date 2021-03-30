from DimensionFramework.AuthenticationProviders.LoginPool import LoginPool
from DimensionFramework.AuthenticationProviders.DevAuth import DevAuth
from DimensionFramework.AuthenticationProviders.DevAuthPool import DevAuthPool
from DimensionFramework.AuthenticationProviders.Cam import Cam
from DimensionFramework.AuthenticationProviders.SSOPool import SSOPool


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
