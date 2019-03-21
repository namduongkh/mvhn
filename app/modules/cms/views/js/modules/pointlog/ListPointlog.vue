<template>
  <Listing
    :apiService="apiUrl"
    routeDetail="pointlog"
    title="Pointlogs"
    :fields="fieldsDisplay"
    subTitle="Listing"
    :sortOrder="sortOrder"
    :showExport="true"
    :hideColumns="['status']"
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
      <div class="col-sm-3">
        <label for="campaign">Campaign</label>
        <select2
          id="campaign"
          v-validate="'required'"
          data-vv-name="Loại sản phẩm"
          name="campaign"
          v-model="moreParams.campaign"
          :ajax="ajaxCampaign"
          placeholder="Chọn..."
        />
      </div>
    </template>
    <template slot="addActions" slot-scope="props">
      <button
        :disabled="!props.props.rowData.campaign"
        class="btn btn-inline btn-info-outline"
        v-on:click="goto({ 
          name: 'edit_campaign', 
          params: { id: (props.props.rowData.campaign && props.props.rowData.campaign._id) || props.props.rowData.campaign }
        })"
      >
        <i class="fa fa-info-circle"></i> Xem campaign
      </button>
    </template>
  </Listing>
</template>
<script>
/**
 * For more option please check Listing component
 */
import { mapGetters, mapActions } from "vuex";
import { fieldsDisplay, sortOrder } from "./fields_list_pointlog";
export default {
  name: "ListPointlog",
  data() {
    return {
      moreParams: {
        from_date: null,
        to_date: null,
        campaign: null
      },
      fieldsDisplay,
      sortOrder,
      apiUrl: `${window.settings.services.adminUrl}/pointlog`,
      ajaxCampaign: {
        url: `${window.settings.services.adminUrl}/campaign/select2`,
        dataType: "json",
        xhrFields: { withCredentials: true },
        cache: true
      }
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
    "moreParams.campaign"(val) {
      this.setParams({ campaign: val });
      setTimeout(() => {
        this.reloadTable();
      }, 250);
    },
    onResetParams(val) {
      if (val) {
        this.moreParams = {};
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
