const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Scripts', 'scripts', {
  iconClass: 'fa fa-file-code-o',
  color: 'blue-dirty',
})
  .default({
    List,
    Detail
  })
  .toObject();
