import moment from 'moment';

exports.fieldsDisplay = [
  {
    name: 'user',
    titleClass: 'text-center',
    title: 'User',
    callback(val) {
      return val.name;
    }
  },
  {
    name: 'deal',
    titleClass: 'text-center',
    title: 'Deal',
    callback(val) {
      return val.name;
    }
  },
  {
    name: 'option',
    titleClass: 'text-center',
    title: 'Option',
    callback(val) {
      return val.name + ` ${val.win ? '(Thắng)' : ''}` + `<br/>Tỉ lệ: ${val.rate}`;
    }
  },
  {
    name: 'amount',
    titleClass: 'text-center',
    title: 'Amount',
    sortField: 'amount'
  }
];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
