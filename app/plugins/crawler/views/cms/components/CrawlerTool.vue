<template>
  <div class="row">
    <div class="col-sm-4">
      <fieldset class="form-group">
        <label class="form-label semibold" for="url">Test</label>
        <input
          v-model="crawlData.urls[0]"
          data-vv-name="url"
          type="text"
          class="form-control"
          id="url"
          placeholder="Crawl Url"
        />
      </fieldset>
      <button type="button" class="btn btn-block btn-primary-outline" @click="crawl()">
        <i class="fa fa-spider"></i> Test
      </button>
    </div>
    <div class="col-sm-8" v-if="post">
      <label class="form-label semibold" for="url">Result</label>
      <div class="post-test">
        <h3>{{ post.title }}</h3>
        <p>{{ post.summary }}</p>
        <p v-html="post.content"></p>
      </div>
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
      crawlData: {
        urls: []
      },
      crawlService: new ResourcesService(`${CMS_URL}/crawlers`),
      post: null
    };
  },
  methods: {
    crawl() {
      this.crawlService
        .member(`${this.crawlerId}/test`, "POST", this.crawlData)
        .then(({ data }) => {
          this.post = data;
        });
    }
  }
};
</script>

<style>
.post-test {
  border: 1px solid #ddd;
  padding: 1em;
  max-height: 500px;
  overflow: auto;
}
.post-test img {
  width: 100%;
}
</style>
