<template>
  <div>
    <h6 v-for="(url, index) in urls" :key="'url'+index">
      {{ url.name }}({{ url.path }})
      <a @click="removeUrl(url.path)">
        <i class="fa fa-remove"></i>
      </a>
    </h6>
    <div class="form-inline">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" class="form-control" v-model="url.name" placeholder="Lazada, Tiki...">
        <label for="name">Path:</label>
        <input type="text" class="form-control" v-model="url.path" placeholder="example.com/products/abc">
        <a @click="addUrl(url)" class="btn btn-sm btn-primary">
          <i class="fa fa-plus"></i> Add
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { remove } from "lodash";

export default {
  name: "ProductUrl",
  props: {
    value: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      urls: this.value,
      url: {}
    };
  },
  methods: {
    addUrl(url) {
      let paths = _.map(this.urls, url => {
        return url.path;
      });
      if (paths.includes(url.path)) return;
      this.urls.push(url);
      this.url = {};
    },
    removeUrl(path) {
      this.urls = remove(this.urls, url => {
        return url.path != path;
      });
    }
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        this.urls = val;
      }
    },
    urls(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style>
</style>

