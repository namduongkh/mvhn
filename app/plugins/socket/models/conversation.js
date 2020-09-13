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

Schema.statics.findOrCreateNotificationByUserId = async (userId) => {
  const Conversation = mongoose.model('Conversation');
  let conversation = await Conversation.findOne({
    name: `notification-${userId}`,
    users: { $all: [userId] }
  });

  if (!conversation) {
    conversation = new Conversation({
      users: [userId],
      name: `notification-${userId}`
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

Schema.methods.messages = async function (conditions = {}, options = {}) {
  const Message = mongoose.model('Message');

  options = Object.assign({
    perPage: 20,
    page: 1
  }, options);

  let messages = Message.find(Object.assign(conditions, {
    conversation: this._id
  })).sort('-createdAt')
    .skip((options.page - 1) * options.perPage)
    .limit(options.perPage);

  return await messages;
}

Schema.methods.unseenNumber = async function (userId) {
  const Message = mongoose.model('Message');

  let options = {
    conversation: this._id,
    seen: {
      $ne: userId,
    }
  }

  return await Message.count(options);
}

module.exports = mongoose.model('Conversation', Schema);
