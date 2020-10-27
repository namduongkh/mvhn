<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Bet"
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
              <label class="form-label semibold" for="deal">Deal</label>
              <select2
                id="deal"
                data-vv-name="deal"
                name="deal"
                v-model="formData.deal"
                :ajax="ajaxDeal"
                placeholder="Select one..."
              />
              <small v-show="errors.has('deal')" class="text-danger">{{
                errors.first("deal")
              }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="option">Option</label>
              <select2
                id="option"
                data-vv-name="option"
                name="option"
                v-model="formData.option"
                :ajax="ajaxOption"
                placeholder="Select one..."
              />
              <small v-show="errors.has('option')" class="text-danger">{{
                errors.first("option")
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

export default {
  name: "DetailBet",
  data() {
    return {
      formData: {},
      cmsUrl: `${CMS_URL}/deals/${this.$route.params.dealId}/bets`,

      ajaxUser: {
        url: `${CMS_URL}/users/select2`,
        params: {},
        textField: "name",
      },
      ajaxDeal: {
        url: `${CMS_URL}/deals/select2`,
        params: {},
        textField: "name",
      },
      ajaxOption: {
        url: `${CMS_URL}/deals/${this.$route.params.dealId}/deal_options/select2`,
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
