import mongoose from 'mongoose';

const Page = mongoose.model('Page');

export default class AddDefaultPages {
  async up() {
    let data = [{
      name: 'Ads',
      slug: 'ads'
    }, {
      name: 'Contact',
      slug: 'contact'
    }, {
      name: 'Policy',
      slug: 'policy'
    }, {
      name: 'About Us',
      slug: 'about-us'
    }];

    for (let i in data) {
      let page = new Page({
        ...data[i],
        content: data[i].name,
        summary: data[i].name
      });

      await page.save();
    }
  }

  async down() {
    // Revert do something
  }
}
