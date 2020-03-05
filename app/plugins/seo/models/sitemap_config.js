'use strict';

import sm from "sitemap";
import ejs from "ejs";
import fs from "fs";

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  name: {
    type: String,
    require: true
  },
  model: {
    type: String,
    require: true
  },
  slug: {
    type: String,
    require: true
  },
  queryOptions: {
    type: Object
  },
  selectedAttributes: [{
    type: String
  }],
  urlPattern: {
    type: String
  },
  priority: {
    type: Number
  },
  changefreq: {
    type: String
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'sitemap_configs'
});

Schema.methods.generateSitemap = async function (server) {
  const MODEL = mongoose.model(this.model);
  let self = this;

  let data = await MODEL.find(this.queryOptions, this.selectedAttributes.join(' '))
    .sort("-createdAt")
    .limit(5000);

  let sitemap = sm.createSitemap({
    hostname: server.configManager.get('web.context.settings.services.webUrl'),
    cacheTime: 600000,        // 600 sec - cache purge period
    urls: [
      ...data.map(item => {
        let urlData = {};
        for (let i in self.selectedAttributes) {
          urlData[self.selectedAttributes[i]] = item[self.selectedAttributes[i]];
        }

        return {
          url: ejs.render(self.urlPattern, urlData),
          priority: self.priority
        };
      })
    ]
  });

  try {
    await new Promise(function (rs, rj) {
      sitemap.toXML(function (err, xml) {
        if (err) {
          rj(err);
        }
        if (!fs.existsSync(BASE_PATH + `/public/files`)) {
          fs.mkdirSync(BASE_PATH + `/public/files`);
        }
        fs.writeFileSync(BASE_PATH + `/public/files/${self.slug}.xml`, xml);
        return rs();
      });
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = mongoose.model('SitemapConfig', Schema);
