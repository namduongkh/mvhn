<template>
  <div>
    <ChatRoom
      v-if="userName && conversationId"
      :conversationId="conversationId"
      :userName="userName"
      :showName="showName"
      :title="title"
      :placeholder="placeholder"
      :multiple="multiple"
      :height="height"
    />
  </div>
</template>

<script>
import ConversationService from "./services/conversation_service";
import ChatRoom from "./ChatRoom";

export default {
  name: "ChatInitor",
  props: {
    identifier: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
    },
    title: {
      type: String,
    },
    placeholder: {
      type: String,
      default: "Lời muốn nói...",
    },
    showName: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    height: {},
  },
  components: {
    ChatRoom,
  },
  data() {
    return {
      conversationId: null,
    };
  },
  created() {
    ConversationService.getInstance()
      .create({ name: this.identifier })
      .then(({ data }) => {
        this.conversationId = data.data._id;
      });
  },
};
</script>

<style>
</style>
