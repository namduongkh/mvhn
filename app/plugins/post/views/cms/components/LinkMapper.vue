<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 text-right">
          <button @click="save({})" class="btn btn-primary">
            <i class="fa fa-save"></i> Save
          </button>
          <button
            @click="goto({name: 'ShowPost', params: {id: formData._id}})"
            class="btn btn-secondary"
          >
            <i class="fa fa-edit"></i> Edit
          </button>
          <button @click="reset()" class="btn btn-secondary">
            <i class="fa fa-refresh"></i> Reset
          </button>
          <button @click="goto({name: 'ListPosts'})" class="btn btn-secondary">
            <i class="fa fa-list"></i> List
          </button>
        </div>
      </div>
      <div class="box-typical box-typical-padding row">
        <div class="col-sm-12">
          <div>*Blacked out words to find matched link</div>
          <h5 class="m-t-lg with-border">{{formData.title}}</h5>
        </div>
        <div class="col-sm-12 row">
          <div class="col-sm-7">
            <div id="post-content" v-html="formData.content"></div>
          </div>
          <div class="col-sm-5">
            <LinkLoader :word="wordSearch" @selectedLink="replaceLink"></LinkLoader>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LinkLoader from "./LinkLoader";

export default {
  name: "LinkMapper",
  components: {
    LinkLoader
  },
  data() {
    return {
      cmsUrl: `${CMS_URL}/posts`,
      formData: {},
      wordSearch: ""
    };
  },
  computed: {
    ...mapGetters(["itemSelected"])
  },
  watch: {
    itemSelected(data) {
      if (data) {
        this.formData = Object.assign({}, data);
      }
    }
  },
  methods: {
    ...mapActions(["initService", "saveItem", "getItemById", "goto"]),
    reset() {
      this.getItemById({ id: this.$route.params.id });
    },
    save(options) {
      let self = this;
      this.$validator.validateAll().then(res => {
        if (res) {
          self.saveItem({ formData: self.formData, options });
        } else {
          this.$notify("Please check data", {
            type: "warning",
            placement: {
              from: "bottom"
            }
          });
        }
      });
    },
    replaceLink(selectedLink) {
      this.formData.content = this.formData.content.replace(
        new RegExp(`(\\s)${selectedLink.text}(\\s)`, "gim"),
        `$1${selectedLink.html}$2`
      );
    },
    onSelection() {
      let debouncer;
      let self = this;
      document.onselectionchange = e => {
        clearTimeout(debouncer);
        let selection = document.getSelection();
        if (
          selection.containsNode(document.getElementById("post-content"), true)
        ) {
          debouncer = setTimeout(() => {
            let word = document
              .getSelection()
              .toString()
              .trim();
            if (word) self.wordSearch = word;
          }, 300);
        }
      };
    }
  },
  created() {
    this.initService(this.cmsUrl);
    this.getItemById({ id: this.$route.params.id });
    this.onSelection();
  }
};
</script>

<style>
#post-content {
  height: 65vh;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
