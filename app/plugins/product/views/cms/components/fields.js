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
      return `<a href="/products/${val}" target="_blank">Link</a>`
    },
  },
  {
    name: 'thumb',
    titleClass: 'text-center',
    title: 'Thumb',
    callback(val) {
      return `<img style="max-width:200px;max-height:200px" class="img img-responsive" src="${val}" alt="${val}"/>`
    },
    sortField: 'thumb'
  },
  {
    name: 'price',
    titleClass: 'text-center',
    title: 'Price',
    sortField: 'price'
  },
];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
