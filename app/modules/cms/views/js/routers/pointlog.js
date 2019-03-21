const ListPointlog = () => import ('@module/pointlog/ListPointlog');
const DetailPointlog = () => import ('@module/pointlog/DetailPointlog');

export default {
  name: 'Pointlog',
  path: '/pointlog_managerment',
  meta: {
    title: 'Lịch sử điểm',
    iconClass: 'fa fa-dot-circle-o',
    color: 'blue-dirty',
    permission: ['admin']
  },
  childrens: [
    {
      name: 'pointlogs',
      path: '/pointlogs',
      hidden: false,
      component: ListPointlog,
      meta: {
        title: 'Danh sách',
        permission: ['admin']
      }
    },
    {
      hidden: true,
      name: 'create_pointlog',
      path: '/pointlog',
      component: DetailPointlog,
      meta: {
        title: 'New pointlog'
      }
    },
    {
      name: 'edit_pointlog',
      path: '/pointlog/:id',
      hidden: true,
      component: DetailPointlog,
      meta: {
        title: 'Edit pointlog'
      }
    }
  ]
}
