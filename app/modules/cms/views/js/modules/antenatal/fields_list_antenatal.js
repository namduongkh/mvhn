import moment from 'moment'
exports.fieldsDisplay = [





  {
    name: 'user.name',
    titleClass: 'text-center',
    title: 'Người dùng',
  },

  {
    name: 'week',
    titleClass: 'text-center',
    title: 'Tuần thứ',
    sortField: 'week'
  },



  {
    name: 'date',
    titleClass: 'text-center',
    title: 'Ngày khám',
    callback(val) { return val ? moment(val).format('dd DD/MM/YYYY') : '' },
    sortField: 'date'
  },


  {
    name: 'checked',
    titleClass: 'text-center',
    title: 'Đã khám',
    callback(val) { return `<input type="checkbox" ${val?'checked':''} disabled/>` },
    sortField: 'checked'
  },



];


exports.sortOrder = [
  { field: 'createdAt', direction: 'asc' }
];
