<template>
  <Listing
    :apiService="cmsUrl"
    title="Carpools"
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
  name: "ListCarpool",
  data() {
    return {
      moreParams: {
        populates: null
      },
      fieldsDisplay,
      sortOrder,
      cmsUrl: `${CMS_URL}/carpools`
    };
  },
  computed: {
    ...mapGetters(["filterData", "onResetParams"])
  },
  methods: {
    ...mapActions(["openConfirm", "setParams", "reloadTable"]),
    goto(router) {
      this.$store.dispatch("goto", router);
    },
    resetMoreParams() {
      this.moreParams = {};
      this.moreParams.populates = JSON.stringify([
        "fromPlace",
        "toPlace",
        "user"
      ]);
    }
  },
  created() {
    for (let prop in this.moreParams) {
      if (this.$route.query.hasOwnProperty(prop) && this.$route.query[prop]) {
        this.moreParams[prop] = this.$route.query[prop];
      }
    }
    this.resetMoreParams();
  },
  watch: {
    "moreParams.populates"(populates) {
      if (!populates) return;

      this.setParams({ populates });
      this.reloadTable();
    },
    onResetParams(val) {
      if (val) {
        this.resetMoreParams();
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
