/* global app, Utils, Widget, Widgets */

'use strict';

class RichTextWidget extends Widget {

    getEditorElement() {
        return this.getSection().find('.richText-editor').first();
    }

    updateHtml(data) {
        const editor = this.getEditorElement();
        const focused = editor[0] && editor[0].contains(document.activeElement);
        if (focused) {
            // Toolbar reconstruction is deferred until the user leaves the editor.
            // Keep the draft even if the server returns an older value meanwhile.
            this._pendingEditorData = data;
            editor.off('focusout.widgetContent').one('focusout.widgetContent', () => {
                const pending = {...this._pendingEditorData, value: editor.html()};
                setTimeout(() => this.updateHtml(pending), 0);
            });
            return;
        }
        const previous = JSON.stringify(this.getConfig());
        this.getParameters(data);
        const content = this.getRealValue('value', data, this.value.placeholder);
        if (!editor.length || previous !== JSON.stringify(this.getConfig())) {
            const source = this.getSection().find('.richText-initial');
            editor.trigger('destroy');
            // destroy unwraps the original source. Reuse the widget ID for the
            // new plugin root so existing #widget.richText / direct-child CSS
            // and application selectors keep their original structure.
            source.attr('id', this.id);
            this.initEventHandlers();
        }
        this.getEditorElement().trigger('setContent', content);
    }

    getHtml(widgets, d) {

        this.getParameters(d);

        return '';
    }

    getParameters(d) {
        const fontList = ["Arial", "Arial Black", "Comic Sans MS", "Courier New", "Geneva", "Georgia", "Helvetica", "Impact", "Lucida Console", "Tahoma", "Times New Roman", "Verdana"];
        const v = {
            bold: this.getRealValue('bold', d, true),
            italic: this.getRealValue('italic', d, true),
            underline: this.getRealValue('underline', d, true),
            leftAlign: this.getRealValue('leftAlign', d, true),
            centerAlign: this.getRealValue('centerAlign', d, true),
            rightAlign: this.getRealValue('rightAlign', d, true),
            justify: this.getRealValue('justify', d, true),
            ol: this.getRealValue('ol', d, true),
            ul: this.getRealValue('ul', d, true),
            heading: this.getRealValue('heading', d, true),
            fonts: this.getRealValue('fonts', d, true),
            fontList: this.getRealValue('fontList', d, fontList),
            fontColor: this.getRealValue('fontColor', d, true),
            backgroundColor: this.getRealValue('backgroundColor', d, true),
            fontSize: this.getRealValue('fontSize', d, true),
            imageUpload: this.getRealValue('imageUpload', d, true),
            fileUpload: this.getRealValue('fileUpload', d, true),
            videoEmbed: this.getRealValue('videoEmbed', d, true),
            urls: this.getRealValue('urls', d, true),
            table: this.getRealValue('table', d, true),
            removeStyles: this.getRealValue('removeStyles', d, true),
            code: this.getRealValue('code', d, true),
            colors: this.getRealValue('colors', d, []),
            youtubeCookies: this.getRealValue('youtubeCookies', d, false),
            preview: this.getRealValue('preview', d, false),
            undoRedo: this.getRealValue('undoRedo', d, true),
            placeholder: this.getRealValue('placeholder', d, ''),
            skin:  this.getRealValue('skin', d, '')
        };

        this.value = v;

        return v;
    }

    initEventHandlers() {
        const c = this.getSection(), config = this.getConfig();

        this.editor = c.richText(config);
        // The plugin copies its source attributes into a hidden textarea. Its
        // outer wrapper is the public widget root; avoid a duplicate widget ID.
        this.getSection().find('.richText-initial').removeAttr('id');

        this.getEditorElement().trigger('setContent', this.value.placeholder);

    }

    getConfig() {
        const v = this.value;
        return {
            bold: v.bold,
            italic: v.italic,
            underline: v.underline,
            leftAlign: v.leftAlign,
            centerAlign: v.centerAlign,
            rightAlign: v.rightAlign,
            justify: v.justify,
            ol: v.ol,
            ul: v.ul,
            heading: v.heading,
            fonts: v.fonts,
            fontList: v.fontList,
            fontColor: v.fontColor,
            backgroundColor: v.backgroundColor,
            fontSize: v.fontSize,
            imageUpload: v.imageUpload,
            fileUpload: v.fileUpload,
            videoEmbed: v.videoEmbed,
            urls: v.urls,
            table: v.table,
            removeStyles: v.removeStyles,
            code: v.code,
            colors: v.colors,
            fileHTML: '',
            imageHTML: '',
            translations: {
                'title': 'Title',
                'white': 'White',
                'black': 'Black',
                'brown': 'Brown',
                'beige': 'Beige',
                'darkBlue': 'Dark Blue',
                'blue': 'Blue',
                'lightBlue': 'Light Blue',
                'darkRed': 'Dark Red',
                'red': 'Red',
                'darkGreen': 'Dark Green',
                'green': 'Green',
                'purple': 'Purple',
                'darkTurquois': 'Dark Turquois',
                'turquois': 'Turquois',
                'darkOrange': 'Dark Orange',
                'orange': 'Orange',
                'yellow': 'Yellow',
                'imageURL': 'Image URL',
                'fileURL': 'File URL',
                'linkText': 'Link text',
                'url': 'URL',
                'size': 'Size',
                'responsive': 'Responsive',
                'text': 'Text',
                'openIn': 'Open in',
                'sameTab': 'Same tab',
                'newTab': 'New tab',
                'align': 'Align',
                'left': 'Left',
                'justify': 'Justify',
                'center': 'Center',
                'right': 'Right',
                'rows': 'Rows',
                'columns': 'Columns',
                'add': 'Add',
                'pleaseEnterURL': 'Please enter an URL',
                'videoURLnotSupported': 'Video URL not supported',
                'pleaseSelectImage': 'Please select an image',
                'pleaseSelectFile': 'Please select a file',
                'bold': 'Bold',
                'italic': 'Italic',
                'underline': 'Underline',
                'alignLeft': 'Align left',
                'alignCenter': 'Align centered',
                'alignRight': 'Align right',
                'addOrderedList': 'Ordered list',
                'addUnorderedList': 'Unordered list',
                'addHeading': 'Heading/title',
                'addFont': 'Font',
                'addFontColor': 'Font color',
                'addBackgroundColor': 'Background color',
                'addFontSize': 'Font size',
                'addImage': 'Add image',
                'addVideo': 'Add video',
                'addFile': 'Add file',
                'addURL': 'Add URL',
                'addTable': 'Add table',
                'removeStyles': 'Remove styles',
                'code': 'Show HTML code',
                'undo': 'Undo',
                'redo': 'Redo',
                'close': 'Close',
                'save': 'Save'
            },
            youtubeCookies: v.youtubeCookies,
            preview: v.preview,
            placeholder: '',
            useSingleQuotes: false,
            height: 0,
            heightPercentage: 0,
            adaptiveHeight: false,
            id: this.id,
            class: v.skin,
            useParagraph: false,
            maxlength: 0,
            maxlengthIncludeHTML: false,
            callback: undefined,
            useTabForNext: false,
            save: false,
            saveCallback: undefined,
            saveOnBlur: 0,
            undoRedo: v.undoRedo
        }
    }

}
