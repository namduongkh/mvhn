import moment from 'moment';

exports.fieldsDisplay =  [
  
  
                
  
                
  
                
  
          
  {
    name: 'time',
    titleClass: 'text-center',
    title: 'Time',
    callback(val){return val ? moment(val).format('DD/MM/YYYY') : '' },
    sortField: 'time'
  },
            
    ];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
