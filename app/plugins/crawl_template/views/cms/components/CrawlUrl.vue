<template>
  <div class="row">
    <div class="col-sm-12">
      <ul style="max-height:500px;overflow:auto" v-if="urls.length">
        <li>
          <input type="checkbox" v-model="selectAll" id="select-all" /> Select All
        </li>
        <li v-for="(url, index) in urls" :key="index">
          <input type="checkbox" v-model="crawlData.urls" :value="url" />
          <a :href="url" target="_blank">{{ url }}</a>
        </li>
      </ul>
      <div class="text-right">
        <button type="button" class="btn btn-primary-outline" @click="crawlUrl()">
          <i class="fa fa-download"></i> Fetch Url
        </button>
        <button type="button" @click="crawl()" class="btn btn-primary">
          <i class="fa fa-spider"></i> Crawl
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ResourcesService from "@general/resources_service";

export default {
  name: "CrawlUrl",
  props: {
    crawlTemplateId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      crawlService: new ResourcesService(`${CMS_URL}/crawl_templates`),
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
      ajaxTags: {
        url: `${CMS_URL}/properties/select2`,
        params: {
          type: "tag"
        },
        textField: "name",
        autoload: true
      },

      selectAll: false
    };
  },
  methods: {
    crawl() {
      this.crawlService
        .member(`${this.crawlTemplateId}/run`, "POST", this.crawlData)
        .then(() => {
          this.$notify("Running...", { type: "success" });
        });
    },
    crawlUrl() {
      this.crawlService
        .member(
          `${this.crawlTemplateId}/fetch_url`,
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
