<template>
  <div>
    <div class="stranger-chatbox" v-if="!conversationId">
      <div class="panel-body">
        <div class="text-center">
          <button
            v-if="!search.start"
            class="btn btn-primary btn-lg"
            @click.prevent="create()"
          >Bắt đầu</button>
          <h6>{{ search.message }}</h6>
        </div>
      </div>
    </div>
    <div v-else class="stranger-chatbox">
      <ChatRoom
        :conversationId="conversationId"
        :userName="'Người lạ'"
        :title="'Chat cùng người lạ'"
      />
    </div>
  </div>
</template>

<script>
import StrangerService from "./services/stranger_service";
import ChatRoom from "./ChatRoom";
import SocketClientHandler from "./services/socket_client_handler";

export default {
  name: "StrangerChatBox",
  data() {
    return {
      handler: SocketClientHandler.getInstance(),
      conversationId: null,
      stranger: null,
      message: null,
      search: { message: null, start: false },
      userId: window.user._id,
    };
  },
  methods: {
    index(message = null) {
      this.conversationId = null;
      this.search.start = false;
      this.search.message = message;

      StrangerService.getInstance()
        .index()
        .then(({ data }) => {
          this.stranger = data;
        });
    },
    create() {
      let self = this;
      this.search.start = true;

      StrangerService.getInstance()
        .create()
        .then(({ data }) => {
          let { status, message } = data;

          self.search.start = !status;
          self.search.message = message;
          self.conversationId = data.data;

          if (self.search.start) {
            setTimeout(() => {
              self.create();
            }, 500);
          }
        });
    },
  },
  created() {
    this.index();

    let roomname = "stranger";

    this.handler.join(roomname, (room) => {
      this.room = room;

      this.room.on("exit", () => {
        this.index(
          this.conversationId ? "Người lạ đã kết thúc cuộc trò chuyện" : null
        );
      });
    });
  },
  components: { ChatRoom },
};
</script>

<style>
.stranger-chatbox {
  height: calc(90vh);
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
