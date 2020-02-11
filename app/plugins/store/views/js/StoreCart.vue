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
                    <div class="col-xs-4">
                      <img class="img-responsive" :src="item.image" style="100%" />
                    </div>
                    <div class="col-xs-8">
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
                          style="width:50px;display:inline"
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
        <div class="panel panel-default">
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
                    <input
                      type="text"
                      name="address"
                      placeholder="Địa chỉ"
                      data-vv-name="Địa chỉ"
                      class="form-control"
                      v-validate="'required'"
                      v-model="order.deliveryAddress"
                    />
                    <div
                      class="form-tooltip-error"
                      v-show="errors.has('Địa chỉ')"
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
        <div class="panel panel-default">
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
              <span class="text-danger">{{ order.total | currency }}</span>
            </h3>
          </div>
          <div class="col-sm-12">
            <a
              href="javascript:void(0)"
              @click="submitOrder()"
              class="btn btn-success btn-lg btn-block"
              :disabled="isSubmitting"
            >
              <i class="fa fa-file-invoice"></i>
              Gửi đơn hàng
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">Chưa có mặt hàng</div>
  </div>
</template>
<script>
import ResourceService from "@CmsCore/vue/general/resources_service";
import moment from "moment";
import { sumBy } from "lodash";
import StoreMenu from "./StoreMenu";
import { mapState } from "vuex";

export default {
  name: "StoreCart",
  components: {
    StoreMenu
  },
  props: {
    storeId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      orderService: new ResourceService(
        window.settings.services.webUrl + `/store_orders`
      ),
      orderItemService: new ResourceService(
        window.settings.services.webUrl + `/store_order_items`
      ),
      order: {},
      selectedItems: [],
      isSubmitting: false,

      minDatetime: moment()
        .add(1, "hour")
        .toISOString()
    };
  },
  computed: {
    ...mapState({
      selectedMenuItems: state => state.store.selectedMenuItems,
      user: state => state.user.user
    })
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
              store: this.storeId
            }
          }
        )
        .then(({ data }) => {
          this.order = data;
          this.selectedItems = data.storeOrderItems.map(function(item) {
            let newItem = Object.assign({}, item, {
              ...item.storeMenu
            });
            return newItem;
          });
        });
    },
    removeOrderItems(item) {
      if (!confirm("Mặt hàng sẽ không còn trong giỏ hàng?")) return;

      let index = this.getIndex(item);
      this.selectedItems.splice(index, 1);
      this.saveOrder();
    },
    addOrderItems(item) {
      item = Object.assign({}, item);
      let index = this.getIndex(item);
      if (index != -1) {
        this.selectedItems[index].quantity += 1;
        this.calculateTotal(this.selectedItems[index]);
      } else {
        item.quantity = 1;
        this.selectedItems.push(item);
        this.calculateTotal(item);
      }
      toastr.success("Đã thêm vào giỏ hàng của bạn!");
      this.saveOrder();
    },
    getIndex(item) {
      let index = -1;
      for (let i in this.selectedItems) {
        let _item = this.selectedItems[i];
        if (item._id.toString() == _item._id.toString()) {
          index = i;
          break;
        }
      }
      return index;
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
      this.orderItemService
        .member("bulkCreate", "POST", {
          storeOrderId: this.order._id,
          storeOrderItems: this.selectedItems.map(
            function(item) {
              return {
                store: this.storeId,
                storeOrder: this.order._id,
                storeMenu: item._id,
                price: item.price,
                note: item.note,
                quantity: item.quantity,
                total: item.total,
                type: item.type,
                startTime: item.startTime,
                itemStatus: this.itemStatus(orderStatus)
              };
            }.bind(this)
          )
        })
        .then(({ data }) => {
          if (data) {
            this.order.storeOrderItems = data;
            this.order.orderStatus = orderStatus || this.order.orderStatus;
            return this.orderService.update(this.order._id, this.order);
          } else {
            return { data: this.order };
          }
        })
        .then(({ data }) => {
          this.order = data.data;
          callback = callback || function() {};
          callback();
        });
    },
    submitOrder() {
      if (!this.order.storeOrderItems.length) {
        toastr.error("Vui lòng chọn ít nhất 1 mặt hàng!");
        return;
      }

      this.$validator.validateAll().then(result => {
        if (result) {
          this.isSubmitting = true;
          this.saveOrder(
            "ordered",
            function() {
              toastr.success("Đơn hàng đã được gửi đến cửa hàng!");
              this.initOrder();
              this.isSubmitting = false;
              this.$store.dispatch("store/shouldLoadMyOrder", true);
            }.bind(this)
          );
        } else {
          this.$emit("validate");
          toastr.warning("Vui lòng kiểm tra thông tin đơn hàng.");

          $(".form-tooltip-error")
            .closest(".panel-collapse")
            .collapse("show");
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
    addSelectedMenuItemsToOrder() {
      if (this.user) {
        for (let i in this.selectedMenuItems) {
          let item = this.selectedMenuItems[i];
          this.addOrderItems(item);
        }
      } else {
        toastr.info("Vui lòng đăng nhập để tiếp tục.");
        $(".auth-panel__opener").click();
      }
      this.$store.dispatch("store/clearMenuItems");
    }
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
      }
    }
  },
  mounted() {
    this.$store.watch(
      state => state.user.user,
      (value, oldValue) => {
        if (!value) return;
        this.initOrder();
      }
    );
    this.$store.watch(
      state => state.store.selectedMenuItems,
      (value, oldValue) => {
        if (!value.length) return;
        this.addSelectedMenuItemsToOrder();
      }
    );
  }
};
</script>
<style>
.vdatetime {
  display: inline;
}
</style>
