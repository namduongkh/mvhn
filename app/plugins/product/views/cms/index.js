const List = () => import('./components/List');
const Detail = () => import('./components/Detail');

export default {
  name: 'Products',
  path: '/product_managerment',
  meta: {
    title: 'Products',
    iconClass: 'fa fa-dot-circle-o',
    color: 'blue-dirty',
  },
  childrens: [
    {
      name: 'products',
      path: '/products',
      hidden: false,
      component: List,
      meta: {
        title: 'List product'
      }
    },
    {
      name: 'create_product',
      path: '/product',
      component: Detail,
      meta: {
        title: 'New product'
      }
    },
    {
      name: 'edit_product',
      path: '/product/:id',
      hidden: true,
      component: Detail,
      meta: {
        title: 'Edit product'
      }
    }
  ]
}