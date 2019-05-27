const List = () => import('./components/List');
const Detail = () => import('./components/Detail');

export default {
  name: 'Medias',
  path: '/media_managerment',
  meta: {
    title: 'Medias',
    iconClass: 'fa fa-dot-circle-o',
    color: 'blue-dirty',
  },
  childrens: [
    {
      name: 'medias',
      path: '/medias',
      hidden: false,
      component: List,
      meta: {
        title: 'List media'
      }
    },
    // {
    //   name: 'create_media',
    //   path: '/media',
    //   component: Detail,
    //   meta: {
    //     title: 'New media'
    //   }
    // },
    {
      name: 'edit_media',
      path: '/media/:id',
      hidden: true,
      component: Detail,
      meta: {
        title: 'Edit media'
      }
    }
  ]
}