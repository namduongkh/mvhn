import moment from 'moment';

exports.fieldsDisplay =  [
  
  
  
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
    sortField: 'slug'
  },
                
    
    ];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
