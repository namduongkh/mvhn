const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Users', 'users', {
  iconClass: 'fa fa-user',
  color: 'blue-dirty',
})
  .default({
    List,
    Detail
  })
  .toObject();
