<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Store"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      >
        <template slot="moreAction">
          <StorePanel v-if="formData._id" :store="formData._id"></StorePanel>
        </template>
      </DetailActions>

      <form class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">
          Fill data below and click actions above
        </h5>

        <div class="row">
          <div class="col-sm-9">
            <div class="row">
              <div class="col-sm-6">
                <fieldset class="form-group">
                  <label class="form-label semibold" for="name">Name</label>
                  <input
                    v-model="formData.name"
                    v-validate="'required'"
                    data-vv-name="name"
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Enter name"
                  />
                  <small v-show="errors.has('name')" class="text-danger">{{
                    errors.first("name")
                  }}</small>
                </fieldset>
              </div>

              <div class="col-sm-6">
                <fieldset class="form-group">
                  <label class="form-label semibold" for="slug">
                    Slug
                    <small>
                      <a :href="'/stores/' + formData.slug" target="_blank"
                        >(Đến trang cửa hàng)</a
                      >
                    </small>
                  </label>
                  <input
                    v-model="formData.slug"
                    v-validate="'required'"
                    data-vv-name="slug"
                    type="text"
                    class="form-control"
                    id="slug"
                    placeholder="Enter slug"
                  />
                  <small v-show="errors.has('slug')" class="text-danger">{{
                    errors.first("slug")
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
                    v-validate="'required'"
                    id="description"
                    name="description"
                    data-vv-name="description"
                  />
                  <small
                    v-show="errors.has('description')"
                    class="text-danger"
                    >{{ errors.first("description") }}</small
                  >
                </fieldset>
              </div>

              <div class="col-sm-6">
                <fieldset class="form-group">
                  <label class="form-label semibold" for="allowMultipleOrder"
                    >Allow Multiple Order</label
                  >
                  <input
                    v-model="formData.allowMultipleOrder"
                    data-vv-name="allowMultipleOrder"
                    type="checkbox"
                    id="allowMultipleOrder"
                  />
                </fieldset>
              </div>

              <div class="col-sm-6">
                <fieldset class="form-group">
                  <label class="form-label semibold" for="inPlaceServe"
                    >In Place Serve</label
                  >
                  <input
                    v-model="formData.inPlaceServe"
                    data-vv-name="inPlaceServe"
                    type="checkbox"
                    id="inPlaceServe"
                  />
                </fieldset>
              </div>

              <div class="col-sm-6">
                <fieldset class="form-group">
                  <label class="form-label semibold" for="onlineServe"
                    >Online Serve</label
                  >
                  <input
                    v-model="formData.onlineServe"
                    data-vv-name="onlineServe"
                    type="checkbox"
                    id="onlineServe"
                  />
                </fieldset>
              </div>

              <div class="col-sm-6">
                <fieldset class="form-group">
                  <label class="form-label semibold" for="allowCustomMenu"
                    >Allow Custom Menu</label
                  >
                  <input
                    v-model="formData.allowCustomMenu"
                    data-vv-name="allowCustomMenu"
                    type="checkbox"
                    id="allowCustomMenu"
                  />
                </fieldset>
              </div>
            </div>
          </div>

          <div class="col-sm-3">
            <div class="row">
              <div class="col-12">
                <fieldset class="form-group">
                  <label class="form-label semibold" for="logo">Logo</label>
                  <imageUploader
                    name="logo"
                    classButtonUpload="btn-secondary"
                    id="logo"
                    dir-upload="stores"
                    data-vv-name="logo"
                    v-model="formData.logo"
                  />
                  <small v-show="errors.has('logo')" class="text-danger">{{
                    errors.first("logo")
                  }}</small>
                </fieldset>
              </div>

              <div class="col-12">
                <fieldset class="form-group">
                  <label class="form-label semibold" for="address"
                    >Address</label
                  >
                  <input
                    v-model="formData.address"
                    v-validate="'required'"
                    data-vv-name="address"
                    type="text"
                    class="form-control"
                    id="address"
                    placeholder="Enter address"
                  />
                  <small v-show="errors.has('address')" class="text-danger">{{
                    errors.first("address")
                  }}</small>
                </fieldset>
              </div>

              <div class="col-12">
                <fieldset class="form-group">
                  <label class="form-label semibold" for="owner">Owner</label>
                  <select2
                    id="owner"
                    v-validate="'required'"
                    data-vv-name="owner"
                    name="owner"
                    v-model="formData.owner"
                    :ajax="ajaxOwner"
                    placeholder="Select one..."
                    :disabled="$route.name == 'MyStore'"
                  />
                  <small v-show="errors.has('owner')" class="text-danger">{{
                    errors.first("owner")
                  }}</small>
                </fieldset>
              </div>

              <div class="col-12">
                <fieldset class="form-group">
                  <label class="form-label semibold" for="provinceId"
                    >Province</label
                  >
                  <ProvinceSelector v-model="formData.provinceId" />
                </fieldset>
              </div>

              <div class="col-12">
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
  name: "DetailStore",
  data() {
    return {
      formData: {},
      cmsUrl: `${CMS_URL}/stores`,
      ajaxOwner: {
        url: `${CMS_URL}/users/select2`,
        textTemplate: "<%= name %> (<%= email %>)",
      },
      froalaConfig: {
        imageUploadURL: window.settings.services.webUrl + "/api/upload/image",
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
        this.formData = JSON.parse(
          JSON.stringify(
            Object.assign(
              {
                slug: this.$options.filters["text2Slug"](data.name),
              },
              data
            )
          )
        );
      }
    },
    // "formData.name"(val) {
    //   this.formData.slug = this.$options.filters["text2Slug"](val);
    // },
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
  components: {},
  created() {
    this.initService(this.cmsUrl);
    let id = this.$route.params.id;
    if (this.$route.name == "MyStore") {
      id = "mystore";
    }
    if (id !== undefined) this.getItemById({ id });
    else this.newItem();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>
