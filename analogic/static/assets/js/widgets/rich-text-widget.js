/* global app, Utils, Widget, Widgets */

'use strict';

class RichTextWidget extends Widget {

    getHtml(widgets, d) {

        this.getParameters(d);

        return ``;
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
        const c = $('#' + this.id), config = this.getConfig();

        this.editor = c.richText(config);

        $('.richText-editor').trigger('setContent', this.value.placeholder);

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