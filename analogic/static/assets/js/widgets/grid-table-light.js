/* global Widget, GridTableExport, Api, Repository, Widgets */

'use strict';

class GridTableLightWidget extends Widget {

    getParameters(data) {
        return {
            pageSize: this.getRealValue('pageSize', data, 25),
            freezeHeader: this.getRealValue('freezeHeader', data, true),
            freezeFirstColumns: this.getRealValue('freezeFirstColumns', data, 0),
            enableExport: this.getRealValue('enableExport', data, false),
            bandiTest: this.getRealValue('bandiTest', data, false)
        };
    }

    getHtml(widgets, d) {
        const params = this.getParameters(d || {});
        if (params.bandiTest && !this.state.bandiTestAlertShown) {
            alert('bandi teszt');
            this.state.bandiTestAlertShown = true;
        }
        const rows = Array.isArray(d) ? d : (d && d.content ? d.content : []);
        this.cellData = rows;

        const pageSize = params.pageSize > 0 ? params.pageSize : 0;
        const page = this.state.page || 1;
        const totalRows = rows.length;
        const totalPages = pageSize > 0 ? Math.max(1, Math.ceil(totalRows / pageSize)) : 1;
        let displayRows = rows;
        if (pageSize > 0) {
            const start = (page - 1) * pageSize;
            displayRows = rows.slice(start, start + pageSize);
        }

        const headers = (d && d.headers) ? d.headers : (displayRows[0] ? displayRows[0].map((_, i) => 'Col ' + (i + 1)) : []);
        const headerHtml = headers.map((h, idx) => {
            let styles = [];
            if (params.freezeHeader) {
                styles.push('position:sticky;top:0;z-index:2;');
            }
            if (params.freezeFirstColumns > idx) {
                styles.push('left:' + (idx * 100) + 'px;z-index:3;');
            }
            return `<th style="${styles.join('')}">${h}</th>`;
        }).join('');

        const bodyHtml = displayRows.map(row => {
            return '<tr>' + row.map((cell, idx) => {
                const text = (cell && cell.title !== undefined) ? cell.title : (cell !== undefined ? cell : '');
                let styles = [];
                if (params.freezeFirstColumns > idx) {
                    styles.push('position:sticky;left:' + (idx * 100) + 'px;z-index:2;');
                }
                return `<td style="${styles.join('')}">${text}</td>`;
            }).join('') + '</tr>';
        }).join('');

        let pagerHtml = '';
        if (pageSize > 0 && totalRows > pageSize) {
            pagerHtml = `<div class="ks-grid-table-light-pager">
                <button class="first">&lt;&lt;</button>
                <button class="prev">&lt;</button>
                <span class="info">${page} / ${totalPages}</span>
                <button class="next">&gt;</button>
                <button class="last">&gt;&gt;</button>
            </div>`;
        }

        let exportHtml = '';
        if (params.enableExport) {
            exportHtml = `<div class="ks-grid-table-light-export" title="Export">⤓</div>`;
        }

        return `<div class="ks-grid-table ks-grid-table-light">${exportHtml}<table>${headers.length ? `<thead><tr>${headerHtml}</tr></thead>` : ''}<tbody>${bodyHtml}</tbody></table>${pagerHtml}</div>`;
    }

    initEvents() {
        const holder = this.getHolder(this.id);
        const widget = this;
        const pager = holder.find('.ks-grid-table-light-pager');
        pager.find('button.first').on('click', () => widget.changePage(1));
        pager.find('button.prev').on('click', () => widget.changePage((widget.state.page || 1) - 1));
        pager.find('button.next').on('click', () => widget.changePage((widget.state.page || 1) + 1));
        pager.find('button.last').on('click', () => {
            const params = widget.getParameters({});
            const total = Math.max(1, Math.ceil(widget.cellData.length / params.pageSize));
            widget.changePage(total);
        });
        holder.find('.ks-grid-table-light-export').on('click', () => {
            if (typeof GridTableExport !== 'undefined') {
                GridTableExport.triggerExcelExport(widget.id);
            }
        });
    }

    changePage(page) {
        const params = this.getParameters({});
        if (params.pageSize <= 0) {
            return;
        }
        const totalPages = Math.max(1, Math.ceil(this.cellData.length / params.pageSize));
        page = Math.max(1, Math.min(totalPages, page));
        this.state.page = page;
        if (Repository[this.id] && Repository[this.id].url) {
            const repo = Repository[this.id];
            const baseFn = repo.originalUrl || repo.url;
            repo.originalUrl = baseFn;
            repo.url = (db) => {
                const baseUrl = typeof baseFn === 'function' ? baseFn(db) : baseFn;
                const skip = (page - 1) * params.pageSize;
                const sep = baseUrl.indexOf('?') === -1 ? '?' : '&';
                return `${baseUrl}${sep}$top=${params.pageSize}&$skip=${skip}`;
            };
            Api.forceRefresh(this.id);
        } else {
            this.renderPage();
        }
    }

    renderPage() {
        this.getHolder(this.id).html(this.getHtml([], {content: this.cellData}));
        this.initEvents();
    }
}

Widgets['GridTableLightWidget'] = GridTableLightWidget;

