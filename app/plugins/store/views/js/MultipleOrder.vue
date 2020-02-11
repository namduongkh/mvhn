<template>
  <div>
    <MultipleOrderItem :storeOrderId="storeOrderId" :storeId="storeId" />
    <div v-if="user && storeOrder && user._id == storeOrder.customer" class="text-right">
      <br />
      <button
        class="btn btn-success"
        type="button"
        @click="submitOrder()"
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
import ResourceService from "@CmsCore/vue/general/resources_service";

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
      required: true
    },
    storeOrderId: {
      type: String,
      required: true
    }
  },
  methods: {
    showOrder() {
      this.orderService.show(this.storeOrderId).then(({ data }) => {
        this.storeOrder = data;
      });
    },
    submitOrder() {
      this.orderService
        .update(this.storeOrderId, {
          orderStatus: "ordered"
        })
        .then(({ data }) => {
          this.storeOrder = data.data;
        });
    }
  },
  created() {
    this.showOrder();
  }
};
</script>

<style>
</style>
