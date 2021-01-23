<template>
  <div>
    <div class="stranger-chatbox" v-if="!conversationId">
      <div class="card-body">
        <h1>Chat cùng người lạ</h1>
        <div class="text-center" v-if="user">
          <h6>{{ search.message }}</h6>
          <button v-if="!search.start" class="btn btn-primary btn-lg" @click.prevent="create()">
            <i class="fa fa-send"></i> Tìm người lạ
          </button>
        </div>
        <div v-else class="text-center">
          <h4>Hãy đăng nhập để bắt đầu</h4>
          <button class="btn btn-primary" @click.prevent="create()">
            <i class="fa fa-user"></i> Đăng nhập
          </button>
        </div>
      </div>
    </div>
    <div v-else class="container">
      <ChatRoom
        :conversationId="conversationId"
        :userName="'Người lạ'"
        :title="'Chat cùng người lạ'"
      >
        <template slot="actions">
          <div class="text-right">
            <a href="javascript:void(0)" @click.prevent="end()">
              <i class="fa fa-sign-out"></i> Kết thúc
            </a>
          </div>
        </template>
      </ChatRoom>
    </div>
  </div>
</template>

<script>
import StrangerService from "./services/stranger_service";
import ChatRoom from "./ChatRoom";
import SocketClientHandler from "./services/socket_client_handler";
import { mapState } from "vuex";

export default {
  name: "StrangerChatBox",
  data() {
    return {
      handler: new SocketClientHandler(),
      conversationId: null,
      stranger: null,
      message: null,
      search: { message: null, start: false },
      room: null,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  methods: {
    index(message = null) {
      this.conversationId = null;
      this.search.start = false;
      this.search.message = message;

      if (!this.user) return;

      StrangerService.getInstance()
        .index({ uid: this.user._id })
        .then(({ data }) => {
          this.stranger = data;
        });
    },
    create() {
      if (!this.user) {
        toastr.info("Vui lòng đăng nhập để tiếp tục.");
        return $(".auth-panel__opener").click();
      }

      let self = this;
      this.search.start = true;

      StrangerService.getInstance()
        .create()
        .then(({ data }) => {
          let { status, message } = data;

          self.search.start = !status;
          self.search.message = message;
          self.conversationId = data.data;
          self.listenRoom(self.conversationId);

          if (self.search.start) {
            setTimeout(() => {
              self.create();
            }, 500);
          }
        });
    },
    end() {
      this.room.emit("exit", this.user._id);
    },
    listenRoom(id) {
      if (!id) return;

      let roomname = JSON.stringify({ type: "stranger", id });

      this.handler.join(roomname, (room) => {
        this.room = room;

        this.room.on("exit", (userId) => {
          this.index(
            this.conversationId && userId != this.user._id
              ? "Người lạ đã kết thúc cuộc trò chuyện"
              : null
          );
        });
      });
    },
  },
  created() {},
  components: { ChatRoom },
  watch: {
    user() {
      this.index();
    },
  },
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
