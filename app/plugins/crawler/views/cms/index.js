const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Crawlers', 'crawlers', {
  iconClass: 'fa fa-spider',
  color: 'blue-dirty',
})
  .default({
    List,
    Detail
  })
  .toObject();
