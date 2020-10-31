<template>
  <div>
    <div class="text-right" v-if="user">
      <UserPoint />
    </div>
    <div v-if="deals.length">
      <div class="list-group">
        <a
          href="javascript:void(0)"
          v-for="deal in deals"
          :key="deal._id"
          class="list-group-item"
        >
          <Deal :deal="deal" />
        </a>
      </div>
      <button
        class="btn btn-default btn-block"
        @click.prevent="index()"
        v-if="!pagingService.lastPage"
      >
        <i class="fa fa-spinner"></i> Tải thêm
      </button>
    </div>
    <div v-else class="text-center">Chưa có kèo mới</div>
  </div>
</template>

<script>
import PagingService from "@Plugin/core/views/js/services/paging_service";
import Deal from "./Deal";
import { mapState } from "vuex";
import UserPoint from "@/user/views/js/UserPoint";

export default {
  name: "Deals",
  data() {
    return {
      deals: [],
      pagingService: new PagingService(
        `${window.settings.services.webUrl}/deals`,
        20
      ),
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  components: { Deal, UserPoint },
  methods: {
    index() {
      this.pagingService.next().then(({ data }) => {
        this.deals = data;
      });
    },
  },
  created() {
    this.index();
  },
};
</script>

<style>
</style>
