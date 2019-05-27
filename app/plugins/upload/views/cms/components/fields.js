import moment from 'moment';

exports.fieldsDisplay =  [
  
  
  
  {
    name: 'name',
    titleClass: 'text-center',
    title: 'Name',
    sortField: 'name'
  },
                
  
  
  {
    name: 'path',
    titleClass: 'text-center',
    title: 'Path',
    sortField: 'path'
  },
                
  
  
  {
    name: 'ext',
    titleClass: 'text-center',
    title: 'Ext',
    sortField: 'ext'
  },
                ];


exports.sortOrder = [
  { field: 'createdAt', direction: 'asc' }
];
