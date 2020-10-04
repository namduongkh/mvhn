<template>
  <div>
    <div v-if="user && storeOrder && user._id == storeOrder.customer">
      <div>
        <h2>{{ storeOrder.orderName }}</h2>
        <a v-html="$options.filters.orderStatusText(storeOrder.orderStatus)"></a>
      </div>
      <br />
      <StoreCart :storeOrderId="storeOrder._id" :inPlace="true"></StoreCart>
      <hr />
      <h3>Menu:</h3>
      <StoreMenu v-if="storeTable" :storeId="storeTable.store._id"></StoreMenu>
    </div>
    <div v-else class="text-center store-table-order">Không thể phục vụ trong lúc này</div>
  </div>
</template>

<script>
import StoreMenu from "./StoreMenu";
import StoreCart from "./StoreCart";
import ResourcesService from "@CmsCore/vue/general/resources_service";
import { mapState, mapGetters } from "vuex";
import { orderStatusText } from "@Plugin/store_order/views/cms/filters";

export default {
  name: "StoreTableOrder",
  props: {
    storeTableId: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      storeTableService: new ResourcesService(
        window.settings.services.webUrl + `/store_tables`
      ),
      storeTable: null,
      orderService: new ResourcesService(
        window.settings.services.webUrl + `/store_orders`
      ),
      storeOrder: null,
    };
  },
  components: {
    StoreMenu,
    StoreCart,
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  methods: {
    loadTable() {
      this.storeTableService.show(this.storeTableId).then(({ data }) => {
        if (data._id) {
          this.storeTable = data;
          this.loadOrder();
        }
      });
    },
    loadOrder() {
      this.orderService.show(this.storeTable.activeOrder).then(({ data }) => {
        this.storeOrder = data;
      });
    },
  },
  created() {
    this.loadTable();
  },
  filters: {
    orderStatusText,
  },
};
</script>

<style>
.store-table-order {
  padding: 1em 0;
}
</style>
