<template>
  <div class="row">
    <div class="col-sm-12">
      <form>
        <label>Title</label>
        <input
          type="text"
          class="form-control"
          v-model="link.title"
          placeholder="something"
          v-validate="'required'"
          data-vv-name="Title"
        />
        <label>Url</label>
        <input
          type="text"
          class="form-control"
          v-model="link.url"
          placeholder="http://example.com"
          v-validate="'required'"
          data-vv-name="Url"
        />
        <label>External</label>
        <input type="checkbox" v-model="link.external" />
        <br />
        <button type="button" @click="saveLink()" class="btn btn-primary">
          <i class="fa fa-plus"></i> Create
        </button>
      </form>
      <hr />
      <div class="form-inline">
        <input type="text" class="form-control" v-model="wordSearch" placeholder="Something" />
        <button type="button" @click="loadLink()" class="btn btn-primary">
          <i class="fa fa-search"></i> Search
        </button>
      </div>
      <br />
      <span>Replace for:</span>
      <span class="label label-default">{{ word }}</span>
      <br />
      <br />
      <div
        v-for="link in links"
        :key="link._id"
        href="javascript:void(0)"
        class="btn bin-inline btn-secondary-outline"
      >
        <strong @click="selectedLink = link">
          {{ link.title }}
          <small>({{ link.url }})</small>
        </strong>
        <i class="fa fa-remove" @click="removeLink(link._id)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import ResourcesService from "@general/resources_service";
import { remove } from "lodash";

export default {
  name: "LinkLoader",
  props: {
    word: {
      type: String
    }
  },
  data() {
    return {
      wordSearch: "",
      service: new ResourcesService(window.settings.services.cmsUrl + "/links"),
      links: [],
      link: {},
      selectedLink: {}
    };
  },
  methods: {
    loadLink() {
      let self = this;
      this.service
        .index({
          title: self.wordSearch,
          select: "title url external",
          sort: "createdAt|desc"
        })
        .then(resp => {
          self.links = resp.data.data;
        });
    },
    removeLink(link_id) {
      if (!confirm("Are you sure to remove?")) return;
      let self = this;
      this.service.delete(link_id).then(resp => {
        self.$notify(resp.data.message, {
          type: "success",
          placement: {
            from: "bottom"
          }
        });
        self.links = remove(self.links, function(l) {
          return l._id.toString() != link_id.toString();
        });
      });
    },
    saveLink() {
      let self = this;
      this.$validator.validateAll().then(res => {
        if (res) {
          self.service.create(this.link).then(resp => {
            self.$notify(resp.data.message, {
              type: "success",
              placement: {
                from: "bottom"
              }
            });
            self.links.unshift(resp.data.data);
            self.link = {};
          });
        } else {
          self.$notify("Please check data", {
            type: "warning",
            placement: {
              from: "bottom"
            }
          });
        }
      });
    },
    generateLinkHtml(link) {
      let linkHtml = `<a href="${link.url}" title="${link.title}" target="_blank"`;
      if (link.external) linkHtml += ` nofollow`;
      linkHtml += `>${link.title}</a>`;
      return linkHtml;
    },
    wordChange(word) {
      if (word) {
        this.wordSearch = word;
        this.link.title = word;
        this.loadLink();
      }
    }
  },
  created() {
    this.wordChange(this.word);
  },
  watch: {
    word(val) {
      this.wordChange(val);
    },
    selectedLink(val) {
      this.$emit("selectedLink", {
        text: this.word,
        link: {
          title: val.title,
          url: val.url,
          external: val.external
        },
        html: this.generateLinkHtml(val)
      });
    }
  }
};
</script>

<style>
img {
  max-width: 100%;
  height: auto;
}
</style>
