<template>
  <div class="row">
    <div class="col-sm-5 col-xs-4">
      <input
        v-model="crawlData.url"
        data-vv-name="url"
        type="text"
        class="form-control"
        id="url"
        placeholder="Crawl Url"
      />
    </div>
    <div class="col-sm-5 col-xs-4">
      <input
        v-model="crawlData.category"
        data-vv-name="category"
        type="text"
        class="form-control"
        id="category"
        placeholder="Category"
      />
    </div>
    <div class="col-sm-2 col-xs-4">
      <button type="button" class="btn btn-block btn-primary-outline" @click="crawl()">
        <i class="fa fa-spider"></i> Crawl
      </button>
    </div>
  </div>
</template>

<script>
import ResourcesService from "@general/resources_service";

export default {
  name: "CrawlerTool",
  props: {
    crawlerId: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      crawlData: {},
      crawlService: new ResourcesService(`${CMS_URL}/crawlers`)
    };
  },
  methods: {
    crawl() {
      this.crawlService.member(`${this.crawlerId}/run`, "POST", this.crawlData);
    }
  }
};
</script>

<style>
</style>
