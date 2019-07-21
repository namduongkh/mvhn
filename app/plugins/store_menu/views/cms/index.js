const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Store Menus', 'stores/:store_id/store_menus', {
  iconClass: 'fa fa-dot-circle-o',
  color: 'blue-dirty',
})
  .index(List, null, {
    hidden: true
  })
  .new(Detail, null, {
    hidden: true
  })
  .edit(Detail, null, {
    hidden: true
  })
  .toObject();
