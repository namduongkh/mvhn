'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
import Slug from "slug";
import _ from "lodash";
import vm from "vm";

var Schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  slug: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  code: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  variables: {
    type: Object
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'scripts'
});

Schema.pre('validate', async function (next) {
  if (!this.slug && this.name) {
    this.slug = await generateSlug(this.name);
  }

  return next();
});

async function generateSlug(name) {
  const Script = mongoose.model('Script');
  let slug = Slug(name).toLowerCase();
  if (await Script.exists({ slug })) {
    slug += '-' + Date.now();
  }
  return slug;
}

Schema.methods.run = async function (context = {}) {
  try {
    const vmScript = new vm.Script(this.code);
    const requireConst = typeof __non_webpack_require__ != 'undefined' ? __non_webpack_require__ : require;

    context = _.merge(context, {
      require: requireConst,
      console,
      variables: this.variables || {},
      updateVariables: this.updateVariables.bind(this),
      ...global
    });

    return vmScript.runInContext(vm.createContext(context)) || null;
  } catch (error) {
    console.log('Script error:', error);
  }
  return null;
};

Schema.methods.updateVariables = async function (data) {
  this.variables = data;
  await this.save();
  return this.variables;
};

module.exports = mongoose.model('Script', Schema);
