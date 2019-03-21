const ListVoucher = () => import ('@module/voucher/ListVoucher');
const DetailVoucher = () => import ('@module/voucher/DetailVoucher');

export default {
  name: 'Voucher',
  path: '/voucher_managerment',
  meta: {
    title: 'Voucher',
    iconClass: 'fa fa-gift',
    color: 'blue-dirty',
    permission: ['admin']
  },
  childrens: [
    {
      name: 'vouchers',
      path: '/vouchers',
      hidden: false,
      component: ListVoucher,
      meta: {
        title: 'Danh sách',
        permission: ['admin']
      }
    },
    {
      name: 'create_voucher',
      path: '/voucher',
      component: DetailVoucher,
      meta: {
        title: 'Tạo mới'
      }
    },
    {
      name: 'edit_voucher',
      path: '/voucher/:id',
      hidden: true,
      component: DetailVoucher,
      meta: {
        title: 'Edit voucher'
      }
    }
  ]
}
