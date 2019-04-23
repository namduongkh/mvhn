import moment from 'moment';

exports.fieldsDisplay =  [
  <% for (let key in formInfo) { %>
  <% if (formInfo[key].list) { %>
  <% if (['text'].includes(formInfo[key].type)) { %>
  {
    name: '<%= key %>',
    titleClass: 'text-center',
    title: '<%= capitalize(key) %>',
    sortField: '<%= key %>'
  },
  <% }-%>
  <% if (formInfo[key].type == 'image'){ %>
  {
    name: '<%= key %>',
    titleClass: 'text-center',
    title: '<%= capitalize(key) %>',
    callback(val){return `<img src="/${val}" alt="${val}"/>`},
    sortField: '<%= key %>'
  },<% }-%>
    <% if (formInfo[key].type == 'images'){ %>
  {
    name: '<%= key %>',
      titleClass: 'text-center',
    title: '<%= capitalize(key) %>',
    callback(val){return val.join('<br/>')},
    sortField: '<%= key %>'
  },<% }-%>
  <% if (formInfo[key].type == 'date'){ %>
  {
    name: '<%= key %>',
    titleClass: 'text-center',
    title: '<%= capitalize(key) %>',
    callback(val){return val ? moment(val).format('dd/MM/yyyy') : '' },
    sortField: '<%= key %>'
  },
      <% }-%>
    <% } -%>
  <% }-%>
];


exports.sortOrder = [
  { field: 'createdAt', direction: 'asc' }
];
