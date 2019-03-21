<template>
    <Listing
            :apiService="apiUrl"
            routeDetail="card"
            title="Tem sản phẩm"
            :fields="fieldsDisplay"
            subTitle="Danh sách"
            :sortOrder="sortOrder"
            :showExport="true"
    >
        <template slot="additionalFilter" slot-scope="props">
            <div class="col-sm-3">
                <div>
                    <label>
                        Đã đổi điểm:
                        <select name="used" v-model="moreParams.used" class="form-control">
                            <option value="true">Đã đổi</option>
                            <option value="false">Chưa đổi</option>
                        </select>
                    </label>
                </div>
            </div>
        </template>
    </Listing>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { fieldsDisplay, sortOrder } from "./fields";
export default {
  name: "ListCard",
  data() {
    return {
      moreParams: {},
      fieldsDisplay,
      sortOrder,
      apiUrl: `${window.settings.services.adminUrl}/card`
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
  created: function() {
    for (let prop in this.moreParams) {
      if (this.$route.query.hasOwnProperty(prop) && this.$route.query[prop]) {
        this.moreParams[prop] = this.$route.query[prop];
      }
    }
  },
  watch: {
    "moreParams.used"(used) {
      this.setParams({ used });
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