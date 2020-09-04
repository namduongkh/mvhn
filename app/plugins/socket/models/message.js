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

module.exports = mongoose.model('Message', Schema);
