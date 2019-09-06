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
                <div class="media store-menu__item" @click="selectItem(menu)">
                  <div class="media-left media-middle" style="width:25%">
                    <img class="media-object" :src="menu.image" style="width:100%" />
                  </div>
                  <div class="media-body">
                    <h4 class="media-heading">{{ menu.name }}</h4>
                    <div>{{ menu.price }} đ</div>
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
            >
              <i class="fa fa-shopping-cart"></i>
              Giỏ hàng ({{ cartNumber }})
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ResourceService from "@CmsCore/vue/general/resources_service";
import { sumBy } from "lodash";

export default {
  name: "StoreMenu",
  props: {
    storeId: {
      type: String,
      require: true
    },
    cartNumber: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      service: new ResourceService(
        window.settings.services.webUrl + `/stores/${this.storeId}/store_menus`
      ),
      menus: []
    };
  },
  methods: {
    index() {
      this.service
        .index({
          status: 1
        })
        .then(({ data }) => {
          this.menus = data.data;
        });
    },
    selectItem(item) {
      this.$emit("selected", item);
    }
  },
  created() {
    this.index();
  }
};
</script>