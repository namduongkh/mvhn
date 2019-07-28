import moment from 'moment';

exports.fieldsDisplay = [
  {
    name: 'orderName',
    titleClass: 'text-center',
    title: 'Name',
    sortField: 'orderName'
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
    sortField: 'orderStatus'
  },

];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
