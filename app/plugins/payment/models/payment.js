'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  amount: {
    type: Number
  },
  content: {
    type: String
  },
  type: {
    type: String,
    enum: ['payment', 'refund'],
    default: 'payment'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending'
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'payments'
});

Schema.methods = {
  approve: async function () {
    if (this.paymentStatus == 'approved') return;

    const User = mongoose.model('User');
    let user = await User.findById(this.user);
    try {
      await user.changePoint(this.amount, this.content);

      this.paymentStatus = 'approved';
      await this.save();
    } catch (error) { }
  }
}

module.exports = mongoose.model('Payment', Schema);
