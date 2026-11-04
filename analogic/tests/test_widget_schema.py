import json
import tempfile
import unittest
from pathlib import Path

from analogic.widget_schema import (
    build_widget_schema,
    get_widget_schema,
    known_config_keys,
    write_widget_schema,
)

BASE = """
class Widget {
    getWidthAndHeight(data, defaults, dataPrefix) {
        const width = this.getRealValue('width', data, defaults.width, dataPrefix),
            height = this.getRealValue('height', data, false);
        return [width, height];
    }
    isVisible() { return this.options.visible !== false; }
}
"""

BUTTON = """
/* ButtonWidget: this.getRealValue('commentedOut', d, 1) must be ignored */
class ButtonWidget extends Widget {
    getHtml(widgets, d) {
        const o = this.options, v = this.getParameters(d);
        // this.getRealValue('alsoCommentedOut', d, 2)
        return `<a ${o.confirmMessage ? 'data-confirm' : ''} data-id="${o.id}" data-action="launch">${v.label}</a>`;
    }
    getParameters(d) {
        return {
            label: this.getRealValue('label', d, ''),
            enabled: this.getRealValue('enabled', d, true),
            fontColor: this.getRealValue('fontColor', d, false),
            borderWidth: this.getRealValue('borderWidth', d, 1),
            items: this.getRealValue('items', d, []),
            style: this.getRealValue('style', d, {a: 1, b: [2, 3]}),
            width: this.getRealValue('width', d, 120),
            dynamic: this.getRealValue(prefix + 'Color', d, false),
        };
    }
}

class FancyButtonWidget extends ButtonWidget {
    getParameters(d) {
        return {...super.getParameters(d), glow: this.getRealValue('glow', d, "soft")};
    }
}
"""


class TestWidgetSchema(unittest.TestCase):

    def setUp(self):
        self.tempdir = tempfile.TemporaryDirectory()
        root = Path(self.tempdir.name)
        (root / 'base').mkdir()
        (root / 'base' / 'widget.js').write_text(BASE, encoding='utf-8')
        (root / 'button.js').write_text(BUTTON, encoding='utf-8')
        (root / 'notes.txt').write_text("class NotAWidget extends Widget {}", encoding='utf-8')
        self.root = root
        self.schema = build_widget_schema(str(root))
        self.widgets = self.schema['widgets']

    def tearDown(self):
        self.tempdir.cleanup()

    def test_only_javascript_classes_are_reported(self):
        self.assertEqual(sorted(self.widgets), ['ButtonWidget', 'FancyButtonWidget', 'Widget'])
        self.assertEqual(self.widgets['ButtonWidget']['file'], 'button.js')
        self.assertEqual(self.widgets['Widget']['file'], 'base/widget.js')

    def test_parameters_come_from_get_real_value_with_default_and_type(self):
        params = {item['name']: item for item in self.widgets['ButtonWidget']['parameters']}
        self.assertEqual(params['label'], {'name': 'label', 'type': 'string', 'default': "''"})
        self.assertEqual(params['enabled']['type'], 'boolean')
        # `false` is the framework's "not set", not evidence of a flag.
        self.assertEqual(params['fontColor']['type'], 'any')
        self.assertEqual(params['borderWidth'], {'name': 'borderWidth', 'type': 'number', 'default': '1'})
        self.assertEqual(params['items']['type'], 'array')
        # A default containing commas and brackets is one argument.
        self.assertEqual(params['style']['default'], '{a: 1, b: [2, 3]}')

    def test_comments_and_computed_keys_are_not_parameters(self):
        names = {item['name'] for item in self.widgets['ButtonWidget']['parameters']}
        self.assertNotIn('commentedOut', names)
        self.assertNotIn('alsoCommentedOut', names)
        self.assertNotIn('dynamic', names)
        self.assertNotIn('Color', names)

    def test_direct_option_reads_are_listed_without_plumbing(self):
        self.assertEqual(self.widgets['ButtonWidget']['optionKeys'], ['confirmMessage'])
        self.assertEqual(self.widgets['Widget']['optionKeys'], ['visible'])

    def test_inheritance_merges_parameters_and_the_nearest_definition_wins(self):
        fancy = self.widgets['FancyButtonWidget']
        self.assertEqual(fancy['inheritsFrom'], ['ButtonWidget', 'Widget'])
        merged = {item['name']: item for item in fancy['allParameters']}
        self.assertEqual(merged['glow']['type'], 'string')
        self.assertEqual(merged['label']['inheritedFrom'], 'ButtonWidget')
        self.assertEqual(merged['height']['inheritedFrom'], 'Widget')
        # ButtonWidget redefines width; the base default must not replace it.
        self.assertEqual(merged['width']['default'], '120')
        self.assertEqual(merged['width']['inheritedFrom'], 'ButtonWidget')

    def test_actions_are_read_from_the_rendered_markup(self):
        self.assertEqual(self.widgets['ButtonWidget']['actions'], ['launch'])

    def test_known_config_keys_is_the_union_a_consumer_validates_against(self):
        keys = known_config_keys('FancyButtonWidget', self.schema)
        self.assertTrue({'glow', 'label', 'width', 'height', 'confirmMessage', 'visible'} <= keys)
        self.assertIsNone(known_config_keys('NoSuchWidget', self.schema))

    def test_schema_never_claims_to_be_complete(self):
        self.assertIs(self.schema['complete'], False)
        self.assertEqual(self.schema['source'], 'static-scan')

    def test_written_file_round_trips(self):
        target = self.root / 'schema.json'
        write_widget_schema(str(target), str(self.root))
        written = json.loads(target.read_text(encoding='utf-8'))
        self.assertEqual(sorted(written['widgets']), sorted(self.widgets))


class TestInstalledWidgetSchema(unittest.TestCase):
    """The scan has to keep working against the real widget sources."""

    def test_every_shipped_widget_inherits_the_base_keys(self):
        schema = get_widget_schema()
        widgets = schema['widgets']
        self.assertIn('Widget', widgets)
        self.assertTrue(schema['frameworkVersion'])
        for name in ('ButtonWidget', 'TextWidget', 'GridTableWidget', 'PageWidget', 'RadarChartWidget'):
            self.assertIn(name, widgets)
            self.assertIn('width', known_config_keys(name, schema), name)
        self.assertGreaterEqual(len(widgets['ButtonWidget']['parameters']), 20)
        self.assertIn('launch', widgets['ButtonWidget']['actions'])


if __name__ == '__main__':
    unittest.main()
