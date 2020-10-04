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
        <a
          v-if="storeObject"
          :href="`/stores/${storeObject._id}`"
          target="_blank"
          class="btn btn-lg btn-primary-outline"
        >
          <i class="fa fa-external-link"></i>
        </a>
        <button class="btn btn-primary-outline btn-lg" @click="goto({name: 'ListStores'})">
          <i class="fa fa-store"></i> Tất cả Store
        </button>
      </div>
      <button
        class="btn btn-primary-outline"
        @click="goto({name: 'ListStoreProducts', params: { storeId: store }})"
      >
        <i class="fa fa-boxes"></i> Sản phẩm
      </button>
      <button
        v-if="storeObject && storeObject.inPlaceServe"
        class="btn btn-primary-outline"
        @click="goto({name: 'ListStoreTables', params: { storeId: store }})"
      >
        <i class="fa fa-chair"></i> Bàn
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
        <i class="fa fa-file-invoice"></i> Đơn hàng
      </button>
      <button
        class="btn btn-success-outline"
        @click="goto({name: 'Preparing', params: { storeId: store }})"
      >
        <i class="fa fa-refresh"></i> Tình trạng
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
      required: true,
    },
  },
  data() {
    return {
      resourceSvc: new ResourcesService(`${CMS_URL}/stores`),
      storeObject: null,
    };
  },
  methods: {
    ...mapActions(["goto"]),
    loadStore() {
      this.resourceSvc.show(this.store).then(({ data }) => {
        this.storeObject = data;
      });
    },
  },
  created() {
    if (this.store) this.loadStore();
  },
};
</script>
<style>
</style>
