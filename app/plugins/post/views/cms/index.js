const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
const LinkMapper = () => import('./components/LinkMapper');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Posts', 'posts', {
  iconClass: 'fa fa-pencil-square-o',
  color: 'blue-dirty'
})
  .index(List)
  .show(Detail)
  .new(Detail, null, {
    scope: ['admin']
  })
  .customRoute('maplink', {
    name: `MapLinkPost`,
    path: `/posts/maplink/:id`,
    hidden: true,
    component: LinkMapper
  }, 'edit')
  .toObject();
