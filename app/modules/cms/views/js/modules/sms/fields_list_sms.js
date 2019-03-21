import moment from 'moment'
exports.fieldsDisplay =  [
    {
      name: 'phone',
      titleClass: 'text-center',
      title: 'Số điện thoại',
      sortField: 'phone'
    },
    {
        name: 'response',
        titleClass: 'text-center',
        title: 'Kết quả gửi',
        sortField: 'response'
    },
];


exports.sortOrder = [
  { field: 'createdAt', direction: 'asc' }
];
