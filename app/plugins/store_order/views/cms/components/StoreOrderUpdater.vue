<template>
  <div>
    <div :id="'update-modal'" :class="{'modal fade': modalMode}" role="dialog">
      <div :class="{'modal-dialog': modalMode}">
        <!-- Modal content-->
        <div :class="{'modal-content': modalMode}">
          <table class="table table-bordered">
            <tr>
              <td>
                <b>Trạng thái</b>
              </td>
              <td v-html="$options.filters.orderStatusText(order.orderStatus)"></td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button
                  type="button"
                  @click="updateStatusTo('active')"
                  class="btn btn-block btn-primary-outline"
                  v-if="order.orderStatus == 'ordered'"
                >
                  <i class="fa fa-check"></i>
                  Tiếp nhận đơn hàng
                </button>
                <button
                  type="button"
                  @click="updateStatusTo('ready')"
                  class="btn btn-block btn-primary-outline"
                  v-if="order.orderStatus == 'active'"
                >
                  <i class="fa fa-check"></i>
                  Đã xử lý xong
                </button>
                <button
                  type="button"
                  @click="updateStatusTo('delivering')"
                  class="btn btn-block btn-primary-outline"
                  v-if="order.orderStatus == 'ready'"
                >
                  <i class="fa fa-check"></i>
                  Bàn giao vận chuyển
                </button>
                <button
                  type="button"
                  @click="updateStatusTo('done')"
                  class="btn btn-block btn-success-outline"
                  :disabled="['cancel', 'done'].includes(order.orderStatus)"
                >
                  <i class="fa fa-check"></i>
                  Hoàn thành đơn hàng
                </button>
                <button
                  type="button"
                  @click="updateStatusTo('cancel')"
                  class="btn btn-block btn-danger-outline"
                  :disabled="['cancel', 'done'].includes(order.orderStatus)"
                >
                  <i class="fa fa-remove"></i>
                  Hủy đơn hàng
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResourcesService from "@general/resources_service";
import { orderStatusText } from "@Plugin/store_order/views/cms/components/filters";

export default {
  name: "StoreOrderUpdater",
  props: {
    order: {
      type: Object,
      required: true,
    },
    modalMode: {
      type: Boolean,
      default: true,
    },
    serviceUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      service: new ResourcesService(this.serviceUrl),
      cloneOrder: {},
    };
  },
  methods: {
    updateStatusTo(status) {
      if (!confirm(`Are you sure to change the status to '${status}'`)) return;

      this.service
        .update(this.order._id, {
          orderStatus: status,
        })
        .then(({ data }) => {
          this.$notify("Updated!", { type: "success" });
          this.$emit("updated", data.data);
          // this.cloneOrder = data.data;
        });
    },
  },
  filters: { orderStatusText },
  // watch: {
  //   order: {
  //     deep: true,
  //     handler(order) {
  //       this.cloneOrder.orderStatus = order;
  //     }
  //   }
  // }
};
</script>

<style>
</style>
