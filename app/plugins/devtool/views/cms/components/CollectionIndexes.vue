<template>
  <div class="page-content">
    <div class="container-fluid text-right">
      <button
        type="button"
        class="btn btn-secondary"
        @click="goto({name: 'CollectionList'})"
      >Collection List</button>
    </div>
    <div class="container-fluid">
      <h4>{{ $route.params.model }} Indexes</h4>
      <div class="box-typical box-typical-padding">
        <table class="table table-bordered table-hovered table-striped">
          <tbody>
            <tr v-for="(index, i) in indexes" :key="i">
              <td>
                <div>
                  Name:
                  <strong>{{ index.name }}</strong>
                  <br />
                  <small>{{ index }}</small>
                </div>
                <div class="pull-right">
                  <a href="javascript:void(0)" @click="drop(index.name)" v-text="'Drop'"></a>
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
      indexes: [],
      service: new ResourcesService(
        `${CMS_URL}/devtools/mongos/${this.$route.params.model}/indexes`
      )
    };
  },
  computed: {},
  methods: {
    goto(router) {
      this.$store.dispatch("goto", router);
    },
    index() {
      this.service.index().then(({ data }) => {
        this.indexes = data;
      });
    },
    drop(name) {
      if (!confirm("Are you sure?")) return;

      this.service.delete(name).then(({ data }) => {
        this.$notify("Drop successfully!", { type: "success" });
        this.index();
      });
    }
  },
  created() {
    this.index();
  },
  watch: {}
};
</script>
<style lang="scss" scoped></style>
