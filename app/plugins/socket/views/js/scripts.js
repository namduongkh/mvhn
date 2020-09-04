import Vue from "vue";
import ChatRoom from "./ChatRoom";
import Conversations from "./Conversations";
import StrangerChatBox from "./StrangerChatBox";

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

if ($('.conversations') && $('.conversations').length) {
  new Vue({
    el: '.conversations',
    components: {
      Conversations
    },
    template: "<Conversations />",
    created() { }
  });
}

if ($('.stranger-chat-box') && $('.stranger-chat-box').length) {
  new Vue({
    el: '.stranger-chat-box',
    components: {
      StrangerChatBox
    },
    template: "<StrangerChatBox />",
    created() { }
  });
}
