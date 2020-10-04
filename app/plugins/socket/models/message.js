'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation'
  },
  content: {
    type: String
  },
  type: {
    type: String,
    default: 'message'
  },
  seen: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  href: {
    type: String
  },
  icon: {
    type: String
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'sockets'
});

Schema.statics.clearMessagesByConversation = async (conversationId) => {
  const Message = mongoose.model('Message');
  await Message.remove({ conversation: conversationId });
};

Schema.methods.seenBy = async function (userId) {
  if (!this.seen) this.seen = [];
  if (this.seen.indexOf(userId) == -1) {
    this.seen.push(userId);
    await this.save();
  }

  return this;
}

module.exports = mongoose.model('Message', Schema);
