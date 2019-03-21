const ListLetter = () => import ('@module/letter/ListLetter');
const DetailLetter = () => import ('@module/letter/DetailLetter');

export default {
  name: 'Letter',
  path: '/letter_managerment',
  meta: {
    title: 'Thư của mẹ',
    iconClass: 'fa fa-envelope-o',
    color: 'blue-dirty',
    permission: ['admin']
  },
  childrens: [
    {
      name: 'letters',
      path: '/letters',
      hidden: false,
      component: ListLetter,
      meta: {
        title: 'Danh sách',
        permission: ['admin']
      }
    },
    // {
    //   name: 'create_letter',
    //   path: '/letter',
    //   component: DetailLetter,
    //   meta: {
    //     title: 'New letter'
    //   },
    //   hidden: true,
    // },
    {
      name: 'edit_letter',
      path: '/letter/:id',
      hidden: true,
      component: DetailLetter,
      meta: {
        title: 'Edit letter'
      }
    }
  ]
}
