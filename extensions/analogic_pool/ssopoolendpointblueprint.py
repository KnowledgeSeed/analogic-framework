from DimensionFramework.Core.AnalogicEndpointBlueprint import AnalogicEndpointBlueprint
from flask import current_app

ssopoolendpointblueprint = AnalogicEndpointBlueprint('ssopoolendpointblueprint', __name__)


@ssopoolendpointblueprint.analogic_endpoint_route('/valami2', methods=['GET'])
def valami2():
    return current_app.get_provider().activeUser()
