import moment from 'moment';

exports.fieldsDisplay = [
  {
    name: 'name',
    titleClass: 'text-center',
    title: 'Name',
    sortField: 'name'
  },
  {
    name: 'slug',
    titleClass: 'text-center',
    title: 'Slug',
    sortField: 'slug',
    callback(val) {
      return `<a href="/stores/${val}" target="_blank">${val}</a>`
    },
  },
  {
    name: 'address',
    titleClass: 'text-center',
    title: 'Address',
    sortField: 'address'
  },
];


exports.sortOrder = [
  { field: 'createdAt', direction: 'asc' }
];
