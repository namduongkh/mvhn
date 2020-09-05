import Vue from "vue";
import ChatRoom from "./ChatRoom";
import Conversations from "./Conversations";
import StrangerChatBox from "./StrangerChatBox";
import VuexConfig from "@/core/views/vuex/vuex_config"

if ($('#chat-room') && $('#chat-room').length) {
  new Vue({
    el: '#chat-room',
    components: {
      ChatRoom
    },
    store: new VuexConfig(['user']).toVuexStore(),
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
    store: new VuexConfig(['user']).toVuexStore(),
    template: "<StrangerChatBox />",
    created() { }
  });
}
