<template>
  <Listing
    :apiService="cmsUrl"
    routeDetail="devtool"
    title="Devtools"
    :fields="fieldsDisplay"
    subTitle="Listing"
    :sortOrder="sortOrder"
    :disabledActions="['new', 'edit', 'export']"
  >
    <template slot="additionalFilter" slot-scope="props">
      <div class="col-sm-3">
        <div>
          <label>
            Model:
            <select name="model" v-model="moreParams.model" class="form-control">
              <option v-for="model in models" :key="model" :value="model">{{model}}</option>
            </select>
          </label>
        </div>
      </div>
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
      moreParams: {
        model: null
      },
      fieldsDisplay,
      sortOrder,
      cmsUrl: `${window.settings.services.cmsUrl}/devtools/mongos`,
      models: []
    };
  },
  computed: {
    ...mapGetters(["filterData"])
  },
  methods: {
    ...mapActions(["openConfirm", "setParams", "reloadTable"]),
    goto(router) {
      this.$store.dispatch("goto", router);
    },
    getAllModels() {
      new ResourcesService(this.cmsUrl)
        .member("models", "GET")
        .then(({ data }) => {
          this.models = data;
        });
    }
  },
  created() {
    for (let prop in this.moreParams) {
      if (this.$route.query.hasOwnProperty(prop) && this.$route.query[prop]) {
        this.moreParams[prop] = this.$route.query[prop];
      }
    }
    this.getAllModels();
  },
  watch: {
    "moreParams.model"(model) {
      this.setParams({ model });
      this.reloadTable();
    },
    onResetParams(val) {
      if (val) {
        this.moreParams.model = null;
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
