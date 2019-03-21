const List = () => import ('@module/category/List');
const Detail = () => import ('@module/category/Detail');

export default {
    name: 'Categories',
    path: '/category_managerment',
    meta: {
        title: 'Thể loại',
        iconClass: 'fa fa-table',
        color: 'purple',
        permission: ['admin']
    },
    childrens: [
        {
            name: 'categories',
            path: '/categories',
            hidden: false,
            component: List,
            meta: {
                title: 'Danh sách',
                permission: ['admin']
            }
        },
        {
            name: 'create_category',
            path: '/category',
            component: Detail,
            meta: {
                title: 'Tạo mới'
            }
        },
        {
            name: 'edit_category',
            path: '/category/:id',
            hidden: true,
            component: Detail,
            meta: {
                title: 'Cập nhật'
            }
        }
    ]
}