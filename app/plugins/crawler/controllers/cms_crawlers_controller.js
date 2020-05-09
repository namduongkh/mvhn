import CrawlerRunner from '../services/crawler_runner';
import _ from "lodash";
import { ResourcesController } from "@core/modules";

export default class CmsCrawlersController extends ResourcesController {
  async test() {
    let { id } = this.request.params;
    let runner = new CrawlerRunner(id, this.request.payload);
    return await runner.perform(true);
  }
}
