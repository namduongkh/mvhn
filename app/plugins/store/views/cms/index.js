const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Stores', 'stores', {
  iconClass: 'fa fa-dot-circle-o',
  color: 'blue-dirty',
})
  .index(List)
  .new(Detail)
  .customRoute('mystore', {
    name: `MyStore`,
    title: `My Store`,
    path: `/stores/mystore`,
    component: Detail
  }, 'edit')
  .edit(Detail)
  //   {
  //   if (!this.permit(permitActionName || actionName)) return this;

  //   config.meta = this.meta(config.name);
  //   this.config.childrens.push(config);
  //   return this;
  // }
  .toObject();
