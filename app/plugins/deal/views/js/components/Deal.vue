<template>
  <div class="row" v-if="deal._id">
    <div class="col-xs-2">
      <ImageAsAvatar
        :src="
          (deal.user && deal.user.avatar) ||
          '/assets/img/favicon/favicon-96x96.png'
        "
        :circle="true"
      />
    </div>
    <div class="col-xs-10">
      <h3 v-if="!hideName">
        <a :href="'/deals/' + deal._id"
          >{{ deal.name }} {{ deal.stop ? "(Kết thúc)" : "" }}</a
        >
      </h3>
      <Options :deal="deal._id" :dealObject="deal" />
      <Bets :deal="deal._id" />
      <div>
        <a :href="'#deal' + deal._id" data-toggle="collapse"><u>Chi tiết</u></a>
        <div
          :id="'deal' + deal._id"
          class="collapse"
          v-html="deal.description"
        ></div>
      </div>
      <div>
        <small>Nhà cái: {{ deal.user.name }}</small>
      </div>
      <div>
        <small>{{ deal.createdAt | calendar }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import Options from "./Options";
import Bets from "./Bets";

export default {
  name: "Deal",
  props: {
    deal: { type: Object, default: () => {} },
    hideName: {
      type: Boolean,
      default: false,
    },
  },
  components: { Options, Bets },
};
</script>

<style>
</style>
