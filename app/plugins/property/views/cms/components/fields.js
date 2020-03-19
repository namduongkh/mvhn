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
        name: 'order',
        title: 'Order'
    }
];

exports.sortOrder = [
    { field: 'createdAt', direction: 'desc' }
];
