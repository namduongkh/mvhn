import moment from 'moment';

exports.fieldsDisplay = [
  {
    name: '_id',
    titleClass: 'text-center',
    title: 'ID',
    sortField: '_id',
    callback(val) {
      return `<a href="/store_orders/${val}" target="_blank">${val}</a>`
    }
  },
  {
    name: 'orderName',
    titleClass: 'text-center',
    title: 'Đơn hàng',
    sortField: 'orderName'
  },
  {
    name: 'storeOrderItems',
    titleClass: 'text-center',
    title: 'Mặt hàng',
    callback(val) {
      return val.map((item) => {
        return `<span class="badge">${item.quantity}</span> ${item.storeMenu.name} (${item.itemStatus})`;
      }).join('<br/>')
    }
  },
  {
    name: 'total',
    titleClass: 'text-center',
    title: 'Tổng tiền',
    sortField: 'total'
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
        'active': '<span class="label label-success">Đang xử lý</span>',
        'ready': '<span class="label label-info">Đã sẵn sàng</span>',
        'delivering': '<span class="label label-success">Đang vận chuyển</span>',
        'delivered': '<span class="label label-secondary">Đã vận chuyển</span>',
        'done': '<span class="label label-default">Hoàn thành</span>',
        'cancel': '<span class="label label-danger">Đã hủy bỏ</span>'
      }[val]
    }
  },
];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
