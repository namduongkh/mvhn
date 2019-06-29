const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Medias', 'medias', {
  iconClass: 'fa fa-dot-circle-o',
  color: 'blue-dirty',
})
  .index(List)
  .edit(Detail)
  .toObject();
