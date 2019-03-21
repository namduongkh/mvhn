<template>
    <Listing
            :apiService="apiUrl"
            routeDetail="review"
            title="Cảm nhận"
            :fields="fieldsDisplay"
            subTitle="Danh sách"
            :sortOrder="sortOrder"
            :showExport="true"
            :disabledNew="true"
            :hideColumns="['status']"
    >
        <template slot="addActions" slot-scope="props">
          <button type="button" class="btn btn-inline btn-secondary-outline" @click="approved(props.props.rowData, true)"><span class="fa fa-check"></span> Duyệt</button>
        </template>
        <template slot="additionalFilter" slot-scope="props">
            <div class="col-sm-3">
              <div>
                <label>
                  Trạng thái duyệt:
                  <select name="verify_status" v-model="moreParams.verify_status" class="form-control">
                    <option :value="0">Chưa duyệt</option>
                    <option :value="1">Đã duyệt</option>
                  </select>
                </label>
              </div>
            </div>
        </template>
    </Listing>
</template>
<script>
import Axios from "axios";
import { mapGetters, mapActions } from "vuex";
import { fieldsDisplay, sortOrder } from "./fields";
export default {
  name: "ListReview",
  data() {
    return {
      moreParams: {
        verify_status: null
      },
      fieldsDisplay,
      sortOrder,
      apiUrl: `${window.settings.services.adminUrl}/review`,
      categories: []
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
    approved(record, status) {
      if (record.verify_status) {
        return;
      }
      if (!confirm("Bạn chắc chứ?")) return;
      Axios.post(
        `${window.settings.services.apiUrl}/review/approved/${record._id}`,
        {
          approved: status
        }
      ).then(resp => {
        record.verify_status = true;
        this.reloadTable();
      });
    }
  },
  created: function() {
    let that = this;
    for (let prop in this.moreParams) {
      if (this.$route.query.hasOwnProperty(prop) && this.$route.query[prop]) {
        this.moreParams[prop] = this.$route.query[prop];
      }
    }
  },
  watch: {
    "moreParams.verify_status"(verify_status) {
      this.setParams({ verify_status });
      this.reloadTable();
    },
    onResetParams() {
      this.moreParams = {};
    }
  }
};
</script>