const List = () => import('@module/card/List');
const Detail = () => import('@module/card/Detail');

export default {
    name: 'Cards',
    path: '/card_managerment',
    meta: {
        title: 'Tem sản phẩm',
        iconClass: 'fa fa-list-alt',
        color: 'blue-dirty',
        permission: ['admin']
    },
    childrens: [
        {
            name: 'cards',
            path: '/cards',
            hidden: false,
            component: List,
            meta: {
                title: 'Danh sách',
                permission: ['admin']
            }
        },
        {
            name: 'create_card',
            path: '/card',
            component: Detail,
            meta: {
                title: 'Tạo mới'
            }
        },
        {
            name: 'edit_card',
            path: '/card/:id',
            hidden: true,
            component: Detail,
            meta: {
                title: 'Chỉnh sửa'
            }
        }
    ]
}