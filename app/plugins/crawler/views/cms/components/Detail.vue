<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Crawler"
        listRouter="/crawlers"
        routeDetail="/crawler"
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
              <label class="form-label semibold" for="titleSelector">Title Selector</label>
              <input
                v-model="formData.titleSelector"
                data-vv-name="titleSelector"
                type="text"
                class="form-control"
                id="titleSelector"
                placeholder="Enter Title Selector"
              />
              <small
                v-show="errors.has('titleSelector')"
                class="text-danger"
              >{{ errors.first('titleSelector') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="summarySelector">Summary Selector</label>
              <input
                v-model="formData.summarySelector"
                data-vv-name="summarySelector"
                type="text"
                class="form-control"
                id="summarySelector"
                placeholder="Enter Summary Selector"
              />
              <small
                v-show="errors.has('summarySelector')"
                class="text-danger"
              >{{ errors.first('summarySelector') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="contentSelector">Content Selector</label>
              <input
                v-model="formData.contentSelector"
                data-vv-name="contentSelector"
                type="text"
                class="form-control"
                id="contentSelector"
                placeholder="Enter Content Selector"
              />
              <small
                v-show="errors.has('contentSelector')"
                class="text-danger"
              >{{ errors.first('contentSelector') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="exceptSelector">Except Selector</label>
              <input
                v-model="formData.exceptSelector"
                data-vv-name="exceptSelector"
                type="text"
                class="form-control"
                id="exceptSelector"
                placeholder="Enter Except Selector"
              />
              <small
                v-show="errors.has('exceptSelector')"
                class="text-danger"
              >{{ errors.first('exceptSelector') }}</small>
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

        <CrawlerTool v-if="formData._id" :crawlerId="formData._id" />
      </form>
      <!--.box-typical-->
    </div>
    <!--.container-fluid-->
  </div>
  <!--.page-content-->
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CrawlerTool from "./CrawlerTool";

export default {
  name: "DetailCrawler",
  data() {
    return {
      formData: {},
      cmsUrl: `${CMS_URL}/crawlers`,

      froalaConfig: {
        imageUploadURL: WEB_URL + "/api/upload/image",
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
        this.formData = Object.assign({}, data);
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
  components: {
    CrawlerTool
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
