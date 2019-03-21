<template>
  <div>
    <Listing
      :apiService="apiUrl"
      routeDetail="customdata"
      title="Khung dữ liệu"
      :fields="fieldsDisplay"
      subTitle="Listing"
      :sortOrder="sortOrder"
      :showExport="true"
    >
      <template slot="additionalFilter" slot-scope="props"></template>
      <template slot="additionalButtonHeader" slot-scope="props">
        <br/>
        <button class="btn btn-success" v-on:click="exportCustomdata()">Xuất khung dữ liệu</button>
        <button class="btn btn-success" v-on:click="importCustomdata()">Nhập khung dữ liệu</button>
      </template>
      <template slot="addActions" slot-scope="props"></template>
    </Listing>
    <div id="download-customdata" class="bzPopup mfp-hide bzPopupAnimation" style="max-width: 400px">
      <div class="modal-header">
        <h5 class="modal-title">Xuất khung dữ liệu</h5>
      </div>
      <div class="modal-body">
        <p><a :href="downloadUrl" download="customdatas.json">customdatas.json</a></p>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * For more option please check Listing component
 */
import { mapGetters, mapActions } from "vuex";
import { fieldsDisplay, sortOrder } from "./fields_list_customdata";
import Axios from "axios";
export default {
  name: "ListCustomdata",
  data() {
    return {
      moreParams: {
        any_field: null
      },
      fieldsDisplay,
      sortOrder,
      apiUrl: `${window.settings.services.adminUrl}/customdata`,
      downloadUrl: null
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
    importCustomdata() {
      if (confirm("Bạn chắc chắn chứ?")) {
        Axios.post(
          `${window.settings.services.apiUrl}/customdata/importData`
        ).then(resp => {
          alert(resp.data);
        });
      }
    },
    exportCustomdata() {
      if (confirm("Bạn chắc chắn chứ?")) {
        Axios.post(
          `${window.settings.services.apiUrl}/customdata/exportData`
        ).then(resp => {
          alert(resp.data.message);
          // this.downloadUrl = resp.data.url;
          // jQuery.magnificPopup.open({
          //   items: {
          //     src: $("#download-customdata"), // can be a HTML string, jQuery object, or CSS selector
          //     type: "inline"
          //   }
          // });
        });
      }
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
    "moreParams.any_field"(any_field) {
      this.setParams({ any_field });
      this.reloadTable();
    },
    onResetParams(val) {
      if (val) {
        this.moreParams.any_field = null;
      }
      this.reloadTable();
    }
  }
};
</script>
<style lang="scss" scoped></style>
