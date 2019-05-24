const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
const Leak = () => import('./components/Leak');

export default {
  name: 'Posts',
  path: '/post_managerment',
  meta: {
    title: 'Posts',
    iconClass: 'fa fa-pencil-square-o',
    color: 'blue-dirty',
    // permission: ['admin']
  },
  childrens: [
    {
      name: 'posts',
      path: '/posts',
      hidden: false,
      component: List,
      meta: {
        title: 'List post',
        // permission: ['admin']
      }
    },
    {
      name: 'create_post',
      path: '/post',
      component: Detail,
      meta: {
        title: 'New post'
      }
    },
    {
      name: 'edit_post',
      path: '/post/:id',
      hidden: true,
      component: Detail,
      meta: {
        title: 'Edit post'
      }
    }
  ]
}