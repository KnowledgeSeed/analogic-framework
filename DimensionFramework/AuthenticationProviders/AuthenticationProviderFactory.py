from DimensionFramework.AuthenticationProviders.LoginBasicPool import LoginBasicPool
from DimensionFramework.AuthenticationProviders.Cam import Cam
from DimensionFramework.AuthenticationProviders.LoginPool import LoginPool
from DimensionFramework.AuthenticationProviders.SSOPool import SSOPool
from DimensionFramework.AuthenticationProviders.SSOBasicPool import SSOBasicPool


class AuthenticationProviderFactory:

    @staticmethod
    def getProvider(config, cache, site_root, instance='default'):
        if config['authenticationMode'] == "Cam":
            return Cam(cache, site_root, instance)
        if config['authenticationMode'] == "LoginBasicPool":
            return LoginBasicPool(cache, site_root, instance)
        if config['authenticationMode'] == "LoginPool":
            return LoginPool(cache, site_root, instance)
        if config['authenticationMode'] == "SSOPool":
            return SSOPool(cache, site_root, instance)
        if config['authenticationMode'] == "SSOBasicPool":
            return SSOBasicPool(cache, site_root, instance)
