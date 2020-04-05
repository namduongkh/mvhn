<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Carpool"
        listRouter="/carpools"
        routeDetail="/carpool"
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
              <label class="form-label semibold" for="user">User</label>
              <select2
                id="user"
                data-vv-name="user"
                name="user"
                v-model="formData.user"
                :ajax="ajaxUser"
                placeholder="Select one..."
              />
              <small v-show="errors.has('user')" class="text-danger">{{ errors.first('user') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="fromPlace">From Place</label>
              <select2
                id="fromPlace"
                data-vv-name="fromPlace"
                name="fromPlace"
                v-model="formData.fromPlace"
                :ajax="ajaxFromplace"
                placeholder="Select one..."
              />
              <small
                v-show="errors.has('fromPlace')"
                class="text-danger"
              >{{ errors.first('fromPlace') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="toPlace">To Place</label>
              <select2
                id="toPlace"
                data-vv-name="toPlace"
                name="toPlace"
                v-model="formData.toPlace"
                :ajax="ajaxToplace"
                placeholder="Select one..."
              />
              <small
                v-show="errors.has('toPlace')"
                class="text-danger"
              >{{ errors.first('toPlace') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="time">Time</label>
              <datetime
                v-model="formData.time"
                data-vv-name="time"
                name="time"
                id="time"
                type="datetime"
                format="dd/MM/yyyy HH:mm"
                :auto="true"
                :phrases="{ok: 'OK', cancel: 'Hủy'}"
                input-class="form-control"
              ></datetime>
              <small v-show="errors.has('time')" class="text-danger">{{ errors.first('time') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="vehicleType">Vehicle Type</label>
              <select
                v-model="formData.vehicleType"
                name="vehicleType"
                id="vehicleType"
                class="form-control"
              >
                <option
                  v-for="option in VEHICLE_TYPE_OPTIONS"
                  :key="option[0]"
                  :value="option[0]"
                >{{ option[1]}}</option>
              </select>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="description">Description</label>
              <froala
                :tag="'textarea'"
                v-model="formData.description"
                id="description"
                name="description"
                data-vv-name="description"
              />
              <small
                v-show="errors.has('description')"
                class="text-danger"
              >{{ errors.first('description') }}</small>
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
import Constant from "@Plugin/carpool/models/constant.js";

export default {
  name: "DetailCarpool",
  data() {
    return {
      formData: {},
      cmsUrl: `${CMS_URL}/carpools`,

      ajaxUser: {
        url: `${CMS_URL}/users/select2`,
        params: {},
        textField: "name",
        autoload: false
      },
      ajaxFromplace: {
        url: `${CMS_URL}/places/select2`,
        params: {},
        textField: "name",
        autoload: false
      },
      ajaxToplace: {
        url: `${CMS_URL}/places/select2`,
        params: {},
        textField: "name",
        autoload: false
      },
      froalaConfig: {
        imageUploadURL: WEB_URL + "/api/upload/image",
        imageUploadMethod: "POST",
        imageUploadParams: {
          type: "wysiwyg/post"
        }
      },

      VEHICLE_TYPE_OPTIONS: Constant.VEHICLE_TYPE_OPTIONS
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
