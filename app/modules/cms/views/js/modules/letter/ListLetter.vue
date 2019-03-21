<template>
  <Listing
    :apiService="apiUrl"
    routeDetail="letter"
    title="Thư của mẹ"
    :fields="fieldsDisplay"
    subTitle="Listing"
    :sortOrder="sortOrder"
    :showExport="true"
    :disabledNew="true"
  >
    <template slot="additionalFilter" slot-scope="props">
      <div class="col-sm-3">
        <div>
          <label>
            Trạng thái duyệt:
            <select name="publish_status" v-model="moreParams.publish_status" class="form-control" v-html="publish_status_options"></select>
          </label>
        </div>
      </div>
      <div class="col-sm-3">
        <div>
          <label>
            Thư hay:
            <select name="is_featured" v-model="moreParams.is_featured" class="form-control">
              <option value="0">Không</option>
              <option value="1">Có</option>
            </select>
          </label>
        </div>
      </div>
    </template>
    <template slot="addActions" slot-scope="props">
      <button :disabled="[1,3].includes(props.props.rowData.publish_status)" type="button" class="btn btn-inline btn-secondary-outline" @click="approved(props.props.rowData, true)"><span class="fa fa-check"></span> Duyệt</button>
      <button :disabled="[1,3].includes(props.props.rowData.publish_status)" type="button" class="btn btn-inline btn-secondary-outline" @click="rejected(props.props.rowData, true)"><span class="fa fa-remove"></span> Từ chối</button>
    </template>
  </Listing>
</template>
<script>
/**
 * For more option please check Listing component
 */
import { mapGetters, mapActions } from "vuex";
import { fieldsDisplay, sortOrder } from "./fields_list_letter";
import Axios from "axios";
import LetterHelper from "./letter.helper";

export default {
  name: "ListLetter",
  data() {
    return {
      moreParams: {},
      fieldsDisplay,
      sortOrder,
      apiUrl: `${window.settings.services.adminUrl}/letter`,
      publish_status_options: LetterHelper.options_for_select()
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
      if ([1, 3].includes(record.publish_status)) {
        return;
      }
      if (!confirm("Bạn chắc chứ?")) return;
      Axios.post(
        `${window.settings.services.apiUrl}/letter/approved/${record._id}`,
        {
          approved: status
        }
      ).then(resp => {
        record.publish_status = 1;
        this.reloadTable();
      });
    },
    rejected(record, status) {
      if ([1, 3].includes(record.publish_status)) {
        return;
      }
      if (!confirm("Bạn chắc chứ?")) return;
      Axios.post(
        `${window.settings.services.apiUrl}/letter/rejected/${record._id}`,
        {
          rejected: status
        }
      ).then(resp => {
        record.publish_status = 3;
        this.reloadTable();
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
    "moreParams.publish_status"(publish_status) {
      this.setParams({ publish_status });
      this.reloadTable();
    },
    "moreParams.is_featured"(is_featured) {
      this.setParams({ is_featured });
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
