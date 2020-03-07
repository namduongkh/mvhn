import moment from 'moment';

exports.fieldsDisplay =  [
  
  
  
  {
    name: 'name',
    titleClass: 'text-center',
    title: 'Name',
    sortField: 'name'
  },
                
  
  
  {
    name: 'code',
    titleClass: 'text-center',
    title: 'Code',
    sortField: 'code'
  },
                
  
  
  {
    name: 'quantity',
    titleClass: 'text-center',
    title: 'Quantity',
    sortField: 'quantity'
  },
                
    
    
    ];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
