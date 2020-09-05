'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  name: {
    type: String
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'sockets'
});

Schema.statics.findOrCreateByUserIds = async (userIds) => {
  const Conversation = mongoose.model('Conversation');
  let conversation = await Conversation.findOne({
    users: { $all: userIds }
  });

  if (!conversation) {
    conversation = new Conversation({
      users: userIds,
      name: userIds.join("-")
    });

    await conversation.save();
  }

  return conversation;
}

Schema.post('remove', async (doc) => {
  const Message = mongoose.model('Message');
  Message.clearMessagesByConversation(doc._id);
});

Schema.methods.sendMessage = async function (data) {
  const Message = mongoose.model('Message');
  let message = new Message(Object.assign(data, {
    conversation: this._id
  }));

  return await message.save();
}

module.exports = mongoose.model('Conversation', Schema);
