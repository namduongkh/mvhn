<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 text-right">
          <StorePanel :store="$route.params.storeId"></StorePanel>
        </div>
      </div>

      <div class="box-typical box-typical-padding">
        <h5 class="with-border">Seats</h5>
        <div class="row">
          <div class="col-sm-4 col-xs-12" v-for="table in storeTables" :key="table._id">
            <div class="table-item" :class="{'table-item--active': table.activeOrder}">
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
                class="btn btn-success-outline"
                @click="goto({name: 'EditStoreOrder', params: {storeTableId: table._id, id: table.activeOrder}})"
                v-if="table.activeOrder"
              >
                <i class="fa fa-eye"></i> Active Order
              </button>
              <button
                type="button"
                class="btn btn-primary-outline"
                @click="goto({name: 'NewStoreOrder', params: {storeTableId: table._id}})"
                v-else
              >
                <i class="fa fa-plus"></i> New Order
              </button>
              <button
                type="button"
                class="btn btn-secondary-outline"
                @click="goto({name: 'ListStoreOrders', params: {storeTableId: table._id}})"
              >
                <i class="fa fa-file-invoice"></i>
              </button>
              <button
                type="button"
                class="btn btn-secondary-outline"
                @click="goto({name: 'EditStoreTable', params: {id: table._id}})"
              >
                <i class="fa fa-edit"></i>
              </button>
              <button type="button" class="btn btn-danger-outline" @click="remove(table._id)">
                <i class="fa fa-trash"></i>
              </button>
              <small v-if="table.activeOrder">{{ table.updatedAt | timeForm }}</small>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4 col-xs-12">
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
              <button type="button" class="btn btn-secondary-outline" @click="create()">
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

export default {
  name: "StoreTables",
  data() {
    return {
      service: new ResourcesService(
        `${window.settings.services.cmsUrl}/store_tables`
      ),
      storeTables: {},
      storeTable: {}
    };
  },
  methods: {
    ...mapActions(["goto"]),
    index() {
      this.service
        .index({
          store: this.$route.params.storeId
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
    }
  },
  created() {
    this.index();
    this.new();
  }
};
</script>

<style>
.table-item {
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 1em;
  margin-bottom: 1em;
}
.table-item--active {
  background-color: rgba(70, 195, 95, 0.3);
}
</style>
