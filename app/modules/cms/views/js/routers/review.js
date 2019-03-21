const List = () => import ('@module/review/List');
const Detail = () => import ('@module/review/Detail');

export default {
    name: 'Reviews',
    path: '/review_managerment',
    meta: {
        title: 'Cảm nhận',
        iconClass: 'fa fa-pencil-square-o',
        color: 'blue-dirty',
        permission: ['admin']
    },
    childrens: [
        {
            name: 'reviews',
            path: '/reviews',
            hidden: false,
            component: List,
            meta: {
                title: 'Danh sách',
                permission: ['admin']
            }
        },
        {
            name: 'edit_review',
            path: '/review/:id',
            hidden: true,
            component: Detail,
            meta: {
                title: 'Cập nhật'
            }
        }
    ]
}