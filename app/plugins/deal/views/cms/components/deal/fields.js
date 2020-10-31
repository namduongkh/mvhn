import moment from 'moment';

exports.fieldsDisplay =  [
  
  
  
  {
    name: 'name',
    titleClass: 'text-center',
    title: 'Name',
    sortField: 'name'
  },
                
  
                
  
                
  
                
  
          
  {
    name: 'from',
    titleClass: 'text-center',
    title: 'From',
    callback(val){return val ? moment(val).format('DD/MM/YYYY') : '' },
    sortField: 'from'
  },
            
  
          
  {
    name: 'to',
    titleClass: 'text-center',
    title: 'To',
    callback(val){return val ? moment(val).format('DD/MM/YYYY') : '' },
    sortField: 'to'
  },
            ];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
