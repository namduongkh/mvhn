<template>
  <div>
    <button
      type="button"
      class="btn btn-success btn-lg store-panel-modal__opener"
      data-toggle="modal"
      data-target="#store-panel-modal"
    >
      <i class="fa fa-phone"></i> Đặt hàng
    </button>

    <div id="store-panel-modal" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <ul class="nav nav-pills nav-justified">
              <li class="active">
                <a data-toggle="pill" href="#menu">
                  <i class="fa fa-store"></i> Mặt hàng
                </a>
              </li>
              <li>
                <a data-toggle="pill" href="#cart">
                  <i class="fa fa-shopping-cart"></i> Giỏ hàng
                </a>
              </li>
            </ul>
          </div>
          <div class="modal-body">
            <div class="tab-content">
              <div id="menu" class="tab-pane fade in active">
                <StoreMenu :storeId="storeId"></StoreMenu>
              </div>
              <div id="cart" class="tab-pane fade">
                <StoreCart :storeId="storeId"></StoreCart>
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

export default {
  name: "StorePanel",
  components: {
    StoreMenu,
    StoreCart
  },
  props: {
    storeId: {
      type: String,
      require: true
    }
  },
  data() {
    return {};
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