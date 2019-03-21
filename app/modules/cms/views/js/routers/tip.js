const ListTip = () => import ('@module/tip/ListTip');
const DetailTip = () => import ('@module/tip/DetailTip');

export default {
  name: 'Tip',
  path: '/tip_managerment',
  meta: {
    title: 'Tips',
    iconClass: 'fa fa-dot-circle-o',
    color: 'blue-dirty',
    permission: ['admin']
  },
  childrens: [
    {
      name: 'tips',
      path: '/tips',
      hidden: false,
      component: ListTip,
      meta: {
        title: 'List Tip',
        permission: ['admin']
      }
    },
    {
      name: 'create_tip',
      path: '/tip',
      component: DetailTip,
      meta: {
        title: 'New tip'
      }
    },
    {
      name: 'edit_tip',
      path: '/tip/:id',
      hidden: true,
      component: DetailTip,
      meta: {
        title: 'Edit tip'
      }
    }
  ]
}
