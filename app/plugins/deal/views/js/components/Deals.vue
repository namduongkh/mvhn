<template>
  <div>
    <div class="text-right" v-if="user">
      <span class="current-point text-primary">{{
        user.point | currency
      }}</span>
    </div>
    <div v-if="deals.length">
      <div class="list-group">
        <a
          href="javascript:void(0)"
          v-for="deal in deals"
          :key="deal._id"
          class="list-group-item"
        >
          <div class="row">
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
              <h3>{{ deal.name }} {{ deal.stop ? "(Kết thúc)" : "" }}</h3>
              <Options :deal="deal._id" :dealObject="deal" />
              <Bets :deal="deal._id" />
              <div>
                <a :href="'#deal' + deal._id" data-toggle="collapse"
                  ><u>Chi tiết</u></a
                >
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
        </a>
      </div>
      <button
        class="btn btn-default btn-block"
        @click.prevent="index()"
        v-if="!pagingService.lastPage"
      >
        <i class="fa fa-refresh"></i> Tải thêm
      </button>
    </div>
    <div v-else class="text-center">Chưa có kèo mới</div>
  </div>
</template>

<script>
import PagingService from "@Plugin/core/views/js/services/paging_service";
import Options from "./Options";
import Bets from "./Bets";
import { mapState } from "vuex";

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
  components: { Options, Bets },
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
.current-point {
  font-size: 2em;
}
</style>
