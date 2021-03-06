const CollectionList = () => import('./components/CollectionList');
const MongoList = () => import('./components/MongoList');
const MongoDetail = () => import('./components/MongoDetail');
const CollectionIndexes = () => import('./components/CollectionIndexes');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Devtools', 'devtools', {
  iconClass: 'fa fa-wrench',
  color: 'blue-dirty',
})
  .customRoute('mongos', {
    name: `CollectionList`,
    title: `Collections`,
    path: `/devtools/mongos`,
    component: CollectionList
  }, 'model')
  .customRoute('mongos', {
    name: `DocumentList`,
    title: `List Documents`,
    path: `/devtools/mongos/:model`,
    hidden: true,
    component: MongoList
  }, 'index')
  .customRoute('mongos', {
    name: `CollectionIndexes`,
    title: `Document`,
    path: `/devtools/mongos/:model/indexes`,
    hidden: true,
    component: CollectionIndexes
  }, 'indexes')
  .customRoute('mongos', {
    name: `MongoDetail`,
    title: `Document`,
    path: `/devtools/mongos/:model/:id`,
    hidden: true,
    component: MongoDetail
  }, 'edit')
  .toObject();
