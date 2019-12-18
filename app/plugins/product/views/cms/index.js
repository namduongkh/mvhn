const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
import CmsRouter from "@Core/cms_router";

export default [
  new CmsRouter('Products', 'products', {
    iconClass: 'fa fa-dot-circle-o',
    color: 'blue-dirty'
  }).default({
    List,
    Detail
  }).toObject(),

  new CmsRouter('StoreProducts', 'stores/:storeId/products', {
    iconClass: 'fa fa-dot-circle-o',
    color: 'blue-dirty'
  }).default({
    List,
    Detail
  }, {
    hidden: true
  }).toObject()
];
