<template>
  <div>
    <div id="my-order-modal" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Đơn hàng của tôi</h4>
          </div>
          <div class="modal-body"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResourceService from "@CmsCore/vue/general/resources_service";
import AuthService from "@/user/views/js/auth_service";

export default {
  name: "MyOrder",
  data() {
    return {
      user: null,
      orders: [],
      orderService: new ResourceService(
        window.settings.services.webUrl + `/store_orders`
      ),
      authService: new AuthService()
    };
  },
  methods: {
    index() {
      this.orderService.index().then(({ data }) => {
        this.orders = data;
      });
    }
  },
  created() {
    this.authService.account().then(({ data }) => {
      if (data._id) {
        this.user = data;
        this.index();
      }
    });
  }
};
</script>

<style>
</style>