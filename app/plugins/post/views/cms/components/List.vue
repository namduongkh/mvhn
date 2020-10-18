<template>
  <Listing
    :apiService="cmsUrl"
    routeDetail="post"
    :title="$route.meta.title"
    :fields="fieldsDisplay"
    subTitle="Listing"
    :sortOrder="sortOrder"
    :showExport="true"
    :initFromFilter="['category']"
  >
    <template slot="additionalFilter" slot-scope="props">
      <div class="col-sm-3">
        <div>
          <label>Category:</label>
          <select
            name="category"
            v-model="moreParams.category"
            class="form-control"
          >
            <option :value="null">All category</option>
            <option
              v-for="cate in categories"
              :key="cate._id"
              :value="cate._id"
            >
              {{ cate.name }}
            </option>
          </select>
        </div>
      </div>
    </template>

    <template slot="additionalButtonHeader" slot-scope="props">
      <a
        :href="`${webUrl}/${postType}/posts/filter-view`"
        class="btn btn-secondary-outline"
        target="_blank"
        ><i class="fa fa-eye"></i>
        Filter View
      </a>
    </template>

    <template slot="addActions" slot-scope="props">
      <button
        type="button"
        class="btn btn-inline btn-secondary-outline"
        @click="makeFeatured(props.props.rowData, props.props.rowIndex)"
      >
        <span class="glyphicon glyphicon-star"></span>
      </button>
      <button
        type="button"
        class="btn btn-inline btn-secondary-outline"
        @click="
          goto({ name: 'MapLinkPost', params: { id: props.props.rowData._id } })
        "
      >
        <span class="fa fa-link"></span>
      </button>
    </template>
  </Listing>
</template>
<script>
import Axios from "axios";
import { mapGetters, mapActions } from "vuex";
import { fieldsDisplay, sortOrder } from "./fields";
import Service from "@general/services.class";

export default {
  name: "ListPost",
  data() {
    return {
      moreParams: {
        category: null,
      },
      fieldsDisplay,
      sortOrder,
      cmsUrl: `${CMS_URL}/${this.$route.meta.controller}`,
      postType: this.$route.meta.controller.replace(/([^\/]+)\/posts/, "$1"),
      categories: [],
      webUrl: WEB_URL,
    };
  },
  computed: {
    ...mapGetters(["filterData", "onResetParams"]),
  },
  methods: {
    ...mapActions(["openConfirm", "setParams", "reloadTable"]),
    goto(router) {
      this.$store.dispatch("goto", router);
    },
    makeFeatured(record, index) {
      let service = new Service(this.cmsUrl);
      service
        .updateItem(record._id, {
          featured: !record.featured,
        })
        .then((resp) => {
          record.featured = resp.data.data.featured;
          $(`[item-index="${index}"] .fa.fa-star`).css(
            "color",
            resp.data.data.featured ? "#fa424a" : "#ddd"
          );
          this.$notify("Success!", { type: "success" });
        });
    },
  },
  created: function () {
    let that = this;
    Axios.get(`${CMS_URL}/${this.postType}/properties`, {
      withCredentials: true,
      params: {
        notPaginate: true,
        select: "_id name",
        type: "category",
      },
    }).then((resp) => {
      that.categories = resp.data.data;
      for (let prop in this.moreParams) {
        if (this.$route.query.hasOwnProperty(prop) && this.$route.query[prop]) {
          this.moreParams[prop] = this.$route.query[prop];
        }
      }
    });
  },
  watch: {
    "moreParams.category"(category) {
      this.setParams({ category });
      this.reloadTable();
    },
    onResetParams(val) {
      if (val) {
        this.moreParams = {};
      }
    },
  },
};
</script>
