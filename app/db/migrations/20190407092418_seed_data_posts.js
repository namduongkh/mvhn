import mongoose from 'mongoose';
import _ from 'lodash';

const Post = mongoose.model('Post');
const Property = mongoose.model('Property');

export default class SeedDataPosts {
  static async up() {
    // Do something
    let datas = await this.datas();
    for (let i in datas) {
      let data = datas[i];
      await new Post({
        summary: data.title,
        content: data.title,
        category: (await this.category())._id,
        ...data
      }).save();
    }
  }

  static async down() {
    // Revert do something
    let datas = await this.datas();
    for (let i in datas) {
      let data = datas[i];
      await Post.findOne({
        title: data.title
      }).remove()
    }
  }

  static async datas() {
    let datas = [];

    for (let i = 0; i < 100; i++) {
      datas.push({
        title: 'Chrome Extension Protects Against JavaScript-Based CPU Side-Channel Attacks ' + (i + 1),
        thumb: 'assets/webmag/img/post-1.jpg'
      });
    }

    return datas;
  }

  static async category() {
    let count = Property.count({ type: 'caregory', status: 1 }).lean();
    return (await Property.find().skip(_.random(0, count - 1)).limit(1))[0];
  }
}