<template>
  <div>
    <div class="row" v-if="orders.length">
      <div class="col-sm-12" v-for="order in orders" :key="order._id">
        <div class="card">
          <div class="card-body row">
            <div class="col-2">
              <ImageAsAvatar
                :src="order.store && order.store.logo"
                :alt="order.store && order.store.name"
              />
            </div>
            <div class="col-10">
              <ul>
                <li v-if="order.type == 'multiple'">
                  <span class="label label-info">Đơn mua chung</span>
                  <a :href="'/store_orders/' + order._id">{{ order.orderName }}</a>
                </li>
                <li>
                  Cửa hàng:
                  <a
                    :href="'/stores/' + (order.store && order.store.slug)"
                  >{{ order.store && order.store.name }}</a>
                </li>
                <li>
                  Tổng tiền:
                  <span
                    class="text-danger"
                  >{{ (order.reduceTotal || order.total) | currency }}</span>
                </li>
                <li>
                  Tình trạng đơn hàng:
                  <span
                    v-html="$options.filters.orderStatusText(order.orderStatus)"
                  ></span>
                </li>
                <li
                  v-if="order.orderStatus != 'ordering' && order.deliveryPeople"
                >Nhận hàng: {{ order.deliveryPeople }} - {{ order.deliveryPhone }} - {{ order.deliveryAddress }}</li>
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
import { orderStatusText } from "@Plugin/store_order/views/cms/filters";

export default {
  name: "MyOrder",
  data() {
    return {
      orders: [],
      orderService: new ResourceService(
        window.settings.services.webUrl + `/store_orders`
      ),
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      shouldLoadMyOrder: (state) => state.store.shouldLoadMyOrder,
    }),
  },
  filters: {
    orderStatusText,
  },
  methods: {
    index() {
      this.orderService.index().then(({ data }) => {
        this.orders = data;
      });
    },
  },
  created() {
    this.$store.watch(
      (state) => state.user.user,
      (user) => {
        this.index();
      }
    );
    this.$store.watch(
      (state) => state.store.shouldLoadMyOrder,
      (value) => {
        if (value && this.user) {
          this.index();
          this.$store.dispatch("store/loadMyOrder", false);
        }
      }
    );
  },
};
</script>

<style>
</style>
