import moment from 'moment';

exports.fieldsDisplay = [
  {
    name: 'name',
    titleClass: 'text-center',
    title: 'Name',
    sortField: 'name'
  },
  {
    name: 'classname',
    titleClass: 'text-center',
    title: 'Class Name',
    sortField: 'classname',
    callback(val) {
      return `${val}<div><a href="${CMS_URL}/#/batchlogs?type=${val}" target="_blank">History</a></div>`;
    }
  },
  {
    name: 'description',
    titleClass: 'text-center',
    title: 'Description',
    sortField: 'description'
  }
];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
