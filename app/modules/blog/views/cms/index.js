const ListBlog = () => import('./components/ListBlog');
const DetailBlog = () => import('./components/DetailBlog');

export default {
  name: 'Blogs',
  path: '/blog_managerment',
  meta: {
    title: 'Blogs',
    iconClass: 'fa fa-pencil-square-o',
    color: 'blue-dirty',
    // permission: ['admin']
  },
  childrens: [
    {
      name: 'blogs',
      path: '/blogs',
      hidden: false,
      component: ListBlog,
      meta: {
        title: 'List blog',
        // permission: ['admin']
      }
    },
    {
      name: 'create_blog',
      path: '/blog',
      component: DetailBlog,
      meta: {
        title: 'New blog'
      }
    },
    {
      name: 'edit_blog',
      path: '/blog/:id',
      hidden: true,
      component: DetailBlog,
      meta: {
        title: 'Edit blog'
      }
    }
  ]
}