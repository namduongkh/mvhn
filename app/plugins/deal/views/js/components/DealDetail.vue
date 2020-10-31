<template>
  <div>
    <div class="text-right" v-if="user">
      <UserPoint />
    </div>
    <Deal :deal="deal" :hideName="true" />
    <ChatInitor
      v-if="user"
      :identifier="'deal_' + dealId"
      :showName="true"
      :userName="user.name"
      :multiple="true"
      placeholder="Tin nhắn..."
      title="Bàn luận"
      height="50vh"
    ></ChatInitor>
  </div>
</template>

<script>
import ResourcesService from "@CmsCore/vue/general/resources_service";
import Deal from "./Deal";
import ChatInitor from "@/socket/views/js/ChatInitor";
import UserPoint from "@/user/views/js/UserPoint";
import { mapState } from "vuex";

export default {
  name: "DealDetail",
  props: {
    dealId: { type: String, required: true },
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  components: { Deal, ChatInitor, UserPoint },
  data() {
    return { deal: {} };
  },
  created() {
    let service = new ResourcesService("/deals");
    service.show(this.dealId).then(({ data }) => {
      this.deal = data;
    });
  },
};
</script>

<style>
</style>
