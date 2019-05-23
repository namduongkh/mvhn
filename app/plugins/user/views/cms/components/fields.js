import moment from 'moment';

exports.fieldsDisplay =  [
  
  
  
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
    name: 'status',
    titleClass: 'text-center',
    title: 'Status',
    sortField: 'status'
  },
                
    
    ];


exports.sortOrder = [
  { field: 'createdAt', direction: 'asc' }
];
