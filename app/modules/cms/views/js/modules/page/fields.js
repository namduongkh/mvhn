exports.fieldsDisplay = [{
    name: 'title',
    title: 'Title',
    sortField: 'title',
},
    {
        name: 'slug',
        title: 'Đường dẫn',
        sortField: 'slug',
        callback(val){
            return `<a href="/${val}" target="_blank">${val}</a>`;
        }
    }];


exports.sortOrder = [
    { field: 'title', direction: 'asc' },
];