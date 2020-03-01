<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="EmailQueue"
        listRouter="/email_queues"
        routeDetail="/email_queue"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      >
        <template slot="moreAction"></template>
      </DetailActions>

      <form class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>

        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="from.name">Name</label>
              <input
                v-model="formData.from.name"
                data-vv-name="from.name"
                type="text"
                class="form-control"
                id="from.name"
                placeholder="Enter Name"
              />
              <small
                v-show="errors.has('from.name')"
                class="text-danger"
              >{{ errors.first('from.name') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="from.address">Address</label>
              <input
                v-model="formData.from.address"
                data-vv-name="from.address"
                type="text"
                class="form-control"
                id="from.address"
                placeholder="Enter Address"
              />
              <small
                v-show="errors.has('from.address')"
                class="text-danger"
              >{{ errors.first('from.address') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="subject">Subject</label>
              <input
                v-model="formData.subject"
                data-vv-name="subject"
                rows="5"
                name="subject"
                id="subject"
                class="form-control"
                placeholder="Enter Subject"
              />
              <small
                v-show="errors.has('subject')"
                class="text-danger"
              >{{ errors.first('subject') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="content">Content</label>
              <textarea
                v-model="formData.content"
                data-vv-name="content"
                rows="5"
                name="content"
                id="content"
                class="form-control"
                placeholder="Enter Content"
              ></textarea>
              <small
                v-show="errors.has('content')"
                class="text-danger"
              >{{ errors.first('content') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="context">Context</label>
              <bz-json-editor
                data-vv-name="context"
                name="context"
                id="context"
                v-model="formData.context"
              />
              <small
                v-show="errors.has('context')"
                class="text-danger"
              >{{ errors.first('context') }}</small>
            </fieldset>
          </div>
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="transferStatus">Transfer Status</label>
              <input
                v-model="formData.transferStatus"
                data-vv-name="transferStatus"
                type="text"
                class="form-control"
                id="transferStatus"
                placeholder="Enter Transfer Status"
              />
              <small
                v-show="errors.has('transferStatus')"
                class="text-danger"
              >{{ errors.first('transferStatus') }}</small>
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
  name: "DetailEmailQueue",
  data() {
    return {
      formData: {
        from: {}
      },
      cmsUrl: `${CMS_URL}/email_queues`,

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
            from: {}
          },
          data
        );
      }
    },
    "formData.name"(val) {
      if (this.formData._id) return;
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
