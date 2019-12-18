<template>
  <div class="row">
    <div class="col-sm-6">
      <button
        type="button"
        class="btn btn-success btn-lg btn-block store-panel-modal__opener"
        data-toggle="modal"
        data-target="#store-panel-modal"
        @click="selectProduct()"
      >
        <i class="fa fa-cart-plus"></i> Thêm vào giỏ
      </button>
    </div>
  </div>
</template>

<script>
import ResourcesService from "@CmsCore/vue/general/resources_service";

export default {
  name: "StoreProduct",
  props: {
    storeId: {
      type: String,
      required: true
    },
    productId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      storeMenuSvc: new ResourcesService(
        `${window.settings.services.webUrl}/stores/${this.storeId}/store_menus`
      ),
      storeMenu: null
    };
  },
  methods: {
    getStoreMenu() {
      this.storeMenuSvc
        .member(
          "get_from_product",
          "GET",
          {},
          {
            params: { productId: this.productId, storeId: this.storeId }
          }
        )
        .then(({ data }) => {
          this.storeMenu = data;
        });
    },
    selectProduct() {
      this.$emit("select", this.storeMenu);
    }
  },
  created() {
    this.getStoreMenu();
  }
};
</script>

<style>
</style>
