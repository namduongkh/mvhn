exports.fieldsDisplay = [{
    name: 'card_code',
    title: 'Mã',
    sortField: 'card_code',
}, {
    //     name: 'point',
    //     title: 'Số điểm',
    //     sortField: 'point',
    // }, {
    name: 'used',
    title: 'Đã đổi',
    sortField: 'used',
}, {
    name: 'user',
    title: 'Người đổi',
    callback(user) {
        if (!user) { return }
        return user.name;
    }
}, {
    name: 'used_at',
    title: 'Thời gian đổi',
    sortField: 'used_at',
}];


exports.sortOrder = [
    { field: 'createdAt', direction: 'desc' },
];