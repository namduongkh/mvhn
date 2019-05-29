<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Setting"
        listRouter="/settings"
        routeDetail="/setting"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      />

      <form class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>

        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="name">Name</label>
              <input
                v-model="formData.name"
                data-vv-name="name"
                type="text"
                class="form-control"
                id="name"
                placeholder="Enter name"
              >
              <small v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</small>
            </fieldset>
          </div>
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="key">Key</label>
              <input
                v-model="formData.key"
                v-validate="'required'"
                data-vv-name="key"
                type="text"
                class="form-control"
                id="key"
                placeholder="Enter key"
              >
              <small v-show="errors.has('key')" class="text-danger">{{ errors.first('key') }}</small>
            </fieldset>
          </div>
        </div>

        <h5 class="m-t-lg with-border">Fields</h5>
        <div class="row">
          <div class="col-sm-6" v-for="(field, index) in formData.fields" :key="index">
            <label class="form-label semibold" :for="field.key">
              {{ field.name }} ({{ field.key }})
              <a
                class="text-danger"
                href="javascript:void(0)"
                @click="removeFields(field.key)"
              >
                <i class="fa fa-remove"></i>
              </a>
            </label>
            <SettingField :field="field" v-model="formData[field.key]"></SettingField>
          </div>
        </div>
        <hr>

        <div class="row">
          <div class="col-sm-12 form-inline">
            <label class="form-label semibold" for="field.name">Name</label>
            <input
              v-model="field.name"
              data-vv-name="field.name"
              type="text"
              class="form-control"
              id="field.name"
              placeholder="Name"
            >
            <label class="form-label semibold" for="field.name">Key</label>
            <input
              v-model="field.key"
              data-vv-name="field.key"
              type="text"
              class="form-control"
              id="field.key"
              placeholder="Key"
            >
            <label class="form-label semibold" for="field.type">Type</label>
            <select v-model="field.type" name="field.type" id="field.type" class="form-control">
              <option value="text">Text</option>
              <option value="select">Select</option>
              <option value="editor">Editor</option>
              <option value="image">Image</option>
              <option value="boolean">Checkbox</option>
              <option value="date">Date</option>
              <option value="array">Array</option>
            </select>
            <label
              v-if="field.type == 'select'"
              class="form-label semibold"
              for="field.options"
            >Options</label>
            <input
              v-if="field.type == 'select'"
              v-model="field.options"
              data-vv-name="field.options"
              type="text"
              class="form-control"
              id="field.options"
              placeholder="1, 'ABC' | 2, 'XYZ' | ..."
            >
            <button class="btn btn-sm btn-primary" type="button" @click="addFields(field)">
              <i class="fa fa-plus"></i> Add
            </button>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="status">Status</label>
              <select v-model="formData.status" name="status" id="status" class="form-control">
                <option :value="1">Publish</option>
                <option :value="0">Unpublish</option>
                <option :value="2">Trashed</option>
              </select>
            </fieldset>
          </div>
        </div>
      </form>
      <!--.box-typical-->
    </div>
    <!--.container-fluid-->
  </div>
  <!--.page-content-->
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SettingField from "./SettingField";
import { difference } from "lodash";

export default {
  name: "DetailSetting",
  data() {
    return {
      formData: {},
      field: {},
      cmsUrl: `${window.settings.services.cmsUrl}/settings`,

      froalaConfig: {
        imageUploadURL: window.settings.services.webUrl + "/api/upload/image",
        imageUploadMethod: "POST",
        imageUploadParams: {
          type: "wysiwyg/post"
        }
      }
    };
  },
  components: {
    SettingField
  },
  computed: {
    ...mapGetters(["itemSelected", "authUser"])
  },
  watch: {
    itemSelected(data) {
      if (data) {
        this.formData = JSON.parse(JSON.stringify(Object.assign({}, data)));
      }
    },
    "formData.name"(val) {
      if (this.$route.params.id) return;
      this.formData.key = this.$options.filters["text2Slug"](val, '_');
    },
    "field.name"(val) {
      this.field.key = this.$options.filters["text2Slug"](val, '_');
    }
  },
  methods: {
    ...mapActions(["initService", "saveItem", "getItemById", "newItem"]),
    save(options) {
      let self = this;
      this.$validator.validateAll().then(res => {
        if (res) {
          let redundancy = difference(
            Object.keys(self.formData),
            self.formData.fields
              .map(field => {
                return field.key;
              })
              .concat([
                "_id",
                "createdAt",
                "updatedAt",
                "name",
                "fields",
                "key",
                "status"
              ])
          );
          let formData = JSON.parse(JSON.stringify(self.formData));
          for (let i in redundancy) {
            formData[redundancy[i]] = "__undefined";
          }
          self.saveItem({ formData, options });
        } else {
          this.$notify("Please check your data", { type: "warning" });
        }
      });
    },
    resetForm() {
      this.errors.clear();
      if (!this.formatData._id) {
        this.newItem();
      } else {
        this.getItemById({ id: this.formatData._id });
      }
    },
    addFields(field) {
      if (!field.name || !field.key || !field.type) {
        return alert("Please provide missed data!");
      }
      this.formData.fields.push(field);
      this.field = {};
    },
    removeFields(key) {
      if (!confirm("Are you sure?")) return;
      this.formData.fields = this.formData.fields.filter(field => {
        if (field.key != key) {
          return field;
        }
      });
      delete this.formData[key];
    }
  },
  created() {
    this.initService(this.cmsUrl);
    let id = this.$route.params.id;
    if (id !== undefined) this.getItemById({ id });
    else this.newItem();
  },
  mounted() {}
};
</script>

<style lang="scss">
.form-inline {
  label {
    display: inline;
  }
}
</style>