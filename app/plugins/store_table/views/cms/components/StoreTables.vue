<template>
  <div class="page-content store-table">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 text-right">
          <StorePanel :store="$route.params.storeId"></StorePanel>
        </div>
      </div>

      <div class="box-typical box-typical-padding">
        <h5 class="with-border">Seats</h5>
        <div class="text-right">
          <button
            type="button"
            class="btn btn-secondary-outline"
            data-toggle="tooltip"
            title="Refresh"
            @click="index()"
          >
            <i class="fa fa-refresh"></i> Refresh
          </button>
        </div>
        <div class="row">
          <div
            class="col-sm-3 col-6"
            v-for="table in storeTables"
            :key="table._id"
          >
            <div
              class="table-item"
              :class="{ 'table-item--active': table.activeOrder }"
            >
              <label for>Name</label>
              <input
                type="text"
                class="form-control"
                v-model="table.name"
                placeholder="Table 1..."
                disabled
              />
              <!-- <label for>Description</label>
              <input
                type="text"
                class="form-control"
                v-model="table.description"
                placeholder="Something..."
              />-->
              <br />
              <button
                type="button"
                class="btn btn-secondary-outline"
                data-toggle="tooltip"
                title="Edit"
                @click="
                  goto({ name: 'EditStoreTable', params: { id: table._id } })
                "
              >
                <i class="fa fa-edit"></i>
              </button>
              <button
                type="button"
                class="btn btn-danger-outline"
                @click="remove(table._id)"
                data-toggle="tooltip"
                title="Delete"
              >
                <i class="fa fa-trash"></i>
              </button>
              <button
                type="button"
                class="btn btn-primary-outline"
                data-toggle="modal"
                :data-target="'#store_table_modal_' + table._id"
              >
                <i class="fa fa-ellipsis-h"></i>
              </button>

              <div
                :id="'store_table_modal_' + table._id"
                class="modal fade"
                role="dialog"
              >
                <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">
                        &times;
                      </button>
                      <h4 class="modal-title">{{ table.name }}</h4>
                    </div>
                    <div class="modal-body">
                      <span v-if="table.activeOrder">
                        <div class="row">
                          <label class="col-4 text-right">Đơn hàng:</label>
                          <div class="col-8">
                            <a
                              href="javascript:void(0)"
                              @click="
                                goto({
                                  name: 'EditStoreOrder',
                                  params: {
                                    parentType: 'store_tables',
                                    parentId: table._id,
                                    id: table.activeOrder._id,
                                  },
                                })
                              "
                              >{{ table.activeOrder.orderName }}</a
                            >
                          </div>
                        </div>
                        <div class="row" v-if="table.activeOrder.customer">
                          <label class="col-4 text-right">Khách hàng:</label>
                          <div class="col-8">
                            {{ table.activeOrder.customer.name }}
                          </div>
                        </div>
                        <div class="row">
                          <label class="col-4 text-right">Tổng giá trị:</label>
                          <div class="col-8">{{ table.activeOrder.total }}</div>
                        </div>
                        <div class="row">
                          <label class="col-4 text-right">Thời gian:</label>
                          <div class="col-8">
                            {{ table.updatedAt | calendar }}
                          </div>
                        </div>
                        <div class="row">
                          <label class="col-4 text-right">Chuyển bàn:</label>

                          <div class="col-6">
                            <select2
                              name="targetTableIds"
                              v-model="targetTableIds[table._id]"
                              :ajax="{
                                url: `${cmsUrl}/store_tables/select2`,
                                params: {
                                  store: $route.params.storeId,
                                  _id: JSON.stringify({ $ne: table._id }),
                                  activeOrder: JSON.stringify({ $eq: null }),
                                },
                              }"
                            />
                          </div>
                          <div class="col-2">
                            <button
                              type="button"
                              class="btn btn-default-outline"
                              @click="
                                move(table._id, targetTableIds[table._id])
                              "
                            >
                              <i class="fa fa-arrow-right"></i> Chuyển
                            </button>
                          </div>
                        </div>
                        <hr />
                        <StoreOrderUpdater
                          v-if="table.activeOrder"
                          :order="table.activeOrder"
                          :modalMode="false"
                          @updated="index()"
                          :serviceUrl="storeOrderUrl(table._id)"
                        ></StoreOrderUpdater>
                        <hr />
                        <button
                          type="button"
                          class="btn btn-primary-outline"
                          @click="
                            goto({
                              name: 'EditStoreOrder',
                              params: {
                                parentType: 'store_tables',
                                parentId: table._id,
                                id: table.activeOrder._id,
                              },
                            })
                          "
                          data-toggle="tooltip"
                          title="Active order"
                          data-dismiss="modal"
                        >
                          <i class="fa fa-eye"></i> Xem chi tiết đơn hàng
                        </button>
                      </span>
                      <span v-else>
                        <button
                          type="button"
                          class="btn btn-primary-outline"
                          @click="
                            goto({
                              name: 'NewStoreOrder',
                              params: {
                                parentType: 'store_tables',
                                parentId: table._id,
                              },
                            })
                          "
                          data-toggle="tooltip"
                          title="New order"
                          data-dismiss="modal"
                        >
                          <i class="fa fa-plus"></i> Tạo đơn hàng mới
                        </button>
                      </span>
                      <button
                        type="button"
                        class="btn btn-secondary-outline"
                        data-toggle="tooltip"
                        title="List order"
                        @click="
                          goto({
                            name: 'ListStoreOrders',
                            params: {
                              parentType: 'store_tables',
                              parentId: table._id,
                            },
                          })
                        "
                        data-dismiss="modal"
                      >
                        <i class="fa fa-file-invoice"></i> Danh sách đơn hàng
                      </button>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-default modal-closer"
                        data-dismiss="modal"
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3 col-6">
            <div class="table-item">
              <label for>Name</label>
              <input
                type="text"
                class="form-control"
                v-model="storeTable.name"
                placeholder="Table 1..."
              />
              <!-- <label for>Description</label>
              <input
                type="text"
                class="form-control"
                v-model="storeTable.description"
                placeholder="Something..."
              />-->
              <br />
              <button
                type="button"
                class="btn btn-secondary-outline"
                @click="create()"
              >
                <i class="fa fa-plus"></i> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResourcesService from "@general/resources_service";
