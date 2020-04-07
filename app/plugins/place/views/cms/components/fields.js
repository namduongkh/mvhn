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
                
  
  
  {
    name: 'lat',
    titleClass: 'text-center',
    title: 'Lat',
    sortField: 'lat'
  },
                
  
  
  {
    name: 'lng',
    titleClass: 'text-center',
    title: 'Lng',
    sortField: 'lng'
  },
                
    
    ];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
