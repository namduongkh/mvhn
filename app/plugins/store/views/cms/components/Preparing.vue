<template>
  <div class="page-content">
    <div class="container-fluid">
      <StorePanel v-if="store" :store="store._id"></StorePanel>
      <div class="box-typical box-typical-padding">
        <ul class="list-group">
          <li
            v-for="item in preparings"
            :key="item._id"
            class="list-group-item list-group-item-success"
          >
            <strong>{{ item.storeMenu && item.storeMenu.name }}</strong>
            <span>[{{ item.storeOrder && item.storeOrder.storeTable && item.storeOrder.storeTable.name }}]</span>
            <span>-</span>
            <em>{{ item.createdAt | timeForm }}</em>
            <span class="badge badge-primary badge-pill">{{ item.quantity }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import ResourcesService from "@general/resources_service";

export default {
  name: "Preparing",
  data() {
    return {
      storeService: new ResourcesService(
        `${window.settings.services.cmsUrl}/stores`
      ),
      storeOrderItemService: new ResourcesService(
        `${window.settings.services.cmsUrl}/store_order_items`
      ),
      storeOrderService: new ResourcesService(
        `${window.settings.services.cmsUrl}/store_orders`
      ),
      preparings: [],
      activeOrders: [],
      store: {}
    };
  },
  // props: {
  //   storeId: {
  //     type: String,
  //     require: true
  //   }
  // },
  methods: {
    ...mapActions(["goto"]),
    index() {
      this.storeService.show("mystore").then(({ data }) => {
        this.store = data;
        this.loadOrders();
      });
    },
    loadOrders() {
      this.storeOrderService
        .index({
          store: this.store._id,
          ignoreTable: true,
          orderStatus: "active",
          sort: "createdAt|asc"
        })
        .then(({ data }) => {
          this.activeOrders = data.data;
          this.loadPreparings();
        });
    },
    loadPreparings() {
      this.storeOrderItemService
        .index({
          store: this.store._id,
          storeOrder: {
            $in: this.activeOrders.map(function(order) {
              return order._id;
            })
          },
          itemStatus: "preparing",
          sort: "createdAt|asc",
          populates: JSON.stringify([
            {
              path: "storeMenu",
              select: "name"
            },
            {
              path: "storeOrder",
              select: "storeTable",
              populate: [
                {
                  path: "storeTable",
                  select: "name"
                }
              ]
            }
          ])
        })
        .then(({ data }) => {
          this.preparings = data.data;
        });
    }
  },
  created() {
    this.index();
  }
};
</script>
<style>
</style>