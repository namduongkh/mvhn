<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Page"
        listRouter="/pages"
        routeDetail="/page"
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
                data-vv-name="Title"
                type="text"
                class="form-control"
                id="title"
                placeholder="Title"
              >
              <small v-show="errors.has('Title')" class="text-danger">{{ errors.first('Title') }}</small>
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
        <!--.row-->
        <div class="row">
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label" for="exampleInputPassword1">Content</label>
              <froala :tag="'textarea'" :config="froalaConfig" v-model="formData.content"/>
              <small
                v-show="errors.has('Content')"
                class="text-danger"
              >{{ errors.first('Content') }}</small>
            </fieldset>
          </div>
        </div>

        <PageBanner v-model="formData.banner"/>

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
          <!-- <div class="col-sm-6">
                        <label class="form-label" for="status">{{testSelect2}}</label>
                        <select2 v-model="testSelect2" :options="testSelect2Opt"/>
          </div>-->
        </div>
      </form>
      <!--.box-typical-->
    </div>
    <!--.container-fluid-->
  </div>
  <!--.page-content-->
</template>
<script>
// TODO: Add select 2 category
let formData = {
  title: "",
  status: 1,
  slug: "",
  banner: {}
};

import { mapGetters, mapActions } from "vuex";
import PageBanner from "./form/PageBanner";

export default {
  name: "DetailPage",
  data() {
    return {
      formData: JSON.parse(JSON.stringify(formData)),
      apiUrl: `${window.settings.services.adminUrl}/page`,
      listCategory: [],
      ajaxCategory: {
        url: `${window.settings.services.adminUrl}/category/ajax`,
        dataType: "json",
        xhrFields: { withCredentials: true },
        cache: true
      },
      froalaConfig: {
        imageUploadURL: window.settings.services.uploadApi,
        imageUploadMethod: "POST",
        imageUploadParams: {
          type: "wysiwyg/tip"
        }
      }
      // testSelect2:null,
      // testSelect2Opt: [
      //     {id: 'val1', text: 'Value 1'},
      //     {id: 'val2', text: 'Value 2'},
      //     {id: 'val3', text: 'Value 3'},
      //     {id: 'val4', text: 'Value 4'},
      //     {id: 'val5', text: 'Value 5'},
      // ]
    };
  },
  computed: {
    ...mapGetters(["itemSelected"])
  },
  watch: {
    itemSelected(data) {
      if (data) {
        let templateData = Object.assign({}, formData);
        this.formData = JSON.parse(
          JSON.stringify(Object.assign({}, templateData, data))
        );
      }
    },
    "formData.title"(val) {
      this.formData.slug = this.$options.filters["text2Slug"](val);
    },
    "formData.slug"(val) {
      this.formData.slug = this.$options.filters["text2Slug"](val);
    }
  },
  methods: {
    ...mapActions(["initService", "saveItem", "getItemById"]),
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
  components: {
    PageBanner
  },
  created() {
    this.initService(this.apiUrl);
    let id = this.$route.params.id;
    if (id !== undefined) this.getItemById({ id });
  },
  mounted() {}
};
</script>