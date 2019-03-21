<template>
    <Listing
            :apiService="apiUrl"
            routeDetail="product"
            title="Products"
            :fields="fieldsDisplay"
            subTitle="Listing"
            :sortOrder="sortOrder"
            :showExport="true"
    >
        <template slot="additionalFilter" slot-scope="props">
            <div class="col-sm-3">
                <div>
                    <label>
                        Loại sản phẩm:
                        <select2 id="category" v-validate="'required'" data-vv-name="Loại sản phẩm"  name="category"
                                    v-model="moreParams.category" :ajax="ajaxCategory" placeholder="Chọn..."/>
                        <small v-show="errors.has('Loại sản phẩm')" class="text-danger">{{ errors.first('Loại sản phẩm') }}</small>
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
  name: "ListProduct",
  data() {
    return {
      moreParams: {},
      fieldsDisplay,
      sortOrder,
      apiUrl: `${window.settings.services.adminUrl}/product`,
      ajaxCategory: {
        url: `${window.settings.services.adminUrl}/category/ajax?type=product`,
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
  created: function() {
    for (let prop in this.moreParams) {
      if (this.$route.query.hasOwnProperty(prop) && this.$route.query[prop]) {
        this.moreParams[prop] = this.$route.query[prop];
      }
    }
  },
  watch: {
    "moreParams.category"(val) {
      this.setParams({ category: val });
      this.reloadTable();
    },
    onResetParams(val) {
      if (val) {
        this.moreParams = {
          category: null
        };
      }
      this.reloadTable();
    }
  }
};
</script>