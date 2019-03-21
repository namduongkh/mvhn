<template>
    <Listing
            :apiService="apiUrl"
            routeDetail="category"
            title="Categories"
            :fields="fieldsDisplay"
            subTitle="Listing"
            :sortOrder="sortOrder"
    >
        <template slot="additionalFilter" slot-scope="props">
            <div class="col-sm-3">
                <div>
                    <label>
                        Type:
                        <select name="type" v-model="moreParams.type" class="form-control">
                            <option :value="null">All</option>
                            <option value="product">Product</option>
                            <option value="post">Post</option>
                            <option value="banner">Banner</option>
                            <option value="question">Question</option>
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
  name: "ListCategory",
  data() {
    return {
      fieldsDisplay,
      sortOrder,
      apiUrl: `${window.settings.services.adminUrl}/category`,
      moreParams: {
        type: null
      }
    };
  },
  computed: {
    ...mapGetters([
      "filterData"
      // 'onResetParams'
    ])
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
    "moreParams.type"(val) {
      this.setParams({ type: val });
      this.reloadTable();
    },
    onResetParams(val) {
      if (val) {
        this.moreParams.type = null;
      }
      this.reloadTable();
    }
  }
};
</script>