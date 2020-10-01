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
        <template slot="moreAction"> </template>
      </DetailActions>

      <form class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">
          Fill data below and click actions above
        </h5>

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
              <small v-show="errors.has('name')" class="text-danger">{{
                errors.first("name")
              }}</small>
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
              <small v-show="errors.has('slug')" class="text-danger">{{
                errors.first("slug")
              }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="code">Code</label>
              <a
                class="btn btn-secondary-outline"
                href="javascript:void(0)"
                @click="toggleCodeEditor(true)"
                >Open Code Editor</a
              >
              <div class="code-editor-wrapper" v-show="codeEditorOpening">
                <div class="text-right">
                  <a
                    class="btn btn-sm btn-danger"
                    href="javascript:void(0)"
                    @click="toggleCodeEditor(false)"
                    >Close</a
                  >
                </div>
                <codemirror
                  v-model="formData.code"
                  :options="codeEditorOptions"
                />
              </div>
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
              <small v-show="errors.has('user')" class="text-danger">{{
                errors.first("user")
              }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12" v-if="formData._id">
            <fieldset class="form-group">
              <label class="form-label semibold" for="params"
                >Test Params</label
              >
              <bz-json-editor
                v-if="testingRun.params"
                data-vv-name="params"
                name="params"
                id="params"
                mode="code"
                v-model="testingRun.params"
              />
            </fieldset>
            <div class="form-inline">
              <select
                v-model="testingRun.method"
                name="method"
                id="method"
                class="form-control"
              >
                <option :value="'get'">GET</option>
                <option :value="'post'">POST</option>
              </select>
              <button type="button" @click="run()" class="btn btn-success">
                <i class="fa fa-play"></i> Testing Run
              </button>
            </div>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="variables"
                >Variables</label
              >
              <bz-json-editor
                v-if="formData.variables"
                data-vv-name="variables"
                name="variables"
                id="variables"
                mode="code"
                v-model="formData.variables"
              />
              <small v-show="errors.has('variables')" class="text-danger">{{
                errors.first("variables")
              }}</small>
            </fieldset>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="status">Status</label>
              <select
                v-model="formData.status"
                name="status"
                id="status"
                class="form-control"
              >
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
import axios from "axios";

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
        viewportMargin: Infinity,
      },

      codeEditorOpening: false,

      testingRun: {
        params: {},
        method: "get",
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
      let promise = {
        get: axios.get(`${WEB_URL}/scripts/${this.formData._id}/run`, {
          withCredentials: true,
          params: this.testingRun.params,
        }),
        post: axios.get(
          `${WEB_URL}/scripts/${this.formData._id}/run`,
          this.testingRun.params,
          {
            withCredentials: true,
          }
        ),
      }[this.testingRun.method];

      promise
        .then(({ data }) => {
          this.openConfirm({
            title: "Kết quả",
            message: data,
            showCancel: false,
          });
        })
        .catch((err) => {
          this.openConfirm({
            title: "Lỗi",
            message: err.message,
            showCancel: false,
          });
        });
    },
    toggleCodeEditor(value) {
      this.codeEditorOpening = value;
      $(".CodeMirror").css("height", "100%");
    },
  },
  components: {},
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
.code-editor-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 9999;
  background: #000;
}
.vue-codemirror {
  height: 100% !important;
}
</style>
