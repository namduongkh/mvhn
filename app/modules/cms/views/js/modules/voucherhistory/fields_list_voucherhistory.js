import moment from 'moment'
exports.fieldsDisplay = [

  {
    name: 'user',
    titleClass: 'text-center',
    title: 'Người đổi',
    callback (obj){return obj ? obj['name'] : ''},
    callbackExport (obj){return obj ? obj['name'] : ''},
  },
  {
    name: 'user',
    titleClass: 'text-center',
    title: 'Email',
    callback (obj){return obj ? obj['email'] : ''},
    callbackExport (obj){return obj ? obj['email'] : ''},
  },
  {
    name: 'user',
    titleClass: 'text-center',
    title: 'Điện thoại',
    callback (obj){return obj ? obj['phone'] : ''},
    callbackExport (obj){return obj ? obj['phone'] : ''},
  },

  {
    name: 'voucher',
    titleClass: 'text-center',
    title: 'Voucher',
    callback (obj){return obj ? obj['title'] : ''},
    callbackExport (obj){return obj ? obj['title'] : ''},
  },

  {
    name: 'date',
    titleClass: 'text-center',
    title: 'Ngày đổi',
    callback (val){return val ? moment(val).format('DD/MM/YYYY') : ''},
    callbackExport (val){return val ? moment(val).format('DD/MM/YYYY') : ''},
    sortField: 'date'
  },

  {
    name: 'point',
    titleClass: 'text-center',
    title: 'Số điểm',
    sortField: 'point'
  },
  {
    name: 'received',
    titleClass: 'text-center',
    dataClass: 'text-center',
    title: 'Đã nhận quà',
    callback(val) { return val ? '<i class="fa fa-check" style="color: green"></i>' : '' },
    callbackExport(val) { return val ? 'Yes' : '' },
  },
];


exports.sortOrder = [
  { field: 'date', direction: 'asc' }
];
