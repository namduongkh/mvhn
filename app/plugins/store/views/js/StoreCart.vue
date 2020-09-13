<template>
  <div>
    <div v-if="selectedItems.length">
      <div class="panel-group" id="accordion">
        <div class="panel panel-default">
          <div
            class="panel-heading"
            data-toggle="collapse"
            data-parent="#accordion"
            href="#collapse-product"
          >
            <h3 class="panel-title">
              <i class="fa fa-boxes"></i> Sản phẩm
            </h3>
          </div>
          <div id="collapse-product" class="panel-collapse collapse in">
            <div class="panel-body">
              <div class="row cart-item" v-for="item in selectedItems" :key="item._id">
                <div class="col-sm-9">
                  <div class="row">
                    <div class="col-sm-3 col-xs-4">
                      <ImageAsAvatar :src="item.image" :alt="item.name" />
                    </div>
                    <div class="col-sm-9 col-xs-8">
                      <h3>{{ item.name }}</h3>
                      <div>
                        Giá:
                        <span class="text-danger">{{ item.price | currency }}</span>
                      </div>
                      <div>
                        Số lượng:
                        <a href="javascript:void(0)" @click="changeQuantity(item, -1)">
                          <i class="fa fa-minus-circle"></i>
                        </a>
                        <input
                          v-model="item.quantity"
                          type="number"
                          min="1"
                          step="1"
                          style="width:5em;text-align:center;display:inline"
                          @keyup="calculateTotal(item)"
                          @change="calculateTotal(item)"
                          class="form-control"
                        />
                        <a href="javascript:void(0)" @click="changeQuantity(item, 1)">
                          <i class="fa fa-plus-circle"></i>
                        </a>
                      </div>
                      <div v-if="item.type == 'service'">
                        Thời gian:
                        <datetime
                          v-model="item.startTime"
                          v-validate="'required'"
                          data-vv-name="Thời gian"
                          type="datetime"
                          format="dd/MM/yyyy HH:mm"
                          :minute-step="60"
                          :auto="true"
                          :phrases="{ok: 'OK', cancel: 'Hủy'}"
                          input-style="width:150px;display:inline;"
                          input-class="form-control"
                          :min-datetime="minDatetime"
                        ></datetime>
                        <div
                          class="form-tooltip-error"
                          v-show="errors.has('Thời gian')"
                        >{{ errors.first('Thời gian') }}</div>
                      </div>
                      <div v-if="item.orderer">Người đặt: {{ item.orderer }}</div>
                      <div v-if="item.note">Ghi chú: {{ item.note }}</div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-3 text-right">
                  <a href="javascript:void(0)" @click="removeOrderItems(item)">
                    <i class="fa fa-trash"></i>
                  </a>
                  <h3 class="text-danger">{{ item.total | currency }}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="inPlace == false" class="panel panel-default">
          <div
            class="panel-heading"
            data-toggle="collapse"
            data-parent="#accordion"
            href="#collapse-delivery"
          >
            <h3 class="panel-title">
              <i class="fa fa-map-marker-alt"></i> Thông tin giao hàng
            </h3>
          </div>
          <div id="collapse-delivery" class="panel-collapse collapse">
            <div class="panel-body">
              <div class="row">
                <div class="col-sm-6 col-xs-6">
                  <div class="form-group form-control-wrapper">
                    <label>Người nhận</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Người nhận"
                      data-vv-name="Người nhận"
                      class="form-control"
                      v-validate="'required'"
                      v-model="order.deliveryPeople"
                    />
                    <div
                      class="form-tooltip-error"
                      v-show="errors.has('Người nhận')"
                    >{{ errors.first('Người nhận') }}</div>
                  </div>
                </div>
                <div class="col-sm-6 col-xs-6">
                  <div class="form-group form-control-wrapper">
                    <label>Số điện thoại</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Số điện thoại"
                      data-vv-name="Số điện thoại"
                      class="form-control"
                      v-validate="'required'"
                      v-model="order.deliveryPhone"
                    />
                    <div
                      class="form-tooltip-error"
                      v-show="errors.has('Số điện thoại')"
                    >{{ errors.first('Số điện thoại') }}</div>
                  </div>
                </div>
                <div class="col-sm-12 col-xs-12">
                  <div class="form-group form-control-wrapper">
                    <label>Địa chỉ</label>
                    <PlaceFinder
                      data-vv-name="Địa chỉ"
                      v-validate="'required'"
                      v-model="order.deliveryAddress"
                    />
                    <div
                      class="form-tooltip-error"
                      v-show="!order.deliveryAddress && errors.has('Địa chỉ')"
                    >{{ errors.first('Địa chỉ') }}</div>
                  </div>
                </div>
                <div class="col-sm-12 col-xs-12">
                  <div class="form-group form-control-wrapper">
                    <label>Ghi chú</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Ghi chú"
                      data-vv-name="Ghi chú"
                      class="form-control"
                      v-model="order.note"
                    />
                    <div
                      class="form-tooltip-error"
                      v-show="errors.has('Ghi chú')"
                    >{{ errors.first('Ghi chú') }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="inPlace == false" class="panel panel-default">
          <div
            class="panel-heading"
            data-toggle="collapse"
            data-parent="#accordion"
            href="#collapse-payment"
          >
            <h3 class="panel-title">
              <i class="fa fa-credit-card"></i> Thông tin thanh toán
            </h3>
          </div>
          <div id="collapse-payment" class="panel-collapse collapse">
            <div class="panel-body">
              <div class="row">
                <div class="col-sm-10 col-xs-9">
                  <div class="form-group form-control-wrapper">
                    <label>Voucher</label>
                    <input
                      type="text"
                      name="voucher"
                      placeholder="Voucher code"
                      data-vv-name="Voucher"
                      class="form-control"
                      v-model="order.voucherCode"
                    />
                    <div
                      class="form-tooltip-error"
                      v-show="errors.has('Voucher')"
                    >{{ errors.first('Voucher') }}</div>

                    <div
                      v-if="appliedVoucher"
                      class="text-danger"
                    >Đã áp dụng voucher {{ order.voucherCode }}</div>
                  </div>
                </div>
                <div class="col-sm-2 col-xs-3">
                  <label>&nbsp;</label>
                  <br />
                  <a
                    href="javascript:void(0)"
                    class="btn btn-default test-voucher btn-block btn-info"
                    @click="testVoucher()"
                  >
                    <i class="fa fa-refresh"></i>
                  </a>
                </div>
                <div class="col-sm-12">
                  <input type="radio" v-model="order.paymentMethod" value="COD" :checked="true" />
                  <label>Khi nhận hàng (COD)</label>
                  <br />
                  <input type="radio" v-model="order.paymentMethod" disabled />
                  <label>Ví điện tử (Momo, AirPay...)</label>
                  <br />
                  <input type="radio" v-model="order.paymentMethod" disabled />
                  <label>Internet Banking</label>
                  <br />
                  <input type="radio" v-model="order.paymentMethod" disabled />
                  <label>Visa / Master Card</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-sm-12 text-right">
            <h3 class="text-right">
              <small>Giá trị đơn hàng:</small>
              <input type="hidden" v-model="order.total" />
              <span class="text-danger" v-if="appliedVoucher">{{ order.reduceTotal | currency }}</span>
              <span class="text-danger" v-else>{{ order.total | currency }}</span>
            </h3>
          </div>
          <div class="col-sm-12">
            <button
              type="button"
              @click="submitOrder()"
              class="btn btn-success btn-lg btn-block"
              :disabled="isSubmitting || (order && order.orderStatus != 'ordering')"
            >
              <i class="fa fa-file-invoice"></i>
              Gửi đơn hàng
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="panel panel-default">
      <div class="panel-body text-center">Chưa có lựa chọn, hãy tiếp tục mua sắm!</div>
    </div>
  </div>
</template>
<script>
import ResourceService from "@CmsCore/vue/general/resources_service";
import moment from "moment";
import { sumBy, last } from "lodash";
import StoreMenu from "./StoreMenu";
import { mapState } from "vuex";
import PlaceFinder from "@/place/views/js/PlaceFinder";

export default {
  name: "StoreCart",
  components: {
    StoreMenu,
    PlaceFinder,
  },
  props: {
    storeId: {
      type: String,
    },
    storeOrderId: {
      type: String,
    },
    enableOnSelectItem: {
      type: Boolean,
      default: true,
    },
    inPlace: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      orderService: new ResourceService(
        window.settings.services.webUrl + `/store_orders`
      ),
      orderItemService: new ResourceService(
        window.settings.services.webUrl + `/store_order_items`
      ),
      voucherService: new ResourceService(
        window.settings.services.webUrl + `/store_vouchers`
      ),
      order: {},
      selectedItems: [],
      isSubmitting: false,
      appliedVoucher: false,

      minDatetime: moment().add(1, "hour").toISOString(),
    };
  },
  computed: {
    ...mapState({
      selectedMenuItems: (state) => state.store.selectedMenuItems,
      shouldRefreshOrder: (state) => state.store.shouldRefreshOrder,
      user: (state) => state.user.user,
    }),
  },
  methods: {
    initOrder() {
      return this.orderService
        .member(
          "ordering",
          "GET",
          {},
          {
            params: {
              store: this.storeId,
              storeOrder: this.storeOrderId,
            },
          }
        )
        .then(({ data }) => {
          this.order = data;
          this.selectedItems = data.storeOrderItems.map(function (item) {
            let newItem = Object.assign(
              {},
              item,
              {
                ...item.storeMenu,
              },
              {
                _id: item._id,
              }
            );
            return newItem;
          });
        });
    },
    removeOrderItems(item) {
      if (!confirm("Mặt hàng sẽ không còn trong giỏ hàng?")) return;

      this.orderItemService
        .delete(item._id)
        .catch(() => {
          toastr.error("Không thể thực hiện thao tác này!");
        })
        .finally(() => {
          this.$store.dispatch("store/refreshOrder");
        });
    },
    changeQuantity(item, quantity) {
      let nextQuantity = Number(item.quantity) + quantity;
      if (nextQuantity < 1) return;
      item.quantity = nextQuantity;
      this.calculateTotal(item);
    },
    calculateTotal(item) {
      item.total = item.quantity * item.price;
      this.$forceUpdate();
    },
    calculateOrderTotal() {
      this.order.total = sumBy(this.selectedItems, "total");
    },
    saveOrder(orderStatus = null, callback = null) {
      callback = callback || function () {};

      this.orderItemService
        .member("bulkCreate", "POST", {
          storeOrderId: this.order._id,
          storeOrderItems: this.selectedItems.map(
            function (item) {
              return {
                store: this.order.store,
                storeOrder: this.order._id,
                storeMenu: item.storeMenu,
                price: item.price,
                note: item.note,
                quantity: item.quantity,
                total: item.total,
                type: item.type,
                startTime: item.startTime,
                itemStatus: this.itemStatus(orderStatus),
                user: item.user,
                orderer: item.orderer,
              };
            }.bind(this)
          ),
        })
        .then(({ data }) => {
          if (data) {
            this.order.storeOrderItems = data;
            return this.changeOrderStatus(orderStatus);
          } else {
            return { data: this.order };
          }
        })
        .then(({ data }) => {
          callback();
        });
    },
    changeOrderStatus(orderStatus = null) {
      this.order.orderStatus = orderStatus || this.order.orderStatus;
      return this.orderService.update(this.order._id, this.order);
    },
    submitOrder() {
      if (!this.order.storeOrderItems.length) {
        toastr.error("Vui lòng chọn ít nhất 1 mặt hàng!");
        return;
      }

      this.$validator.validateAll().then((result) => {
        if (result) {
          this.isSubmitting = true;
          this.saveOrder(
            "ordered",
            function () {
              this.order = {};
              this.initOrder();
              this.isSubmitting = false;
              this.$store.dispatch("store/loadMyOrder", true);
              CommonJS.notifyPopup(`
                <div class="text-center">
                  <div style="font-size:5em">🎉</div>
                  <h3 class="text-success">Đặt hàng thành công!</h3>
                  <p>Bạn có thể theo dõi đơn hàng trong mục <b>Đơn hàng</b></p>
                  <p>
                    Đơn hàng sẽ được tách nhỏ nếu các sản phẩm không cùng một nhà cung cấp, các ưu đãi nếu có sẽ được áp dụng chia đều.
                  </p>
                </div>
              `);
            }.bind(this)
          );
        } else {
          this.$emit("validate");
          toastr.warning("Vui lòng kiểm tra thông tin đơn hàng.");

          $(".form-tooltip-error").closest(".panel-collapse").collapse("show");
        }
      });
    },
    itemStatus(status) {
      switch (status) {
        case "ordered":
          return "ordered";
        default:
          return "ordering";
      }
    },
    addSelectedMenuItemToOrder(menuItem) {
      if (this.user) {
        this.orderItemService
          .index({
            storeMenu: menuItem._id,
            storeOrder: this.order._id,
            perPage: 1,
          })
          .then(({ data }) => {
            let item = data.data[0] || {
              store: this.order.store,
              storeOrder: this.order._id,
              storeMenu: menuItem._id,
              price: menuItem.price,
              quantity: 0,
              type: menuItem.type,
              itemStatus: this.itemStatus(this.order.orderStatus),
            };

            item.quantity += 1;
            this.calculateTotal(item);

            return item._id
              ? this.orderItemService.update(item._id, item)
              : this.orderItemService.create(item);
          })
          .then(({ data }) => {
            toastr.success("Đã thêm vào giỏ hàng của bạn!");
            this.$store.dispatch("store/refreshOrder");
          })
          .catch(() => {
            toastr.error("Không thể thực hiện thao tác này!");
          });
      } else {
        toastr.info("Vui lòng đăng nhập để tiếp tục.");
        $(".auth-panel__opener").click();
      }
      this.$store.dispatch("store/clearMenuItems");
    },
    testVoucher() {
      if (!this.order.voucherCode) return;

      this.voucherService
        .member(
          "reduce",
          "GET",
          {},
          {
            params: {
              voucherCode: this.order.voucherCode,
              amount: this.order.total,
            },
          }
        )
        .then(({ data }) => {
          this.appliedVoucher = data.status;

          if (data.status) {
            this.order.reduceTotal = data.data;
          } else {
            toastr.error(data.message);
          }
        });
    },
  },
  watch: {
    selectedItems: {
      deep: true,
      handler(val) {
        this.calculateOrderTotal();
        this.$store.dispatch(
          "store/numberOfCartItems",
          this.selectedItems.length
        );
      },
    },
  },
  mounted() {
    this.$store.watch(
      (state) => state.user.user,
      (value, oldValue) => {
        if (!value) return;
        this.initOrder();
      }
    );

    if (this.enableOnSelectItem) {
      this.$store.watch(
        (state) => state.store.selectedMenuItems,
        (value, oldValue) => {
          if (!value.length) return;
          this.addSelectedMenuItemToOrder(last(value));
        }
      );
    }

    this.$store.watch(
      (state) => state.store.shouldRefreshOrder,
      (value) => {
        if (value) {
          this.initOrder();
        }
      }
    );
  },
  created() {
    if (this.user && this.storeOrderId) {
      this.initOrder();
    }
  },
};
</script>
<style>
.vdatetime {
  display: inline;
}
</style>
