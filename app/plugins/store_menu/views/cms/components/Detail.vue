<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="StoreMenu"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
        :routeParams="{store_id: formData.store}"
      />

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
              />
              <small v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="description">Description</label>
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
              >{{ errors.first('description') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="image">Image</label>
              <imageUploader
                name="image"
                classButtonUpload="btn-secondary"
                id="image"
                v-validate="'required'"
                dir-upload="store_menus"
                data-vv-name="image"
                v-model="formData.image"
              />
              <small v-show="errors.has('image')" class="text-danger">{{ errors.first('image') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
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
              />
              <small v-show="errors.has('price')" class="text-danger">{{ errors.first('price') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="store">Store</label>
              <select2
                id="store"
                v-validate="'required'"
                data-vv-name="store"
                name="store"
                v-model="formData.store"
                :ajax="ajaxStore"
                placeholder="Select one..."
              />
              <small v-show="errors.has('store')" class="text-danger">{{ errors.first('store') }}</small>
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
  name: "DetailStoreMenu",
  data() {
    return {
      formData: {},
      cmsUrl: `${CMS_URL}/store_menus`,

      ajaxStore: {
        url: `${CMS_URL}/stores/select2`,
        params: {},
        textField: "name"
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
        this.formData = Object.assign(
          {
            store: this.$route.params.store_id
          },
          data
        );
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
