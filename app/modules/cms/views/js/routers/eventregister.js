const ListEventRegister = () => import ('@module/eventregister/ListEventRegister');
const DetailEventRegister = () => import ('@module/eventregister/DetailEventRegister');

export default {
  name: 'EventRegister',
  path: '/eventregister_managerment',
  meta: {
    title: 'Đăng ký sự kiện',
    iconClass: 'fa fa-dot-circle-o',
    color: 'blue-dirty',
    permission: ['admin']
  },
  childrens: [
    {
      name: 'eventregisters',
      path: '/eventregisters',
      hidden: false,
      component: ListEventRegister,
      meta: {
        title: 'Danh sách mẹ đăng ký',
        permission: ['admin']
      }
    },
    {
      name: 'create_eventregister',
      path: '/eventregister',
      component: DetailEventRegister,
      meta: {
        title: 'Đăng ký cho mẹ'
      }
    },
    {
      name: 'edit_eventregister',
      path: '/eventregister/:id',
      hidden: true,
      component: DetailEventRegister,
      meta: {
        title: 'Edit eventregister'
      }
    }
  ]
}
