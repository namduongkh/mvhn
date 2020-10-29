<template>
  <div>
    <div class="deal-options">
      <a
        class="deal-options__item"
        :class="{ active: newBet.option == option._id }"
        v-for="option in options"
        :key="option._id"
        @click="select(option._id)"
      >
        <div>
          <strong>{{ option.name }}</strong>
        </div>
        <div>
          <small>Tỉ lệ: {{ option.rate }}</small>
        </div>
      </a>
    </div>

    <div class="form-inline text-right" v-if="user">
      <div class="form-group">
        <small
          >({{ dealObject.minBet | currency }} -
          {{ dealObject.maxBet | currency }})</small
        >
        <input
          type="number"
          class="form-control"
          id="bet_amount"
          placeholder="Giá trị cược"
          v-model="newBet.amount"
          data-vv-name="amount"
          v-validate="
            `required|min_value:${dealObject.minBet}|max_value:${dealObject.maxBet}`
          "
          step="1000"
        />
      </div>
      <a href="javascript:void(0)" class="btn btn-success" @click="bet()"
        ><i class="fa fa-check"></i> Múc ngay</a
      >
    </div>

    <div class="text-right" v-else>
      <small data-toggle="modal" data-target="#auth-modal"
        >Đăng nhập để đặt cược</small
      >
    </div>
  </div>
</template>

<script>
import PagingService from "@Plugin/core/views/js/services/paging_service";
import { mapState } from "vuex";
import ResourceService from "@CmsCore/vue/general/resources_service";

export default {
  name: "Options",
  props: {
    deal: { type: String },
    dealObject: { type: Object, default: () => {} },
  },
  data() {
    return {
      options: [],
      pagingService: new PagingService(
        `${window.settings.services.webUrl}/deals/${this.deal}/deal_options`,
        20
      ),
      newBet: {
        option: null,
        deal: this.deal,
      },
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  methods: {
    index() {
      this.pagingService.next().then(({ data }) => {
        this.options = data;
      });
    },
    select(optionId) {
      this.newBet.option = optionId;
    },
    bet() {
      this.$validator.validateAll().then((res) => {
        if (!res) return;

        if (!this.newBet.option)
          return toastr.warning("Vui lòng chọn 1 tùy chọn");
        if (!this.newBet.amount)
          return toastr.warning("Vui lòng nhập giá trị cược");

        let service = new ResourceService(
          `${window.settings.services.webUrl}/deal_options/${this.newBet.option}/bets`
        );

        service
          .create({ ...this.newBet, user: this.user._id })
          .then(({ data }) => {
            this.$store.dispatch("user/fetchUser", { force: true });
            toastr.success("Đặt cược thành công");
          })
          .catch((err) => {
            toastr.error(err.response.data.message);
          });
      });
    },
  },
  created() {
    this.index();
  },
};
</script>

<style>
.deal-options {
  display: flex;
}
.deal-options__item {
  padding: 0.5em 0.8em;
  box-shadow: 0 0 0 1px #1b99cf;
  border-radius: 5px;
  margin: 0 0.5em 0.5em 0;
  background: #fff;
  transition: all 100ms linear;
}
.deal-options__item.active {
  background: #1b99cf;
  color: #fff;
}
</style>
