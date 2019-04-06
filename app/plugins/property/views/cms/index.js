const List = () => import('./components/List');
const Detail = () => import('./components/Detail');

export default {
  name: 'Properties',
  path: '/property_managerment',
  meta: {
    title: 'Properties',
    iconClass: 'fa fa-list-alt',
    color: 'purple',
    // permission: ['admin']
  },
  childrens: [
    {
      name: 'properties',
      path: '/properties',
      hidden: false,
      component: List,
      meta: {
        title: 'List property',
        // permission: ['admin']
      }
    },
    {
      name: 'create_property',
      path: '/property',
      component: Detail,
      meta: {
        title: 'New property'
      }
    },
    {
      name: 'edit_property',
      path: '/property/:id',
      hidden: true,
      component: Detail,
      meta: {
        title: 'Edit property'
      }
    }
  ]
}