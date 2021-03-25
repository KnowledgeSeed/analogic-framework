/* global app, Utils, Widget */

'use strict';
class VerticalTableWidget extends Widget {

    getHtml(widgets, data) {
        const o = this.options, title = o.title || '';

        let localColumnNum, localHeaderColumnList;

        if (data.cells.length > 0 && data.cells[0].columnNum) {
            localColumnNum = data.cells[0].columnNum;
        } else {
            localColumnNum = o.columnNum;
        }

        if (data.cells.length > 0 && data.cells[0].columnHeader) {
            localHeaderColumnList = [];
            for (let i = 0; i < localColumnNum; ++i) {
                localHeaderColumnList.push(data.cells[i].columnHeader);
            }
        } else {
            localHeaderColumnList = o.headerColumnList;
        }

        let header = '', rows = '', rowCnt = 0, colCnt = 0;

        for (let i = 0; i < data.cells.length; i++) {
            if (colCnt === 0) {
                rows += '<tr>';
            }

            let classes = Utils.parseFormatStringToCSSClasses(data.cells[i].type);

            rows += `<td class="${classes}">${(data.cells[i].value || o.defaultValue) || ''}<\/td>`;

            if (colCnt === localColumnNum - 1) {
                colCnt = 0;
                rowCnt++;
                rows += '<\/tr>';
            } else {
                colCnt++;
            }
        }

        rows = '';

        let parentFlags = Array(1000).fill(0), childFlags = Array(1000).fill(0), childrenCnt, hasChildColumn = false;
        ; // TODO - 1000? --- ~ length / columnNum (? - az ures cellakat igy nem szamolja)

        for (var i = 0; i < data.cells.length; i++) {
            if (data.cells[i].parentRow) {
                childrenCnt = 0;

                $.each(data.cells, (c, r) => {
                    if (Number(r.parentRow) === data.cells[i].parentRow) {
                        ++childrenCnt;
                    }
                });
                parentFlags[data.cells[i].parentRow] = childrenCnt;
                hasChildColumn = true;
            }
        }

        for (let i = 0; i < parentFlags.length; i++) {
            if (parentFlags[i]) {
                for (let j = 0; j < parentFlags[i]; j++) {
                    childFlags[i + j] = 1;
                }
            }
        }

        let columnFlags = Array(localColumnNum).fill(0); // indicated the columns which contain child rowheaders

        if (hasChildColumn) {
            columnFlags[1] = 1; // TODO - support only one child column!
        }

        let tableMap = [];

        for (let i = 0; i < childFlags.length; i++) {
            let row;
            if (!childFlags[i] && !parentFlags[i]) { // normal row
                row = columnFlags;
            } else if (parentFlags[i]) { // parent row
                row = Array(localColumnNum).fill(0);
            } else if (!parentFlags[i]) { // child row
                row = Array(localColumnNum).fill(0);
                row[0] = 1;
            }
            tableMap.push(row);
        }

        let cnt = 0, table = [];

        for (let i = 0; i < tableMap.length; i++) {
            let row = [];

            for (let j = 0; j < tableMap[i].length; j++) {
                if (data.cells[cnt]) {
                    if (!Number(tableMap[i][j])) {
                        let p = '';

                        if (parentFlags[i] && !j) {
                            p = ` data-parent="true" data-span="${parentFlags[i]}"  `;
                        }

                        let classes = Utils.parseFormatStringToCSSClasses(data.cells[cnt].type);
                        row.push(`<tr><td ${p} class="${classes}"><div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" title="${(data.cells[cnt].value || o.defaultValue) || '&nbsp;'}">${(data.cells[cnt].value || o.defaultValue) || '&nbsp;'}<\/div><\/td><\/tr>`);
                        cnt++;
                    } else {
                        row.push(`<tr><td>&nbsp;<\/td><\/tr>`);
                    }
                }
            }

            table.push(row);
        }

        rows += `<tr>`;

        for (let i = 0; i < table[0].length; i++) {
            rows += '<td style="padding:0;"><table class="nested-table">';
            rows += table.map((value, index) => value[i] || '').join('');
            rows += '<\/table><\/td>';
        }

        rows += '<\/tr>';

        // column headers
        header += '<tr>';
        for (let i = 0; i < columnFlags.length; i++) {
            let classes = (!i || columnFlags[i]) ? ' rowheader' : '';
            let cont = '&nbsp;';

            if (localHeaderColumnList && localHeaderColumnList[i]) {
                classes += (!i || columnFlags[i]) ? ' rowheader' : '';
                cont = localHeaderColumnList[i].name || '&nbsp;';
                if (localHeaderColumnList[i].type) {
                    classes += ' ' + Utils.parseFormatStringToCSSClasses(localHeaderColumnList[i].type);
                }
            }

            header += `<th class="${classes}">${cont}<\/th>`;
        }
        header += '<\/tr>';

        let zoomButtonsHtml = '';
        if (this.options.zoomable) {
            zoomButtonsHtml = '<div class="widget-financial-block-buttons"><span class="icon-minimize"><\/span><span data-title="' + title + '" data-type="' + o.subType + '" class="icon-full-screen"><\/span><\/div>';
        }

        return`
<div class="row">
    <div class="col">
        <div class="widget-financial-block">
            ${zoomButtonsHtml}
            <div class="widget-vertical-table col-${o.width}">
                ${o.titleVisible ? `<h3>${title}</h3>` : ''}
                <table><thead>${header}</thead><tbody>${rows}</tbody></table>
            </div>
        </div>
    </div>
</div>`;
    }

