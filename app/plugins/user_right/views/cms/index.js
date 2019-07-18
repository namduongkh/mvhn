const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('User Rights', 'user_rights', {
  iconClass: 'fa fa-universal-access',
  color: 'blue-dirty',
})
  .default({
    List,
    Detail
  })
  .toObject();
