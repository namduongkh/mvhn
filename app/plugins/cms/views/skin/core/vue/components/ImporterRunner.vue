<template>
  <div>
    <div v-if="importer">
      <label class="label label-info">
        <i class="fa fa-file-import"></i>
        {{ importer.name }}
      </label>
      <fieldset class="form-group">
        <label class="form-label semibold" for="importFile">Import File</label>
        <file-uploader classButtonUpload="btn-secondary" v-model="importFile" />
        <a v-if="importer.templateFile" :href="importer.templateFile" target="_blank">Download template file</a>
      </fieldset>
      <button type="button" @click="run()" class="btn btn-success" :disabled="running">
        <i class="fa fa-play"></i> Run Import
      </button>
    </div>
    <div v-else class="text-center">Not found the importer</div>
  </div>
</template>

<script>
import ResourcesService from "@general/resources_service";

export default {
  name: "ImporterRunner",
  props: {
    importerClassname: {
      type: String,
      require: true
    },
    params: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      service: new ResourcesService(
        `${window.settings.services.cmsUrl}/importers`
      ),
      importFile: null,
      running: false,
      importer: null
    };
  },
  methods: {
    run() {
      if (!this.importFile) {
        return this.$notify("Please select an import file", {
          type: "warning"
        });
      }

      this.running = true;
      this.service
        .member(
          this.importer._id + "/run",
          "POST",
          Object.assign({}, this.params, {
            file: this.importFile
          })
        )
        .then(({ data }) => {
          this.$notify(data.message, {
            type: data.status ? "success" : "error"
          });
        })
        .finally(() => {
          this.running = false;
          this.$emit("imported");
        });
    },
    loadImporter() {
      this.service
        .index({
          classname: this.importerClassname,
          per_page: 1
        })
        .then(({ data }) => {
          this.importer = data.data[0];
        });
    }
  },
  created() {
    this.loadImporter();
  }
};
</script>

<style>
</style>
