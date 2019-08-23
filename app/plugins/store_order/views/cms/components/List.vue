<template>
  <Listing
    :apiService="cmsUrl"
    routeDetail="store_order"
    title="StoreOrders"
    :fields="fieldsDisplay"
    subTitle="Listing"
    :sortOrder="sortOrder"
    :showExport="true"
    :disabledNew="true"
  >
    <template slot="additionalFilter" slot-scope="props"></template>
    <template slot="addActions" slot-scope="props"></template>
    <template slot="additionalButtonHeader" slot-scope="props">
      <StorePanel v-if="parent" :store="parent.store || parent._id"></StorePanel>
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
      fieldsDisplay,
      sortOrder,
      cmsUrl: `${window.settings.services.cmsUrl}/store_orders`,
      parentService: new ResourcesService(
        `${window.settings.services.cmsUrl}/${this.$route.params.parentType}`
      ),
      parent: null,
      parentType:
        this.$route.params.parentType == "stores" ? "store" : "storeTable",
      moreParams: {
        [this.parentType]: null
      }
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
    if (!this.$route.params.parentId) return;

    this.parentService.show(this.$route.params.parentId).then(({ data }) => {
      this.parent = data;

      this.setParams({ [this.parentType]: this.parent._id });
      for (let prop in this.moreParams) {
        if (this.$route.query.hasOwnProperty(prop) && this.$route.query[prop]) {
          this.moreParams[prop] = this.$route.query[prop];
        }
      }
      this.reloadTable();
    });
  },
  watch: {
    // "moreParams.parentId"(parentId) {
    //   this.setParams({ parentId });
    //   this.reloadTable();
    // },
    onResetParams(val) {
      if (val) {
        this.moreParams = {
          [this.parentType]: this.parent._id
        };
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
