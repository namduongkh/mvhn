'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  deal: {
    type: Schema.Types.ObjectId,
    ref: 'Deal'
  },
  option: {
    type: Schema.Types.ObjectId,
    ref: 'DealOption'
  },
  win: {
    type: Boolean
  },
  amount: {
    type: Number
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'bets'
});

Schema.pre('validate', async function (next) {
  const User = mongoose.model('User');
  let user = await User.findById(this.user);

  if (!this.createdAt && user.point < this.amount) {
    return next(new Error('Số điểm không đủ để đặt cược'));
  }

  next();
});

Schema.post('save', async function (doc) {
  const User = mongoose.model('User');
  let user = await User.findById(doc.user);

  if (doc.createdAt == doc.updatedAt) {
    user.changePoint(doc.amount * -1, 'Bet', 'Bet', doc._id)
  }
});

module.exports = mongoose.model('Bet', Schema);
