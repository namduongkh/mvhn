<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Store Voucher"
        listRouter="/store_vouchers"
        routeDetail="/store_voucher"
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
              <label class="form-label semibold" for="name">Name</label>
              <input
                v-model="formData.name"
                data-vv-name="name"
                type="text"
                class="form-control"
                id="name"
                placeholder="Enter Name"
              />
              <small v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="code">Code</label>
              <input
                v-model="formData.code"
                data-vv-name="code"
                type="text"
                class="form-control"
                id="code"
                placeholder="Enter Code"
              />
              <small v-show="errors.has('code')" class="text-danger">{{ errors.first('code') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="quantity">Quantity</label>
              <input
                v-model="formData.quantity"
                data-vv-name="quantity"
                type="number"
                min="0"
                class="form-control"
                id="quantity"
                placeholder="Enter Quantity"
              />
              <small
                v-show="errors.has('quantity')"
                class="text-danger"
              >{{ errors.first('quantity') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="reduceType">Reduce Type</label>
              <select
                data-vv-name="reduceType"
                v-model="formData.reduceType"
                name="reduceType"
                id="reduceType"
                class="form-control"
              >
                <option value>Select one</option>
                <option :value="1">Amount</option>
                <option :value="2">Percent</option>
              </select>
              <small
                v-show="errors.has('reduceType')"
                class="text-danger"
              >{{ errors.first('reduceType') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="reduceValue">Reduce Value</label>
              <input
                v-model="formData.reduceValue"
                data-vv-name="reduceValue"
                type="text"
                class="form-control"
                id="reduceValue"
                placeholder="Enter Reduce Value"
              />
              <small
                v-show="errors.has('reduceValue')"
                class="text-danger"
              >{{ errors.first('reduceValue') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="appliedOrders">Applied Orders</label>
              <bz-json-editor
                v-if="formData.appliedOrders"
                mode="code"
                data-vv-name="appliedOrders"
                name="appliedOrders"
                id="appliedOrders"
                v-model="formData.appliedOrders"
              />
              <small
                v-show="errors.has('appliedOrders')"
                class="text-danger"
              >{{ errors.first('appliedOrders') }}</small>
            </fieldset>
          </div>
        </div>

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

export default {
  name: "DetailStoreVoucher",
  data() {
    return {
      formData: {},
      cmsUrl: `${CMS_URL}/store_vouchers`
    };
  },
  computed: {
    ...mapGetters(["itemSelected", "authUser"])
  },
  watch: {
    itemSelected(data) {
      if (data) {
        this.formData = Object.assign({}, data);
      }
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
    }
  },
  components: {},
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
