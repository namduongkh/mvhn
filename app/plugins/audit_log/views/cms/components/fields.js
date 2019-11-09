import moment from 'moment';

exports.fieldsDisplay = [



  {
    name: 'objectType',
    titleClass: 'text-center',
    title: 'Objecttype',
    sortField: 'objectType'
  },



  {
    name: 'objectId',
    titleClass: 'text-center',
    title: 'Objectid',
    sortField: 'objectId'
  },


  {
    name: 'version',
    titleClass: 'text-center',
    title: 'Version',
    sortField: 'version'
  },



];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
