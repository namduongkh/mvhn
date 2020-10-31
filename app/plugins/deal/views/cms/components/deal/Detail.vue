<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Deal"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      >
        <template slot="moreAction">
          <button
            type="button"
            class="btn btn-secondary-outline"
            @click="
              goto({
                name: 'ListBets',
                params: { dealId: formData._id },
              })
            "
          >
            <span class="fa fa-list"></span> List Bet
          </button>
        </template>
      </DetailActions>

      <form class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">
          Fill data below and click actions above
        </h5>

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
                v-validate="'required'"
              />
              <small v-show="errors.has('name')" class="text-danger">{{
                errors.first("name")
              }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="description"
                >Description</label
              >
              <froala
                :tag="'textarea'"
                v-model="formData.description"
                id="description"
                name="description"
                v-validate="'required'"
                data-vv-name="description"
              />
              <small v-show="errors.has('description')" class="text-danger">{{
                errors.first("description")
              }}</small>
            </fieldset>
          </div>

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
                v-validate="'required'"
              />
              <small v-show="errors.has('user')" class="text-danger">{{
                errors.first("user")
              }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="from">From</label>
              <datetime
                v-model="formData.from"
                data-vv-name="from"
                name="from"
                id="from"
                v-validate="'required'"
                type="datetime"
                format="dd/MM/yyyy HH:mm"
                :auto="true"
                :phrases="{ ok: 'OK', cancel: 'Hủy' }"
                input-class="form-control"
              ></datetime>
              <small v-show="errors.has('from')" class="text-danger">{{
                errors.first("from")
              }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="to">To</label>
              <datetime
                v-model="formData.to"
                data-vv-name="to"
                name="to"
                id="to"
                type="datetime"
                format="dd/MM/yyyy HH:mm"
                :auto="true"
                :phrases="{ ok: 'OK', cancel: 'Hủy' }"
                input-class="form-control"
              ></datetime>
              <small v-show="errors.has('to')" class="text-danger">{{
                errors.first("to")
              }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="minBet">Min Bet</label>
              <input
                v-model="formData.minBet"
                data-vv-name="minBet"
                type="number"
                min="0"
                class="form-control"
                id="minBet"
                v-validate="'required'"
                placeholder="Enter Min Bet"
                ref="minBet"
              />
              <small v-show="errors.has('minBet')" class="text-danger">{{
                errors.first("minBet")
              }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="maxBet">Max Bet</label>
              <input
                v-model="formData.maxBet"
                data-vv-name="maxBet"
                type="number"
                min="0"
                class="form-control"
                id="maxBet"
                v-validate="'required|min_value:' + formData.minBet"
                placeholder="Enter Max Bet"
              />
              <small v-show="errors.has('maxBet')" class="text-danger">{{
                errors.first("maxBet")
              }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="stop">Stop</label>
              <input
                v-model="formData.stop"
                data-vv-name="stop"
                name="stop"
                id="stop"
                type="checkbox"
              />
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

        <Options v-if="formData._id" :deal="formData._id" />
      </form>
      <!--.box-typical-->
    </div>
    <!--.container-fluid-->
  </div>
  <!--.page-content-->
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Options from "./Options";

export default {
  name: "DetailDeal",
  data() {
    return {
      formData: {},
      cmsUrl: `${CMS_URL}/deals`,

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
  components: {
    Options,
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
    ...mapActions([
      "initService",
      "saveItem",
      "getItemById",
      "newItem",
      "goto",
    ]),
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
