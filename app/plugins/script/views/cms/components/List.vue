<template>
  <Listing
    :apiService="cmsUrl"
    title="Scripts"
    :fields="fieldsDisplay"
    subTitle="Listing"
    :sortOrder="sortOrder"
    :disabledActions="[]"
  >
    <template slot="additionalFilter" slot-scope="props"></template>
    <template slot="addActions" slot-scope="props"></template>
  </Listing>
</template>
<script>
/**
 * For more option please check Listing component
 */
import { mapGetters, mapActions } from "vuex";
import { fieldsDisplay, sortOrder } from "./fields";

export default {
  name: "ListScript",
  data() {
    return {
      moreParams: {},
      fieldsDisplay,
      sortOrder,
      cmsUrl: `${CMS_URL}/scripts`
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
