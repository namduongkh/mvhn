import moment from 'moment';

exports.fieldsDisplay = [
  {
    name: 'user',
    titleClass: 'text-center',
    title: 'User',
    callback(user) { return user && user.name },
  },
  {
    name: 'fromPlace',
    titleClass: 'text-center',
    title: 'From',
    callback(place) {
      if (!place) return;

      return `<span>${place.name}</span><br/><small>${place.address}</small>`;
    }
  },
  {
    name: 'toPlace',
    titleClass: 'text-center',
    title: 'To',
    callback(place) {
      if (!place) return;

      return `<span>${place.name}</span><br/><small>${place.address}</small>`;
    }
  },
  {
    name: 'time',
    titleClass: 'text-center',
    title: 'Time',
    callback(val) { return val ? moment(val).format('DD/MM/YYYY hh:mm') : '' },
    sortField: 'time'
  }
];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
