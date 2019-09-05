import moment from 'moment';

exports.fieldsDisplay = [
  {
    name: 'orderName',
    titleClass: 'text-center',
    title: 'Đơn hàng',
    sortField: 'orderName'
  },
  {
    name: 'total',
    titleClass: 'text-center',
    title: 'Tổng tiền',
    sortField: 'total'
  },
  {
    name: 'storeOrderItems',
    titleClass: 'text-center',
    title: 'Số lượng hàng',
    callback(val) {
      return val.length;
    }
  },
  {
    name: 'orderStatus',
    titleClass: 'text-center',
    title: 'Trạng thái',
    sortField: 'orderStatus',
    callback(val) {
      return {
        'ordering': '<span class="label label-default">Đang chọn hàng</span>',
        'ordered': '<span class="label label-primary">Đã đặt hàng</span>',
        'delivering': '<span class="label label-success">Đang vận chuyển</span>',
        'active': '<span class="label label-success">Đang xử lý</span>',
        'done': '<span class="label label-default">Hoàn thành</span>'
      }[val]
    }
  },

];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
