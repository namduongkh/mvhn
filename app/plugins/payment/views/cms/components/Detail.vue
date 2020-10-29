<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Payment"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      >
        <template slot="moreAction"></template>
      </DetailActions>

      <form class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">
          Fill data below and click actions above
        </h5>

        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="user">User</label>
              <select2
                id="user"
                data-vv-name="user"
                name="user"
                v-model="formData.user"
                :ajax="ajaxUser"
                placeholder="Select one..."
              />
              <small v-show="errors.has('user')" class="text-danger">{{
                errors.first("user")
              }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="amount">Amount</label>
              <input
                v-model="formData.amount"
                data-vv-name="amount"
                type="text"
                class="form-control"
                id="amount"
                placeholder="Enter Amount"
              />
              <small v-show="errors.has('amount')" class="text-danger">{{
                errors.first("amount")
              }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="content">Content</label>
              <froala
                :tag="'textarea'"
                v-model="formData.content"
                id="content"
                name="content"
                data-vv-name="content"
              />
              <small v-show="errors.has('content')" class="text-danger">{{
                errors.first("content")
              }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="type">Type</label>
              <select
                v-model="formData.type"
                data-vv-name="type"
                type="text"
                class="form-control"
                id="type"
                placeholder="Enter Type"
              >
                <option value="payment">Payment</option>
                <option value="refund">Refund</option>
              </select>
              <small v-show="errors.has('type')" class="text-danger">{{
                errors.first("type")
              }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="paymentStatus"
                >Payment Status</label
              >
              <select
                v-model="formData.paymentStatus"
                data-vv-name="paymentStatus"
                type="text"
                class="form-control"
                id="paymentStatus"
                placeholder="Enter Payment Status"
                disabled
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>
              <small v-show="errors.has('paymentStatus')" class="text-danger">{{
                errors.first("paymentStatus")
              }}</small>
            </fieldset>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="status">Status</label>
              <select
                v-model="formData.status"
                name="status"
                id="status"
                class="form-control"
              >
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
import { omit } from "lodash";

export default {
  name: "DetailPayment",
  data() {
    return {
      formData: {},
      cmsUrl: `${CMS_URL}/payments`,

      ajaxUser: {
        url: `${CMS_URL}/users/select2`,
        params: {},
        textField: "name",
      },
      froalaConfig: {
        imageUploadURL: WEB_URL + "/api/upload/image",
        imageUploadMethod: "POST",
        imageUploadParams: {
          type: "wysiwyg/post",
        },
      },
    };
  },
  computed: {
    ...mapGetters(["itemSelected", "authUser"]),
  },
  watch: {
    itemSelected(data) {
      if (data) {
        this.formData = Object.assign({}, data);
      }
    },
    "formData.name"(val) {
      if (this.formData._id) return;
      this.formData.slug = this.$options.filters["text2Slug"](val);
    },
    "formData.attribute"(attribute) {
      // Do something
    },
  },
  methods: {
    ...mapActions(["initService", "saveItem", "getItemById", "newItem"]),
    save(options) {
      let self = this;
      this.$validator.validateAll().then((res) => {
        if (res) {
          self.saveItem({
            formData: omit(self.formData, ["paymentStatus"]),
            options,
          });
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
  },
  components: {},
  created() {
    this.initService(this.cmsUrl);
    let id = this.$route.params.id;
    if (id !== undefined) this.getItemById({ id });
    else this.newItem();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>
