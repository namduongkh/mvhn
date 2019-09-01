import moment from 'moment';

exports.fieldsDisplay = [



  {
    name: 'name',
    titleClass: 'text-center',
    title: 'Name',
    sortField: 'name'
  },



  {
    name: 'email',
    titleClass: 'text-center',
    title: 'Email',
    sortField: 'email'
  },




  {
    name: 'phone',
    titleClass: 'text-center',
    title: 'Phone',
    sortField: 'phone'
  },


];


exports.sortOrder = [
  { field: 'createdAt', direction: 'asc' }
];
