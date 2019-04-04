exports.fieldsDisplay = [
    {
        name: 'name',
        title: 'Name',
        sortField: 'name'
    },
    {
        name: 'color',
        title: 'Color',
        callback: (val) => {
            return `<div class="property-color-wrapper">
                <div class="property-color" style="background: ${val};"></div><div>${val}</div>
            </div>`;
        }
    },
    {
        name: 'type',
        title: 'Type'
    },
    {
        name: 'parent',
        title: 'Parent'
    }
];

exports.sortOrder = [
    { field: 'name', direction: 'asc' }
];