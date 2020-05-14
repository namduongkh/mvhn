<template>
  <div>
    <div v-if="shouldLoadMenu">
      <button
        type="button"
        class="btn btn-success btn-lg store-panel-modal__opener"
        data-toggle="modal"
        data-target="#store-panel-modal"
      >
        <i class="fa fa-phone"></i> Đặt hàng
      </button>
      <StoreOrderCreator v-if="store && store.allowMultipleOrder" :store-id="storeId"></StoreOrderCreator>
    </div>

    <StoreProduct
      v-if="productId"
      :store-id="storeId"
      :product-id="productId"
      @select="selectProduct"
    ></StoreProduct>

    <div id="store-panel-modal" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <ul class="nav nav-pills nav-justified">
              <li :class="{'active': activeTab == 'menu'}" v-if="shouldLoadMenu">
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
                v-if="shouldLoadMenu"
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
import StoreOrderCreator from "./StoreOrderCreator";
import { mapState, mapGetters } from "vuex";
import ResourcesService from "@CmsCore/vue/general/resources_service";

export default {
  name: "StorePanel",
  components: {
    StoreMenu,
    StoreCart,
    StoreProduct,
    MyOrder,
    StoreOrderCreator
  },
  props: {
    storeId: {
      type: String,
      required: true
    },
    productId: {
      type: String
    },
    loadMenu: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters("store", ["numberOfCartItems"]),
    shouldLoadMenu() {
      this.loadMenu && !this.productId && this.store && this.store.onlineServe;
    }
  },
  data() {
    return {
      activeTab: this.productId ? "cart" : "menu",
      storeService: new ResourcesService(
        window.settings.services.webUrl + `/stores`
      ),
      store: {}
    };
  },
  methods: {
    selectProduct(item) {
      this.$store.dispatch("store/selectMenuItems", item);
    },
    loadStore() {
      this.storeService.show(this.storeId).then(({ data }) => {
        this.store = data;
        this.activeTab = this.shouldLoadMenu ? "menu" : "cart";
      });
    }
  },
  created() {
    this.loadStore();
    this.$store.dispatch("core/addNavigatorItem", {
      id: "store-panel-opener",
      label: '<i class="fa fa-shopping-cart"></i>',
      htmlOptions: {
        "data-toggle": "modal",
        "data-target": "#store-panel-modal"
      },
      notifyNumber: this.numberOfCartItems
    });
  },
  watch: {
    numberOfCartItems(number) {
      this.$store.dispatch("core/updateNavigatorItem", {
        id: "store-panel-opener",
        notifyNumber: number
      });
    }
  }
};
</script>

<style>
</style>
