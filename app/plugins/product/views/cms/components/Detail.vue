<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Product"
        listRouter="/products"
        routeDetail="/product"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      />

      <form class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>

        <div class="row">
          <div class="col-sm-12">
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
              >
              <small v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
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
              >
              <small v-show="errors.has('slug')" class="text-danger">{{ errors.first('slug') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="url">Url</label>
              <input
                v-model="formData.url"
                v-validate="'required'"
                data-vv-name="url"
                type="text"
                class="form-control"
                id="url"
                placeholder="Enter url"
              >
              <small v-show="errors.has('url')" class="text-danger">{{ errors.first('url') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="thumb">Thumb</label>
              <imageUploader
                name="thumb"
                classButtonUpload="btn-secondary"
                id="thumb"
                v-validate="'required'"
                dir-upload="products"
                data-vv-name="thumb"
                v-model="formData.thumb"
              />
              <small v-show="errors.has('thumb')" class="text-danger">{{ errors.first('thumb') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="content">Content</label>
              <froala
                :tag="'textarea'"
                v-model="formData.content"
                v-validate="'required'"
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

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="price">Price</label>
              <input
                v-model="formData.price"
                v-validate="'required'"
                data-vv-name="price"
                type="text"
                class="form-control"
                id="price"
                placeholder="Enter price"
              >
              <small v-show="errors.has('price')" class="text-danger">{{ errors.first('price') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="category">Category</label>
              <select2
                id="category"
                v-validate="'required'"
                data-vv-name="category"
                name="category"
                v-model="formData.category"
                :ajax="ajaxCategory"
                placeholder="Select one..."
              />
              <small
                v-show="errors.has('category')"
                class="text-danger"
              >{{ errors.first('category') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="tags">Tags</label>
              <select2
                id="tags"
                v-validate="'required'"
                data-vv-name="tags"
                name="tags"
                v-model="formData.tags"
                :ajax="ajaxTags"
                placeholder="Select one..."
              />
              <small v-show="errors.has('tags')" class="text-danger">{{ errors.first('tags') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="status">Status</label>
              <input
                v-model="formData.status"
                v-validate="'required'"
                data-vv-name="status"
                type="text"
                class="form-control"
                id="status"
                placeholder="Enter status"
              >
              <small v-show="errors.has('status')" class="text-danger">{{ errors.first('status') }}</small>
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
  name: "DetailProduct",
  data() {
    return {
      formData: {},
      cmsUrl: `${window.settings.services.cmsUrl}/products`,

      ajaxCategory: {
        url: `${window.settings.services.cmsUrl}/properties/select2`,
        params: { type: "category" },
        textField: "name",
        autoload: false
      },
      ajaxTags: {
        url: `${window.settings.services.cmsUrl}/properties/select2`,
        params: { type: "tag" },
        textField: "name",
        autoload: false
      },
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
        this.formData = JSON.parse(JSON.stringify(Object.assign({}, data)));
      }
    },
    "formData.name"(val) {
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
      if (!this.formatData._id) {
        this.newItem();
      } else {
        this.getItemById({ id: this.formatData._id });
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