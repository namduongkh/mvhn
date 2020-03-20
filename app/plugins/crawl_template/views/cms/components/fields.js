import moment from 'moment';

exports.fieldsDisplay = [



  {
    name: 'name',
    titleClass: 'text-center',
    title: 'Name',
    sortField: 'name'
  },



  {
    name: 'url',
    titleClass: 'text-center',
    title: 'Url',
    sortField: 'url'
  },



  {
    name: 'urlPattern',
    titleClass: 'text-center',
    title: 'Urlpattern',
    sortField: 'urlPattern'
  },


];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
