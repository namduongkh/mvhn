<template>
  <Listing
    :apiService="apiUrl"
    routeDetail="voucher"
    title="Voucher"
    :fields="fieldsDisplay"
    subTitle="Listing"
    :sortOrder="sortOrder"
    :showExport="true"
  >
    <template slot="additionalFilter" slot-scope="props">
      <div class="col-sm-3">
        <div>
          <label>
            Nổi bật:
            <select name="featured" v-model="moreParams.featured" class="form-control" v-html="featured_options"></select>
          </label>
        </div>
      </div>
      <div class="col-sm-3">
        <div>
          <label>
            Vị trí trên trang chủ:
            <select name="position" v-model="moreParams.position" class="form-control" v-html="position_options"></select>
          </label>
        </div>
      </div>
    </template>
    <template slot="addActions" slot-scope="props"></template>
  </Listing>
</template>
<script>
/**
 * For more option please check Listing component
 */
import { mapGetters, mapActions } from "vuex";
import { fieldsDisplay, sortOrder } from "./fields_list_voucher";
import VoucherHelper from "./voucher.helper";

export default {
  name: "ListVoucher",
  data() {
    return {
      moreParams: {
        featured: null,
        position: null
      },
      fieldsDisplay,
      sortOrder,
      apiUrl: `${window.settings.services.adminUrl}/voucher`,
      featured_options: VoucherHelper.options_for_select(),
      position_options: VoucherHelper.position_options()
    };
  },
  computed: {
    ...mapGetters(["filterData", "onResetParams"])
  },
  methods: {
    ...mapActions(["openConfirm", "setParams", "reloadTable"]),
    goto(router) {
      this.$store.dispatch("goto", router);
    }
  },
  created() {
    for (let prop in this.moreParams) {
      if (this.$route.query.hasOwnProperty(prop) && this.$route.query[prop]) {
        this.moreParams[prop] = this.$route.query[prop];
      }
    }
  },
  watch: {
    "moreParams.featured"(featured) {
      this.setParams({ featured });
      this.reloadTable();
    },
    "moreParams.position"(position) {
      this.setParams({ position });
      this.reloadTable();
    },
    onResetParams(val) {
      if (val) {
        this.moreParams = {};
      }
      this.reloadTable();
    }
  }
};
</script>
<style lang="scss" scoped></style>
