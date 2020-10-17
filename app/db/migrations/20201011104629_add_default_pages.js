import mongoose from 'mongoose';
import _ from 'lodash';

const Page = mongoose.model('Page');

export default class AddDefaultPages {
  async up() {
    let data = [{
      title: 'Ads',
      slug: 'ads'
    }, {
      title: 'Contact',
      slug: 'contact'
    }, {
      title: 'Policy',
      slug: 'policy'
    }, {
      title: 'About Us',
      slug: 'about-us'
    }];

    for (let i in data) {
      let page = await Page.findOne({ slug: data[i].slug }) || new Page({ slug: data[i].slug });

      page = _.extend(page, {
        ...data[i],
        content: data[i].title,
        summary: data[i].title
      });

      await page.save();
    }
  }

  async down() {
    // Revert do something
  }
}
