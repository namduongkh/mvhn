import mongoose from 'mongoose';
import _ from 'lodash';

const Post = mongoose.model('Post');
const PostTextSearch = mongoose.model('PostTextSearch');
const Property = mongoose.model('Property');

export default class SeedDataPosts {
  async up() {
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

  async down() {
    // Revert do something
    let datas = await this.datas();
    for (let i in datas) {
      let data = datas[i];
      let post = await Post.findOne({
        title: data.title
      });
      if (!post) continue;
      let index = await PostTextSearch.findOne({ object: post._id });
      await post.remove();
      await index.remove();
    }
  }

  async datas() {
    let datas = [];

    for (let i = 1; i < 100; i++) {
      datas.push({
        title: 'Chrome Extension Protects Against JavaScript-Based CPU Side-Channel Attacks ' + (i + 1),
        thumb: 'assets/webmag/img/post-1.jpg'
      });
    }

    return datas;
  }

  async category() {
    let count = Property.count({ type: 'category', status: 1 }).lean();
    return (await Property.find({ type: 'category', status: 1 }).skip(_.random(0, count - 1)).limit(1))[0];
  }
}