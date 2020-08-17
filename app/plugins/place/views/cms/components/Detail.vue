<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Place"
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
              <label class="form-label semibold" for="address">Address</label>
              <input
                v-model="formData.address"
                data-vv-name="address"
                type="text"
                class="form-control"
                id="address"
                placeholder="Enter Address"
              />
              <small
                v-show="errors.has('address')"
                class="text-danger"
              >{{ errors.first('address') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="lat">Lat</label>
              <input
                v-model="formData.lat"
                data-vv-name="lat"
                type="text"
                class="form-control"
                id="lat"
                placeholder="Enter Lat"
              />
              <small v-show="errors.has('lat')" class="text-danger">{{ errors.first('lat') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="lng">Lng</label>
              <input
                v-model="formData.lng"
                data-vv-name="lng"
                type="text"
                class="form-control"
                id="lng"
                placeholder="Enter Lng"
              />
              <small v-show="errors.has('lng')" class="text-danger">{{ errors.first('lng') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="placeId">Place Id</label>
              <input
                v-model="formData.placeId"
                data-vv-name="placeId"
                type="text"
                class="form-control"
                id="placeId"
                placeholder="Enter Place Id"
              />
              <small
                v-show="errors.has('placeId')"
                class="text-danger"
              >{{ errors.first('placeId') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="provinceId">Province Id</label>
              <input
                v-model="formData.provinceId"
                data-vv-name="provinceId"
                type="text"
                class="form-control"
                id="provinceId"
                placeholder="Enter Province Id"
              />
              <small
                v-show="errors.has('provinceId')"
                class="text-danger"
              >{{ errors.first('provinceId') }}</small>
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
  name: "DetailPlace",
  data() {
    return {
      formData: {},
      cmsUrl: `${CMS_URL}/places`,

      froalaConfig: {
        imageUploadURL: WEB_URL + "/api/upload/image",
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
        this.formData = Object.assign({}, data);
      }
    },
    "formData.name"(val) {
      if (this.formData._id) return;
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
