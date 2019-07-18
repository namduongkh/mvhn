const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Properties', 'properties', {
  iconClass: 'fa fa-list-alt',
  color: 'purple',
})
  .default({
    List,
    Detail
  })
  .toObject();