    processData(data) {
        if (data.cells) { //dummy
            return data;
        }

        let columnNum = false;
        if (data.length > 0 && data[0].length > 0 && data[0][0].columnNum) {
            columnNum = data[0][0].columnNum;
        }

        let t, v, cells = [], k;

        for (v = 0; v < data.length; ++v) {
            k = data[v];
            for (t = 0; t < k.length; ++t) {
                if (columnNum !== false) {
                    if (t < columnNum) {
                        cells.push(k[t]);
                    }
                } else {
                    cells.push(k[t]);
                }
            }
        }

        return {cells: cells};
    }

    initEventHandlers(section, withState) {
        if (!VerticalTableWidget.isDocEventsHaveBeenBound) {
            $(window).on('resize', () => VerticalTableWidget.buildFakeSpanHeaders());
            VerticalTableWidget.buildFakeSpanHeaders();
            VerticalTableWidget.isDocEventsHaveBeenBound = true;
        }

        this.initShowInFullScreenEventHandler(section);

        $('.widget-vertical-table').each((i, lm) => {
            if ($(lm).closest('section').is(':visible')) {
                let w = 100 / ($(lm).width() / 170);
                $(lm).find('th.rowheader').each((i, el) => $(el).width(w + '%'));
            }
        });
    }

    initShowInFullScreenEventHandler(section) {
        section.on('click', '.icon-full-screen', e => {
            const btn = $(e.target), type = btn.data('type'), title = btn.data('title') || '';
            let content, t = btn.closest('.widget-financial-block').find('table');

            content = '<div class="widget-vertical-table col-12 fullscreen">' + t.prop('outerHTML') + '<\/div>';

            app.fn.showInFullScreen(title, content);

            VerticalTableWidget.buildFakeSpanHeaders();

            return false;
        });

        section.on('click', '#fullScreenOffBtn', () => {
            VerticalTableWidget.buildFakeSpanHeaders();

            return false;
        });
    }

    static buildFakeSpanHeaders() {
        $('.widget-vertical-table').each((i, lm) => {
            $(lm).find('td[data-parent=true]').each((i, el) => {
                el = $(el);
                let span = el.data('span');
                if (span) {
                    let t = el.parent('tr'), height = 0, td;

                    for (let i = 0; i < span; i++) {
                        td = t.find('td:first-child').css({display: '', height: ''});
                        t = t.next();
                    }

                    t = el.parent('tr');

                    for (let i = 0; i < span; i++) {
                        td = t.find('td:first-child');
                        height += td.outerHeight();
                        if (!td.data('parent')) {
                            td.css({display: 'none'});
                        }
                        t = t.next();
                    }

                    el.css({height: height});
                }
            });
        });
    }
}
;