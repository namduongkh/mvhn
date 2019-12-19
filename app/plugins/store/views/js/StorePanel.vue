<template>
  <div>
    <button
      v-if="!productId"
      type="button"
      class="btn btn-success btn-lg store-panel-modal__opener"
      data-toggle="modal"
      data-target="#store-panel-modal"
    >
      <i class="fa fa-phone"></i> Đặt hàng
    </button>
    <StoreProduct v-else :store-id="storeId" :product-id="productId" @select="selectProduct"></StoreProduct>

    <button
      type="button"
      class="btn btn-info btn-lg store-panel-modal__opener--fixed"
      data-toggle="modal"
      data-target="#store-panel-modal"
    >
      <div class="store-panel-modal__opener__content">
        <i class="fa fa-shopping-cart"></i>
        <span v-if="numberOfCartItems" class="store-panel-modal__opener__content__number" v-text="numberOfCartItems"></span>
      </div>
    </button>

    <div id="store-panel-modal" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <ul class="nav nav-pills nav-justified">
              <li :class="{'active': activeTab == 'menu'}" v-if="!productId">
                <a data-toggle="pill" href="#menu">
                  <i class="fa fa-store"></i> Mặt hàng
                </a>
              </li>
              <li :class="{'active': activeTab == 'cart'}">
                <a data-toggle="pill" href="#cart">
                  <i class="fa fa-shopping-cart"></i>
                  Giỏ hàng
                  <span
                    v-if="numberOfCartItems"
                    class="badge"
                  >{{ numberOfCartItems }}</span>
                </a>
              </li>
              <li :class="{'active': activeTab == 'order'}">
                <a data-toggle="pill" href="#order">
                  <i class="fa fa-file-invoice"></i> Đơn hàng
                </a>
              </li>
            </ul>
          </div>
          <div class="modal-body">
            <div class="tab-content">
              <div
                id="menu"
                class="tab-pane fade in"
                :class="{'active': activeTab == 'menu'}"
                v-if="!productId"
              >
                <StoreMenu :storeId="storeId"></StoreMenu>
              </div>
              <div id="cart" class="tab-pane fade" :class="{'in active': activeTab == 'cart'}">
                <StoreCart :storeId="storeId"></StoreCart>
              </div>
              <div id="order" class="tab-pane fade" :class="{'in active': activeTab == 'order'}">
                <MyOrder></MyOrder>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import VueRouter from "vue-router";
import StoreMenu from "./StoreMenu";
import StoreCart from "./StoreCart";
import StoreProduct from "./StoreProduct";
import MyOrder from "./MyOrder";
import { mapState, mapGetters } from "vuex";

export default {
  name: "StorePanel",
  components: {
    StoreMenu,
    StoreCart,
    StoreProduct,
    MyOrder
  },
  props: {
    storeId: {
      type: String,
      require: true
    },
    productId: {
      type: String
    }
  },
  computed: {
    ...mapGetters("store", ["numberOfCartItems"])
  },
  data() {
    return {
      activeTab: this.productId ? "cart" : "menu"
    };
  },
  methods: {
    selectProduct(item) {
      this.$store.dispatch("store/selectMenuItems", item);
    }
  }
  // router: new VueRouter({
  //   routes: [
  //     {
  //       path: "/menu",
  //       component: StoreMenu,
  //       props: {
  //         storeId: $("#store-id").val()
  //       }
  //     },
  //     {
  //       path: "/cart",
  //       component: StoreCart,
  //       props: {
  //         storeId: $("#store-id").val()
  //       }
  //     }
  //   ]
  // })
};
</script>

<style>
</style>
