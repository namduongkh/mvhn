const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Store Orders', ':parentType/:parentId/store_orders', {
  iconClass: 'fa fa-dot-circle-o',
  color: 'blue-dirty',
})
  .index(List, null, {
    hidden: true
  })
  .new(Detail)
  .edit(Detail)
  .toObject();
