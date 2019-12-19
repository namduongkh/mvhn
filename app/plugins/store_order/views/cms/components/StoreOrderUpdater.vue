<template>
  <div>
    <div :id="'update-modal'" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-body text-center">
            <button
              type="button"
              @click="updateStatusTo('active')"
              class="btn btn-primary-outline"
              :disabled="order.orderStatus != 'ordered'"
            >
              <i class="fa fa-check"></i>
              Nhận đơn
            </button>
            <i class="fa fa-arrow-right"></i>
            Đang xử lý
            <i class="fa fa-arrow-right"></i>
            <button
              type="button"
              @click="updateStatusTo('delivering')"
              class="btn btn-primary-outline"
              :disabled="order.orderStatus != 'ready'"
            >
              <i class="fa fa-check"></i>
              Vận chuyển
            </button>
            <i class="fa fa-arrow-right"></i>
            Đang vận chuyển
            <i class="fa fa-arrow-right"></i>
            <button
              type="button"
              @click="updateStatusTo('done')"
              class="btn btn-primary-outline"
              :disabled="['cancel', 'done'].includes(order.orderStatus)"
            >
              <i class="fa fa-check"></i>
              Hoàn thành
            </button>
            <br />
            <br />
            <button
              type="button"
              @click="updateStatusTo('cancel')"
              class="btn btn-danger-outline"
              :disabled="['cancel', 'done'].includes(order.orderStatus)"
            >
              <i class="fa fa-remove"></i>
              Hủy đơn
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResourcesService from "@general/resources_service";

export default {
  name: "StoreOrderUpdater",
  props: {
    order: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      service: new ResourcesService(
        `${CMS_URL}/store_orders`
      ),
      cloneOrder: {}
    };
  },
  methods: {
    updateStatusTo(status) {
      if (!confirm(`Are you sure to change the status to '${status}'`)) return;

      this.service
        .update(this.order._id, {
          orderStatus: status
        })
        .then(({ data }) => {
          this.$notify("Updated!", { type: "success" });
          this.$emit("updated", data.data);
          // this.cloneOrder = data.data;
        });
    }
  }
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
