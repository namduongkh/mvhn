import moment from 'moment';

exports.fieldsDisplay =  [
  
  
  
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
    name: 'thumb',
    titleClass: 'text-center',
    title: 'Thumb',
    callback(val){return `<img src="/${val}" alt="${val}"/>`},
    sortField: 'thumb'
  },            
    
  
  
  {
    name: 'price',
    titleClass: 'text-center',
    title: 'Price',
    sortField: 'price'
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
