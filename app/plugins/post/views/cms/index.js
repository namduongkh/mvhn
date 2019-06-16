const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Posts', 'posts', {
  iconClass: 'fa fa-pencil-square-o',
  color: 'blue-dirty'
})
  .list(List)
  .edit(Detail)
  .new(Detail, null, {
    scope: ['admin']
  })
  .toObject();
