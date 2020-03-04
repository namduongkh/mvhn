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
        <a
          v-if="importer.templateFile"
          :href="importer.templateFile"
          target="_blank"
        >Download template file</a>
      </fieldset>
      <div v-for="(param, index) in importer.params" :key="index">
        <label :for="param.key" v-text="param.name + ':'"></label>
        <FieldEditor
          v-model="customParams[param.key]"
          :field="{
            name: param.name,
            type: param.type,
            key: param.key
          }"
        ></FieldEditor>
      </div>
      <div>
        <button type="button" @click="run()" class="btn btn-success" :disabled="running">
          <i class="fa fa-play"></i> Run Import
        </button>
      </div>
      <div>
        <a :href="cmsUrl + '/#/batchlogs?type=' + importerClassname" target="_blank">History</a>
      </div>
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
      required: true
    },
    params: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      service: new ResourcesService(`${CMS_URL}/importers`),
      cmsUrl: CMS_URL,
      importFile: null,
      running: false,
      importer: null,
      customParams: {}
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
          Object.assign({}, this.params, this.customParams, {
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
