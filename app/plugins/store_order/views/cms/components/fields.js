import moment from 'moment';

exports.fieldsDisplay = [
  {
    name: 'orderName',
    titleClass: 'text-center',
    title: 'Name',
    sortField: 'orderName'
  },
  {
    name: 'total',
    titleClass: 'text-center',
    title: 'Total',
    sortField: 'total'
  },
  {
    name: 'storeOrderItems',
    titleClass: 'text-center',
    title: 'Number of Items',
    callback(val) {
      return val.length;
    }
  },
  {
    name: 'orderStatus',
    titleClass: 'text-center',
    title: 'Order Status',
    sortField: 'orderStatus',
    callback(val) {
      return {
        'active': '<span class="label label-success">Active</span>',
        'done': '<span class="label label-default">Done</span>'
      }[val]
    }
  },

];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
