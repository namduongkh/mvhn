<template>
  <div>
    <Listing
      :apiService="cmsUrl"
      routeDetail="product"
      title="Products"
      :fields="fieldsDisplay"
      subTitle="Listing"
      :sortOrder="sortOrder"
      :showExport="true"
    >
      <template slot="additionalFilter" slot-scope="props"></template>
      <template slot="addActions" slot-scope="props"></template>
      <template slot="additionalButtonHeader" slot-scope="props">
        <StorePanel v-if="$route.params.storeId" :store="$route.params.storeId"></StorePanel>
      </template>
    </Listing>
    <div class="page-content" style="padding-top:0">
      <div class="container-fluid">
        <div class="box-typical box-typical-padding">
          <ImporterRunner
            v-if="$route.params.storeId"
            :importer-classname="'StoreProductImporter'"
            :params="{storeId: $route.params.storeId}"
            @imported="reloadTable()"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * For more option please check Listing component
 */
import { mapGetters, mapActions } from "vuex";
import { fieldsDisplay, sortOrder } from "./fields";

export default {
  name: "ListProduct",
  data() {
    return {
      moreParams: {},
      fieldsDisplay,
      sortOrder
    };
  },
  computed: {
    ...mapGetters(["filterData", "onResetParams"]),
    cmsUrl() {
      if (this.$route.params.storeId) {
        return `${CMS_URL}/stores/${this.$route.params.storeId}/products`;
      } else {
        return `${CMS_URL}/products`;
      }
    }
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
    "moreParams.any_field"(any_field) {
      this.setParams({ any_field });
      this.reloadTable();
    },
    onResetParams(val) {
      if (val) {
        this.moreParams.any_field = null;
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
