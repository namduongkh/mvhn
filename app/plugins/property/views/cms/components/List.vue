<template>
  <Listing
    :apiService="cmsUrl"
    routeDetail="property"
    :title="pageTitle + ' properties'"
    :fields="fieldsDisplay"
    subTitle="Listing"
    :sortOrder="sortOrder"
    :showExport="true"
    :useFilterLayout="true"
  >
    <template slot="filterLayout" slot-scope="props">
      <FilterLayout :filters="filters" />
    </template>
  </Listing>
</template>
<script>
import Axios from "axios";
import { mapGetters, mapActions } from "vuex";
import { fieldsDisplay, sortOrder } from "./fields";
export default {
  name: "ListProperty",
  data() {
    return {
      moreParams: {},
      fieldsDisplay,
      sortOrder,
      cmsUrl: `${CMS_URL}/${this.$route.params.postType}/properties`,
      pageTitle: allowedPostTypes[this.$route.params.postType].name,
      filters: [
        {
          name: "filter",
          label: "Search",
          type: "text",
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          hotFilter: true,
          default: 1,
          options: [
            {
              value: null,
              text: "All",
            },
            {
              value: 1,
              text: "Publish",
            },
            {
              value: 0,
              text: "Unpublish",
            },
            {
              value: 2,
              text: "Trash",
            },
          ],
        },
        {
          name: "type",
          label: "Type",
          type: "button-group",
          hotFilter: true,
          options: [
            {
              value: "category",
            },
            {
              value: "tag",
            },
          ],
        },
      ],
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
  },
  created: function () {
    let that = this;
    for (let prop in this.moreParams) {
      if (this.$route.query.hasOwnProperty(prop) && this.$route.query[prop]) {
        this.moreParams[prop] = this.$route.query[prop];
      }
    }
  },
  watch: {},
};
</script>
