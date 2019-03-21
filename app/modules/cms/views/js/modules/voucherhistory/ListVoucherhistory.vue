<template>
  <Listing
    :apiService="apiUrl"
    routeDetail="voucherhistory"
    title="Lịch sử đổi quà"
    :fields="fieldsDisplay"
    subTitle="Listing"
    :sortOrder="sortOrder"
    :showExport="true"
  >
    <template slot="additionalFilter" slot-scope="props">
      <div class="col-sm-2">
        <label for="from_date">Từ ngày</label>
        <datepicker
          language="vi"
          format="dd/MM/yyyy"
          :monday-first="true"
          placeholder="Chọn"
          input-class="form-control"
          id="from_date"
          v-model="moreParams.from_date"
          name="from_date"
        ></datepicker>
      </div>
      <div class="col-sm-2">
        <label for="to_date">Đến ngày</label>
        <datepicker
          language="vi"
          format="dd/MM/yyyy"
          :monday-first="true"
          placeholder="Chọn"
          input-class="form-control"
          id="to_date"
          v-model="moreParams.to_date"
          name="to_date"
        ></datepicker>
      </div>
    </template>
    <template slot="addActions" slot-scope="props">
      <button
        :disabled="props.props.rowData.received"
        @click="confirmReceived(props.props.rowData)"
        type="button"
        class="btn btn-inline btn-secondary-outline"
      >
        <i class="fa fa-check"></i> Đã nhận quà
      </button>
    </template>
  </Listing>
</template>
<script>
/**
 * For more option please check Listing component
 */
import Axios from "axios";
import { mapGetters, mapActions } from "vuex";
import { fieldsDisplay, sortOrder } from "./fields_list_voucherhistory";
export default {
  name: "ListVoucherhistory",
  data() {
    return {
      moreParams: {
        from_date: null,
        to_date: null
      },
      fieldsDisplay,
      sortOrder,
      apiUrl: `${window.settings.services.adminUrl}/voucherhistory`
    };
  },
  computed: {
    ...mapGetters(["filterData", "onResetParams"])
  },
  methods: {
    ...mapActions(["openConfirm", "setParams", "reloadTable"]),
    goto(router) {
      this.$store.dispatch("goto", router);
    },
    confirmReceived(history) {
      if (!confirm("Bạn có chắc chắn không?")) {
        return;
      }
      Axios.put(
        `${window.settings.services.adminUrl}/voucherhistory/confirmReceived`,
        {
          id: history._id
        },
        {
          withCredentials: true
        }
      ).then(data => {
        if (data.status) {
          history.received = true;
          this.reloadTable();
        }
      });
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
    "moreParams.from_date"(val) {
      this.setParams({ from_date: val });
      if (this.moreParams.from_date && this.moreParams.to_date) {
        this.reloadTable();
      }
    },
    "moreParams.to_date"(val) {
      this.setParams({ to_date: val });
      if (this.moreParams.from_date && this.moreParams.to_date) {
        this.reloadTable();
      }
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
