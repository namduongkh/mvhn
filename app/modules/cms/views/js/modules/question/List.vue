<template>
  <Listing
    :apiService="apiUrl"
    routeDetail="question"
    title="Tư vấn"
    :fields="fieldsDisplay"
    subTitle="Câu hỏi"
    :sortOrder="sortOrder"
    :showExport="true"
    :disabledNew="true"
  >
    <template slot="additionalFilter" slot-scope="props">
      <div class="col-sm-3">
        <div>
          <label>
            Xuất bản:
            <select name="is_publish" v-model="moreParams.is_publish" class="form-control">
              <option :value="null">Tất cả</option>
              <option :value="true">Đã xuất bản</option>
              <option :value="false">Chưa xuất bản</option>
            </select>
          </label>
        </div>
      </div>
      <div class="col-sm-3">
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
      <div class="col-sm-3">
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
  </Listing>
</template>
<script>
import Axios from "axios";
import { mapGetters, mapActions } from "vuex";
import { fieldsDisplay, sortOrder } from "./fields";
export default {
  name: "ListQuestion",
  data() {
    return {
      moreParams: {
        is_publish: null,
        from_date: null,
        to_date: null
      },
      fieldsDisplay,
      sortOrder,
      apiUrl: `${window.settings.services.adminUrl}/question`,
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
    }
  },
  created: function() {
    let that = this;
    for (let prop in this.moreParams) {
      if (this.$route.query.hasOwnProperty(prop) && this.$route.query[prop]) {
        this.moreParams[prop] = this.$route.query[prop];
      }
    }
    Axios.get(
      `${window.settings.services.adminUrl}/category?type=question`
    ).then(resp => {
      that.categories = resp.data.data;
    });
  },
  watch: {
    "moreParams.category"(val) {
      this.setParams({ category: val });
      this.reloadTable();
    },
    "moreParams.is_publish"(val) {
      this.setParams({ is_publish: val });
      this.reloadTable();
    },
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
    onResetParams(reset) {
      if (reset) {
        this.moreParams.from_date = null;
        this.moreParams.to_date = null;
        this.moreParams.is_publish = null;
        this.reloadTable();
      }
    }
  }
};
</script>