import moment from 'moment';

exports.fieldsDisplay =  [
  
  
  
  {
    name: 'name',
    titleClass: 'text-center',
    title: 'Name',
    sortField: 'name'
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
