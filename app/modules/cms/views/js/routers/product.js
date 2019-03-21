const List = () => import ('@module/product/List');
const Detail = () => import ('@module/product/Detail');

export default {
    name: 'Products',
    path: '/product_managerment',
    meta: {
        title: 'Sản phẩm',
        iconClass: 'fa fa-cart-plus',
        color: 'blue-dirty',
        permission: ['admin']
    },
    childrens: [
        {
            name: 'products',
            path: '/products',
            hidden: false,
            component: List,
            meta: {
                title: 'Danh sách',
                permission: ['admin']
            }
        },
        {
            name: 'create_product',
            path: '/product',
            component: Detail,
            meta: {
                title: 'Tạo mới'
            }
        },
        {
            name: 'edit_product',
            path: '/product/:id',
            hidden: true,
            component: Detail,
            meta: {
                title: 'Cập nhật'
            }
        }
    ]
}