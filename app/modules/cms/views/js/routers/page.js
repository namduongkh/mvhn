const List = () =>
    import ('@module/page/List');
const Detail = () =>
    import ('@module/page/Detail');

export default {
    name: 'Pages',
    path: '/page_managerment',
    meta: {
        title: 'Pages',
        iconClass: 'fa fa-file',
        color: 'blue-dirty',
        permission: ['admin']
    },
    childrens: [{
            name: 'pages',
            path: '/pages',
            hidden: false,
            component: List,
            meta: {
                title: 'List page',
                permission: ['admin']
            }
        },
        {
            name: 'create_page',
            path: '/page',
            component: Detail,
            meta: {
                title: 'New page'
            }
        },
        {
            name: 'edit_page',
            path: '/page/:id',
            hidden: true,
            component: Detail,
            meta: {
                title: 'Edit page'
            }
        }
    ]
}