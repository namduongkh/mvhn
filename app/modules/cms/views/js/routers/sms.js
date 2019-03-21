const ListSms = () => import ('@module/sms/ListSms');
const DetailSms = () => import ('@module/sms/DetailSms');

export default {
  name: 'Sms',
  path: '/sms_managerment',
  meta: {
    title: 'Sms',
    iconClass: 'fa fa-dot-circle-o',
    color: 'blue-dirty',
    permission: ['admin']
  },
  childrens: [
    {
      name: 'smss',
      path: '/smss',
      hidden: false,
      component: ListSms,
      meta: {
        title: 'List Sms',
        permission: ['admin']
      }
    },
    {
      hidden: true,
      name: 'create_sms',
      path: '/sms',
      component: DetailSms,
      meta: {
        title: 'New sms'
      }
    },
    {
      name: 'edit_sms',
      path: '/sms/:id',
      hidden: true,
      component: DetailSms,
      meta: {
        title: 'Edit sms'
      }
    }
  ]
}
