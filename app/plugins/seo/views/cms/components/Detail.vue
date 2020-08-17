<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Sitemap Config"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      >
        <template slot="moreAction">
          <button
            type="button"
            class="btn btn-secondary"
            @click="generateSitemap()"
            v-if="$route.params.id"
          >
            <span class="fa fa-link"></span> Generate Sitemap
          </button>
        </template>
      </DetailActions>

      <form class="box-typical box-typical-padding">
        <div class="row" v-if="formData._id">
          <div class="col-sm-12">
            <label class="form-label semibold">Generated File</label>
            <a
              :href="'/files/' + formData.slug + '.xml'"
              target="_blank"
            >{{ 'files/' + formData.slug + '.xml' }}</a>
            <br />
            <a
              :href="'https://www.google.com/ping?sitemap=' + webUrl + '/files/' + formData.slug + '.xml'"
              target="_blank"
              class="btn btn-secondary-outline btn-sm"
            >Submit to Google</a>
            <a
              :href="'https://www.bing.com/ping?sitemap=' + webUrl + '/files/' + formData.slug + '.xml'"
              target="_blank"
              class="btn btn-secondary-outline btn-sm"
            >Submit to Bing</a>
          </div>
        </div>

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
              <label class="form-label semibold" for="slug">Slug</label>
              <input
                v-model="formData.slug"
                data-vv-name="slug"
                type="text"
                class="form-control"
                id="slug"
                placeholder="Enter Slug"
              />
              <small v-show="errors.has('slug')" class="text-danger">{{ errors.first('slug') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="model">Model</label>
              <input
                v-model="formData.model"
                data-vv-name="model"
                type="text"
                class="form-control"
                id="model"
                placeholder="Enter Model"
              />
              <small v-show="errors.has('model')" class="text-danger">{{ errors.first('model') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="queryOptions">Query Options</label>
              <bz-json-editor
                v-if="formData.queryOptions"
                data-vv-name="queryOptions"
                name="queryOptions"
                id="queryOptions"
                mode="code"
                v-model="formData.queryOptions"
              />
              <small
                v-show="errors.has('queryOptions')"
                class="text-danger"
              >{{ errors.first('queryOptions') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="selectedAttributes">Selected Attributes</label>
              <bz-json-editor
                v-if="formData.selectedAttributes"
                data-vv-name="selectedAttributes"
                name="selectedAttributes"
                id="selectedAttributes"
                mode="code"
                v-model="formData.selectedAttributes"
              />
              <small
                v-show="errors.has('selectedAttributes')"
                class="text-danger"
              >{{ errors.first('selectedAttributes') }}</small>
            </fieldset>
          </div>
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="urlPattern">Url Pattern</label>
              <input
                v-model="formData.urlPattern"
                data-vv-name="urlPattern"
                type="text"
                class="form-control"
                id="urlPattern"
                placeholder="Enter Url Pattern"
              />
              <small
                v-show="errors.has('urlPattern')"
                class="text-danger"
              >{{ errors.first('urlPattern') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="priority">Priority</label>
              <input
                v-model="formData.priority"
                data-vv-name="priority"
                type="text"
                class="form-control"
                id="priority"
                placeholder="Enter Priority"
              />
              <small
                v-show="errors.has('priority')"
                class="text-danger"
              >{{ errors.first('priority') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="changefreq">Change freq</label>
              <input
                v-model="formData.changefreq"
                data-vv-name="changefreq"
                type="text"
                class="form-control"
                id="changefreq"
                placeholder="Enter Change freq"
              />
              <small
                v-show="errors.has('changefreq')"
                class="text-danger"
              >{{ errors.first('changefreq') }}</small>
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
import ResourcesService from "@general/resources_service";

export default {
  name: "DetailSitemapConfig",
  data() {
    return {
      formData: {},
      cmsUrl: `${CMS_URL}/sitemaps`,
      webUrl: WEB_URL,
      service: new ResourcesService(`${CMS_URL}/sitemaps`)
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
            queryOptions: {}
          },
          data
        );
      }
    },
    "formData.name"(val) {
      if (this.formData._id) return;
      this.formData.slug = this.$options.filters["text2Slug"](val);
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
    generateSitemap() {
      this.service
        .member(`${this.formData._id}/generate_sitemap`, "GET")
        .then(({ data }) => {
          if (data) {
            this.$notify("Successfully!", { type: "success" });
          } else {
            this.$notify("Failed!", { type: "error" });
          }
        });
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
