from abc import ABC, abstractmethod
import os
import shutil
import json


class TranslationProvider(ABC):
    """Base class for translation providers."""

    def __init__(self, authentication_provider):
        self.authentication_provider = authentication_provider
        self.setting = authentication_provider.get_setting()

    @abstractmethod
    def generate_translations(self):
        """Generate translation assets for the application."""
        raise NotImplementedError

    def has_translations(self):
        """Return True if the static translation folder is not empty."""
        target_dir = os.path.join(self.setting.site_root, 'static', 'assets', 'translations')
        return os.path.isdir(target_dir) and any(os.scandir(target_dir))


class JsonTranslationProvider(TranslationProvider):
    """Translation provider copying JSON files into static assets."""

    def generate_translations(self):
        app_root = self.setting.site_root
        source_dir = os.path.join(app_root, 'translations')
        target_dir = os.path.join(app_root, 'static', 'assets', 'translations')

        if not os.path.isdir(source_dir):
            return

        for root, _, files in os.walk(source_dir):
            rel = os.path.relpath(root, source_dir)
            dest = os.path.join(target_dir, rel)
            os.makedirs(dest, exist_ok=True)
            for file in files:
                shutil.copy2(os.path.join(root, file), os.path.join(dest, file))


def create_tm1_translation_cube(
        base_url=None,
        user=None,
        password=None,
        namespace=None,
        cube_name='AnalogicTranslations',
        locale_dimension='AnalogicLocale',
        key_dimension='AnalogicKey',
        measure_dimension='AnalogicMeasure',
        measure_element='AnalogicValue',
        tm1_service=None):
    """Create a TM1 cube for storing translations.

    Either ``tm1_service`` must be provided or ``base_url``, ``user`` and
    ``password`` must be given to establish a new connection.
    """
    try:
        from .analogic_tm1_service import AnalogicTM1Service
        from TM1py.Objects import Dimension, Hierarchy, Element, Cube
    except Exception:
        return

    if tm1_service is None:
        if not base_url or not user or not password:
            raise ValueError('tm1_service or base_url, user and password are required')
        tm1_service = AnalogicTM1Service(base_url=base_url,
                                         user=user,
                                         password=password,
                                         namespace=namespace)
        close_service = True
    else:
        close_service = False

    def _create(tm1):
        if not tm1.dimensions.exists(locale_dimension):
            h = Hierarchy(locale_dimension, locale_dimension, [Element('Default', 'String')])
            tm1.dimensions.create(Dimension(locale_dimension, hierarchies=[h]))
        if not tm1.dimensions.exists(key_dimension):
            h = Hierarchy(key_dimension, key_dimension, [Element('Default', 'String')])
            tm1.dimensions.create(Dimension(key_dimension, hierarchies=[h]))
        if not tm1.dimensions.exists(measure_dimension):
            h = Hierarchy(measure_dimension, measure_dimension, [Element(measure_element, 'String')])
            tm1.dimensions.create(Dimension(measure_dimension, hierarchies=[h]))
        if not tm1.cubes.exists(cube_name):
            cube = Cube(cube_name, dimensions=[locale_dimension, key_dimension, measure_dimension])
            tm1.cubes.create(cube)

    if close_service:
        with tm1_service as tm1:
            _create(tm1)
    else:
        _create(tm1_service)


def delete_tm1_translation_cube(
        base_url=None,
        user=None,
        password=None,
        namespace=None,
        cube_name='AnalogicTranslations',
        locale_dimension='AnalogicLocale',
        key_dimension='AnalogicKey',
        measure_dimension='AnalogicMeasure',
        tm1_service=None):
    """Delete the TM1 cube and related dimensions used for translations.

    Either ``tm1_service`` must be provided or ``base_url``, ``user`` and
    ``password`` must be given to establish a new connection.
    """
    try:
        from .analogic_tm1_service import AnalogicTM1Service
    except Exception:
        return

    if tm1_service is None:
        if not base_url or not user or not password:
            raise ValueError('tm1_service or base_url, user and password are required')
        tm1_service = AnalogicTM1Service(base_url=base_url,
                                         user=user,
                                         password=password,
                                         namespace=namespace)
        close_service = True
    else:
        close_service = False

    def _delete(tm1):
        if tm1.cubes.exists(cube_name):
            tm1.cubes.delete(cube_name)
        for dim in (locale_dimension, key_dimension, measure_dimension):
            if tm1.dimensions.exists(dim):
                tm1.dimensions.delete(dim)

    if close_service:
        with tm1_service as tm1:
            _delete(tm1)
    else:
        _delete(tm1_service)


class TM1TranslationProvider(TranslationProvider):
    """Translation provider generating assets from TM1 cube."""

    CUBE_NAME = 'AnalogicTranslations'
    LOCALE_DIMENSION = 'AnalogicLocale'
    KEY_DIMENSION = 'AnalogicKey'
    MEASURE_DIMENSION = 'AnalogicMeasure'
    MEASURE_ELEMENT = 'AnalogicValue'

    def __init__(self, authentication_provider):
        super().__init__(authentication_provider)

    def generate_translations(self):
        try:
            tm1 = self.authentication_provider.get_tm1_service()
        except Exception as e:
            self.authentication_provider.getLogger().error(
                f"Error getting TM1 service: {e}")
            return

        mdx = f"""
            SELECT
            TM1SubsetAll([{self.KEY_DIMENSION}]) ON COLUMNS,
            TM1SubsetAll([{self.LOCALE_DIMENSION}]) ON ROWS
            FROM [{self.CUBE_NAME}]
            WHERE ([{self.MEASURE_DIMENSION}].[{self.MEASURE_ELEMENT}])
            """
        try:
            df = tm1.cells.execute_mdx_dataframe(mdx)
        except Exception as e:
            self.authentication_provider.getLogger().error(
                f"Error executing MDX: {e}")
            return

        # Normalize column names (TM1 usually returns them in ``dim:element`` format)
        try:
            df.columns = [str(col).split(':')[-1] for col in df.columns]
        except Exception:
            pass

        records = []
        # If the dataframe contains explicit locale/key columns, convert it to
        # a dictionary grouped by locale without relying on pandas features.
        if (hasattr(df, 'columns') and
                self.LOCALE_DIMENSION in df.columns and
                self.KEY_DIMENSION in df.columns):
            value_col = (self.MEASURE_ELEMENT
                         if self.MEASURE_ELEMENT in df.columns else 'Value')
            for _, row in df.iterrows():
                locale = str(row.get(self.LOCALE_DIMENSION))
                key = row.get(self.KEY_DIMENSION)
                value = row.get(value_col)
                if not isinstance(value, str) or not key:
                    continue
                records.append((locale, key, value))
            data = {}
            for locale, key, value in records:
                data.setdefault(locale, {})[key] = value
            items = data.items()
        else:
            # Assume dataframe is already pivoted with locales in index and
            # keys in columns
            try:
                df.index = [str(idx).split(':')[-1] for idx in df.index]
            except Exception:
                pass
            items = ((locale, {k: v for k, v in row.items()
                               if isinstance(v, str) and v})
                     for locale, row in df.iterrows())

        target_dir = os.path.join(self.setting.site_root, 'static', 'assets', 'translations')
        for locale, translations in items:
            locale_dir = os.path.join(target_dir, str(locale))
            os.makedirs(locale_dir, exist_ok=True)
            with open(os.path.join(locale_dir, 'translations.json'), 'w', encoding='utf-8') as f:
                json.dump(translations, f, ensure_ascii=False)
