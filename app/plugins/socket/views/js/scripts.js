import Vue from "vue";
import ChatRoom from "./ChatRoom";

if ($('#chat-room') && $('#chat-room').length) {
  new Vue({
    el: '#chat-room',
    components: {
      ChatRoom
    },
    template: "<ChatRoom />",
    created() { }
  });
}
