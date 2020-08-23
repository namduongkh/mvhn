import moment from 'moment';

exports.fieldsDisplay = [
  {
    name: 'title',
    titleClass: 'text-center',
    title: 'Title',
    sortField: 'title'
  },
  {
    name: 'slug',
    titleClass: 'text-center',
    title: 'Slug',
    sortField: 'slug',
    callback(val) {
      return `<a href="/${val}" target="_blank">Link</a>`
    }
  },
];


exports.sortOrder = [
  { field: 'name', direction: 'asc' }
];
