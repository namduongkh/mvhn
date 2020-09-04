'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String
  },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation'
  },
  ready: {
    type: Boolean,
    default: false
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'sockets'
});

Schema.statics.findOrCreateByUserId = async (userId) => {
  const Stranger = mongoose.model('Stranger');

  let stranger = await Stranger.findOne({ user: userId });

  if (!stranger) {
    stranger = new Stranger({
      user: userId,
    });

    await stranger.save();
  }

  return stranger;
}

Schema.statics.findReadyStranger = async (strangerId) => {
  const Stranger = mongoose.model('Stranger');
  return await Stranger.findOne({
    _id: { $ne: strangerId },
    ready: true,
    $or: [{
      conversation: null
    }, {
      conversation: undefined
    }]
  });
}

Schema.statics.createConversation = async (strangers) => {
  const Stranger = mongoose.model('Stranger');
  const Conversation = mongoose.model('Conversation');

  let userIds = strangers.map(s => s.user);
  let conversation = Conversation.findOrCreateByUserIds(userIds);

  await Stranger.updateMany({ _id: { $in: strangers.map(s => s._id) } }, {
    conversation: conversation._id
  });

  return conversation;
}

Schema.methods.setReady = async function (ready) {
  if (this.ready != ready) {
    this.ready = ready;
    await this.save();
  }

  if (!ready && this.conversation) {
    this.conversation = null;
    await this.save();
  }

  return this;
}

module.exports = mongoose.model('Stranger', Schema);
