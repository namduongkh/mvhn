import cheerio from 'cheerio';
import mongoose from 'mongoose';
import axios from 'axios';

const Crawler = mongoose.model('Crawler');
const Batchlog = mongoose.model('Batchlog');
const Post = mongoose.model('Post');
const Property = mongoose.model('Property');

export default class CrawlerRunner {
  constructor(crawlerId, params = {}) {
    this.crawlerId = crawlerId;
    this.params = params;
  }

  async perform() {
    await this.loadCrawler();
    await this.getBatchlog();

    try {
      this.batchlog.log('Start crawl url:', this.params.url);

      let resp = await axios.get(this.params.url);
      let $ = cheerio.load(resp.data);
      let post = new Post();

      $('script').remove();
      $(this.crawler.exceptSelector).remove();

      let links = $('a').map(function () {
        let href = $(this).attr('href');
        $(this).attr('href', '')
        return href;
      }).get();

      post.title = $(this.crawler.titleSelector).text();
      post.summary = $(this.crawler.summarySelector).text();
      post.content = $(this.crawler.contentSelector).html();
      post.thumb = $('[property="og:image"]').attr('content');
      post.source = this.params.url;
      post.status = 0;
      post.category = await this.getCategory();

      await post.save();
      this.batchlog.log(`Created new post: <${post._id}> ${post.title}`);
      this.batchlog.setStatus('success');
    } catch (error) {
      console.log('error', error);
      this.batchlog.log('Response error');
      this.batchlog.setStatus('error');
    }

    await this.batchlog.save();
  }

  async loadCrawler() {
    this.crawler = await Crawler.findById(this.crawlerId);
  }

  async getBatchlog() {
    if (this.batchlog) return this.batchlog;

    this.batchlog = this.params.batchlogId ? await Batchlog.findOne({ _id: this.params.batchlogId }) : new Batchlog({
      name: this.params.classname || this.constructor.name || 'CrawlerRunner',
      type: this.params.classname || this.constructor.name || 'CrawlerRunner',
    });

    this.batchlog = await this.batchlog.save();
  }

  async getCategory() {
    if (!this.params.category) return;

    let category = await Property.findOne({
      name: this.params.category,
      type: 'category'
    }) || new Property({
      name: this.params.category,
      type: 'category'
    });

    await category.save();
    return category._id;
  }
}
