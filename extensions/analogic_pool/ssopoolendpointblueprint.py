from DimensionFramework.Core.AnalogicEndpointBlueprint import AnalogicEndpointBlueprint
from flask import current_app

ssopoolendpoint = AnalogicEndpointBlueprint('ssopoolendpoint', __name__)


@ssopoolendpoint.analogic_endpoint_route('/valami2', methods=['GET'])
def valami2():
    return current_app.get_provider().activeUser()
