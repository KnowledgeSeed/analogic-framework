class Export {

    export(withTextDelimiter = true) {
        $.when(this.createDataToExport()).then(dataToExport => this.exportToCsv(dataToExport, withTextDelimiter));
    }

    exportToCsv(dataToExport, withTextDelimiter) {
        let csvContent;

        if (withTextDelimiter) {
            csvContent = dataToExport.map(row => '"' + row.map(cell => cell.replace ? cell.replace(/"/g, '""') : cell).join('";"') + '"').join('\n');
        } else {
            csvContent = dataToExport.map(row => row.join(';')).join('\n');
        }

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([csvContent], {type: 'text/csv'}));
        link.setAttribute('download', this.constructor.name + '.csv');
        document.body.appendChild(link);

        link.click();
    }
}