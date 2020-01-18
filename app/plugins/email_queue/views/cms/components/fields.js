import moment from 'moment';

exports.fieldsDisplay = [
  {
    name: 'from',
    titleClass: 'text-center',
    title: 'From',
    callback(from) {
      return `${from.name} (${from.address})`;
    }
  },
  {
    name: 'to',
    titleClass: 'text-center',
    title: 'To',
    callback(tos) {
      return tos.map((to) => { return `${to.name} (${to.address})` }).join('<br/>');
    }
  },
  {
    name: 'transferStatus',
    titleClass: 'text-center',
    title: 'Transferstatus',
  },
];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
