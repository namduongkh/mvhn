<template>
  <Listing
    :apiService="cmsUrl"
    title="Sitemap Configs"
    :fields="fieldsDisplay"
    subTitle="Listing"
    :sortOrder="sortOrder"
    :disabledActions="[]"
  >
    <template slot="additionalFilter" slot-scope="props"></template>
    <template slot="addActions" slot-scope="props">
      <a
        class="btn btn-inline btn-secondary-outline"
        target="_blank"
        :href="'https://www.google.com/ping?sitemap=' + webUrl + '/files/' + props.props.rowData.slug + '.xml'"
        data-toggle="tooltip"
        title="Submit to Google"
      >
        <i class="fab fa-google"></i>
      </a>
      <a
        class="btn btn-inline btn-secondary-outline"
        target="_blank"
        :href="'https://www.bing.com/ping?sitemap=' + webUrl + '/files/' + props.props.rowData.slug + '.xml'"
        data-toggle="tooltip"
        title="Submit to Bing"
      >
        <i class="fab fa-windows"></i>
      </a>
    </template>
  </Listing>
</template>
<script>
/**
 * For more option please check Listing component
 */
import { mapGetters, mapActions } from "vuex";
import { fieldsDisplay, sortOrder } from "./fields";

export default {
  name: "ListSitemapConfig",
  data() {
    return {
      moreParams: {},
      fieldsDisplay,
      sortOrder,
      cmsUrl: `${CMS_URL}/sitemaps`,
      webUrl: WEB_URL
    };
  },
  computed: {
    ...mapGetters(["filterData", "onResetParams"])
  },
  methods: {
    ...mapActions(["openConfirm", "setParams", "reloadTable"]),
    goto(router) {
      this.$store.dispatch("goto", router);
    }
  },
  created() {
    for (let prop in this.moreParams) {
      if (this.$route.query.hasOwnProperty(prop) && this.$route.query[prop]) {
        this.moreParams[prop] = this.$route.query[prop];
      }
    }
  },
  watch: {
    "moreParams.fieldName"(fieldName) {
      this.setParams({ fieldName });
      this.reloadTable();
    },
    onResetParams(val) {
      if (val) {
        this.moreParams.fieldName = null;
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
