'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path'),
  _ = require('lodash');

var Schema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  slug: {
    type: String,
    trim: true,
    unique: 'Slug already exists',
    required: true
  },
  meta: {
    type: Object,
    default: {
      landingPage: false,
      hideNavBar: false,
      hideFooter: false
    }
  },
  content: {
    type: String
  },
  thumb: {
    type: String
  },
  template: {
    type: String
  },
  summary: {
    type: String
  },
  status: {
    type: Number,
    default: 1
  },
  setting: {
    type: Schema.Types.ObjectId,
    ref: 'Setting'
  }
}, {
  timestamps: true,
  collection: 'pages'
});

Schema.pre('save', async function (next) {
  if (this.template && !this.setting) await this.linkToSetting();

  return next();
});

Schema.methods.linkToSetting = async function () {
  const Setting = mongoose.model('Setting');

  if (process.env.NODE_ENV !== 'development') {
    var templateData = require(path.resolve(BASE_PATH, 'app', 'plugins', 'page', 'templates', this.template, 'data.js'));
  } else {
    var templateData = require(`@plugins/page/templates/${this.template}/data.js`);
  }

  let setting = new Setting(_.merge({
    key: this._id,
    name: this.title,
    status: 0
  }, (templateData && templateData.default || {})));

  await setting.save();

  this.setting = setting._id;
}

module.exports = mongoose.model('Page', Schema);
