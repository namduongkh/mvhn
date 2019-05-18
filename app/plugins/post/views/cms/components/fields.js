exports.fieldsDisplay = [
    {
        name: 'title',
        title: 'Title',
        sortField: 'title'
    },
    {
        name: 'views',
        title: 'Views',
        sortField: 'views'
    },
    {
        name: 'featured',
        title: 'Featured',
        sortField: 'featured',
        callback: function (featured) {
            return `<i class="fa fa-star" style="color:${featured ? '#fa424a' : '#ddd'}"></i>`;
        }
    }
];

exports.sortOrder = [
    { field: 'createdAt', direction: 'desc' }
];