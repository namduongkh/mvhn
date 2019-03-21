const List = () => import ('@module/award/List');
const Detail = () => import ('@module/award/Detail');

export default {
    name: 'Awards',
    path: '/award_managerment',
    meta: {
        title: 'Awards',
        iconClass: 'fa fa-gift',
        color: 'blue-dirty',
        permission: ['admin']
    },
    childrens: [
        {
            name: 'awards',
            path: '/awards',
            hidden: false,
            component: List,
            meta: {
                title: 'List award',
                permission: ['admin']
            }
        },
        {
            name: 'create_award',
            path: '/award',
            component: Detail,
            meta: {
                title: 'New award'
            }
        },
        {
            name: 'edit_award',
            path: '/award/:id',
            hidden: true,
            component: Detail,
            meta: {
                title: 'Edit award'
            }
        }
    ]
}