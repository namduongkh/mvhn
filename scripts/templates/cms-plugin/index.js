const List = () => import('./components/List');
const Detail = () => import('./components/Detail');

export default {
  name: '<%= pluralNameCap %>',
  path: '/<%= name %>_managerment',
  meta: {
    title: '<%= pluralNameCap %>',
    iconClass: 'fa fa-dot-circle-o',
    color: 'blue-dirty',
  },
  childrens: [
    {
      name: '<%= pluralName %>',
      path: '/<%= pluralName %>',
      hidden: false,
      component: List,
      meta: {
        title: 'List <%= name %>'
      }
    },
    {
      name: 'create_<%= name %>',
      path: '/<%= name %>',
      component: Detail,
      meta: {
        title: 'New <%= name %>'
      }
    },
    {
      name: 'edit_<%= name %>',
      path: '/<%= name %>/:id',
      hidden: true,
      component: Detail,
      meta: {
        title: 'Edit <%= name %>'
      }
    }
  ]
}