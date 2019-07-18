const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Pages', 'pages')
  .default({
    List,
    Detail
  })
  .toObject();
