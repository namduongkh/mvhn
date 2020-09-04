<template>
  <div class="panel panel-default chat-box-wrapper">
    <div class="panel-body">
      <h1 v-if="title">{{ title }}</h1>
      <ul class="chat-box">
        <li v-for="(msg, i) in messages" :key="i">
          <strong v-if="msg.userId && msg.userId == userId" v-text="'Bạn:'"></strong>
          <strong v-else v-text="msg.name + ':'"></strong>
          <span v-text="msg.message"></span>
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
      handler: SocketClientHandler.getInstance(),
      messages: [],
      room: null,
      message: null,
      userId: window.user._id,
      messageService: null,
    };
  },
  methods: {
    send(evt) {
      evt.preventDefault();

      if (!this.room || !this.userName || !this.message) return;

      this.messageService
        .create({
          user: window.user._id,
          conversation: this.conversationId,
          content: this.message,
        })
        .then(() => {
          this.room.emit(
            "send",
            {
              userId: window.user._id,
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
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}
</style>
