<template>
  <Listing
    :apiService="cmsUrl"
    routeDetail="store_order"
    title="StoreOrders"
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
        @click="goto({name: 'EditStore', params: {id: storeTable.store}})"
      >Store</button>
      <button
        type="button"
        class="btn btn-secondary"
        @click="goto({name: 'ListStoreTables', params: {storeId: storeTable.store}})"
      >Store Tables</button>
    </template>
  </Listing>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { fieldsDisplay, sortOrder } from "./fields";
import ResourcesService from "@general/resources_service";

export default {
  name: "ListStoreOrder",
  data() {
    return {
      moreParams: {
        storeTable: null
      },
      fieldsDisplay,
      sortOrder,
      cmsUrl: `${window.settings.services.cmsUrl}/store_orders`,
      storeTableService: new ResourcesService(
        `${window.settings.services.cmsUrl}/store_tables`
      ),
      storeTable: null
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
  created() {
    if (!this.$route.params.storeTableId) return;

    this.storeTableService
      .edit(this.$route.params.storeTableId)
      .then(({ data }) => {
        this.storeTable = data;

        this.setParams({ storeTable: this.storeTable._id });
        for (let prop in this.moreParams) {
          if (
            this.$route.query.hasOwnProperty(prop) &&
            this.$route.query[prop]
          ) {
            this.moreParams[prop] = this.$route.query[prop];
          }
        }
        this.reloadTable();
      });
  },
  watch: {
    // "moreParams.storeTable"(storeTable) {
    //   this.setParams({ storeTable });
    //   this.reloadTable();
    // },
    onResetParams(val) {
      if (val) {
        this.moreParams = {
          storeTable: this.storeTable
        };
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
