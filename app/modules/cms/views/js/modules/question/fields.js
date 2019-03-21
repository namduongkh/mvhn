function returnFromObject(key){
    return new Function('obj', `return obj ? obj['${key}}'] : "";`);
}

exports.fieldsDisplay = [{
        name: 'user',
        title: 'Người dùng',
        sortField: 'user',
        callback (obj){return obj ? obj['name'] : ''},
        callbackExport (obj){return obj ? obj['name'] : ''},
    },
    {
        name: 'user',
        title: 'Email',
        callback (obj){return obj ? obj['email'] : ''},
        callbackExport (obj){return obj ? obj['email'] : ''},
    },
    {
        name: 'user',
        title: 'Điện thoại',
        callback (obj){return obj ? obj['phone'] : ''},
        callbackExport (obj){return obj ? obj['phone'] : ''},
    },
    {
        name: 'category',
        title: 'Chuyên mục',
        sortField: 'category',
        callback (obj){return obj ? obj['name'] : ''},
        callbackExport (obj){return obj ? obj['name'] : ''}
    },
    {
        name: 'content',
        title: 'Nội dung',
        sortField: 'content'
    },
    {
        name: 'is_publish',
        title: 'Xuất bản',
        sortField: 'is_publish',
        callback(is_publish) {
            return `<label class="label label-${is_publish ? 'success' : 'default'}">${is_publish ? 'Đã xuất bản' : 'Chưa xuất bản'}</label>`
        },
        callbackExport(is_publish){
            return is_publish ? 'Đã xuất bản' : 'Chưa xuất bản'
        }
    },
    {
        name: 'is_featured',
        title: 'Nổi bật',
        sortField: 'is_featured',
        callback(is_featured) {
            return `<label class="label label-${is_featured ? 'success' : 'default'}">${is_featured ? 'Nổi bật' : 'Bình thường'}</label>`
        },
        callbackExport(is_featured){
            return is_featured ? 'Nổi bật' : 'Bình thường'
        }
    },
];


exports.sortOrder = [{
    field: 'createdAt',
    direction: 'desc'
}];