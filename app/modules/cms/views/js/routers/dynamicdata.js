const ListDynamicdata = () => import('@module/dynamicdata/ListDynamicdata');
const DetailDynamicdata = () => import('@module/dynamicdata/DetailDynamicdata');

export default {
  name: 'Dynamicdata',
  path: '/dynamicdata_managerment',
  meta: {
    title: 'Thiết lập dữ liệu',
    iconClass: 'fa fa-table',
    color: 'blue-dirty',
    permission: ['admin']
  },
  childrens: [
    {
      name: 'dynamicdatas',
      path: '/dynamicdatas',
      hidden: false,
      component: ListDynamicdata,
      meta: {
        title: 'Danh sách',
        permission: ['admin']
      }
    },
    ...window.data_tables.map((table) => {
      return {
        name: table.key,
        path: `/dynamicdatas?type=${table._id}`,
        hidden: false,
        component: ListDynamicdata,
        meta: {
          title: table.name
        }
      }
    }),
    {
      hidden: true,
      name: 'create_dynamicdata',
      path: '/dynamicdata',
      component: DetailDynamicdata,
      meta: {
        title: 'New dynamicdata'
      }
    },
    {
      name: 'edit_dynamicdata',
      path: '/dynamicdata/:id',
      hidden: true,
      component: DetailDynamicdata,
      meta: {
        title: 'Edit dynamicdata'
      }
    }
  ]
}
