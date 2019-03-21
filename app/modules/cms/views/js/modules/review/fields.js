exports.fieldsDisplay = [{
    name: 'product',
    title: 'Về sản phẩm',
    // sortField: 'product'
    callback(product) {
        if (!product) {
            return
        }
        return product.title;
    },
    callbackExport(product) {
        if (!product) {
            return
        }
        return product.title;
    }
},
{
    name: 'user',
    title: 'Người dùng',
    // sortField: 'user'
    callback(user) {
        if (!user) {
            return
        }
        return `${user.name} (${user.email})`;
    },
    callbackExport(user) {
        if (!user) {
            return
        }
        return `${user.name} (${user.email})`;
    }
},
{
    name: 'content',
    title: 'Nội dung',
    sortField: 'content'
},
{
    name: 'verify_status',
    title: 'Trạng thái duyệt',
    sortField: 'verify_status',
    callback(verify_status) {
        return `<label class="label label-${verify_status ? 'success' : 'default'}">${verify_status ? 'Đã duyệt' : 'Chưa duyệt'}</label>`
    },
    callbackExport(verify_status) {
        return `${verify_status ? 'Đã duyệt' : 'Chưa duyệt'}`
    }
},
];


exports.sortOrder = [{
    field: 'createdAt',
    direction: 'desc'
}];