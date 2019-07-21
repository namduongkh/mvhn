const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Stores', 'stores', {
  iconClass: 'fa fa-dot-circle-o',
  color: 'blue-dirty',
})
  .default({
    List,
    Detail
  })
  .toObject();
