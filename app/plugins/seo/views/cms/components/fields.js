import moment from 'moment';

exports.fieldsDisplay = [
  {
    name: 'name',
    titleClass: 'text-center',
    title: 'Name',
    sortField: 'name'
  },
  {
    name: 'slug',
    titleClass: 'text-center',
    title: 'Slug',
    sortField: 'slug',
    callback(val) {
      return `<a href="/files/${val}.xml" target="_blank">Link</a>`
    }
  },
  {
    name: 'model',
    titleClass: 'text-center',
    title: 'Model',
    sortField: 'model'
  },
  {
    name: 'urlPattern',
    titleClass: 'text-center',
    title: 'Url pattern',
    sortField: 'urlPattern'
  },
  {
    name: 'priority',
    titleClass: 'text-center',
    title: 'Priority',
    sortField: 'priority'
  },
  {
    name: 'changefreq',
    titleClass: 'text-center',
    title: 'Change freq',
    sortField: 'changefreq'
  },
];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
