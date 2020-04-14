<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="box-typical box-typical-padding">
        <table class="table table-bordered table-hovered table-striped">
          <tbody>
            <tr v-for="model in models" :key="model">
              <td>
                <a
                  href="javascript:void(0)"
                  @click="goto({name: 'DocumentList', params: { model }})"
                  v-text="model"
                ></a>
                <div class="pull-right">
                  <a
                    href="javascript:void(0)"
                    @click="goto({name: 'CollectionIndexes', params: { model }})"
                    v-text="'(Indexes)'"
                  ></a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import ResourcesService from "@general/resources_service";

export default {
  name: "CollectionList",
  data() {
    return {
      cmsUrl: `${CMS_URL}/devtools/mongos`,
      models: []
    };
  },
  computed: {},
  methods: {
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
    this.getAllModels();
  },
  watch: {}
};
</script>
<style lang="scss" scoped></style>
