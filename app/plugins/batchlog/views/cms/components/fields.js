import moment from 'moment';

exports.fieldsDisplay =  [
  
  
  
  {
    name: 'name',
    titleClass: 'text-center',
    title: 'Name',
    sortField: 'name'
  },
                
    
    
  
  
  {
    name: 'progress',
    titleClass: 'text-center',
    title: 'Progress',
    sortField: 'progress'
  },
                
    
    
  
  
  {
    name: 'type',
    titleClass: 'text-center',
    title: 'Type',
    sortField: 'type'
  },
                
    
  
                ];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
