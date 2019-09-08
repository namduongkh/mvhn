<template>
  <div>
    <div v-if="selectedItems.length">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th colspan="2">Mặt hàng</th>
            <th>Thành tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in selectedItems" :key="item._id">
            <td style="width:120px">
              <img class="img-responsive" :src="item.image" style="100%" />
            </td>
            <td>
              <h4>{{ item.name }}</h4>
              Giá: {{ item.price }} đ
              <br />Số lượng:
              <input
                v-model="item.quantity"
                type="number"
                min="1"
                step="1"
                style="width:50px"
                @keyup="calculateTotal(item)"
                @change="calculateTotal(item)"
              />
            </td>
            <td>{{ item.total }} đ</td>
            <td>
              <button type="button" class="btn btn-default" @click="removeOrderItems(item)">
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right">Tổng tiền: {{ order.total }} đ</div>
      <hr />
      <form class="row">
        <div class="col-sm-12">
          <h3>Thông tin giao hàng</h3>
        </div>
        <div class="col-sm-6">
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
        <div class="col-sm-6">
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
        <div class="col-sm-12">
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
        <!---->
        <div class="col-sm-12">
          <h3>Phương thức thanh toán</h3>
          <input type="radio" v-model="order.paymentMethod" value="COD" :checked="true" />
          <label>Khi nhận hàng (COD)</label>
          <br />
          <input type="radio" v-model="order.paymentMethod" disabled />
          <label>Ví điện tử (Momo, AriPay...)</label>
          <br />
          <input type="radio" v-model="order.paymentMethod" disabled />
          <label>Internet Banking</label>
          <br />
          <input type="radio" v-model="order.paymentMethod" disabled />
          <label>Visa / Master Card</label>
        </div>
        <div class="col-sm-12 text-right">
          <a
            href="javascript:void(0)"
            @click="submitOrder()"
            class="btn btn-primary"
            :disabled="isSubmitting"
          >
            <i class="fa fa-file-invoice"></i>
            Đặt hàng
          </a>
        </div>
      </form>
    </div>
    <div v-else class="text-center">Chưa có mặt hàng</div>
  </div>
</template>
<script>
import ResourceService from "@CmsCore/vue/general/resources_service";
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
      require: true
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
      isSubmitting: false
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
            }.bind(this)
          );
        } else {
          this.$emit("validate");
          toastr.warning("Vui lòng kiểm tra thông tin đơn hàng.");
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