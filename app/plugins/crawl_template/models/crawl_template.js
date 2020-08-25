'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
import _ from 'lodash';
import cheerio from 'cheerio';
import axios from 'axios';

var Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  urlPattern: {
    type: String,
    required: true
  },
  crawler: {
    type: Schema.Types.ObjectId,
    ref: 'Crawler'
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Property'
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Property'
  }],
  numberOfUrls: {
    type: Number,
    default: 1
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'crawl_templates'
});

Schema.methods.fetchUrl = async function () {
  try {
    let { data } = await axios.get(this.url);
    const $ = cheerio.load(data);

    let urlRegex = new RegExp(this.urlPattern, 'gi');
    let ignoreRegex = new RegExp('#.+$', 'gi');

    let links = $('body a').filter(function () {
      let href = $(this).attr('href');
      return urlRegex.test(href) && !ignoreRegex.test(href);
    }).map(function () {
      return $(this).attr('href');
    }).get();

    return _.uniq(links).slice(0, this.numberOfUrls);
  } catch (error) {
    console.log(error);
    return [];
  }
}

module.exports = mongoose.model('CrawlTemplate', Schema);
