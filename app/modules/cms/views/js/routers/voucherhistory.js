const ListVoucherhistory = () => import('@module/voucherhistory/ListVoucherhistory');
const DetailVoucherhistory = () => import('@module/voucherhistory/DetailVoucherhistory');

export default {
  name: 'Voucherhistory',
  path: '/voucherhistory_managerment',
  meta: {
    title: 'Lịch sử đổi quà',
    iconClass: 'fa fa-dot-circle-o',
    color: 'blue-dirty',
    permission: ['admin']
  },
  childrens: [
    {
      name: 'voucherhistories',
      path: '/voucherhistories',
      hidden: false,
      component: ListVoucherhistory,
      meta: {
        title: 'Danh sách',
      permission: ['admin']
    }
    },
    {
      name: 'create_voucherhistory',
      path: '/voucherhistory',
      hidden: true,
      component: DetailVoucherhistory,
      meta: {
        title: 'New voucherhistory',
        permission: ['admin']
      }
    },
    {
      name: 'edit_voucherhistory',
      path: '/voucherhistory/:id',
      hidden: true,
      component: DetailVoucherhistory,
      meta: {
        title: 'Edit voucherhistory',
        permission: ['admin']
      }
    }
  ]
}
