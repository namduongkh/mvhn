<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="AuditLog"
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
              <label class="form-label semibold" for="objectType">Object Type</label>
              <input
                v-model="formData.objectType"
                data-vv-name="objectType"
                type="text"
                class="form-control"
                id="objectType"
                placeholder="Enter objectType"
              />
              <small
                v-show="errors.has('objectType')"
                class="text-danger"
              >{{ errors.first('objectType') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="objectId">Object Id</label>
              <input
                v-model="formData.objectId"
                data-vv-name="objectId"
                type="text"
                class="form-control"
                id="objectId"
                placeholder="Enter objectId"
              />
              <small
                v-show="errors.has('objectId')"
                class="text-danger"
              >{{ errors.first('objectId') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="version">Version</label>
              <input
                v-model="formData.version"
                v-validate="'required|numeric'"
                data-vv-name="version"
                type="number"
                class="form-control"
                id="version"
                placeholder="Enter version"
              />
              <small
                v-show="errors.has('version')"
                class="text-danger"
              >{{ errors.first('version') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="changes">Changes</label>
              <bz-json-editor
                v-if="formData.changes"
                data-vv-name="changes"
                name="changes"
                id="changes"
                v-model="formData.changes"
              />
              <small
                v-show="errors.has('changes')"
                class="text-danger"
              >{{ errors.first('changes') }}</small>
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
  name: "DetailAuditLog",
  data() {
    return {
      formData: {},
      cmsUrl: `${CMS_URL}/audit_logs`,

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
