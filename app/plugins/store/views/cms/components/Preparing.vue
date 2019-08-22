<template>
  <div class="page-content">
    <div class="container-fluid">
      <StorePanel v-if="store" :store="store._id"></StorePanel>
      <div class="box-typical box-typical-padding">
        <div class="row">
          <div class="col-xs-6">
            <h5>Preparing</h5>
            <div v-if="!preparings.length" class="text-center">No item left.</div>
            <ul v-else class="list-group">
              <li
                v-for="item in preparings"
                :key="item._id"
                class="list-group-item list-group-item-default"
              >
                <div>
                  <strong>
                    <span class="label label-primary">{{ item.quantity }}</span>
                    {{ item.storeMenu && item.storeMenu.name }}
                  </strong>
                  <span>[{{ item.storeOrder && item.storeOrder.storeTable && item.storeOrder.storeTable.name }}]</span>
                  <em>- {{ item.createdAt | timeForm }}</em>
                  <div class="pull-right">
                    <button type="button" @click="ready(item)" class="btn btn-sm btn-success">
                      <i class="fa fa-check"></i>
                    </button>
                  </div>
                  <div class="clearfix"></div>
                </div>
                <div style="padding-left:1.5em">
                  <span class="label label-default">{{ item.note }}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-xs-6">
            <h5>Ready</h5>
            <div v-if="!readies.length" class="text-center">No item left.</div>
            <ul v-else class="list-group">
              <li
                v-for="item in readies"
                :key="item._id"
                class="list-group-item list-group-item-success"
              >
                <div>
                  <strong>
                    <span class="label label-primary">{{ item.quantity }}</span>
                    {{ item.storeMenu && item.storeMenu.name }}
                  </strong>
                  <span>[{{ item.storeOrder && item.storeOrder.storeTable && item.storeOrder.storeTable.name }}]</span>
                  <em>- {{ item.createdAt | timeForm }}</em>
                  <div class="pull-right">
                    <button type="button" @click="delivery(item)" class="btn btn-sm btn-success">
                      <i class="fa fa-check"></i>
                    </button>
                  </div>
                  <div class="clearfix"></div>
                </div>
                <div style="padding-left:1.5em">
                  <u>{{ item.note }}</u>
                </div>
              </li>
            </ul>
          </div>
        </div>
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
      readies: [],
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
          this.loadReadies();
        });
    },
    loadOrderItems(status) {
      return this.storeOrderItemService.index({
        store: this.store._id,
        storeOrder: {
          $in: this.activeOrders.map(function(order) {
            return order._id;
          })
        },
        itemStatus: status,
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
      });
    },
    loadPreparings() {
      this.loadOrderItems("preparing").then(({ data }) => {
        this.preparings = data.data;
      });
    },
    loadReadies() {
      this.loadOrderItems("ready").then(({ data }) => {
        this.readies = data.data;
      });
    },
    ready(item) {
      this.storeOrderItemService
        .update(item._id, {
          itemStatus: "ready"
        })
        .then(({ data }) => {
          this.loadPreparings();
          this.loadReadies();
        });
    },
    delivery(item) {
      this.storeOrderItemService
        .update(item._id, {
          itemStatus: "delivered"
        })
        .then(({ data }) => {
          this.loadReadies();
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