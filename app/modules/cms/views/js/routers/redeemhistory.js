const List = () => import ('@module/redeemhistory/List');
const Detail = () => import ('@module/redeemhistory/Detail');

export default {
    name: 'Redeem Histories',
    path: '/redeemhistory_managerment',
    meta: {
        title: 'Redeem Histories',
        iconClass: 'fa fa-list-ul',
        color: 'blue-dirty',
        permission: ['admin']
    },
    childrens: [
        {
            name: 'redeemhistories',
            path: '/redeemhistories',
            hidden: false,
            component: List,
            meta: {
                title: 'List redeemhistory',
                permission: ['admin']
            }
        },
        {
            name: 'create_redeemhistory',
            path: '/redeemhistory',
            component: Detail,
            meta: {
                title: 'New redeemhistory'
            }
        },
        {
            name: 'edit_redeemhistory',
            path: '/redeemhistory/:id',
            hidden: true,
            component: Detail,
            meta: {
                title: 'Edit redeemhistory'
            }
        }
    ]
}