from flask import current_app
from DimensionFramework.Core.AnalogicEndpoint import AnalogicEndpoint


class SSOAnalogicEndpoint(AnalogicEndpoint):
    @staticmethod
    # @app.route('/valami', methods=['GET'])
    def valami():
        return current_app.get_provider().activeUser()
