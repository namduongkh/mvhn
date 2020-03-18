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

  async perform(test = false) {
    await this.getBatchlog();
    await this.loadCrawler();

    if (!this.params.urls || !this.params.urls.length) {
      this.batchlog.log('Provide Urls');
      this.batchlog.setStatus('error');
    }

    try {
      for (let i in this.params.urls) {
        let url = this.params.urls[i];
        let post = await this.newPost(url);

        if (test) return post;

        try {
          await post.save();
          this.batchlog.log(`Created new post: <${post._id}> ${post.title}`);
        } catch (error) {
          this.batchlog.log(`Created post failed`);
        }
      }
      this.batchlog.setStatus('success');
    } catch (error) {
      console.log('error', error);
      this.batchlog.setStatus('error');
    }

    await this.batchlog.save();
  }

  async newPost(url) {
    try {
      this.batchlog.log('Start crawl url:', url);

      let resp = await axios.get(url);
      let $ = cheerio.load(resp.data);
      let post = new Post();

      $('script').remove();
      $(this.crawler.exceptSelector).remove();
      $('a').each(function () {
        $(this).attr('href', 'javascript:void(0)');
      });

      post.title = $(this.crawler.titleSelector).text();
      post.summary = $(this.crawler.summarySelector).text();
      post.content = $(this.crawler.contentSelector).html();
      post.thumb = $('[property="og:image"]').attr('content');
      post.source = url;
      post.category = await this.getCategory();
      post.tags = await this.getTags();

      return post;
    } catch (error) {
      console.log('error', error);
      this.batchlog.log(`Response error`);
    }
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

    return (await Property.findByIdAndTypeOrCreate(this.params.category, 'category'))._id;
  }

  async getTags() {
    if (!this.params.tags || !this.params.tags.length) return;
    let tags = [];

    for (let i in this.params.tags) {
      tags.push((await Property.findByIdAndTypeOrCreate(this.params.tags[i], 'tag'))._id);
    }

    return tags;
  }
}
