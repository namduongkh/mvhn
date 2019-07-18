const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('User Groups', 'user_groups', {
  iconClass: 'fa fa-users',
  color: 'blue-dirty',
})
  .default({
    List,
    Detail
  })
  .toObject();
