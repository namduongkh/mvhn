import moment from 'moment';

exports.fieldsDisplay = [
  {
    name: '_id',
    titleClass: 'text-center',
    title: 'Object ID',
    sortField: '_id'
  },
];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
