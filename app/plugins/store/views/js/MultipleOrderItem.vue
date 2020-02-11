<template>
  <div class="row">
    <div class="col-sm-6">
      <div class="form-group form-control-wrapper">
        <label>Xin chào:</label>
        <input
          type="text"
          class="form-control"
          v-model="orderItem.orderer"
          placeholder="Tên"
          v-validate="'required'"
          data-vv-name="Tên"
          disabled
        />
        <div class="form-tooltip-error" v-show="errors.has('Tên')">{{ errors.first('Tên') }}</div>
      </div>
    </div>
    <div class="col-sm-6">
      <div v-if="selectedMenu">
        <label>Đã chọn:</label>
        <a href="javascript:void(0)" @click="remove()" class="pull-right">
          <i class="fa fa-trash"></i>
        </a>
        <div class="media store-menu__item" style="margin:0">
          <div class="media-left media-middle" style="width:25%">
            <img class="media-object" :src="selectedMenu.image" style="width:100%" />
          </div>
          <div class="media-body">
            <h4 class="media-heading">{{ selectedMenu.name }}</h4>
          </div>
        </div>
      </div>
      <div v-else class="text-center">Chưa có lựa chọn</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ResourceService from "@CmsCore/vue/general/resources_service";

export default {
  name: "MultipleOrderItem",
  props: {
    storeId: {
      type: String,
      require: true
    },
    storeOrderId: {
      type: String,
      require: true
    }
  },
  computed: {
    ...mapState({
      selectedMenuItems: state => state.store.selectedMenuItems,
      user: state => state.user.user
    })
  },
  data() {
    return {
      orderItem: {},
      selectedMenu: null,
      orderItemService: new ResourceService(
        window.settings.services.webUrl + `/store_order_items`
      )
    };
  },
  methods: {
    initOrderItem() {
      this.selectedMenu = null;
      this.orderItem = {};

      this.orderItemService
        .index({
          storeOrder: this.storeOrderId,
          user: this.user._id,
          per_page: 1,
          sort: "createdAt|desc",
          populates: JSON.stringify(["storeMenu"])
        })
        .then(({ data }) => {
          let storeMenu = data.data[0] ? data.data[0].storeMenu : null;

          this.selectedMenu = storeMenu;
          this.orderItem = Object.assign({}, data.data[0] || {}, {
            orderer: this.user.name,
            user: this.user._id,
            storeOrder: this.storeOrderId,
            store: this.storeId,
            storeMenu: storeMenu && storeMenu._id
          });
        });
    },
    selectItem(item) {
      if (!this.user) {
        $("#lazy-register-modal").modal("show");
        return;
      }

      this.selectedMenu = item;
      toastr.success(`Đã chọn ${this.selectedMenu.name}!`);

      this.orderItem = Object.assign({}, this.orderItem, {
        storeMenu: this.selectedMenu._id,
        price: this.selectedMenu.price,
        note: this.selectedMenu.note,
        quantity: 1,
        total: this.selectedMenu.price
      });

      (this.orderItem._id
        ? this.orderItemService.update(this.orderItem._id, this.orderItem)
        : this.orderItemService.create(this.orderItem)
      )
        .then(({ data }) => {
          this.orderItem = data.data;
        })
        .catch(err => {
          toastr.error("Không thể thực hiện");
        });
    },
    remove() {
      if (this.orderItem._id) {
        this.orderItemService
          .delete(this.orderItem._id)
          .then(({ data }) => {
            this.initOrderItem();
          })
          .catch(err => {
            toastr.error("Không thể thực hiện");
          });
      }
    }
  },
  mounted() {
    this.$store.watch(
      state => state.user.user,
      (value, oldValue) => {
        if (!value) return;
        this.initOrderItem();
      }
    );

    this.$store.watch(
      state => state.store.selectedMenuItems,
      (value, oldValue) => {
        if (!value.length) return;
        this.selectItem(value.pop());
      }
    );
  }
};
</script>

<style>
</style>
