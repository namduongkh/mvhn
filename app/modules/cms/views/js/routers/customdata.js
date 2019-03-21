const ListCustomdata = () => import ('@module/customdata/ListCustomdata');
const DetailCustomdata = () => import ('@module/customdata/DetailCustomdata');

export default {
  name: 'Customdata',
  path: '/customdata_managerment',
  meta: {
    title: 'Khung dữ liệu',
    iconClass: 'fa fa-align-justify',
    color: 'blue-dirty',
    permission: ['admin']
  },
  childrens: [
    {
      name: 'customdatas',
      path: '/customdatas',
      hidden: false,
      component: ListCustomdata,
      meta: {
        title: 'Danh sách',
        permission: ['admin']
      }
    },
    {
      name: 'create_customdata',
      path: '/customdata',
      component: DetailCustomdata,
      meta: {
        title: 'Tạo mới'
      }
    },
    {
      name: 'edit_customdata',
      path: '/customdata/:id',
      hidden: true,
      component: DetailCustomdata,
      meta: {
        title: 'Edit customdata'
      }
    }
  ]
}
