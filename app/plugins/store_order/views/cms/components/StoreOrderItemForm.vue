<template>
  <div class="row">
    <div class="col-sm-4">
      <label for># {{ index }}</label>
      <StoreMenuPicker :store="store" :storeOrderItem="storeOrderItem" @picked="onPicked" />
    </div>
    <div class="col-sm-3">
      <label for>Note</label>
      <input type="text" class="form-control" v-model="storeOrderItem.note" />
    </div>
    <div class="col-sm-2">
      <label for>Price</label>
      <input type="number" class="form-control" v-model="storeOrderItem.price" />
    </div>
    <div class="col-sm-3">
      <label for>Actions</label>
      <div class="text-right">
        <slot name="actions" :item="storeOrderItem" />
      </div>
    </div>
  </div>
</template>

<script>
import StoreMenuPicker from "./StoreMenuPicker";

export default {
  name: "StoreOrderItemForm",
  props: {
    index: {
      type: Number,
      default: 1
    },
    value: {
      type: Object
    },
    item: {
      type: Object,
      default: {}
    },
    store: {
      type: String
    }
  },
  data() {
    return {
      storeOrderItem: this.item
    };
  },
  methods: {
    onPicked(menu) {
      this.storeOrderItem.storeMenu = menu._id;
      this.storeOrderItem.price = menu.price;
    }
  },
  components: {
    StoreMenuPicker
  },
  watch: {
    item: {
      deep: true,
      handler(val) {
        this.storeOrderItem = val;
      }
    }
  }
};
</script>

<style>
</style>
