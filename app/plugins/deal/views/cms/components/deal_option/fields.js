import moment from 'moment';

exports.fieldsDisplay = [



  {
    name: 'name',
    titleClass: 'text-center',
    title: 'Name',
    sortField: 'name'
  },



  {
    name: 'rate',
    titleClass: 'text-center',
    title: 'Rate',
    sortField: 'rate'
  },



];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
