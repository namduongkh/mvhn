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
      >
        <template slot="moreAction">
          <StorePanel v-if="$route.params.storeId" :store="$route.params.storeId"></StorePanel>
        </template>
      </DetailActions>

      <form class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>

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
              >
              <small v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</small>
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
              >
              <small v-show="errors.has('slug')" class="text-danger">{{ errors.first('slug') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="urls">Urls</label>
              <ProductUrl v-model="formData.urls"></ProductUrl>
            </fieldset>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-4">
            <fieldset class="form-group">
              <label class="form-label semibold" for="rootPrice">Root price</label>
              <input
                v-model="formData.rootPrice"
                data-vv-name="rootPrice"
                type="number"
                class="form-control"
                id="rootPrice"
                min="0"
                placeholder="Enter Root price"
              />
              <small
                v-show="errors.has('rootPrice')"
                class="text-danger"
              >{{ errors.first('rootPrice') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-4">
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

          <div class="col-sm-6">
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
              <label class="form-label semibold" for="price">Price</label>
              <input
                v-model="formData.price"
                data-vv-name="price"
                type="text"
                class="form-control"
                id="price"
                min="0"
                placeholder="Enter price"
              >
              <small v-show="errors.has('price')" class="text-danger">{{ errors.first('price') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-4">
            <fieldset class="form-group">
              <label class="form-label semibold" for="quantity">Quantity</label>
              <input
                v-model="formData.quantity"
                data-vv-name="quantity"
                type="number"
                class="form-control"
                id="quantity"
                placeholder="Enter quantity"
                min="0"
              />
              <small
                v-show="errors.has('quantity')"
                class="text-danger"
              >{{ errors.first('quantity') }}</small>
            </fieldset>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6">
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

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="tags">Tags</label>
              <select2
                id="tags"
                data-vv-name="tags"
                name="tags"
                v-model="formData.tags"
                :ajax="ajaxTags"
                :multiple="true"
                placeholder="Select one..."
              />
              <small v-show="errors.has('tags')" class="text-danger">{{ errors.first('tags') }}</small>
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
import ProductUrl from "./ProductUrl";

export default {
  name: "DetailProduct",
  data() {
    return {
      formData: {},
      ajaxCategory: {
        url: `${CMS_URL}/properties/select2`,
        params: {
          type: "category"
        },
        textField: "name",
        autoload: true
      },
      ajaxTags: {
        url: `${CMS_URL}/properties/select2`,
        params: {
          type: "tag"
        },
        textField: "name",
        autoload: true
      },
      ajaxStore: {
        url: `${CMS_URL}/stores/select2`,
        params: {},
        textField: "name",
        autoload: true
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
    ...mapGetters(["itemSelected", "authUser"]),
    cmsUrl() {
      if (this.$route.params.storeId) {
        return `${CMS_URL}/stores/${this.$route.params.storeId}/products`;
      } else {
        return `${CMS_URL}/products`;
      }
    }
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
      if (!this.formData._id) {
        this.newItem();
      } else {
        this.getItemById({ id: this.formData._id });
      }
    }
  },
  components: { ProductUrl },
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