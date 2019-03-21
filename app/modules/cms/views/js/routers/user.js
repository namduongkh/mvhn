const List = () => import ('@module/user/List');
const Detail = () => import ('@module/user/Detail');

export default {
    name: 'User',
    path: '/user_managerment',
    meta: {
        title: 'Users',
        iconClass: 'fa fa-users',
        color: 'blue',
        permission: ['admin', 'supporter']
    },
    childrens: [
        {
            name: 'users',
            path: '/users',
            hidden: false,
            component: List,
            meta: {
                title: 'List user',
                permission: ['admin', 'supporter']
            }
        },
        {
            name: 'create_user',
            path: '/user',
            component: Detail,
            meta: {
                title: 'New user',
                permission: ['admin']
            }
        },
        {
            name: 'edit_user',
            path: '/user/:id',
            hidden: true,
            component: Detail,
            meta: {
                title: 'Edit user',
                permission: ['admin', 'supporter']
            }
        }
    ]
}