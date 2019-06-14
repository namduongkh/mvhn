const List = () => import('./components/List');
const Detail = () => import('./components/Detail');

export default {
  name: 'Pages',
  path: '/page_managerment',
  meta: {
    title: 'Pages',
    iconClass: 'fa fa-dot-circle-o',
    color: 'blue-dirty',
  },
  childrens: [
    {
      name: 'pages',
      path: '/pages',
      hidden: false,
      component: List,
      meta: {
        title: 'List page'
      }
    },
    {
      name: 'create_page',
      path: '/page',
      component: Detail,
      meta: {
        title: 'New page'
      }
    },
    {
      name: 'edit_page',
      path: '/page/:id',
      hidden: true,
      component: Detail,
      meta: {
        title: 'Edit page'
      }
    }
  ]
}