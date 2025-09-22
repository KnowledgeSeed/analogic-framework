import sys


class ClassLoader:

    def __init__(self):
        pass

    def str_to_class(self, n, s):
        return getattr(sys.modules[n], s)

    def call(self, description, request, tm1_service, setting, authentication_provider, **kwargs):
        if setting.instance in description['namespace'].split('.'):
            namespace = description['namespace']
        else:
            namespace = setting.instance + '.' + description['namespace']
        my_object = self.str_to_class(namespace, description['class'])
        return getattr(my_object, description['method'])(self=my_object, request=request, tm1_service=tm1_service, setting=setting, authentication_provider=authentication_provider, **kwargs)
