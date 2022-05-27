import os
import pandas as pd


def validateParameter(title, expected, received):
    if expected != received:
        return "expected " + title + ": " + expected + " but received: " + received + '<br/>'
    return ''

class Validation:

    def __init__(self):
        pass

    def validateIpPlanningExcelImport(self, request, tm1_service, setting, authentication_provider, path):
        company = request.form.get('validationCompany')
        receiver = request.form.get('validationReceiver')
        global_version = request.form.get('validationGlobalVersion')
        version = request.form.get('validationVersion')
        product = request.form.get('validationProduct')

        file_names = os.listdir(path)

        csv = pd.read_csv(os.path.join(path, file_names[0]))
        res = list(csv.to_dict().keys())
        validation_message = ''
        validation_message += validateParameter('company', res[1], company)
        validation_message += validateParameter('receiver', res[2], receiver)
        validation_message += validateParameter('version', res[3], global_version)
        validation_message += validateParameter('product version', res[4], version)
        validation_message += validateParameter('product', res[5], product)

        if validation_message != '':
            return request.form.get('validationMessage', 'Validation error') + '<br/>' + validation_message

        return validation_message

    def validateExcelImport(self, request, tm1_service, setting, authentication_provider, path):
        company = request.form.get('validationCompany')
        receiver = request.form.get('validationReceiver')
        global_version = request.form.get('validationGlobalVersion')
        version = request.form.get('validationVersion')
        product = request.form.get('validationProduct')
        line_item = request.form.get('validationLineItem')

        file_names = os.listdir(path)

        csv = pd.read_csv(os.path.join(path, file_names[0]))
        res = list(csv.to_dict().keys())
        validation_message = ''
        validation_message += validateParameter('company', res[1], company)
        validation_message += validateParameter('receiver', res[2], receiver)
        validation_message += validateParameter('version', res[3], global_version)
        validation_message += validateParameter('product version', res[4], version)
        validation_message += validateParameter('product', res[5], product)
        validation_message += validateParameter('line item', res[6], line_item)

        if validation_message != '':
            return request.form.get('validationMessage', 'Validation error') + '<br/>' + validation_message

        return validation_message

    def validateCustomerPlanningExcelImport(self, request, tm1_service, setting, authentication_provider, path):
        company = request.form.get('validationCompany')
        receiver = request.form.get('validationReceiver')
        global_version = request.form.get('validationGlobalVersion')
        version = request.form.get('validationVersion')
        product = request.form.get('validationProduct')
        line_item = request.form.get('validationLineItem')
        customer_code = request.form.get('validationCustomerCode')
        territory_code = request.form.get('validationTerritoryCode')

        file_names = os.listdir(path)

        csv = pd.read_csv(os.path.join(path, file_names[0]))
        res = list(csv.to_dict().keys())
        validation_message = ''
        validation_message += validateParameter('company', res[1], company)
        validation_message += validateParameter('receiver', res[2], receiver)
        validation_message += validateParameter('version', res[3], global_version)
        validation_message += validateParameter('product version', res[4], version)
        validation_message += validateParameter('product', res[5], product)
        validation_message += validateParameter('line item', res[6], line_item)
        validation_message += validateParameter('customer code', res[7], customer_code)
        validation_message += validateParameter('territory code', res[8], territory_code)

        if validation_message != '':
            return request.form.get('validationMessage', 'Validation error') + '<br/>' + validation_message

        return validation_message

    def validateGrowthRateExcelImport(self, request, tm1_service, setting, authentication_provider, path):
        company = request.form.get('validationCompany')
        global_version = request.form.get('validationGlobalVersion')

        file_names = os.listdir(path)

        csv = pd.read_csv(os.path.join(path, file_names[0]))
        res = list(csv.to_dict().keys())
        validation_message = ''
        validation_message += validateParameter('company', company, res[1])
        validation_message += validateParameter('version', global_version, res[2])        

        if validation_message != '':
            return request.form.get('validationMessage', 'Validation error') + '<br/>' + validation_message

        return validation_message
