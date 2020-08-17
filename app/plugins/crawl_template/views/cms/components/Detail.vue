<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Crawl Template"
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
              <label class="form-label semibold" for="url">Url</label>
              <input
                v-model="formData.url"
                data-vv-name="url"
                type="text"
                class="form-control"
                id="url"
                placeholder="Enter Url"
              />
              <small v-show="errors.has('url')" class="text-danger">{{ errors.first('url') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="urlPattern">Url Pattern</label>
              <input
                v-model="formData.urlPattern"
                data-vv-name="urlPattern"
                type="text"
                class="form-control"
                id="urlPattern"
                placeholder="Enter Url Pattern"
              />
              <small
                v-show="errors.has('urlPattern')"
                class="text-danger"
              >{{ errors.first('urlPattern') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="crawler">Crawler</label>
              <select2
                id="crawler"
                v-validate="'required'"
                data-vv-name="Crawler"
                name="crawler"
                v-model="formData.crawler"
                :ajax="ajaxCrawler"
                placeholder="Chọn..."
              />
              <small
                v-show="errors.has('crawler')"
                class="text-danger"
              >{{ errors.first('crawler') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="category">Category</label>
              <select2
                id="category"
                data-vv-name="category"
                name="category"
                v-model="formData.category"
                :ajax="ajaxCategory"
                placeholder="Select one..."
                :tags="true"
                :createItem="true"
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
                placeholder="Select one..."
                :tags="true"
                :multiple="true"
                :createItem="true"
              />
              <small v-show="errors.has('tags')" class="text-danger">{{ errors.first('tags') }}</small>
            </fieldset>
          </div>

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

        <CrawlUrl v-if="formData._id" :crawlTemplateId="formData._id" />
      </form>
      <!--.box-typical-->
    </div>
    <!--.container-fluid-->
  </div>
  <!--.page-content-->
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CrawlUrl from "./CrawlUrl";

export default {
  name: "DetailCrawlTemplate",
  data() {
    return {
      formData: {},
      cmsUrl: `${CMS_URL}/crawl_templates`,

      ajaxCategory: {
        url: `${CMS_URL}/properties/select2`,
        params: { type: "category" },
        textField: "name",
        autoload: true
      },
      ajaxTags: {
        url: `${CMS_URL}/properties/select2`,
        params: { type: "tag" },
        textField: "name",
        autoload: true
      },
      ajaxCrawler: {
        url: `${CMS_URL}/crawlers/select2`,
        textField: "name",
        autoload: true
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
  components: { CrawlUrl },
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
