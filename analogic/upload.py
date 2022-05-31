import os
import shutil
import pandas as pd
import chardet
import pathlib
from werkzeug.utils import secure_filename
pd.set_option('display.float_format', lambda x: '%.3f' % x)
from TM1py.Utils.Utils import build_pandas_dataframe_from_cellset


class FileUploadManager:

    def __init__(self, setting):
        self.setting = setting

    def upload(self, target, staging, sub_folder, files):

        if staging != '':
            path = staging
        else:
            path = target

        if sub_folder != "":
            path = os.path.join(path, sub_folder)
            os.mkdir(path)

        for f in files.values():
            file_name = secure_filename(f.filename)
            file_path = os.path.join(path, file_name)
            f.save(file_path)
            file_extension = pathlib.Path(file_name).suffix
            if file_extension == '.xlsx' or file_extension == '.xls':
                xlsx = pd.read_excel(file_path)
                xlsx.to_csv(file_path.replace('xlsx', 'csv'), encoding='utf-8', index=False)
                os.remove(file_path)

        return path

    def pre_process(self, tm1_service, preprocess_template, target):

        framework_mdx = self.setting.get_framework_mdx('upload_preprocess')
        query = framework_mdx['mdx'].replace('$preprocess_template', preprocess_template)

        data = tm1_service.cubes.cells.execute_mdx(query)

        df = build_pandas_dataframe_from_cellset(data, multiindex=False)
        rules = df.set_index(framework_mdx['index']).to_dict()[framework_mdx['values']]

        return self._pre_process_validate(rules, target)

    def _pre_process_validate(self, rules, source_dir):
        file_names = os.listdir(source_dir)
        message = ''
        wrong_files = []

        for file_name in file_names:
            file_path = os.path.join(source_dir, file_name)
            m = ''
            if rules['ExtensionCheck'] == 'yes':
                m += self._check_extension(rules['FileFormat'], file_name)
            if rules['FileNoneEmptyCheck'] == 'yes':
                m += self._check_not_empty(file_path, file_name)
            m += self._check_content(file_path, rules['ExpectedColumnNr'],
                                     rules['FileColumnDelimiter'], rules['FileQuoteCharacter'],
                                     rules['HeaderCheck'], file_name)
            if m != '':
                wrong_files.append(file_name)
            message += m

        for file_name in wrong_files:
            os.remove(os.path.join(source_dir, file_name))

        return message

    def _check_character_set(self, blob, expected, file_name):
        result = chardet.detect(blob)
        return self._get_error_message(expected, result['encoding'], file_name, 'character set')

    def _check_extension(self, expected, file_name):
        file_extension = pathlib.Path(file_name).suffix
        return self._get_error_message('.' + expected, file_extension, file_name, 'extension')

    def _check_not_empty(self, path, file_name):
        if os.path.getsize(path) > 0:
            return ''
        return 'file: ' + file_name + ' is empty<br/>'

    def _check_content(self, path, expected_col, delimiter, quote, header, file_name):

        result = ''
        if delimiter.isnumeric():
            delimiter = chr(int(delimiter))

        with open(path, "r") as f:
            count_delimiter = sum(line.count(delimiter) for line in f)
            f.seek(0)
            count_quote = sum(line.count(quote) for line in f)
            f.seek(0)
            first_line = f.readline()

        if count_delimiter == 0:
            result += 'Expected delimiter for ' + file_name + ' is ' + delimiter + '<br/><br/>'

        if count_delimiter * 2 > count_quote:
            result += 'Expected quote character for ' + file_name + ' is ' + quote + '<br/><br/>'

        col_num = first_line.count(delimiter) + 1
        if expected_col is not None and col_num != expected_col:
            result += 'Expected column number for ' + file_name + ' is ' + str(expected_col) + ' but got ' + str(
                col_num) + '<br/><br/>'

        act_header = first_line.replace('\n', '')

        if header != '' and act_header != header:
            result += 'Expected header for ' + file_name + ' is ' + header + ' but got ' + act_header + '<br/><br/>'

        return result

    def _get_error_message(self, expected, got, file_name, sub_message):

        if expected is None or got is None:
            return ''
        if expected.lower() != got.lower():
            return 'Expected ' + sub_message + ' for ' + file_name + ' is ' + expected + ' but got: ' \
                   + got + '<br/><br/>'
        return ''

    def move(self, target, staging, sub_folder):

        target_dir = target
        source_dir = os.path.join(staging, sub_folder)

        file_names = os.listdir(source_dir)

        for file_name in file_names:
            shutil.move(os.path.join(source_dir, file_name), os.path.join(target_dir, file_name))

        os.rmdir(source_dir)

    def post_process(self):
        pass
