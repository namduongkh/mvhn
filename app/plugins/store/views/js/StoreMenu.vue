<template>
  <div>
    <button
      type="button"
      class="btn btn-success btn-lg store-menu-modal__opener"
      data-toggle="modal"
      :data-target="user._id ? '#store-menu-modal' : '#auth-modal'"
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
                <div class="media store-menu__item" @click="addOrderItems(menu)">
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
              Giỏ hàng ({{ order && order.storeOrderItems && order.storeOrderItems.length }})
            </a>
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
              Giỏ hàng
            </h4>
          </div>
          <div class="modal-body">
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
                        disabled
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
            </div>
            <div v-else class="text-center">Chưa có mặt hàng</div>
          </div>
          <div class="modal-footer">
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ResourceService from "@CmsCore/vue/general/resources_service";
import AuthService from "@/user/views/js/auth_service";
import Axios from "axios";
import { sumBy } from "lodash";

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
      orderService: new ResourceService(
        window.settings.services.webUrl + `/store_orders`
      ),
      orderItemService: new ResourceService(
        window.settings.services.webUrl + `/store_order_items`
      ),
      menus: [],
      order: {},
      user: {},
      authService: new AuthService(),
      selectedItems: [],
      isSubmitting: false
    };
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
    index() {
      this.service
        .index({
          status: 1
        })
        .then(({ data }) => {
          this.menus = data.data;
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
      toastr.success("Đã thêm vào đơn hàng của bạn!");
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
      this.isSubmitting = true;
      this.saveOrder(
        "ordered",
        function() {
          toastr.success("Đơn hàng đã được gửi đến cửa hàng!");
          this.initOrder();
          this.isSubmitting = false;
        }.bind(this)
      );
    },
    itemStatus(status) {
      switch (status) {
        case "ordered":
          return "ordered";
        default:
          return "ordering";
      }
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
  created() {
    this.index();
    this.authService.account().then(({ data }) => {
      if (data._id) {
        this.user = data;
        this.initOrder();
      }
    });
  }
};
</script>