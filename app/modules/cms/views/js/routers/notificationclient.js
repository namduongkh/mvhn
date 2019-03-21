const ListNotificationClient = () => import ('@module/notificationclient/ListNotificationClient');
const DetailNotificationClient = () => import ('@module/notificationclient/DetailNotificationClient');

export default {
  name: 'NotificationClient',
  path: '/notificationclient_managerment',
  meta: {
    title: 'NotificationClients',
    iconClass: 'fa fa-dot-circle-o',
    color: 'blue-dirty',
    permission: ['admin']
  },
  childrens: [
    {
      name: 'notificationclients',
      path: '/notificationclients',
      hidden: false,
      component: ListNotificationClient,
      meta: {
        title: 'List NotificationClient',
        permission: ['admin']
      }
    },
    {
      name: 'create_notificationclient',
      path: '/notificationclient',
      component: DetailNotificationClient,
      meta: {
        title: 'New notificationclient'
      }
    },
    {
      name: 'edit_notificationclient',
      path: '/notificationclient/:id',
      hidden: true,
      component: DetailNotificationClient,
      meta: {
        title: 'Edit notificationclient'
      }
    }
  ]
}
