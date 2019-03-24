const Dashboard = () => import('@module/home/Dashboard');

export default {
    name: 'Dashboard',
    path: '/',
    component: Dashboard,
    meta: {
        default: true,
        title: 'Dashboard',
        iconClass: 'fa fa-dashboard',
        color: 'green',
    }
}