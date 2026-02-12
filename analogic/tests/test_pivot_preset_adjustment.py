import sys
from pathlib import Path
import unittest
from unittest.mock import patch

sys.path.append(str(Path(__file__).resolve().parents[2]))

from analogic.pivot import (
    get_adjusted_slicer_preset_data_according_to_selected_indexes,
    get_element_name_and_alias_by_name,
)


class DummyResponse:
    def __init__(self, payload):
        self._payload = payload

    def json(self):
        return self._payload


class DummyRest:
    def __init__(self, payload):
        self.payload = payload
        self.last_url = None

    def GET(self, url, **kwargs):
        self.last_url = url
        return DummyResponse(self.payload)


class DummyTm1:
    def __init__(self, payload):
        self._tm1_rest = DummyRest(payload)


class TestPivotPresetAdjustment(unittest.TestCase):
    def test_adjustment_prefers_element_name_match_over_index(self):
        preset_data = [[{
            'index': 0,
            'private': False,
            'subset': 'Territories',
            'dimension': 'Region',
            'hierarchy': 'Region',
            'alias_attr_name': 'Name',
            'element': 'DEGT',
            'title': 'Old',
        }], [], [], {}, {}]

        with patch('analogic.pivot.get_element_name_and_alias_by_name', return_value=['DEGT', 'DE Germany']) as by_name, \
             patch('analogic.pivot.get_elements_name_and_alias') as by_index:
            adjusted = get_adjusted_slicer_preset_data_according_to_selected_indexes(None, preset_data, 'user1')

        self.assertEqual('DEGT', adjusted[0][0]['element'])
        self.assertEqual('DE Germany', adjusted[0][0]['title'])
        by_name.assert_called_once()
        by_index.assert_not_called()

    def test_adjustment_falls_back_to_clamped_index_when_name_missing(self):
        preset_data = [[{
            'index': 5,
            'private': False,
            'subset': 'Territories',
            'dimension': 'Region',
            'hierarchy': 'Region',
            'alias_attr_name': 'Name',
            'element': 'DEGT',
            'title': 'Old',
        }], [], [], {}, {}]

        with patch('analogic.pivot.get_element_name_and_alias_by_name', return_value=None), \
             patch('analogic.pivot.get_elements_name_and_alias', return_value=[['A', 'A Alias'], ['B', 'B Alias']]):
            adjusted = get_adjusted_slicer_preset_data_according_to_selected_indexes(None, preset_data, 'user1')

        self.assertEqual('B', adjusted[0][0]['element'])
        self.assertEqual('B Alias', adjusted[0][0]['title'])

    def test_get_element_name_and_alias_by_name_escapes_quotes(self):
        tm1 = DummyTm1({'value': [{'Name': "O'Brian", 'Attributes': {'Long Name': 'OB'}}]})

        result = get_element_name_and_alias_by_name(
            tm1,
            'Region',
            'Region',
            'Territories',
            False,
            "O'Brian",
            'Long Name'
        )

        self.assertIn("$filter=Name eq 'O''''Brian'", tm1._tm1_rest.last_url)
        self.assertEqual(["O'Brian", 'OB'], result)


if __name__ == '__main__':
    unittest.main()
