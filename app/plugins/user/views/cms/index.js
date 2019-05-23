const List = () => import('./components/List');
const Detail = () => import('./components/Detail');

export default {
  name: 'Users',
  path: '/user_managerment',
  meta: {
    title: 'Users',
    iconClass: 'fa fa-user',
    color: 'blue-dirty',
  },
  childrens: [
    {
      name: 'users',
      path: '/users',
      hidden: false,
      component: List,
      meta: {
        title: 'List user'
      }
    },
    {
      name: 'create_user',
      path: '/user',
      component: Detail,
      meta: {
        title: 'New user'
      }
    },
    {
      name: 'edit_user',
      path: '/user/:id',
      hidden: true,
      component: Detail,
      meta: {
        title: 'Edit user'
      }
    }
  ]
}