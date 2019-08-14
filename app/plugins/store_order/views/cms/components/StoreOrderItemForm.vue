<template>
  <div class="row">
    <div class="col-sm-3">
      <label for># {{ index }}</label>
      <StoreMenuPicker :store="store" :storeOrderItem="storeOrderItem" @picked="onPicked" />
    </div>
    <div class="col-sm-2">
      <label for>Quantity</label>
      <input
        type="number"
        class="form-control"
        v-model="storeOrderItem.quantity"
        min="1"
        @change="calculateTotal()"
        style="width:70px;display:inline"
      />
      <button
        type="button"
        class="btn btn-secondary-outline btn-sm"
        @click="storeOrderItem.quantity += 1;calculateTotal()"
      >
        <i class="fa fa-plus"></i>
      </button>
      <button
        type="button"
        class="btn btn-secondary-outline btn-sm"
        @click="storeOrderItem.quantity -= 1;calculateTotal()"
      >
        <i class="fa fa-minus"></i>
      </button>
    </div>
    <div class="col-sm-1">
      <label for>Price</label>
      <input
        type="number"
        class="form-control"
        v-model="storeOrderItem.price"
        @change="calculateTotal()"
      />
    </div>
    <div class="col-sm-1">
      <label for>Total</label>
      <input type="number" class="form-control" v-model="storeOrderItem.total" disabled />
    </div>
    <div class="col-sm-3">
      <label for>Note</label>
      <input type="text" class="form-control" v-model="storeOrderItem.note" />
    </div>
    <div class="col-sm-2">
      <label for>&nbsp;</label>
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
      this.calculateTotal();
    },
    calculateTotal() {
      this.storeOrderItem.total =
        this.storeOrderItem.quantity * this.storeOrderItem.price;
      this.$forceUpdate();
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
