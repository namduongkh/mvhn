const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Audit Logs', 'audit_logs', {
  iconClass: 'fa fa-history',
  color: 'blue-dirty',
})
  .index(List)
  .edit(Detail)
  .toObject();
