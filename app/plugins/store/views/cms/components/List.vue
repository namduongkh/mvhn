<template>
  <Listing
    :apiService="cmsUrl"
    routeDetail="store"
    title="Stores"
    :fields="fieldsDisplay"
    subTitle="Listing"
    :sortOrder="sortOrder"
    :showExport="true"
  >
    <template slot="additionalFilter" slot-scope="props"></template>
    <template slot="addActions" slot-scope="props">
      <button
        type="button"
        class="btn btn-inline btn-secondary-outline"
        @click="goto({name: 'ListStoreMenus', params: {store_id: props.props.rowData._id}})"
      >
        <span class="fa fa-list"></span>
      </button>
      <button
        type="button"
        class="btn btn-inline btn-secondary-outline"
        @click="goto({name: 'ListStoreTables', params: {storeId: props.props.rowData._id}})"
      >
        <span class="fa fa-shopping-cart"></span>
      </button>
    </template>
  </Listing>
</template>
<script>
/**
 * For more option please check Listing component
 */
import { mapGetters, mapActions } from "vuex";
import { fieldsDisplay, sortOrder } from "./fields";
export default {
  name: "ListStore",
  data() {
    return {
      moreParams: {},
      fieldsDisplay,
      sortOrder,
      cmsUrl: `${window.settings.services.cmsUrl}/stores`
    };
  },
  computed: {
    ...mapGetters(["filterData"])
  },
  methods: {
    ...mapActions(["openConfirm", "setParams", "reloadTable", "goto"]),
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
