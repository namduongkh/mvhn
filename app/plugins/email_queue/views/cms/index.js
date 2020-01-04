const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Email Queues', 'email_queues', {
  iconClass: 'fa fa-dot-circle-o',
  color: 'blue-dirty',
})
  .default({
    List,
    Detail
  })
  .toObject();
