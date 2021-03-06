const implAddRow = (size, fields) => {
    return {
        columns: [
            {
                fields: fields,
                size: size,
            }
        ],
    };
}

const addRow = (pages, indexToAddRow, pageIndex, newRow) => {
    pages[Number(pageIndex)].rows.splice(Number(indexToAddRow), 0, newRow);

    return pages;
}

const addColumn = (pages, indexPage, indexRow, indexColumn, fields = []) => {
    pages[Number(indexPage)].rows[Number(indexRow)].columns[Number(indexColumn)].fields.push(fields);

    return pages;
}

const addFields = (pages, indexPage, indexRow, indexColumn, fields = []) => {
    pages[Number(indexPage)].rows[Number(indexRow)].columns[Number(indexColumn)].fields = fields;

    return pages;
}

const removeColumn = (pages, indexPage, indexRow, indexColumn) => {
    pages[Number(indexPage)].rows[Number(indexRow)].columns.splice(Number(indexColumn));

    return pages;
};

const removeFields = (pages, indexPage, indexRow, indexColumn) => {
    pages[Number(indexPage)].rows[Number(indexRow)].columns[Number(indexColumn)].fields = [];

    return pages;
};

const removeRow = (pages, indexPage, indexRow) => {
    pages[Number(indexPage)].rows.splice(Number(indexRow), 1);

    return pages;
};

const getColumn = (pages, indexPage, indexRow, indexColumn) => {
    return pages[Number(indexPage)].rows[Number(indexRow)].columns[Number(indexColumn)].fields;
};

const getRow = (pages, indexPage, indexRow) => {
    return pages[Number(indexPage)].rows[Number(indexRow)];
};

const hasFieldsRow = (pages, indexPage, indexRow) => {
    const row = pages[Number(indexPage)].rows[Number(indexRow)].columns;

    return row.filter((elem, index) => elem.fields.length);
};

const getIndexes = (node) => {
    const indexColumn = node.getAttribute('data-ddm-field-column');
    const indexPage = node.getAttribute('data-ddm-field-page');
    const indexRow = node.getAttribute('data-ddm-field-row');

    return {
        indexColumn: typeof indexColumn === 'string' ? Number(indexColumn) : false,
        indexPage: Number(indexPage),
        indexRow: Number(indexRow)
    };
};

const updateColumn = (pages, indexPage, indexRow, indexColumn, newFields) => {
    pages[Number(indexPage)].rows[Number(indexRow)].columns[Number(indexColumn)].fields = newFields;

    return pages;
};

export default {
    addColumn,
    addFields,
    addRow,
    getColumn,
    getIndexes,
    getRow,
    hasFieldsRow,
    implAddRow,
    removeColumn,
    removeFields,
    removeRow,
    updateColumn
}