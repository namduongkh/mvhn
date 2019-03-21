const ListAntenatal = () => import('@module/antenatal/ListAntenatal');
const DetailAntenatal = () => import('@module/antenatal/DetailAntenatal');

export default {
  name: 'Antenatal',
  path: '/antenatal_managerment',
  hidden: true,
  meta: {
    title: 'Antenatals',
    iconClass: 'fa fa-dot-circle-o',
    color: 'blue-dirty',
    permission: ['admin']
  },
  childrens: [
    {
      name: 'antenatals',
      path: '/antenatals',
      hidden: false,
      component: ListAntenatal,
      meta: {
        title: 'List Antenatal',
        permission: ['admin']
      }
    },
    {
      name: 'create_antenatal',
      path: '/antenatal',
      component: DetailAntenatal,
      meta: {
        title: 'New antenatal'
      }
    },
    {
      name: 'edit_antenatal',
      path: '/antenatal/:id',
      hidden: true,
      component: DetailAntenatal,
      meta: {
        title: 'Edit antenatal'
      }
    }
  ]
}
