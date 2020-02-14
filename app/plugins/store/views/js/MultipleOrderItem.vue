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
      <div class="form-group form-control-wrapper">
        <label>Ghi chú:</label>
        <input
          type="text"
          class="form-control"
          v-model="orderItem.note"
          placeholder="Ghi chú"
          v-validate="'required'"
          data-vv-name="Ghi chú"
        />
        <div class="form-tooltip-error" v-show="errors.has('Ghi chú')">{{ errors.first('Ghi chú') }}</div>
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
        <div class="text-right">
          <br />
          <button type="button" class="btn btn-primary" @click="selectItem(selectedMenu, true)">
            <i class="fa fa-save"></i>
          </button>
        </div>
      </div>
      <div v-else class="text-center">Chưa có lựa chọn</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ResourceService from "@CmsCore/vue/general/resources_service";
import { last } from "lodash";

export default {
  name: "MultipleOrderItem",
  props: {
    storeId: {
      type: String,
      required: true
    },
    storeOrderId: {
      type: String,
      required: true
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
      this.orderItem = {
        orderer: this.user.name
      };

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
    selectItem(selectedMenu, justSave = false) {
      if (!this.user) {
        $("#lazy-register-modal").modal("show");
        return;
      }

      this.orderItem = Object.assign({}, this.orderItem, {
        storeMenu: selectedMenu._id,
        price: selectedMenu.price,
        quantity: 1,
        total: selectedMenu.price
      });

      (this.orderItem._id
        ? this.orderItemService.update(this.orderItem._id, this.orderItem)
        : this.orderItemService.create(this.orderItem)
      )
        .then(({ data }) => {
          this.orderItem = data.data;
          this.selectedMenu = selectedMenu;
          if (justSave) {
            toastr.success(`Đã lưu lựa chọn!`);
          } else {
            toastr.success(`Đã chọn ${this.selectedMenu.name}!`);
          }
        })
        .catch(err => {
          toastr.error("Không thể thực hiện");
        })
        .finally(() => {
          this.$store.dispatch("store/refreshOrder", true);
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
        this.selectItem(last(value));
      }
    );
  }
};
</script>

<style>
</style>
