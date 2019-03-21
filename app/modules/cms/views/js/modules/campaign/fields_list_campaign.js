import moment from 'moment'
exports.fieldsDisplay = [

  {
    name: 'name',
    titleClass: 'text-center',
    title: 'Tên Campaign',
    sortField: 'name'
  },

  {
    name: 'start_date',
    titleClass: 'text-center',
    title: 'Ngày bắt đầu',
    callback(val) { return val ? moment(val).format('DD/MM/YYYY') : '' },
    callbackExport(val) { return val ? moment(val).format('DD/MM/YYYY') : '' },
    sortField: 'start_date'
  },

  {
    name: 'end_date',
    titleClass: 'text-center',
    title: 'Ngày kết thúc',
    callback(val) { return val ? moment(val).format('DD/MM/YYYY') : '' },
    callbackExport(val) { return val ? moment(val).format('DD/MM/YYYY') : '' },
    sortField: 'end_date'
  },

  {
    name: 'review_point',
    titleClass: 'text-center',
    title: 'Điểm viết cảm nhận',
    callback(val) {
      console.log(111, val)
      if ([undefined, null].includes(val)) {
        return 'Mặc định';
      }
      return val;
    },
    callbackExport(val) {
      if ([undefined, null].includes(val)) {
        return 'Mặc định';
      }
      return val;
    },
    sortField: 'review_point'
  },

  {
    name: 'stamp_point',
    titleClass: 'text-center',
    title: 'Điểm đổi tem sản phẩm',
    callback(val) {
      if ([undefined, null].includes(val)) {
        return 'Mặc định';
      }
      return val;
    },
    callbackExport(val) {
      if ([undefined, null].includes(val)) {
        return 'Mặc định';
      }
      return val;
    },
    sortField: 'stamp_point'
  },

  
  {
    name: 'is_refered_point',
    titleClass: 'text-center',
    title: 'Điểm cho người mời',
    callback(val) {
      if ([undefined, null].includes(val)) {
        return 'Mặc định';
      }
      return val;
    },
    callbackExport(val) {
      if ([undefined, null].includes(val)) {
        return 'Mặc định';
      }
      return val;
    },
    sortField: 'is_refered_point'
  },

  {
    name: 'refer_point',
    titleClass: 'text-center',
    title: 'Điểm cho người được mời',
    callback(val) {
      if ([undefined, null].includes(val)) {
        return 'Mặc định';
      }
      return val;
    },
    callbackExport(val) {
      if ([undefined, null].includes(val)) {
        return 'Mặc định';
      }
      return val;
    },
    sortField: 'refer_point'
  },

  {
    name: 'letter_point',
    titleClass: 'text-center',
    title: 'Điểm duyệt thư',
    callback(val) {
      if ([undefined, null].includes(val)) {
        return 'Mặc định';
      }
      return val;
    },
    callbackExport(val) {
      if ([undefined, null].includes(val)) {
        return 'Mặc định';
      }
      return val;
    },
    sortField: 'letter_point'
  },
];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
