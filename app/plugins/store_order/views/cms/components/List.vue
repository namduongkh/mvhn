<template>
  <div>
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
      <template slot="addActions" slot-scope="props">
        <button
          type="button"
          data-toggle="modal"
          :data-target="'#update-modal'"
          class="btn btn-primary-outline"
          @click="selectedOrder = props.props.rowData"
        >Trạng thái</button>
      </template>
      <template slot="additionalButtonHeader" slot-scope="props">
        <StorePanel v-if="parent" :store="parent.store || parent._id"></StorePanel>
      </template>
    </Listing>
    <StoreOrderUpdater v-if="selectedOrder" :order="selectedOrder" @updated="orderStatusUpdated"></StoreOrderUpdater>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { fieldsDisplay, sortOrder } from "./fields";
import ResourcesService from "@general/resources_service";
import StoreOrderUpdater from "./StoreOrderUpdater";

export default {
  name: "ListStoreOrder",
  data() {
    return {
      fieldsDisplay,
      sortOrder,
      cmsUrl: `${CMS_URL}/${this.$route.params.parentType}/${this.$route.params.parentId}/store_orders`,
      parentService: new ResourcesService(
        `${CMS_URL}/${this.$route.params.parentType}`
      ),
      parent: null,
      parentType:
        this.$route.params.parentType == "stores" ? "store" : "storeTable",
      moreParams: this.defaultFilter(),
      selectedOrder: null
    };
  },
  computed: {
    ...mapGetters(["filterData"])
  },
  components: {
    StoreOrderUpdater
  },
  methods: {
    ...mapActions(["openConfirm", "setParams", "reloadTable"]),
    goto(router) {
      this.$store.dispatch("goto", router);
    },
    defaultFilter() {
      return {
        [this.parentType]: this.parent && this.parent._id,
        orderStatus: { $nin: ["ordering"] }
      };
    },
    orderStatusUpdated(order) {
      this.reloadTable();
      this.selectedOrder = order;
    }
  },
  created() {
    if (!this.$route.params.parentId) return;

    this.parentService.show(this.$route.params.parentId).then(({ data }) => {
      this.parent = data;

      // this.setParams({
      //   [this.parentType]: this.parent._id,
      //   orderStatus: { $nin: ["ordering"] }
      // });

      for (let prop in this.moreParams) {
        if (this.$route.query.hasOwnProperty(prop) && this.$route.query[prop]) {
          this.moreParams[prop] = this.$route.query[prop];
        }
      }

      // this.reloadTable();
    });
  },
  watch: {
    // "moreParams.orderStatus"(orderStatus) {
    //   this.setParams({ orderStatus });
    //   this.reloadTable();
    // },
    onResetParams(val) {
      if (val) {
        this.moreParams = this.defaultFilter();
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
