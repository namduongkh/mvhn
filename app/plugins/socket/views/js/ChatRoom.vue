<template>
  <div class="panel panel-default chat-box-wrapper">
    <div class="panel-body">
      <h1 v-if="title">{{ title }}</h1>
      <ul class="chat-box">
        <li v-for="(msg, i) in messages" :key="i">
          <div
            class="message"
            :class="{'your-message': msg.userId && msg.userId == user._id, 'their-message': !(msg.userId && msg.userId == user._id)}"
          >
            <div class="message__content">{{ msg.message }}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="panel-footer">
      <form @submit="send">
        <div class="row">
          <div class="col-xs-10">
            <input type="text" class="form-control" v-model="message" placeholder="Lời muốn nói..." />
          </div>
          <div class="col-xs-2">
            <button class="btn btn-success btn-block" type="submit">Gửi</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import SocketClientHandler from "./services/socket_client_handler";
import MessageService from "./services/message_service";
import { mapState } from "vuex";

export default {
  name: "ChatRoom",
  props: {
    conversationId: {
      type: String,
    },
    userName: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      handler: new SocketClientHandler(),
      messages: [],
      room: null,
      message: null,
      messageService: null,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  methods: {
    send(evt) {
      evt.preventDefault();

      if (!this.room || !this.userName || !this.message) return;

      this.messageService
        .create({
          user: this.user._id,
          conversation: this.conversationId,
          content: this.message,
        })
        .then(() => {
          this.room.emit(
            "send",
            {
              userId: this.user._id,
              name: this.userName,
              message: this.message,
            },
            () => {
              this.message = null;
            }
          );
          CommonJS.scrollToBottomElement(".chat-box");
        });
    },
  },
  created() {
    let roomname = "chat";

    if (this.conversationId) {
      roomname = JSON.stringify({ type: "chat", id: this.conversationId });
    }

    this.handler.join(roomname, (room) => {
      this.room = room;
      this.room.on("new", (msg) => {
        this.messages.push(msg);
        CommonJS.scrollToBottomElement(".chat-box");
      });
    });

    this.messageService = MessageService.getInstance(this.conversationId);
  },
};
</script>

<style>
.chat-box {
  height: calc(90vh - 200px);
  overflow-y: auto;
}
.chat-box-wrapper {
  margin: 0 auto;
  width: 100%;
}
</style>
