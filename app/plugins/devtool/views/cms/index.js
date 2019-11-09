const MongoList = () => import('./components/MongoList');
const MongoDetail = () => import('./components/MongoDetail');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Devtools', 'devtools', {
  iconClass: 'fa fa-dot-circle-o',
  color: 'blue-dirty',
})
  .customRoute('mongos', {
    name: `MongoList`,
    title: `Mongo List`,
    path: `/devtools/mongos`,
    component: MongoList
  }, 'index')
  .customRoute('mongos', {
    name: `MongoDetail`,
    title: `Mongo Detail`,
    path: `/devtools/mongos/:model/:id`,
    hidden: true,
    component: MongoDetail
  }, 'edit')
  .toObject();
