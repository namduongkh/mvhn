const List = () => import('./components/List');
const Detail = () => import('./components/Detail');

export default {
  name: 'Settings',
  path: '/setting_managerment',
  meta: {
    title: 'Settings',
    iconClass: 'fa fa-dot-circle-o',
    color: 'blue-dirty',
  },
  childrens: [
    {
      name: 'settings',
      path: '/settings',
      hidden: false,
      component: List,
      meta: {
        title: 'List setting'
      }
    },
    {
      name: 'create_setting',
      path: '/setting',
      component: Detail,
      meta: {
        title: 'New setting'
      }
    },
    {
      name: 'edit_setting',
      path: '/setting/:id',
      hidden: true,
      component: Detail,
      meta: {
        title: 'Edit setting'
      }
    }
  ]
}