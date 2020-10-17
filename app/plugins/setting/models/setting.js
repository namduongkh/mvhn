'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  _ = require('lodash');

const POST_TYPE_ADDITIONAL_CONFIG = [{
  name: "Name",
  key: "name",
  type: "text",
  default: function (type) { return `${_.upperFirst(type)}` }
}, {
  name: "Icon class",
  key: "iconClass",
  type: "text",
}, {
  name: "Color class",
  key: "colorClass",
  type: "text",
}, {
  name: "Custom Config",
  key: "customConfig",
  type: "jsoneditor",
}];

var Schema = new Schema({
  key: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  status: {
    type: Number,
    default: 1
  },
  isSystem: {
    type: Boolean,
    default: false
  },
  fields: [],
  groups: [],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  collection: 'settings',
  timestamps: true,
  versionKey: false,
  strict: false
});

function convertData(data) {
  if (data.constructor == {}.constructor) {
    for (let i in data) {
      if (i == "_id") {
        break;
      }
      data[i] = convertData(data[i]);
    }
  } else {
    try {
      data = JSON.parse(data);
    } catch (error) { }
  }
  return data;
}

Schema.pre('save', function (next) {
  const Setting = mongoose.model('Setting');

  if (!this.key) {
    let key = this._id;
    if (this.name) {
      key = this.name + "_" + key;
    }
    this.key = slug(key);
  }

  Setting.postTypeChecking(this);

  for (let i in this._doc) {
    if (i == "_id") {
      break;
    }
    this._doc[i] = convertData(this._doc[i]);
  }

  next();
});

Schema.statics.postTypeChecking = function (object) {
  if (object.key !== "post_type") return;

  let fieldKeys = object.fields.map(i => i.key);
  if (!fieldKeys.includes('allowedTypes')) {
    object.fields.push({ name: 'Allowed Types', type: 'jsoneditor', key: 'allowedTypes' })
  }

  object.allowedTypes = object.allowedTypes || [];
  if (!object.allowedTypes.includes('post')) object.allowedTypes.push('post')

  object.allowedTypes.forEach((type) => {
    // Check group
    let groupIds = object.groups.map(i => i.id);
    if (!groupIds.includes(type)) {
      object.groups.push({ id: type, name: `${_.upperFirst(type)} setting` });
    }

    // Add some additional config
    POST_TYPE_ADDITIONAL_CONFIG.forEach(config => {
      let keyName = `${type}${_.upperFirst(config.key)}`;
      if (!fieldKeys.includes(keyName)) {
        object.fields.push({
          name: config.name,
          key: keyName,
          type: config.type,
          group: type
        });
        object[keyName] = config.default && config.default(type);
      }
    });


    // Check fields
    let customFieldKey = `${type}CustomFields`;
    if (!fieldKeys.includes(customFieldKey)) {
      object.fields.push({
        key: customFieldKey,
        name: "Custom Fields",
        group: type,
        type: "table",
        columns: [{
          name: "name",
          key: "name",
          type: "text"
        }, {
          name: "key",
          key: "key",
          type: "text"
        }, {
          name: "type",
          key: "type",
          type: "text"
        }, {
          name: "options",
          key: "options",
          type: "text"
        }]
      })
    }
  })

  return object;
}

Schema.statics.SYSTEM_SETTING_KEYS = ['global_setting', 'post_type']
Schema.statics.POST_TYPE_ADDITIONAL_CONFIG = POST_TYPE_ADDITIONAL_CONFIG

module.exports = mongoose.model('Setting', Schema);
