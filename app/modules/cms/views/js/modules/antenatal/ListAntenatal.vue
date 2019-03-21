<template>
  <Listing
    :apiService="apiUrl"
    routeDetail="antenatal"
    title="Antenatals"
    :fields="fieldsDisplay"
    subTitle="Listing"
    :sortOrder="sortOrder"
    :showExport="true"
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
import { fieldsDisplay, sortOrder } from "./fields_list_antenatal";
export default {
  name: "ListAntenatal",
  data() {
    return {
      moreParams: {
        user: null
      },
      fieldsDisplay,
      sortOrder,
      apiUrl: `${window.settings.services.adminUrl}/antenatal`
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
    "moreParams.user"(user) {
      this.setParams({ user });
      this.reloadTable();
    },
    onResetParams(val) {
      if (val) {
        this.moreParams = {};
      }
      this.reloadTable();
    }
  }
};
</script>
<style lang="scss" scoped></style>
