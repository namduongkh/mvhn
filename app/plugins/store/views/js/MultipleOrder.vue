<template>
  <div>
    <MultipleOrderItem :storeOrderId="storeOrderId" :storeId="storeId" />
    <hr />
    <h3>Menu:</h3>
    <StoreMenu :storeId="storeId"></StoreMenu>
    <hr />
    <div v-if="user && storeOrder && user._id == storeOrder.customer">
      <br />
      <StoreCart :storeOrderId="storeOrder._id" :enableOnSelectItem="false" :inPlace="true"></StoreCart>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import StoreMenu from "./StoreMenu";
import StoreCart from "./StoreCart";
import MultipleOrderItem from "./MultipleOrderItem";
import ResourceService from "@CmsCore/vue/general/resources_service";

export default {
  name: "MultipleOrder",
  computed: {
    ...mapGetters("store", ["numberOfCartItems"]),
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  components: {
    StoreMenu,
    MultipleOrderItem,
    StoreCart,
  },
  data() {
    return {
      orderService: new ResourceService(
        window.settings.services.webUrl + `/store_orders`
      ),
      storeOrder: {},
    };
  },
  props: {
    storeId: {
      type: String,
      required: true,
    },
    storeOrderId: {
      type: String,
      required: true,
    },
  },
  methods: {
    showOrder() {
      this.orderService.show(this.storeOrderId).then(({ data }) => {
        this.storeOrder = data;
      });
    },
  },
  created() {
    this.showOrder();
  },
};
</script>

<style>
</style>
