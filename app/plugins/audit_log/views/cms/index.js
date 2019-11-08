const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Audit Logs', 'audit_logs', {
  iconClass: 'fa fa-dot-circle-o',
  color: 'blue-dirty',
})
  .default({
    List,
    Detail
  })
  .toObject();
