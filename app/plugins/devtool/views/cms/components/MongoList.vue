<template>
  <Listing
    :apiService="cmsUrl"
    routeDetail="devtool"
    :title="$route.params.model"
    :fields="fieldsDisplay"
    subTitle="Listing"
    :sortOrder="sortOrder"
    :disabledActions="['new', 'edit', 'export']"
  >
    <template slot="additionalFilter" slot-scope="props"></template>
    <template slot="additionalButtonHeader" slot-scope="props">
      <button
        type="button"
        class="btn btn-secondary"
        @click="goto({name: 'CollectionList'})"
      >Collection List</button>
    </template>
    <template slot="addActions" slot-scope="props">
      <button
        type="button"
        class="btn btn-inline btn-secondary-outline"
        @click="goto({name: 'MongoDetail', params: {model: moreParams.model, id: props.props.rowData._id}})"
      >
        <span class="glyphicon glyphicon-pencil"></span>
      </button>
    </template>
  </Listing>
</template>
<script>
/**
 * For more option please check Listing component
 */
import { mapGetters, mapActions } from "vuex";
import { fieldsDisplay, sortOrder } from "./mongo_fields";
import ResourcesService from "@general/resources_service";

export default {
  name: "MongoList",
  data() {
    return {
      moreParams: {},
      fieldsDisplay,
      sortOrder,
      cmsUrl: `${window.settings.services.cmsUrl}/devtools/mongos/${this.$route.params.model}`,
      models: []
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
    this.moreParams.model = this.$route.params.model;
  },
  watch: {
    onResetParams(val) {
      if (val) {
        this.moreParams = {};
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
