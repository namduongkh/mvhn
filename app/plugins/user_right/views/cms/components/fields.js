import moment from 'moment';

exports.fieldsDisplay = [
  {
    name: 'name',
    titleClass: 'text-center',
    title: 'Name',
    sortField: 'name'
  },
  {
    name: 'controller',
    titleClass: 'text-center',
    title: 'Controller',
    sortField: 'controller'
  },
  {
    name: 'action',
    titleClass: 'text-center',
    title: 'Action',
    sortField: 'action'
  },
];


exports.sortOrder = [
  { field: 'createdAt', direction: 'asc' }
];
