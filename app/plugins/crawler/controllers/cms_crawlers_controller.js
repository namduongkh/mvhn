import CrawlerRunner from '../services/crawler_runner';
import axios from "axios";
import cheerio from "cheerio";
import _ from "lodash";

export default class CmsCrawlersController extends ResourcesController {
  async run() {
    let { id } = this.request.params;
    let runner = new CrawlerRunner(id, this.request.payload)
    runner.perform();
    return true;
  }

  async crawlUrl() {
    let {
      url,
      urlPattern
    } = this.request.query;

    try {
      let resp = await axios.get(url);
      const $ = cheerio.load(resp.data);

      let urlRegex = new RegExp(urlPattern, 'gi');
      let ignoreRegex = new RegExp('#.+$', 'gi');

      let links = $('body a').filter(function () {
        let href = $(this).attr('href');
        return urlRegex.test(href) && !ignoreRegex.test(href);
      }).map(function () {
        return $(this).attr('href');
      }).get();

      return _.uniq(links);
    } catch (error) {
      return [];
    }
  }
}
