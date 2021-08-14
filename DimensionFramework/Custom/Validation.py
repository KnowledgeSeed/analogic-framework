import os
import pandas as pd


class Validation:

    def __init__(self):
        pass

    def validateExcelImport(self, request, tm1_service, setting, path):
        company = request.form.get('validationCompany')
        receiver = request.form.get('validationReceiver')
        global_version = request.form.get('validationGlobalVersion')
        version = request.form.get('validationVersion')
        product = request.form.get('validationProduct')

        file_names = os.listdir(path)

        csv = pd.read_csv(os.path.join(path, file_names[0]))
        res = list(csv.to_dict().keys())

        if res[1] != company or res[2] != receiver or res[3] != global_version or res[4] != version or res[5] != product:
            return request.form.get('validationMessage', 'Validation error')

        return ''
