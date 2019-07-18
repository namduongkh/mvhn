const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Settings', 'settings', {
  iconClass: 'fa fa-cog',
  color: 'blue-dirty',
})
  .default({
    List,
    Detail
  })
  .toObject();
