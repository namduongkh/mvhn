<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Script"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      >
        <template slot="moreAction">
          <button type="button" @click="run()" class="btn btn-success" v-if="formData._id">
            <i class="fa fa-play"></i> Run
          </button>
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

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="code">Code</label>
              <codemirror v-model="formData.code" :options="codeEditorOptions" />
            </fieldset>
          </div>

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
import { codemirror } from "vue-codemirror";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/monokai.css";

export default {
  name: "DetailScript",
  data() {
    return {
      formData: {},
      cmsUrl: `${CMS_URL}/scripts`,

      ajaxUser: {
        url: `${CMS_URL}/users/select2`,
        params: {},
        textTemplate: "<%= name %> (<%= email %>)",
      },
      froalaConfig: {
        imageUploadURL: WEB_URL + "/api/upload/image",
        imageUploadMethod: "POST",
        imageUploadParams: {
          type: "wysiwyg/post",
        },
      },

      codeEditorOptions: {
        tabSize: 2,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "text/javascript",
        lineWrapping: true,
        theme: "monokai",
      },
    };
  },
  computed: {
    ...mapGetters(["itemSelected", "authUser"]),
  },
  watch: {
    itemSelected(data) {
      if (data) {
        this.formData = Object.assign(
          {
            code: "",
          },
          data
        );
      }
    },
    "formData.name"(val) {
      if (this.formData._id) return;
      this.formData.slug = this.$options.filters["text2Slug"](val);
    },
  },
  methods: {
    ...mapActions([
      "initService",
      "saveItem",
      "getItemById",
      "newItem",
      "openConfirm",
    ]),
    save(options) {
      let self = this;
      this.$validator.validateAll().then((res) => {
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
    run() {
      axios
        .get(`${WEB_URL}/scripts/${this.formData._id}/run`)
        .then(({ data }) => {
          this.openConfirm({
            title: "Kết quả",
            message: data,
          });
        });
    },
  },
  components: { codemirror },
  created() {
    this.initService(this.cmsUrl);
    let id = this.$route.params.id;
    if (id !== undefined) this.getItemById({ id });
    else this.newItem();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>
