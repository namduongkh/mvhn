<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>

        <div class="row">
          <div class="col-sm-5 col-xs-4">
            <fieldset class="form-group">
              <label class="form-label semibold" for="url">Url</label>
              <input
                v-model="crawlUrlData.url"
                data-vv-name="url"
                type="text"
                class="form-control"
                id="url"
                placeholder="Url"
              />
            </fieldset>
          </div>
          <div class="col-sm-5 col-xs-4">
            <fieldset class="form-group">
              <label class="form-label semibold" for="urlPattern">Url Pattern</label>
              <input
                v-model="crawlUrlData.urlPattern"
                data-vv-name="urlPattern"
                type="text"
                class="form-control"
                id="urlPattern"
                placeholder="Url Pattern"
              />
            </fieldset>
          </div>
          <div class="col-sm-2 col-xs-4">
            <fieldset class="form-group">
              <label class="form-label semibold" for>.</label>
              <button type="button" class="btn btn-block btn-primary-outline" @click="crawlUrl()">
                <i class="fa fa-spider"></i> Crawl URL
              </button>
            </fieldset>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-7">
            <ul style="max-height:500px;overflow:auto">
              <li>
                <input type="checkbox" v-model="selectAll" id="select-all" /> Select All
              </li>
              <li v-for="(url, index) in urls" :key="index">
                <input type="checkbox" v-model="crawlData.urls" :value="url" />
                <a :href="url" target="_blank">{{ url }}</a>
              </li>
            </ul>
          </div>

          <div class="col-sm-5">
            <fieldset class="form-group">
              <label class="form-label semibold" for="category">Category</label>
              <select2
                id="category"
                v-validate="'required'"
                data-vv-name="Category"
                name="category"
                v-model="crawlData.category"
                :ajax="ajaxCategory"
                placeholder="Chọn..."
                :tags="true"
                :createItem="true"
              />
            </fieldset>

            <fieldset class="form-group">
              <label class="form-label semibold" for="crawlerId">Crawler</label>
              <select2
                id="crawlerId"
                v-validate="'required'"
                data-vv-name="Category"
                name="crawlerId"
                v-model="crawlData.crawlerId"
                :ajax="ajaxCrawler"
                placeholder="Chọn..."
              />
            </fieldset>

            <fieldset class="form-group">
              <label class="form-label semibold" for="status">Status</label>
              <select v-model="crawlData.status" name="status" id="status" class="form-control">
                <option :value="1">Publish</option>
                <option :value="0">Unpublish</option>
                <option :value="2">Trashed</option>
              </select>
            </fieldset>

            <button type="button" @click="crawl()" class="btn btn-primary btn-block">
              <i class="fa fa-spider"></i> Crawl URL
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResourcesService from "@general/resources_service";

export default {
  name: "CrawlUrl",
  data() {
    return {
      crawlService: new ResourcesService(`${CMS_URL}/crawlers`),
      crawlUrlData: {},
      urls: [],
      crawlData: {
        urls: []
      },

      ajaxCategory: {
        url: `${CMS_URL}/properties/select2`,
        params: {
          type: "category"
        },
        textField: "name",
        autoload: true
      },
      ajaxCrawler: {
        url: `${CMS_URL}/crawlers/select2`,
        textField: "name",
        autoload: true
      },

      selectAll: false
    };
  },
  methods: {
    crawl() {
      this.crawlService
        .member(`${this.crawlData.crawlerId}/run`, "POST", this.crawlData)
        .then(() => {
          this.$notify("Running...", { type: "success" });
        });
    },
    crawlUrl() {
      this.crawlService
        .member(
          `crawl_url`,
          "GET",
          {},
          {
            params: this.crawlUrlData
          }
        )
        .then(({ data }) => {
          this.urls = data;
        });
    }
  },
  watch: {
    selectAll(val) {
      if (val) {
        this.crawlData.urls = this.urls;
      } else {
        this.crawlData.urls = [];
      }
    },
    "crawlData.urls"(val) {
      $("#select-all").prop("checked", val == this.urls);
    }
  }
};
</script>

<style>
</style>
