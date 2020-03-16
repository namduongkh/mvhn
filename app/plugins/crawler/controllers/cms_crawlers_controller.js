import CrawlerRunner from '../services/crawler_runner';

export default class CmsCrawlersController extends ResourcesController {
  async run() {
    let { id } = this.request.params;
    let runner = new CrawlerRunner(id, this.request.payload)
    await runner.perform();
    return true;
  }
}
