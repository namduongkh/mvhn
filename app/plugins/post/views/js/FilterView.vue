<template>
  <div class="filter-view">
    <div class="row" v-if="!newMode">
      <div class="col-sm-12 col-xs-12">
        <div class="text-right">
          <a
            href="javascript:void(0)"
            class="btn btn-sm btn-primary"
            @click="newMode = true"
          >
            <i class="fa fa-plus"></i> New
          </a>
        </div>
      </div>
      <div class="col-sm-12 col-xs-12">
        <div class="card panel panel-default">
          <div class="card-body panel-body">
            <input
              class="form-control search-input"
              v-model="search"
              type="text"
              placeholder="Search.."
            />
          </div>
        </div>
      </div>
      <div
        class="col-sm-12 col-xs-12"
        v-for="(post, index) in posts"
        :key="index"
        v-show="!post.hidden"
      >
        <Detail
          v-if="!post.editMode"
          :post="post"
          @onEditEnabled="onEditEnabled(post, true)"
          @onRemove="onRemove(post)"
        />
        <Form v-else :post="post" @onSave="onSave" />
      </div>
      <div v-if="!posts.length" class="col-sm-12 col-xs-12 text-center">
        No data
      </div>
    </div>

    <div class="row" v-else>
      <div class="col-sm-12 col-xs-12">
        <div class="text-right">
          <a
            href="javascript:void(0)"
            class="btn btn-sm btn-default"
            @click="newMode = false"
          >
            <i class="fa fa-arrow-left"></i> Exit
          </a>
        </div>
      </div>
      <Form :post="newPostObject" @onSave="onSave" />
    </div>
  </div>
</template>

<script>
import PagingService from "@Plugin/core/views/js/services/paging_service";
import Form from "./filter-view/Form";
import Detail from "./filter-view/Detail";
import ResourceService from "@CmsCore/vue/general/resources_service";

export default {
  name: "FilterView",
  props: {
    ajaxUrl: { type: String },
    postType: { type: String },
  },
  data() {
    return {
      search: "",
      pagingService: new PagingService(this.ajaxUrl, 20, () => {
        return {
          search: this.search,
        };
      }),
      posts: [],
      debouncer: null,
      postService: new ResourceService(
        `${window.settings.services.cmsUrl}/${this.postType}/posts`
      ),
      newMode: false,
      customFields: [],
    };
  },
  computed: {
    newPostObject() {
      return {
        customFields: this.customFields,
        customData: {},
      };
    },
  },
  methods: {
    index() {
      this.pagingService.next().then(({ data }) => {
        this.posts = data.posts;
        this.customFields = data.customFields;
      });
    },

    onEditEnabled(post, value) {
      post.editMode = value;
      this.$forceUpdate();
    },

    onSave(post) {
      if (post._id) {
        this.postService.update(post._id, post).then(() => {
          this.onEditEnabled(post, false);
          toastr.success("Saved successfully!", "", {
            positionClass: "toast-bottom-right",
          });
        });
      } else {
        this.postService.create(post).then(({ data }) => {
          this.posts.unshift(data.data);
          this.newMode = false;
          this.$forceUpdate();
          toastr.success("Saved successfully!", "", {
            positionClass: "toast-bottom-right",
          });
        });
      }
    },

    onRemove(post) {
      if (!confirm("Are you sure?")) return;

      this.postService.delete(post._id).then(() => {
        post.hidden = true;
        this.$forceUpdate();
        toastr.success("Removed successfully!", "", {
          positionClass: "toast-bottom-right",
        });
      });
    },
  },
  created() {
    this.index();
    // toastr.options = {
    //   positionClass: "toast-bottom-right",
    // };
  },
  components: { Form, Detail },
  watch: {
    search() {
      clearTimeout(this.debouncer);
      this.debouncer = setTimeout(() => {
        this.pagingService.reset();
        this.index();
      }, 250);
    },
  },
};
</script>

<style>
.filter-view .card-body {
  min-height: unset;
}
.filter-view .post-title {
  margin: 0.1em 0;
}
#toast-container > div {
  opacity: 1;
}
</style>
