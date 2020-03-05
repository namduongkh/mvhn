const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Seo', 'seo', {
  iconClass: 'fa fa-search',
  color: 'blue-dirty',
})
  .default({
    List,
    Detail
  })
  .toObject();
