<template>
  <div class="chat-box-wrapper">
    <div class="chat-box__header">
      <h1 v-if="title">{{ title }}</h1>
      <slot name="actions" />
    </div>
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
    <div class="chat-sender-wrapper">
      <div class="chat-sender">
        <input
          type="text"
          class="form-control"
          v-model="message"
          placeholder="Lời muốn nói..."
          @keydown.enter="send"
          tabindex="1"
        />
        <a href="javascript:void(0)" @click="send" class="chat-sender__submit">
          <i class="fa fa-send"></i>
        </a>
      </div>
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
        .then(() => {});

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
    },
    index() {
      this.messageService.index().then(({ data }) => {});
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

    $(window).on("resize", function () {
      CommonJS.scrollToBottomElement(".chat-box");
    });
  },
};
</script>

<style>
.navigator {
  display: none;
}
</style>
