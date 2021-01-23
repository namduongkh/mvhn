<template>
  <div class="card">
    <div class="card-body"></div>
  </div>
</template>

<script>
import ConversationService from "./services/conversation_service";

export default {
  name: "Conversations",
  data() {
    return {
      conversations: [],
    };
  },
  methods: {
    index() {
      this.conversations = ConversationService.getInstance().index();
    },
  },
  created() {
    this.index();
  },
};
</script>

<style>
</style>
