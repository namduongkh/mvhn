exports.fieldsDisplay = [
    {
        name: 'title',
        title: 'Title',
        sortField: 'title'
    },
    {
        name: 'slug',
        title: 'Slug',
        sortField: 'slug',
        callback(val) {
            if (!val) return;
            return `<a href="/posts/${val}" target="_blank">Link</a>`;
        }
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
