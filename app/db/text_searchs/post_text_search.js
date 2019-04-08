'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const Post = mongoose.model('Post');

let exceptTextFields = [];

let textFields = ["_id"];

for (let i in Post.schema.obj) {
  if (!exceptTextFields.includes(i) && String == Post.schema.obj[i].type) {
    textFields.push(i);
  }
}

var PostSchema = Post.schema; 

var PostTextSearchSchema = new Schema({
  text: {
    type: String,
    trim: true,
    require: true,
    index: true
  },
  object: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
}, {
    timestamps: true,
    collection: 'post_text_searchs'
  });

async function indexObject(doc) {
  try {
    const TextSearch = mongoose.model('PostTextSearch');
    let object = await TextSearch.findOne({ object: doc._id }) || new TextSearch({ object: doc._id });
    let text = '';
    textFields.forEach((field) => {
      if (!doc[field]) return;
      text += (doc[field] + ' ');
    });

    object.text = text;
    console.log('Post index', doc._id);

    return await object.save();
  } catch (error) {
    console.log('Post index error: ', error);
  }
}

PostTextSearchSchema.statics.reindex = async function () {
  return new Promise(async (rs, rj) => {
    try {
      const Post = mongoose.model('Post');
      let count = await Post.count().lean();
      let limit = 5000;
      let skip = [];

      for (let i = 0; i < count; i += limit) {
        let list = await Post.find().skip(i).limit(limit).lean();

        for (let i in list) {
          await indexObject(list[i]);
        }
      }

      rs();
    } catch (error) {
      console.log('Reindex error', error);
      rs();
    }
  });
}

PostSchema.post('save', async function (doc) {
  await indexObject(doc);
});

PostSchema.post('remove', async function(doc) {
  const TextSearch = mongoose.model('PostTextSearch');
  let object = await TextSearch.findOne({ object: doc._id });
  if (!object) return;
  await object.remove();
});

delete mongoose.connection.models['Post'];

mongoose.model('Post', PostSchema);

module.exports = mongoose.model('PostTextSearch', PostTextSearchSchema);
