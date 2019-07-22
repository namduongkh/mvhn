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
        <template slot="moreAction"></template>
      </DetailActions>

      <form class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>

        <div class="row">
          <div class="col-sm-6">
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

          <div class="col-sm-6">
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
        </div>

        <hr />
        <div class="row">
          <div class="col-sm-12">
            <StoreOrderItemSelector
              :store="$route.params.store_id"
              :storeOrder="$route.params.id || formData._id || formData.fakeId"
              @created="onItemCreated"
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

export default {
  name: "DetailStoreOrder",
  data() {
    return {
      formData: {},
      cmsUrl: `${window.settings.services.cmsUrl}/store_orders`,

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
      }
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
            store: this.$route.params.store_id,
            orderName: `Order at ${Date.now()}`
          },
          data
        );
      }
    },
    "formData.name"(val) {
      this.formData.slug = this.$options.filters["text2Slug"](val);
    },
    "formData.attribute"(attribute) {
      // Do something
    }
  },
  methods: {
    ...mapActions(["initService", "saveItem", "getItemById", "newItem"]),
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
    }
  },
  components: {
    StoreOrderItemSelector
  },
  created() {
    this.initService(this.cmsUrl);
    let id = this.$route.params.id;
    if (id !== undefined) this.getItemById({ id });
    else this.newItem();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>