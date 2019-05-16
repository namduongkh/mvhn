<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Post"
        listRouter="/posts"
        routeDetail="/post"
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
              <label class="form-label semibold" for="exampleInput">Title</label>
              <input
                v-model="formData.title"
                v-validate="'required'"
                data-vv-name="Tiêu đề"
                type="text"
                class="form-control"
                id="exampleInput"
                placeholder="Title"
              >
              <small
                v-show="errors.has('Tiêu đề')"
                class="text-danger"
              >{{ errors.first('Tiêu đề') }}</small>
            </fieldset>
          </div>
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="exampleInputEmail1">Slug</label>
              <input
                v-model="formData.slug"
                v-validate="'required'"
                data-vv-name="Slug"
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                placeholder="Slug auto generator"
              >
              <small v-show="errors.has('Slug')" class="text-danger">{{ errors.first('Slug') }}</small>
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
                data-vv-name="Category"
                name="category"
                v-model="formData.category"
                :ajax="ajaxCategory"
                placeholder="Chọn..."
              />

              <small
                v-show="errors.has('Category')"
                class="text-danger"
              >{{ errors.first('Category') }}</small>
            </fieldset>
          </div>
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="tags">Tags</label>
              <select2
                id="tags"
                data-vv-name="Tags"
                name="tags"
                v-model="formData.tags"
                :ajax="ajaxTags"
                placeholder="Chọn..."
                :tags="true"
                :multiple="true"
                :createTag="createTag"
              />
              <small v-show="errors.has('Tags')" class="text-danger">{{ errors.first('Tags') }}</small>
            </fieldset>
          </div>
        </div>
        <!--.row-->

        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="thumb">Thumb image</label>
              <imageUploader
                name="thumb"
                classButtonUpload="btn-secondary"
                id="thumb"
                data-vv-name="Hình thumb"
                v-model="formData.thumb"
              />
              <small
                v-show="errors.has('Hình thumb')"
                class="text-danger"
              >{{ errors.first('Hình thumb') }}</small>
            </fieldset>
          </div>
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="thumb-url">Thumb Url</label>
              <input
                v-model="formData.thumb"
                data-vv-name="Thumb Url"
                type="text"
                class="form-control"
                id="thumb-url"
                placeholder="Thumb Url"
              >
            </fieldset>
          </div>
        </div>
        <!--.row-->

        <div class="row">
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="summary">Summary</label>
              <textarea
                v-model="formData.summary"
                type="text"
                class="form-control"
                id="summary"
                placeholder="Summary"
              ></textarea>
            </fieldset>
          </div>
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label" for="exampleInputPassword1">Content</label>
              <froala :tag="'textarea'" v-model="formData.content"/>
              <small
                v-show="errors.has('Mật khẩu')"
                class="text-danger"
              >{{ errors.first('Mật khẩu') }}</small>
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
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DetailPost",
  data() {
    return {
      formData: {},
      apiUrl: `${window.settings.services.cmsUrl}/posts`,
      ajaxCategory: {
        url: `${window.settings.services.cmsUrl}/properties/select2`,
        params: {
          type: "category"
        },
        textField: "name",
        autoload: true
      },
      ajaxTags: {
        url: `${window.settings.services.cmsUrl}/properties/select2`,
        params: {
          type: "tag"
        },
        textField: "name",
        autoload: true
      },
      createTag: function(params) {
        var term = $.trim(params.term);

        if (term === "") {
          return null;
        }

        return { id: term, text: term };
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
    ...mapGetters(["itemSelected"])
  },
  watch: {
    itemSelected(data) {
      if (data) {
        this.formData = JSON.parse(JSON.stringify(Object.assign({}, data)));
      }
    },
    "formData.title"(val) {
      this.formData.slug = this.$options.filters["text2Slug"](val);
    }
    // "formData.slug"(val) {
    //   this.formData.slug = this.$options.filters["text2Slug"](val);
    // }
  },
  methods: {
    ...mapActions(["initService", "saveItem", "getItemById", "newItem"]),
    save(options) {
      let self = this;
      this.$validator.validateAll().then(res => {
        if (res) {
          self.saveItem({ formData: self.formData, options });
        } else {
          this.$notify("Please check data", {
            type: "warning",
            placement: {
              from: "bottom"
            }
          });
        }
      });
    },
    resetForm() {
      this.formData = JSON.parse(JSON.stringify(formData));
      this.errors.clear();
    }
  },
  components: {},
  created() {
    this.initService(this.apiUrl);
    let id = this.$route.params.id;
    if (id !== undefined) this.getItemById({ id });
    else this.newItem();
  },
  mounted() {}
};
</script>