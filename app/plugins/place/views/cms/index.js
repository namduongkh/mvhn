const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Places', 'places', {
  iconClass: 'fa fa-map-marker-alt',
  color: 'blue-dirty',
})
  .default({
    List,
    Detail
  })
  .toObject();
