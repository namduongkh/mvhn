<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Devtool"
        listRouter="/devtools"
        routeDetail="/devtool"
        :formData="formData"
        :disable="errors.any()"
        :routeConfig="{index: 'DocumentList'}"
        @action="save"
        @reset="resetForm"
      >
        <template slot="moreAction"></template>
      </DetailActions>

      <form class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>

        <div class="row">
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="formData">Attributes</label>
              <bz-json-editor
                data-vv-name="formData"
                name="formData"
                id="formData"
                v-model="formData"
                v-if="formData._id"
                mode="code"
                height="500"
              />
              <small
                v-show="errors.has('formData')"
                class="text-danger"
              >{{ errors.first('formData') }}</small>
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
  name: "MongoDetail",
  data() {
    return {
      formData: {},
      cmsUrl: `${CMS_URL}/devtools/mongos/${this.$route.params.model}`,

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
