import sys


class ExcelExport:

    def __init__(self):
        pass

    def str_to_class(self, n, s):
        return getattr(sys.modules[n], s)

    def export(self, export_description, request, tm1_service):
        export_object = self.str_to_class(export_description['namespace'], export_description['class'])
        return getattr(export_object, export_description['method'])(self=export_object, request=request, tm1_service=tm1_service)
