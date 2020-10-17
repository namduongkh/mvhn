const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Properties', ':postType/properties', {
  iconClass: 'fa fa-list-alt',
  color: 'purple',
  hidden: true
})
  .default({
    List,
    Detail
  })
  .toObject();
