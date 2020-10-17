<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Page"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      />

      <form class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>

        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="title">Title</label>
              <input
                v-model="formData.title"
                v-validate="'required'"
                data-vv-name="title"
                type="text"
                class="form-control"
                id="title"
                placeholder="Enter title"
              />
              <small v-show="errors.has('title')" class="text-danger">{{ errors.first('title') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="slug">Slug</label>
              <input
                v-model="formData.slug"
                v-validate="'required'"
                data-vv-name="slug"
                type="text"
                class="form-control"
                id="slug"
                placeholder="Enter slug"
              />
              <small v-show="errors.has('slug')" class="text-danger">{{ errors.first('slug') }}</small>
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
              <small
                v-show="errors.has('content')"
                class="text-danger"
              >{{ errors.first('content') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="thumb">Thumb</label>
              <imageUploader
                name="thumb"
                classButtonUpload="btn-secondary"
                id="thumb"
                dir-upload="pages"
                data-vv-name="thumb"
                v-model="formData.thumb"
              />
              <small v-show="errors.has('thumb')" class="text-danger">{{ errors.first('thumb') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="summary">Summary</label>
              <textarea
                v-model="formData.summary"
                data-vv-name="summary"
                rows="5"
                name="summary"
                id="summary"
                class="form-control"
                placeholder="Enter summary"
              ></textarea>
              <small
                v-show="errors.has('summary')"
                class="text-danger"
              >{{ errors.first('summary') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="layoutTemplate">Layout Template</label>
              <input
                v-model="formData.layoutTemplate"
                type="text"
                class="form-control"
                id="layoutTemplate"
                placeholder="Enter Layout Template"
              />
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="template">Template</label>
              <input
                v-model="formData.template"
                data-vv-name="template"
                type="text"
                class="form-control"
                id="template"
                placeholder="Enter template"
              />
              <small
                v-show="errors.has('template')"
                class="text-danger"
              >{{ errors.first('template') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6" v-if="formData.meta">
            <fieldset class="form-group">
              <label class="form-label semibold" for="landingPage">Landing Page</label>
              <input type="checkbox" v-model="formData.meta.landingPage" />
            </fieldset>

            <fieldset class="form-group">
              <label class="form-label semibold" for="hideFooter">Hide Footer</label>
              <input type="checkbox" v-model="formData.meta.hideFooter" />
            </fieldset>

            <fieldset class="form-group">
              <label class="form-label semibold" for="hideNavBar">Hide Nav Bar</label>
              <input type="checkbox" v-model="formData.meta.hideNavBar" />
            </fieldset>
          </div>
        </div>

        <div class="row" v-if="formData._id && formData.meta && formData.meta.landingPage">
          <div class="col-sm-12">
            <PageSections :pageId="formData._id"></PageSections>
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
import PageSections from "./PageSections";

export default {
  name: "DetailPage",
  data() {
    return {
      formData: {},
      cmsUrl: `${CMS_URL}/pages`,

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
        data.meta = data.meta || {};
        this.formData = JSON.parse(JSON.stringify(Object.assign({}, data)));
      }
    },
    "formData.title"(val) {
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
    }
  },
  components: {
    PageSections
  },
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
