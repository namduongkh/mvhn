<template>
  <Listing
    :apiService="cmsUrl"
    routeDetail="store_menu"
    title="StoreMenus"
    :fields="fieldsDisplay"
    subTitle="Listing"
    :sortOrder="sortOrder"
    :showExport="true"
  >
    <template slot="additionalFilter" slot-scope="props"></template>
    <template slot="addActions" slot-scope="props"></template>
    <template slot="additionalButtonHeader" slot-scope="props">
      <button
        type="button"
        class="btn btn-secondary"
        @click="goto({name: 'EditStore', params: {id: $route.params.store_id}})"
      >
        <i class="fa fa-store"></i> Store
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
  name: "ListStoreMenu",
  data() {
    return {
      moreParams: {
        store: null
      },
      fieldsDisplay,
      sortOrder,
      cmsUrl: `${CMS_URL}/store_menus`
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
  created() {
    for (let prop in this.moreParams) {
      if (this.$route.query.hasOwnProperty(prop) && this.$route.query[prop]) {
        this.moreParams[prop] = this.$route.query[prop];
      }
    }
    if (!this.$route.query.hasOwnProperty("store")) {
      this.moreParams.store = this.$route.params.store_id;
    }
  },
  watch: {
    "moreParams.store"(store) {
      this.setParams({ store });
      this.reloadTable();
    },
    onResetParams(val) {
      if (val) {
        this.moreParams = {
          store: this.$route.params.store_id
        };
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
