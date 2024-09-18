/* global app, Utils, Widget, Widgets */

'use strict';

class RichTextWidget extends Widget {

    getHtml(widgets, d) {

        return `<div class="ks-rich-text"></div>`;
    }

    initEventHandlers() {
        const section = this.getSection();

         section.richText({

                // text formatting
                bold: true,
                italic: true,
                underline: true,

                // text alignment
                leftAlign: true,
                centerAlign: true,
                rightAlign: true,
                justify: true,

                // lists
                ol: true,
                ul: true,

                // title
                heading: true,

                // fonts
                fonts: true,
                fontList: [
                    "Arial",
                    "Arial Black",
                    "Comic Sans MS",
                    "Courier New",
                    "Geneva",
                    "Georgia",
                    "Helvetica",
                    "Impact",
                    "Lucida Console",
                    "Tahoma",
                    "Times New Roman",
                    "Verdana"
                ],
                fontColor: true,
                backgroundColor: true,
                fontSize: true,

                // uploads
                imageUpload: true,
                fileUpload: true,

                // media
                videoEmbed: true,

                // link
                urls: true,

                // tables
                table: true,

                // code
                removeStyles: true,
                code: true,

                // colors
                colors: [],

                // dropdowns
                fileHTML: '',
                imageHTML: '',

                // translations
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

                // privacy
                youtubeCookies: false,

                // preview
                preview: false,

                // placeholder
                placeholder: '',

                // developer settings
                useSingleQuotes: false,
                height: 0,
                heightPercentage: 0,
                adaptiveHeight: false,
                id: "",
                class: "",
                useParagraph: false,
                maxlength: 0,
                maxlengthIncludeHTML: false,
                callback: undefined,
                useTabForNext: false,
                save: false,
                saveCallback: undefined,
                saveOnBlur: 0,
                undoRedo: true
            });

    }

}