<template>
  <Listing
    :apiService="cmsUrl"
    title="Payments"
    :fields="fieldsDisplay"
    subTitle="Listing"
    :sortOrder="sortOrder"
    :disabledActions="[]"
  >
    <template slot="additionalFilter" slot-scope="props"></template>
    <template slot="addActions" slot-scope="props">
      <button
        class="btn btn-inline btn-secondary-outline"
        type="button"
        data-toggle="tooltip"
        title="Approve"
        @click="approve(props.props.rowData, props.props.rowIndex)"
      >
        <i class="fa fa-check"></i>
      </button>
    </template>
  </Listing>
</template>
<script>
/**
 * For more option please check Listing component
 */
import { mapGetters, mapActions } from "vuex";
import { fieldsDisplay, sortOrder } from "./fields";
import ResourcesService from "@general/resources_service";

export default {
  name: "ListPayment",
  data() {
    return {
      moreParams: {},
      fieldsDisplay,
      sortOrder,
      cmsUrl: `${CMS_URL}/payments`,
    };
  },
  computed: {
    ...mapGetters(["filterData", "onResetParams"]),
  },
  methods: {
    ...mapActions(["openConfirm", "setParams", "reloadTable"]),
    goto(router) {
      this.$store.dispatch("goto", router);
    },
    approve(record, index) {
      let service = new ResourcesService(this.cmsUrl);
      service.member(`${record._id}/approve`, "POST").then((resp) => {
        record.paymentStatus = resp.data.data.paymentStatus;
        $(`[item-index="${index}"] .payment-status`).text(
          resp.data.data.paymentStatus
        );
        this.$notify(resp.data.message, { type: "success" });
      });
    },
  },
  created() {
    for (let prop in this.moreParams) {
      if (this.$route.query.hasOwnProperty(prop) && this.$route.query[prop]) {
        this.moreParams[prop] = this.$route.query[prop];
      }
    }
  },
  watch: {
    "moreParams.fieldName"(fieldName) {
      this.setParams({ fieldName });
      this.reloadTable();
    },
    onResetParams(val) {
      if (val) {
        this.moreParams.fieldName = null;
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
