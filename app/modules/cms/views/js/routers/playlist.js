const ListPlaylist = () => import ('@module/playlist/ListPlaylist');
const DetailPlaylist = () => import ('@module/playlist/DetailPlaylist');

export default {
  name: 'Playlist',
  path: '/playlist_managerment',
  meta: {
    title: 'Playlists',
    iconClass: 'fa fa-dot-circle-o',
    color: 'blue-dirty',
    permission: ['admin']
  },
  childrens: [
    {
      name: 'playlists',
      path: '/playlists',
      hidden: false,
      component: ListPlaylist,
      meta: {
        title: 'List Playlist',
        permission: ['admin']
      }
    },
    {
      name: 'create_playlist',
      path: '/playlist',
      component: DetailPlaylist,
      meta: {
        title: 'New playlist'
      }
    },
    {
      name: 'edit_playlist',
      path: '/playlist/:id',
      hidden: true,
      component: DetailPlaylist,
      meta: {
        title: 'Edit playlist'
      }
    }
  ]
}
