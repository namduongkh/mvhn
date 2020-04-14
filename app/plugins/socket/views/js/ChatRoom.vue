<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <ul class="chat-box">
        <li v-for="(msg, i) in messages" :key="i">
          <strong v-text="msg.name + ':'"></strong>
          <span v-text="msg.message"></span>
        </li>
      </ul>
    </div>
    <div class="panel-footer">
      <form @submit="send">
        <div class="row">
          <div class="col-sm-3">
            <input type="text" class="form-control" v-model="name" placeholder="Name" />
          </div>
          <div class="col-sm-7">
            <input type="text" class="form-control" v-model="message" placeholder="Message" />
          </div>
          <div class="col-sm-2">
            <button class="btn btn-success btn-block" type="submit">Send</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import SocketClientHandler from "./services/socket_client_handler";

export default {
  name: "ChatRoom",
  data() {
    return {
      handler: SocketClientHandler.getInstance(),
      messages: [],
      room: null,
      name: null,
      message: null
    };
  },
  methods: {
    send(evt) {
      evt.preventDefault();

      if (!this.room || !this.name || !this.message) return;

      this.room.emit(
        "send",
        {
          name: this.name,
          message: this.message
        },
        () => {
          this.message = null;
        }
      );
    }
  },
  created() {
    this.handler.join("chat", room => {
      this.room = room;
      this.room.on("new", msg => {
        this.messages.push(msg);
      });
    });
  }
};
</script>

<style>
.chat-box {
  height: calc(90vh - 200px);
  overflow-y: auto;
}
</style>
