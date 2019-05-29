import moment from 'moment';

exports.fieldsDisplay = [



  {
    name: 'name',
    titleClass: 'text-center',
    title: 'Name',
    sortField: 'name'
  },

  {
    name: 'key',
    titleClass: 'text-center',
    title: 'Key',
    sortField: 'key'
  },

];


exports.sortOrder = [
  { field: 'createdAt', direction: 'asc' }
];
