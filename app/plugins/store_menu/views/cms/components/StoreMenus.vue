<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 text-right">
          <StorePanel :store="$route.params.storeId"></StorePanel>
        </div>
      </div>

      <div class="box-typical box-typical-padding">
        <h5 class="with-border">Menu</h5>
        <div class="row">
          <div class="col-sm-4" v-for="menu in storeMenus" :key="menu._id">
            <div class="table-item">
              <StoreMenuForm :storeMenu="menu">
                <template slot="actions" slot-scope="props">
                  <button type="button" class="btn btn-primary" @click="update(props.item)">
                    <i class="fa fa-save"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger-outline"
                    @click="remove(props.item._id)"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary-outline"
                    @click="goto({name: 'EditStoreMenu', params: {id: props.item._id}})"
                  >
                    <i class="fa fa-edit"></i>
                  </button>
                </template>
              </StoreMenuForm>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <div class="table-item">
              <StoreMenuForm :storeMenu="storeMenu">
                <template slot="actions" slot-scope="props">
                  <button type="button" class="btn btn-primary" @click="create(props.item)">
                    <i class="fa fa-plus"></i> Add
                  </button>
                </template>
              </StoreMenuForm>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="table-item">
              <ImporterRunner
                :importer-classname="'StoreMenuImporter'"
                :params="{storeId: $route.params.storeId}"
                @imported="index()"
              />
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
import StoreMenuForm from "./StoreMenuForm";

export default {
  name: "StoreMenus",
  data() {
    return {
      service: new ResourcesService(
        `${window.settings.services.cmsUrl}/store_menus`
      ),
      storeMenus: {},
      storeMenu: {},
      storeId: this.$route.params.storeId
    };
  },
  methods: {
    ...mapActions(["goto"]),
    index() {
      this.service
        .index({
          store: this.storeId,
          notPaginate: true
        })
        .then(({ data }) => {
          this.storeMenus = data.data;
        });
    },
    new() {
      this.service.new().then(({ data }) => {
        this.storeMenu = data;
        this.storeMenu.store = this.storeId;
      });
    },
    create(storeMenu) {
      this.service.create(storeMenu).then(({ data }) => {
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
  },
  components: {
    StoreMenuForm
  }
};
</script>

<style>
.table-item {
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 1em;
  margin-bottom: 1em;
  height: 17em;
}
</style>
