<template>
  <div class="row">
    <div class="col-md-12 text-right">
      <button class="btn btn-primary-outline" @click="goto({name: 'ListStores'})">
        <i class="fa fa-store"></i> Stores
      </button>
      <button
        class="btn btn-primary-outline"
        @click="goto({name: 'ListStoreTables', params: { storeId: store }})"
      >
        <i class="fa fa-chair"></i> Seats
      </button>
      <button
        class="btn btn-primary-outline"
        @click="goto({name: 'ListStoreOrders', params: { parentType: 'stores', parentId: store }})"
      >
        <i class="fa fa-file-invoice"></i> Orders
      </button>
      <button
        class="btn btn-primary-outline"
        @click="goto({name: 'ListStoreMenus', params: { storeId: store }})"
      >
        <i class="fa fa-bars"></i> Menu
      </button>
      <button
        class="btn btn-success-outline"
        @click="goto({name: 'Preparing', params: { storeId: store }})"
      >
        <i class="fa fa-refresh"></i> Preparing
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "StorePanel",
  props: {
    store: {
      type: String,
      require: true
    }
  },
  methods: {
    ...mapActions(["goto"])
  }
};
</script>
<style>
</style>
