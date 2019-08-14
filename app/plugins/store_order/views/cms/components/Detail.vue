<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="StoreOrder"
        listRouter="/store_orders"
        routeDetail="/store_order"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      >
        <template slot="moreAction">
          <button
            type="button"
            class="btn btn-secondary"
            @click="goto({name: 'EditStore', params: {id: formData.store}})"
          >
            <i class="fa fa-store"></i> Store
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="goto({name: 'ListStoreTables', params: {storeId: formData.store}})"
          >
            <i class="fa fa-table"></i> Store Tables
          </button>
        </template>
      </DetailActions>

      <form class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>

        <div class="row">
          <div class="col-sm-3">
            <fieldset class="form-group">
              <label class="form-label semibold" for="orderName">Order Name</label>
              <input
                v-model="formData.orderName"
                data-vv-name="orderName"
                type="text"
                class="form-control"
                id="orderName"
                placeholder="Enter orderName"
              />
              <small
                v-show="errors.has('orderName')"
                class="text-danger"
              >{{ errors.first('orderName') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-3">
            <fieldset class="form-group">
              <label class="form-label semibold" for="store">Store</label>
              <select2
                id="store"
                v-validate="'required'"
                data-vv-name="store"
                name="store"
                v-model="formData.store"
                :ajax="ajaxStore"
                placeholder="Select one..."
                disabled
              />
              <small v-show="errors.has('store')" class="text-danger">{{ errors.first('store') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-3">
            <fieldset class="form-group">
              <label class="form-label semibold" for="storeTable">Store Table</label>
              <select2
                id="storeTable"
                v-validate="'required'"
                data-vv-name="storeTable"
                name="storeTable"
                v-model="formData.storeTable"
                :ajax="ajaxStoreTable"
                placeholder="Select one..."
                disabled
              />
              <small
                v-show="errors.has('storeTable')"
                class="text-danger"
              >{{ errors.first('storeTable') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-3">
            <fieldset class="form-group">
              <label class="form-label semibold" for="total">Total</label>
              <input
                v-model="formData.total"
                data-vv-name="total"
                type="text"
                class="form-control"
                id="total"
                placeholder="Enter total"
                disabled
              />
              <small v-show="errors.has('total')" class="text-danger">{{ errors.first('total') }}</small>
            </fieldset>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 text-right">
            <button type="button" class="btn btn-success-outline" @click="doneOrder()">
              <i class="fa fa-check"></i> Done Order
            </button>
          </div>
        </div>

        <hr />
        <div class="row">
          <div class="col-sm-12">
            <StoreOrderItemSelector
              v-if="storeTable.store"
              :store="storeTable.store"
              :storeOrder="$route.params.id || formData._id || formData.fakeId"
              @created="onItemCreated"
              @orderTotalChange="onOrderTotalChange"
            />
          </div>
        </div>
        <hr />

        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="status">Status</label>
              <select v-model="formData.status" name="status" id="status" class="form-control">
                <option :value="1">Publish</option>
                <option :value="0">Unpublish</option>
                <option :value="2">Trashed</option>
              </select>
            </fieldset>
          </div>
        </div>
      </form>
      <!--.box-typical-->
    </div>
    <!--.container-fluid-->
  </div>
  <!--.page-content-->
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import StoreOrderItemSelector from "./StoreOrderItemSelector";
import ResourcesService from "@general/resources_service";
import moment from "moment";

export default {
  name: "DetailStoreOrder",
  data() {
    return {
      formData: {},
      cmsUrl: `${window.settings.services.cmsUrl}/store_orders`,
      ajaxStoreTable: {
        url: `${window.settings.services.cmsUrl}/store_tables/select2`,
        params: {},
        textField: "name",
        autoload: false
      },
      ajaxStore: {
        url: `${window.settings.services.cmsUrl}/stores/select2`,
        params: {},
        textField: "name",
        autoload: false
      },
      froalaConfig: {
        imageUploadURL: window.settings.services.webUrl + "/api/upload/image",
        imageUploadMethod: "POST",
        imageUploadParams: {
          type: "wysiwyg/post"
        }
      },
      storeTable: {},
      storeTableService: new ResourcesService(
        `${window.settings.services.cmsUrl}/store_tables`
      )
    };
  },
  computed: {
    ...mapGetters(["itemSelected", "authUser"])
  },
  watch: {
    itemSelected(data) {
      if (data) {
        this.formData = Object.assign(
          {
            store: this.storeTable.store,
            storeTable: this.storeTable._id,
            orderName: `${this.storeTable.name}'s order at ${moment().format(
              "DD/MM/YYYY hh:mm:ss"
            )}`,
            total: this.formData.total
          },
          data
        );
      }
    }
    // "formData.name"(val) {
    //   this.formData.slug = this.$options.filters["text2Slug"](val);
    // },
    // "formData.attribute"(attribute) {
    //   // Do something
    // }
  },
  methods: {
    ...mapActions([
      "initService",
      "saveItem",
      "getItemById",
      "newItem",
      "goto"
    ]),
    save(options) {
      let self = this;
      this.$validator.validateAll().then(res => {
        if (res) {
          self.saveItem({ formData: self.formData, options });
        } else {
          this.$notify("Please check your data", { type: "warning" });
        }
      });
    },
    doneOrder() {
      this.formData.orderStatus = "done";
      this.saveItem({
        formData: this.formData,
        options: {
          route: {
            name: "ListStoreTables",
            params: { storeId: this.storeTable.store }
          }
        }
      });
    },
    resetForm() {
      this.errors.clear();
      if (!this.formData._id) {
        this.newItem();
      } else {
        this.getItemById({ id: this.formData._id });
      }
    },
    onItemCreated(itemIds, options) {
      this.formData.storeOrderItems = itemIds;
      this.saveItem({ formData: this.formData, options });
    },
    loadStoreTable(id) {
      return this.storeTableService.edit(id);
    },
    onOrderTotalChange(total) {
      this.formData.total = total;
    }
  },
  components: {
    StoreOrderItemSelector
  },
  created() {
    if (!this.$route.params.storeTableId) return;

    this.loadStoreTable(this.$route.params.storeTableId).then(({ data }) => {
      this.storeTable = data;

      this.initService(this.cmsUrl);
      let id = this.$route.params.id;
      if (id !== undefined) this.getItemById({ id });
      else this.newItem();
    });
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>