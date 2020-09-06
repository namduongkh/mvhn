import moment from 'moment';
import { orderStatusText } from "../filters";

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
        if (!item.storeMenu) return 'Undefined';
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
      return orderStatusText(val);
    }
  },
];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
