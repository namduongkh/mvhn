<template>
  <div>
    <MultipleOrderItem :storeOrderId="storeOrderId" />
    <hr />
    <h3>Menu:</h3>
    <StoreMenu :storeId="storeId"></StoreMenu>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import StoreMenu from "./StoreMenu";
import MultipleOrderItem from "./MultipleOrderItem";

export default {
  name: "MultipleOrder",
  computed: {
    ...mapGetters("store", ["numberOfCartItems"])
  },
  components: {
    StoreMenu,
    MultipleOrderItem
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
  }
};
</script>

<style>
</style>
