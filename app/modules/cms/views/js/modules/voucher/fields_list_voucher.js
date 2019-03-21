import moment from 'moment'
import VoucherHelper from "./voucher.helper";
exports.fieldsDisplay = [



  {
    name: 'title',
    titleClass: 'text-center',
    title: 'Tiêu đề',
    sortField: 'title'
  },



  {
    name: 'subtitle',
    titleClass: 'text-center',
    title: 'Tiêu đề phụ',
    sortField: 'subtitle'
  },


  {
    name: 'position',
    titleClass: 'text-center',
    title: 'Vị trí trên trang chủ',
    sortField: 'position',
    callback(val) {
      return VoucherHelper.position_name(val);
    },
  },

  {
    name: 'featured',
    titleClass: 'text-center',
    title: 'Nổi bật',
    sortField: 'featured',
    callback(val) {
      if (!val) { val = 0; }
      return VoucherHelper.featured(val);
    },
  },

  {
    name: 'point',
    titleClass: 'text-center',
    title: 'Số điểm',
    sortField: 'point'
  },

  {
    name: 'thumb',
    titleClass: 'text-center',
    title: 'Hình ảnh',
    callback(val) { return `<img src="/${val}" alt="${val}"/ style="width:150px">` },
    sortField: 'thumb'
  },


  // {
  //   name: 'for_mom',
  //   titleClass: 'text-center',
  //   title: 'Dành cho',
  //   callback(val) { return `<span class="label label-pill label-primary">${typeof val != 'undefined' && val ? 'Mẹ bầu' : 'Mẹ có con'}</span>` },
  //   sortField: 'for_mom'
  // },

  // {
  //   name: 'start_date',
  //   titleClass: 'text-center',
  //   title: 'Ngày bắt đầu',
  //   callback(val) { return val ? moment(val).format('DD/MM/YYYY') : '' },
  //   sortField: 'start_date'
  // },



  // {
  //   name: 'end_date',
  //   titleClass: 'text-center',
  //   title: 'Ngày kết thúc',
  //   callback(val) { return val ? moment(val).format('DD/MM/YYYY') : '' },
  //   sortField: 'end_date'
  // },
  {
    name: 'quantity',
    titleClass: 'text-center',
    title: 'Số lượng còn lại',
    // callback(val) { return val ? moment(val).format('DD/MM/YYYY') : '' },
    sortField: 'quantity'
  },


];


exports.sortOrder = [
  { field: 'createdAt', direction: 'asc' }
];
