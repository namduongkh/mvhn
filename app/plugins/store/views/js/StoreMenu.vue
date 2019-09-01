<template>
  <div>
    <button
      type="button"
      class="btn btn-success btn-lg store-menu-modal__opener"
      data-toggle="modal"
      data-target="#store-menu-modal"
    >
      <i class="fa fa-phone"></i> Đặt hàng
    </button>

    <!-- Modal -->
    <div id="store-menu-modal" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Mặt hàng</h4>
          </div>
          <div class="modal-body store-menu">
            <div class="row" v-if="menus.length">
              <div class="col-sm-6" v-for="menu in menus" :key="menu._id">
                <div class="media store-menu__item" @click="addItem(menu)">
                  <div class="media-left media-middle" style="width:25%">
                    <img class="media-object" :src="menu.image" style="width:100%" />
                  </div>
                  <div class="media-body">
                    <h4 class="media-heading">{{ menu.name }}</h4>
                    <div>{{ menu.name }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center">Chưa có mặt hàng</div>
          </div>
          <div class="modal-footer">
            <a
              href="#"
              data-dismiss="modal"
              class="btn btn-info"
              data-toggle="modal"
              data-target="#store-order-modal"
            >Xem đơn hàng</a>
          </div>
        </div>
      </div>
    </div>

    <div id="store-order-modal" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              <a
                href="#"
                data-dismiss="modal"
                class="btn btn-default"
                data-toggle="modal"
                data-target="#store-menu-modal"
              >
                <i class="fa fa-arrow-left"></i>
              </a>
              Đơn hàng
            </h4>
          </div>
          <div class="modal-body store-menu">
            <div class="row" v-if="selectedItems.length">
              <div class="col-sm-6" v-for="item in selectedItems" :key="item._id">
                <div class="media store-menu__item">
                  <div class="media-left media-middle" style="width:25%">
                    <img class="media-object" :src="item.image" style="width:100%" />
                  </div>
                  <div class="media-body">
                    <h4 class="media-heading">{{ item.name }}</h4>
                    <div>{{ item.name }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center">Chưa có mặt hàng</div>
          </div>
          <div class="modal-footer">
            <a href="javascript:void(0)" onclick="alert('Chức năng sắp ra mắt')" class="btn btn-primary">Đặt hàng</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ResourceService from "@CmsCore/vue/general/resources_service";
import AuthService from "@/user/views/js/auth_service";

export default {
  name: "StoreMenu",
  props: {
    storeId: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      service: new ResourceService(
        window.settings.services.webUrl + `/stores/${this.storeId}/store_menus`
      ),
      menus: [],
      order: {},
      storeOrderItems: [],
      user: {},
      authService: new AuthService(),
      selectedItems: []
    };
  },
  methods: {
    initOrder() {
      this.order = {
        orderName: this.storeId,
        store: this.storeId,
        customer: this.user._id
      };
      this.storeOrderItems = [];
    },
    index() {
      this.service
        .index({
          status: 1
        })
        .then(({ data }) => {
          this.menus = data.data;
        });
    },
    addItem(item) {
      if (!this.selectedItems.includes(item)) {
        this.selectedItems.push(item);
      }
      toastr.success("Đã thêm vào đơn hàng của bạn!");
    }
  },
  created() {
    this.index();
    this.authService.account().then(({ data }) => {
      if (data._id) {
        this.user = data;
      }
      this.initOrder();
    });
  }
};
</script>