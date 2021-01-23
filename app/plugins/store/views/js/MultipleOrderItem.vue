<template>
  <div class="row">
    <div
      class="col-sm-6"
      v-for="(orderItem, index) in orderItems"
      :key="'order-item' + index"
    >
      <div class="form-group form-control-wrapper">
        <input
          type="hidden"
          class="form-control"
          v-model="orderItem.orderer"
          placeholder="Tên"
          v-validate="'required'"
          data-vv-name="Tên"
        />
        <div class="form-tooltip-error" v-show="errors.has('Tên')">
          {{ errors.first("Tên") }}
        </div>
      </div>

      <div v-if="orderItem.storeMenuObject">
        <div class="media store-menu__item" style="margin: 0">
          <a
            href="javascript:void(0)"
            @click="remove(orderItem._id)"
            class="pull-right"
          >
            <i class="fa fa-trash"></i>
          </a>
          <div class="media-left media-middle" style="width: 25%">
            <img
              class="media-object"
              :src="orderItem.storeMenuObject.image"
              style="width: 100%"
              alt=""
            />
          </div>
          <div class="media-body">
            <h4 class="media-heading">
              {{ orderItem.storeMenuObject.name }}
              {{ orderItem.quantity > 1 ? `(${orderItem.quantity})` : "" }}
            </h4>
            <div>
              <span class="text-danger">{{ orderItem.total | currency }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">Chưa có lựa chọn</div>

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
        <div class="form-tooltip-error" v-show="errors.has('Ghi chú')">
          {{ errors.first("Ghi chú") }}
        </div>
      </div>
    </div>

    <div class="col-sm-12" v-if="orderItems.length">
      <div class="text-right">
        <button type="button" class="btn btn-primary" @click="saveSelected()">
          <i class="fa fa-save"></i> Lưu lựa chọn
        </button>
      </div>
    </div>
    <div v-else class="col-sm-12 text-center">Hãy lựa chọn</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ResourceService from "@CmsCore/vue/general/resources_service";
import { last, first } from "lodash";

export default {
  name: "MultipleOrderItem",
  props: {
    storeId: {
      type: String,
      required: true,
    },
    storeOrderId: {
      type: String,
      required: true,
    },
    allowMultiple: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState({
      selectedMenuItems: (state) => state.store.selectedMenuItems,
      shouldRefreshOrder: (state) => state.store.shouldRefreshOrder,
      user: (state) => state.user.user,
    }),
  },
  data() {
    return {
      orderItemService: new ResourceService(
        window.settings.services.webUrl + `/store_order_items`
      ),
      orderItems: [],
      selectedMenus: [],
    };
  },
  methods: {
    initOrderItem() {
      this.orderItemService
        .index({
          storeOrder: this.storeOrderId,
          user: this.user._id,
          perPage: this.allowMultiple ? null : 1,
          sort: "createdAt|desc",
          populates: JSON.stringify(["storeMenu"]),
        })
        .then(({ data }) => {
          this.selectedMenus = [];
          this.orderItems = [];

          data.data.forEach((orderItem) => {
            let storeMenu = Object.assign(
              {
                name: orderItem.name,
                price: orderItem.price,
              },
              (orderItem && orderItem.storeMenu) || {}
            );
            this.selectedMenus.push(storeMenu);
            this.orderItems.push(
              Object.assign({}, orderItem || {}, {
                orderer: this.user.name,
                user: this.user._id,
                storeOrder: this.storeOrderId,
                store: this.storeId,
                storeMenu: storeMenu && storeMenu._id,
                storeMenuObject: storeMenu,
              })
            );
          });
        });
    },
    selectItem(selectedMenu, justSave = false) {
      if (!this.user) {
        $("#lazy-register-modal").modal("show");
        return;
      }

      let orderItem = this.allowMultiple
        ? first(
            this.orderItems.filter((item) => {
              return item.storeMenu == selectedMenu._id;
            })
          ) || {}
        : first(this.orderItems);

      orderItem.quantity = this.allowMultiple
        ? (orderItem.quantity || 0) + 1
        : 1;

      orderItem = Object.assign({}, orderItem, {
        storeMenu: selectedMenu._id,
        price: selectedMenu.price,
        total:
          this.allowMultiple && orderItem
            ? selectedMenu.price * orderItem.quantity
            : selectedMenu.price,
        itemStatus: "ordering",
        orderer: this.user.name,
        user: this.user._id,
        storeOrder: this.storeOrderId,
        store: this.storeId,
        name: selectedMenu.name,
      });

      (orderItem._id
        ? this.orderItemService.update(orderItem._id, orderItem)
        : this.orderItemService.create(orderItem)
      )
        .then(({ data }) => {
          if (this.allowMultiple) {
            this.orderItems.push(data.data);
            this.selectedMenus.push(selectedMenu);
          } else {
            this.orderItems = [data.data];
            this.selectedMenus = [selectedMenu];
          }

          if (justSave) {
            toastr.success(`Đã lưu lựa chọn!`);
          } else {
            toastr.success(`Đã chọn ${selectedMenu.name}!`);
          }
        })
        .catch((err) => {
          toastr.error("Không thể thực hiện thao tác này!");
        })
        .finally(() => {
          this.$store.dispatch("store/refreshOrder");
        });
    },
    saveSelected() {
      this.orderItems.forEach((orderItem) => {
        this.selectItem(orderItem.storeMenuObject, true);
      });
    },
    remove(id) {
      if (id) {
        this.orderItemService
          .delete(id)
          .catch((err) => {
            toastr.error("Không thể thực hiện thao tác này!");
          })
          .finally(() => {
            this.$store.dispatch("store/refreshOrder");
          });
      }
    },
  },
  mounted() {
    this.$store.watch(
      (state) => state.user.user,
      (value, oldValue) => {
        if (!value) return;
        this.initOrderItem();
      }
    );

    this.$store.watch(
      (state) => state.store.selectedMenuItems,
      (value, oldValue) => {
        if (!value.length) return;
        this.selectItem(last(value));
      }
    );

    this.$store.watch(
      (state) => state.store.shouldRefreshOrder,
      (value) => {
        if (value) {
          this.initOrderItem(true);
        }
      }
    );
  },
};
</script>

<style>
</style>
