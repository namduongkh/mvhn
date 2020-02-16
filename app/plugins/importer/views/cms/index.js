const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Importers', 'importers', {
  iconClass: 'fa fa-file-import',
  color: 'blue-dirty',
})
  .index(List)
  .edit(Detail)
  .toObject();
