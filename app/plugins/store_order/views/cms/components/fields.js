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


];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
