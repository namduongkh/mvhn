<template>
  <Listing
    :apiService="cmsUrl"
    routeDetail="post"
    title="Posts"
    :fields="fieldsDisplay"
    subTitle="Listing"
    :sortOrder="sortOrder"
    :showExport="true"
  >
    <template slot="additionalFilter" slot-scope="props">
      <div class="col-sm-3">
        <div>
          <label>
            Category:
            <select name="category" v-model="moreParams.category" class="form-control">
              <option :value="null">All category</option>
              <option v-for="cate in categories" :key="cate._id" :value="cate._id">{{cate.name}}</option>
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
  name: "ListPost",
  data() {
    return {
      moreParams: {},
      fieldsDisplay,
      sortOrder,
      cmsUrl: `${window.settings.services.cmsUrl}/posts`,
      categories: []
    };
  },
  computed: {
    ...mapGetters(["filterData"])
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
    Axios.get(`${window.settings.services.cmsUrl}/properties`, {
      withCredentials: true,
      params: {
        notPaginate: true,
        select: "_id name",
        type: "category"
      }
    }).then(resp => {
      that.categories = resp.data.data;
    });
  },
  watch: {
    "moreParams.category"(category) {
      this.setParams({ category });
      this.reloadTable();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>