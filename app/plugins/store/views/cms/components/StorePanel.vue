<template>
  <div class="row">
    <div class="col-md-12 text-right">
      <div>
        <button
          v-if="storeObject"
          class="btn btn-lg btn-primary-outline"
          @click="goto({name: 'EditStore', params: { id: store }})"
        >
          <i class="fa fa-store"></i>
          {{ storeObject.name }}
        </button>
        <button class="btn btn-primary-outline btn-lg" @click="goto({name: 'ListStores'})">
          <i class="fa fa-store"></i> All Stores
        </button>
      </div>
      <button
        class="btn btn-primary-outline"
        @click="goto({name: 'ListStoreProducts', params: { storeId: store }})"
      >
        <i class="fa fa-boxes"></i> Products
      </button>
      <button
        class="btn btn-primary-outline"
        @click="goto({name: 'ListStoreTables', params: { storeId: store }})"
      >
        <i class="fa fa-chair"></i> Seats
      </button>
      <button
        class="btn btn-primary-outline"
        @click="goto({name: 'ListStoreMenus', params: { storeId: store }})"
      >
        <i class="fa fa-bars"></i> Menu
      </button>
      <button
        class="btn btn-primary-outline"
        @click="goto({name: 'ListStoreOrders', params: { parentType: 'stores', parentId: store }})"
      >
        <i class="fa fa-file-invoice"></i> Orders
      </button>
      <button
        class="btn btn-success-outline"
        @click="goto({name: 'Preparing', params: { storeId: store }})"
      >
        <i class="fa fa-refresh"></i> Progress
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import ResourcesService from "@general/resources_service";

export default {
  name: "StorePanel",
  props: {
    store: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      resourceSvc: new ResourcesService(`${CMS_URL}/stores`),
      storeObject: null
    };
  },
  methods: {
    ...mapActions(["goto"]),
    loadStore() {
      this.resourceSvc.show(this.store).then(({ data }) => {
        this.storeObject = data;
      });
    }
  },
  created() {
    if (this.store) this.loadStore();
  }
};
</script>
<style>
</style>