import { mapGetters, mapActions } from "vuex";
import StoreOrderUpdater from "@Plugin/store_order/views/cms/components/StoreOrderUpdater";
import { orderStatusText } from "@Plugin/store_order/views/cms/filters";

export default {
  name: "StoreTables",
  data() {
    return {
      service: new ResourcesService(`${CMS_URL}/store_tables`),
      storeTables: {},
      storeTable: {},
      cmsUrl: CMS_URL,
      targetTableIds: {},
    };
  },
  methods: {
    ...mapActions(["goto"]),
    storeOrderUrl(tableId) {
      return `${CMS_URL}/store_tables/${tableId}/store_orders`;
    },
    index() {
      this.service
        .index({
          store: this.$route.params.storeId,
          populates: JSON.stringify([
            {
              path: "activeOrder",
              select: "orderName createdAt customer orderStatus total",
              populate: [{ path: "customer", select: "name" }],
            },
          ]),
        })
        .then(({ data }) => {
          this.storeTables = data.data;
        });
    },
    new() {
      this.service.new().then(({ data }) => {
        this.storeTable = data;
        this.storeTable.store = this.$route.params.storeId;
      });
    },
    create() {
      if (!this.storeTable.name) {
        return alert("Please enter a name!");
      }
      this.service.create(this.storeTable).then(({ data }) => {
        this.$notify(data.message, { type: "success" });
        this.index();
        this.new();
      });
    },
    update(table) {
      let id = table._id;
      delete table._id;

      this.service.update(id, table).then(({ data }) => {
        this.$notify(data.message, { type: "success" });
      });
    },
    remove(id) {
      if (!confirm("Are you sure?")) return;

      this.service.delete(id).then(({ data }) => {
        this.$notify(data.message, { type: "success" });
        this.index();
      });
    },
    move(oldId, newId) {
      this.service
        .member(`${oldId}/move`, "POST", {
          targetTableId: newId,
        })
        .then(({ data }) => {
          this.$notify(data.message, { type: "success" });
          this.index();
        });
    },
  },
  created() {
    this.index();
    this.new();
  },
  mounted() {
    this.$nextTick(function () {
      setTimeout(() => {
        $('[data-toggle="tooltip"]').tooltip();
      }, 1000);
    });
  },
  components: { StoreOrderUpdater },
  filters: { orderStatusText },
  beforeDestroy() {
    $(".tooltip.show").remove();
  },
};
</script>

<style>
.table-item {
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 1em;
  margin-bottom: 1em;
}
.store-table .table-item {
  background-image: url("/assets/img/round-table.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
  min-height: unset;
}
.table-item--active {
  background-color: rgba(70, 195, 95, 0.3);
}
</style>
