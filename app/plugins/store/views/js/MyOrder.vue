<template>
  <div>
    <div class="row" v-if="orders.length">
      <div class="col-sm-12" v-for="order in orders" :key="order._id">
        <div class="panel panel-default">
          <div class="panel-body row">
            <div class="col-xs-2">
              <img
                :src="order.store && order.store.logo"
                :alt="order.store && order.store.name"
                style="width:100%"
                class="img-rounded img-responsive"
              />
            </div>
            <div class="col-xs-10">
              <ul>
                <li>
                  ID:
                  <a :href="'/store_orders/' + order._id">{{ order._id }}</a>
                </li>
                <li>
                  Cửa hàng:
                  <strong>{{ order.store && order.store.name }}</strong>
                </li>
                <li>
                  Tình trạng đơn hàng:
                  <span
                    v-html="$options.filters.orderStatus(order.orderStatus)"
                  ></span>
                </li>
                <li>Nhận hàng: {{ order.deliveryPeople }} - {{ order.deliveryPhone }} - {{ order.deliveryAddress }}</li>
                <li>Ngày tạo: {{ order.createdAt | formatDate }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">Chưa có đơn hàng</div>
  </div>
</template>

<script>
import ResourceService from "@CmsCore/vue/general/resources_service";
import { mapState, mapGetters } from "vuex";

export default {
  name: "MyOrder",
  data() {
    return {
      orders: [],
      orderService: new ResourceService(
        window.settings.services.webUrl + `/store_orders`
      )
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      shouldLoadMyOrder: state => state.store.shouldLoadMyOrder
    })
  },
  filters: {
    orderStatus(status) {
      return {
        ordering: '<span class="label label-default">Đang chọn hàng</span>',
        ordered: '<span class="label label-primary">Đã đặt hàng</span>',
        active: '<span class="label label-success">Đang xử lý</span>',
        ready: '<span class="label label-info">Đã sẵn sàng</span>',
        delivering: '<span class="label label-success">Đang vận chuyển</span>',
        delivered: '<span class="label label-secondary">Đã vận chuyển</span>',
        done: '<span class="label label-default">Hoàn thành</span>',
        cancel: '<span class="label label-danger">Đã hủy bỏ</span>'
      }[status];
    }
  },
  methods: {
    index() {
      this.orderService.index().then(({ data }) => {
        this.orders = data;
      });
    }
  },
  created() {
    this.$store.watch(
      state => state.user.user,
      user => {
        this.index();
      }
    );
    this.$store.watch(
      state => state.store.shouldLoadMyOrder,
      value => {
        if (value && this.user) {
          this.index();
          this.$store.dispatch("store/shouldLoadMyOrder", false);
        }
      }
    );
  }
};
</script>

<style>
</style>
