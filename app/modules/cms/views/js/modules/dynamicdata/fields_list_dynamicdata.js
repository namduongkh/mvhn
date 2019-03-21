import moment from 'moment'
exports.fieldsDisplay = [
  {
    name: 'name',
    title: 'Tên',
    sortField: 'name'
  },
  {
    name: 'key',
    title: 'Key',
    sortField: 'key'
  },
  {
    name: 'is_table',
    title: 'Kiểu',
    sortField: 'is_table',
    callback(val) {
      return `<label class="label label-primary">${val ? 'Bảng' : 'Đơn'}</label>`
    }
  },
];

exports.sortOrder = [
  { field: 'createdAt', direction: 'asc' }
];
