import moment from 'moment';

exports.fieldsDisplay = [





  {
    name: 'user',
    titleClass: 'text-center',
    title: 'User',
    callback(user) {
      return user && user.name;
    },
    sortField: 'user'
  },



  {
    name: 'amount',
    titleClass: 'text-center',
    title: 'Amount',
    sortField: 'amount'
  },




  {
    name: 'type',
    titleClass: 'text-center',
    title: 'Type',
    sortField: 'type'
  },



  {
    name: 'paymentStatus',
    titleClass: 'text-center',
    title: 'Payment Status',
    sortField: 'paymentStatus',
    callback(val) {
      return `<span class="payment-status">${val}</span>`
    }
  },
];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
