import moment from 'moment'
exports.fieldsDisplay =  [
  
  
  
  {
    name: 'title',
    titleClass: 'text-center',
    title: 'Tiêu đề',
    sortField: 'title'
  },
                
    
  
    
  {
    name: 'thumb',
    titleClass: 'text-center',
    title: 'Hình Thumb',
    callback(val){return `<img class="img img-responsive" style="max-width: 250px;" src="/${val}" alt="${val}"/>`},
    sortField: 'thumb',
  },
    
  
                
  
  
  {
    name: 'count',
    titleClass: 'text-center',
    title: 'Lượt nghe',
    sortField: 'count'
  },
                ];


exports.sortOrder = [
  { field: 'createdAt', direction: 'asc' }
];
