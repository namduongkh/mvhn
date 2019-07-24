const StoreTables = () => import('./components/StoreTables');
const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Store Tables', 'stores/:storeId/store_tables', {
  iconClass: 'fa fa-dot-circle-o',
  color: 'blue-dirty',
})
  .index(StoreTables, null, { hidden: true })
  .new(Detail)
  .edit(Detail)
  .toObject();
