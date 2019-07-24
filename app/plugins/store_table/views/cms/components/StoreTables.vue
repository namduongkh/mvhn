<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="box-typical box-typical-padding">
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
              <label for>Description</label>
              <input
                type="text"
                class="form-control"
                v-model="storeTable.description"
                placeholder="Something..."
              />
              <br />
              <button type="button" class="btn btn-secondary-outline" @click="create()">
                <i class="fa fa-plus"></i> Add
              </button>
            </div>
          </div>
          <div class="col-sm-4 col-xs-12" v-for="table in storeTables" :key="table._id">
            <div class="table-item">
              <label for>Name</label>
              <input type="text" class="form-control" v-model="table.name" placeholder="Table 1..." />
              <label for>Description</label>
              <input
                type="text"
                class="form-control"
                v-model="table.description"
                placeholder="Something..."
              />
              <br />
              <button
                type="button"
                class="btn btn-primary-outline"
                @click="goto({name: 'ListStoreOrders', params: {storeTableId: table._id}})"
              >
                <i class="fa fa-cart"></i> Orders
              </button>
              <button type="button" class="btn btn-secondary-outline" @click="update(table)">
                <i class="fa fa-save"></i>
              </button>
              <button type="button" class="btn btn-danger-outline" @click="remove(table._id)">
                <i class="fa fa-trash"></i>
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
          store: this.$route.params.store_id
        })
        .then(({ data }) => {
          this.storeTables = data.data;
        });
    },
    new() {
      this.service.new().then(({ data }) => {
        this.storeTable = data;
        this.storeTable.store = this.$route.params.store_id;
      });
    },
    create() {
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
}
</style>
