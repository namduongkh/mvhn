const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
const CrawlUrl = () => import('./components/CrawlUrl');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Crawlers', 'crawlers', {
  iconClass: 'fa fa-spider',
  color: 'blue-dirty',
})
  .customRoute('crawl_url', {
    name: `Crawl Url`,
    path: `/crawlers/crawl_url`,
    component: CrawlUrl
  }, 'edit')
  .default({
    List,
    Detail
  })
  .toObject();
