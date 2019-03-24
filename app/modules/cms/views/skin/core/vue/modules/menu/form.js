const Form = () => import('@module/home/form');

export default {
    name: 'FormElement',
    path: '/form',
    component: Form,
    hidden: true,
    meta: {
        title: 'Form Element',
        iconClass: 'font-icon-edit',
        color: 'gold'
    }
}