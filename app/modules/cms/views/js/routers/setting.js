const List = () => import ('@module/setting/List');
const Detail = () => import ('@module/setting/Detail');

export default {
    name: 'Setting',
    path: '/setting_managerment',
    meta: {
        title: 'Setting',
        iconClass: 'fa fa-cogs',
        color: 'orange-red',
        permission: ['admin']
    },
    childrens: [
        {
            name: 'settings',
            path: '/settings',
            hidden: false,
            component: List,
            meta: {
                title: 'List setting',
                permission: ['admin']
            }
        },
        {
            name: 'create_setting',
            path: '/setting',
            component: Detail,
            meta: {
                title: 'New setting'
            }
        },
        {
            name: 'edit_setting',
            path: '/setting/:id',
            hidden: true,
            component: Detail,
            meta: {
                title: 'Edit setting'
            }
        }
    ]
}