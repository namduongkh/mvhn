<template>
  <div>
    <MultipleOrderItem :storeOrderId="storeOrderId" :storeId="storeId" />
    <div v-if="user && storeOrder && user._id == storeOrder.customer ">
      <button
        class="btn btn-success"
        type="button"
        @click="submitOrder"
        :disabled="storeOrder.orderStatus !== 'ordering'"
      >
        <i class="fa fa-save"></i>
        Chốt đơn
      </button>
    </div>
    <hr />
    <h3>Menu:</h3>
    <StoreMenu :storeId="storeId" :hidePrice="true"></StoreMenu>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import StoreMenu from "./StoreMenu";
import MultipleOrderItem from "./MultipleOrderItem";

export default {
  name: "MultipleOrder",
  computed: {
    ...mapGetters("store", ["numberOfCartItems"]),
    ...mapState({
      user: state => state.user.user
    })
  },
  components: {
    StoreMenu,
    MultipleOrderItem
  },
  data() {
    return {
      orderService: new ResourceService(
        window.settings.services.webUrl + `/store_orders`
      ),
      storeOrder: {}
    };
  },
  props: {
    storeId: {
      type: String,
      require: true
    },
    storeOrderId: {
      type: String,
      require: true
    }
  },
  methods: {
    show() {
      this.orderService.show(this.storeOrderId).then(({ data }) => {
        this.storeOrder = data;
      });
    },
    submitOrder() {
      this.orderService
        .show(this.storeOrderId, {
          orderStatus: "ordered"
        })
        .then(({ data }) => {
          this.storeOrder = data;
        });
    }
  }
};
</script>

<style>
</style>
