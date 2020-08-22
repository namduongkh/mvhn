<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Setting"
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
              />
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
              />
              <small v-show="errors.has('key')" class="text-danger">{{ errors.first('key') }}</small>
            </fieldset>
          </div>
        </div>

        <div class="row light-gray">
          <div class="col-sm-3">
            <h5 class="m-t-lg with-border">Groups</h5>
            <GroupConfigEditor
              v-model="formData.groups"
              :activeGroup="activeGroup"
              @groupChanged="groupChanged"
              @groupDeleted="groupDeleted"
            ></GroupConfigEditor>
          </div>
          <div class="col-sm-9">
            <h5 class="m-t-lg with-border">Fields</h5>
            <div class="row">
              <div class="col-sm-6" v-for="(field, index) in formData.fields" :key="index">
                <div
                  v-show="field.group == activeGroup || (!field.group && activeGroup == 'general')"
                >
                  <label class="form-label semibold" :for="field.key">
                    {{ field.name }}
                    <small>[{{ field.key }}]</small>
                    <a
                      class="text-danger"
                      href="javascript:void(0)"
                      @click="removeFields(field.key)"
                    >
                      <i class="fa fa-remove"></i>
                    </a>
                  </label>
                  <SettingField
                    :field="field"
                    v-model="formData[field.key]"
                    @columnAdded="addFieldColumn"
                    @columnRemoved="removeFieldColumn"
                  ></SettingField>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-12">
                <FieldConfigEditor @added="addFields"></FieldConfigEditor>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="user">User</label>
              <select2
                id="user"
                data-vv-name="user"
                name="user"
                v-model="formData.user"
                :ajax="ajaxUser"
                placeholder="Select one..."
              />
              <small v-show="errors.has('user')" class="text-danger">{{ errors.first('user') }}</small>
            </fieldset>
          </div>
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

        <div class="row">
          <div class="col-sm-12">
            <i>*To remove any field value: type `__undefined`</i>
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
import FieldConfigEditor from "./FieldConfigEditor";
import GroupConfigEditor from "./GroupConfigEditor";
import { camelCase } from "lodash";

export default {
  name: "DetailSetting",
  data() {
    return {
      formData: {},
      field: {},
      cmsUrl: `${CMS_URL}/settings`,
      activeGroup: "general",

      ajaxUser: {
        url: `${CMS_URL}/users/select2`,
        textTemplate: "<%= name %> (<%= email %>)",
      },

      froalaConfig: {
        imageUploadURL: window.settings.services.webUrl + "/api/upload/image",
        imageUploadMethod: "POST",
        imageUploadParams: {
          type: "wysiwyg/post",
        },
      },
    };
  },
  components: {
    SettingField,
    FieldConfigEditor,
    GroupConfigEditor,
  },
  computed: {
    ...mapGetters(["itemSelected", "authUser"]),
  },
  watch: {
    itemSelected(data) {
      if (data) {
        this.formData = JSON.parse(
          JSON.stringify(Object.assign({ groups: [] }, data))
        );
        this.activeGroup = "general";
      }
    },
    "formData.name"(val) {
      if (this.$route.params.id) return;
      this.formData.key = camelCase(val);
    },
  },
  methods: {
    ...mapActions(["initService", "saveItem", "getItemById", "newItem"]),
    save(options) {
      let self = this;
      this.$validator.validateAll().then((res) => {
        if (res) {
          let redundancy = difference(
            Object.keys(self.formData),
            self.formData.fields
              .map((field) => {
                return field.key;
              })
              .concat([
                "_id",
                "createdAt",
                "updatedAt",
                "name",
                "fields",
                "groups",
                "key",
                "user",
                "status",
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
      if (!this.formData._id) {
        this.newItem();
      } else {
        this.getItemById({ id: this.formData._id });
      }
    },
    addFields(field) {
      field.group = this.activeGroup;
      this.formData.fields.push(field);
    },
    addFieldColumn(column, key) {
      let field = this.formData.fields.find((field) => field.key == key);
      if (!field.columns) field.columns = [];
      field.columns.push(column);
      this.$forceUpdate();
    },
    removeFieldColumn(columnKey, key) {
      if (!confirm("Are you sure?")) return;
      let field = this.formData.fields.find((field) => field.key == key);
      field.columns = field.columns.filter((column) => {
        if (column.key != columnKey) {
          return column;
        }
      });
      this.$forceUpdate();
    },
    removeFields(key) {
      if (!confirm("Are you sure?")) return;
      this.formData.fields = this.formData.fields.filter((field) => {
        if (field.key != key) {
          return field;
        }
      });
    },
    groupChanged(id) {
      this.activeGroup = id;
    },
    groupDeleted(id) {
      this.formData.fields.forEach((field) => {
        if (field.group == id) {
          field.group = "general";
        }
      });
      if (this.activeGroup == id) this.activeGroup = "general";
    },
  },
  created() {
    this.initService(this.cmsUrl);
    let id = this.$route.params.id;
    if (id !== undefined) this.getItemById({ id });
    else this.newItem();
  },
  mounted() {},
};
</script>

<style lang="scss">
.form-inline {
  label {
    display: inline;
  }
}
.light-gray {
  background-color: #f7f7f7;
  padding-bottom: 1em;
}
</style>
