<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="box-typical box-typical-padding">
        <div class="text-right">
          <button type="button" class="btn btn-primary-outline" @click="updates()">
            <i class="fa fa-save"></i> Save
          </button>
        </div>
        <table class="table table-striped table-bordered table-hovered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Enabled</th>
              <th>CMS Order</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="plugin in plugins" :key="plugin._id">
              <td>{{ plugin.pluginName }}</td>
              <td>
                <input type="checkbox" v-model="plugin.enabled" />
              </td>
              <td>
                <input
                  type="number"
                  style="width:80px"
                  class="form-control"
                  v-model="plugin.cmsOrder"
                />
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
  name: "PluginManagement",
  data() {
    return {
      service: new ResourcesService(
        `${CMS_URL}/plugin_managements`
      ),
      plugins: [],
      plugin: {}
    };
  },
  methods: {
    index(params = {}) {
      this.service
        .index({
          ...params,
          sort: "enabled|desc, cmsOrder|asc, pluginName|asc",
          notPaginate: true
        })
        .then(({ data }) => {
          this.plugins = data.data;
        });
    },
    // new() {
    //   this.service.new().then(({ data }) => {
    //     this.plugin = data;
    //   });
    // },
    create(plugin) {
      this.service.create(plugin).then(({ data }) => {
        this.index();
        this.new();
        this.$notify("Created", { type: "success" });
      });
    },
    update(plugin) {
      let id = plugin._id;
      delete plugin._id;

      this.service.update(id, plugin).then(({ data }) => {
        this.index({ shouldReload: true });
        this.$notify("Updated", { type: "success" });
      });
    },
    updates() {
      Promise.all(
        this.plugins.map(
          function(plugin) {
            let id = plugin._id;
            delete plugin._id;
            return this.service.update(id, plugin);
          }.bind(this)
        )
      ).then(() => {
        this.index({ shouldReload: true });
        this.$notify("Updated", { type: "success" });
      });
    }
    // remove(id) {
    //   this.service.delete(id).then(({ data }) => {
    //     this.index();
    //     this.$notify("Deleted", { type: "success" });
    //   });
    // }
  },
  created() {
    this.index();
  }
};
</script>

<style>
</style>
