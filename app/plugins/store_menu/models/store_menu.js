'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store'
  },
  type: {
    type: String,
    enum: [
      'sale',
      'service'
    ],
    default: 'sale'
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'store_menus'
});

Schema.statics.getFromProduct = async function (productId) {
  const Product = mongoose.model('Product');
  const StoreMenu = mongoose.model('StoreMenu');

  let product = await Product.findById(productId).lean();

  let storeMenu = await StoreMenu.findOne({
    product: productId,
    store: product.store
  }) || await (new StoreMenu({
    product: product._id,
    store: product.store
  }));

  storeMenu.name = product.name;
  storeMenu.price = product.price;
  storeMenu.image = product.thumb;
  storeMenu.type = product.type;

  storeMenu.save();

  return storeMenu;
}

module.exports = mongoose.model('StoreMenu', Schema);
