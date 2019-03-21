<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        :title="detail_title"
        listRouter="/dynamicdatas"
        routeDetail="/dynamicdata"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      />

      <form class="box-typical box-typical-padding" v-show="customdata">
        <!-- <h5 class="m-t-lg with-border">Fill data below and click actions above</h5> -->

        <div class="row" v-if="!customdata.is_table">
          
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="name">Name</label>
                <input v-model="formData.name" v-validate="'required'" data-vv-name="name" type="text"
                      class="form-control" id="name" placeholder="Enter name">
              <small v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</small>
            </fieldset>
          </div>              
                                              
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="key">Key</label>
                <input v-model="formData.key" v-validate="'required'" data-vv-name="key" type="text"
                      class="form-control" id="key" placeholder="Enter key" disabled>
              <small v-show="errors.has('key')" class="text-danger">{{ errors.first('key') }}</small>
            </fieldset>
          </div>                                                  
          
        </div><!--.row-->

        <!-- <div v-for="(html, index) in fields" :key="'html-'+index"> -->
        <v-runtime-template :template="customFieldHtml"></v-runtime-template>
        <!-- </div> -->

        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="status">Status</label>
              <select v-model="formData.status" name="status" id="status" class="form-control">
                <option :value="1">Publish</option>
                <option :value="0">Unpublish</option>
                <option :value="2">Trashed</option>
              </select>
            </fieldset>
          </div>
        </div>


      </form><!--.box-typical-->

    </div><!--.container-fluid-->
  </div><!--.page-content-->
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Axios from "axios";
import VRuntimeTemplate from "v-runtime-template";

let formData = {
  key: null,
  status: 1
};

export default {
  name: "DetailDynamicdata",
  data() {
    return {
      formData: JSON.parse(JSON.stringify(formData)),
      apiUrl: `${window.settings.services.adminUrl}/dynamicdata`,
      customdata: false,
      customFieldHtml: "",
      testData: [],
      detail_title: "Thiết lập dữ liệu",
      froalaConfig: {
        imageUploadURL: window.settings.services.uploadApi,
        imageUploadMethod: 'POST',
        imageUploadParams: {
          type: 'wysiwyg/dynamicdata'
        },
        fontFamily: {
          "Arial,Helvetica,sans-serif": 'Arial',
          "Georgia,serif": 'Georgia',
          "Impact,Charcoal,sans-serif": 'Impact',
          "Tahoma,Geneva,sans-serif": 'Tahoma',
          "'Times New Roman',Times,serif,-webkit-standard": 'Times New Roman',
          "Verdana,Geneva,sans-serif": 'Verdana',
          "moonyregular,sans-serif": 'Moony'
        }
      }
    };
  },

  computed: {
    ...mapGetters(["itemSelected", "authUser"])
  },
  watch: {
    itemSelected(data) {
      if (data) {
        let templateData = Object.assign({}, formData);
        this.formData = Object.assign({}, templateData, data);
      }
    },
    "formData.key"(key) {
      let that = this;
      if (key && !that.formData.type) {
        getCustomdata(key).then(resp => {
          that.customdata = resp.data;
          that.generateCustomHtml();
        });
      }
    },
    "formData.type"(type) {
      let that = this;
      if (type) {
        getDynamicdata(type)
        .then(resp => {
          that.customdata = resp.data;
          that.generateCustomHtml();
        });
      }
    },
    "customdata.name"(val) {
      if (val) { this.detail_title = val }
    },
    "formData.is_table"(val) {
      if (val) {
        this.$router.push(`/dynamicdatas?type=${this.formData._id}`)
      }
    }
  },
  methods: {
    ...mapActions(["initService", "saveItem", "getItemById"]),
    save(options) {
      let self = this;
      this.$validator.validateAll().then(res => {
        if (res) {
          self.saveItem({ formData: self.formData, options });
        } else {
          this.$notify("Please check your data", { type: "warning" });
        }
      });
    },
    resetForm() {
      this.errors.clear();
      if (!this.formData._id) {
        this.formData = JSON.parse(JSON.stringify(formData));
      } else {
        this.getItemById({ id: this.formData._id });
      }
    },
    generateCustomHtml() {
      let that = this;
      that.customFieldHtml = "";

      function getTemplate(field, varName, arrayIndex) {
        let fieldName = varName + "." + field.key;
        if(typeof arrayIndex != 'undefined') fieldName += `[${arrayIndex}]`;
        let fieldId = fieldName.replace(/[\.\[\]]/gi, '_').replace(/_$/gi, '');
        let setModel = `name='${fieldName}' id='${fieldId}' v-model='${fieldName}' placeholder="${field.name}"`;
        switch (field.type) {
          case "date":
            return `<datepicker ${setModel} placeholder="Pick a date" format="dd/MM/yyyy" input-class="form-control" :monday-first="true"/>`;
          case "image":
            return `<imageUploader classButtonUpload="btn-secondary" ${setModel} />`;
          case "number":
            return `<input type='number' ${setModel} class="form-control"/>`;
          case "boolean":
            return `<input type='checkbox' ${setModel}/>`;
          case "select":
            let html = `<select ${setModel} class="form-control">`
            for(let i in field.options) {
              html += `<option value="${field.options[i][0]}">${field.options[i][1] || field.options[i][0]}</option>`;
            }
            html += `</select>`;
            return html;
          case "textarea":
            return `<textarea ${setModel} class="form-control" rows="4"></textarea>`;
          case "editor":
            return `<froala :tag="'textarea'" ${setModel} :config="froalaConfig"/>`;
          default:
            return `<input type='text' ${setModel} class="form-control"/>`;
        }
      }

      function getColumnClass(field) {
        if (field.columnClass) {
          return field.columnClass;
        }
        switch (field.type) {
          case "editor":
            return 'col-sm-12';
          default:
            return 'col-sm-6';
        }
      }

      function initField(fields, data = {}, varName) {
        that.customFieldHtml += `<div class="row">`;
        fields.forEach(f => {
          if (f.fields) {
            let fieldName = varName + "." + f.key;
            let plusHtml = f.array ? `
              <span v-on:click="${fieldName}.push({});generateCustomHtml()" class="glyphicon glyphicon-plus-sign"></span>
            ` : '';
            that.customFieldHtml += `
            <div class="col-sm-12">
              <div class="row">
                <div class="col-sm-12">
                  <h6 class="m-t-lg with-border">
                    <strong>
                      ${f.name}
                      ${plusHtml}
                    </strong>
                  </h6>
                  <div class="box-typical box-typical-padding">`;
            if(!f.array) {
              data[f.key] = initField(
                f.fields,
                data[f.key],
                fieldName
              );
            } else {
              data[f.key] = data[f.key] || {};
              if (!Array.isArray(data[f.key])) {
                data[f.key] = [data[f.key]];
              }
              that.customFieldHtml += `
              <table class="table table-striped table-bordered">`;
              for (let i = 0; i < data[f.key].length; i++) {
                that.customFieldHtml += `
                <tr>
                  <td>${i+1}:</td>
                  <td>`;
                data[f.key][i] = initField(
                  f.fields,
                  data[f.key][i],
                  fieldName + `[${i}]`
                );
                that.customFieldHtml += `
                  </td>
                  <td><span v-on:click="${fieldName}.splice(${i}, 1);generateCustomHtml()" class="glyphicon glyphicon-remove-sign"></span></td>
                </tr>`;
                
              }
              that.customFieldHtml += `
              </table>`;
              that.customFieldHtml += `
                <div style="margin-top: 10px">
                  <strong href="javascript:void(0)" v-on:click="${fieldName}.push({});generateCustomHtml()">
                    <span class="glyphicon glyphicon-plus-sign"></span> Thêm
                  </strong>
                </div>`;
            }
            that.customFieldHtml += `
                  </div>
                </div>
              </div>
            </div>`;
          } else {
            let notSaved = !data[f.key] && f.default ? true : false;
            data[f.key] = data[f.key] || f.default || "";
            if (!f.array) {
              that.customFieldHtml += `
                <div class="${getColumnClass(f)}">
                  <fieldset class="form-group">
                    <label class="form-label semibold" for="${f.name}">
                      ${f.name}:
                    </label>
                    ${getTemplate(f, varName)}
                    <div v-if="${f.note ? "true" : "false"}"><i>* ${f.note}</i></div>
                    <div v-if="${notSaved}"><i class="text-danger">Chưa được lưu</i></div>
                  </fieldset>
                </div>`;
            } else {
              if (!Array.isArray(data[f.key])) {
                data[f.key] = [data[f.key]];
              }
              let fieldName = varName + "." + f.key;
              that.customFieldHtml += `
                <div class="${getColumnClass(f)}">
                  <fieldset class="form-group">
                    <label class="form-label semibold" for="${f.name}">
                      ${f.name}:
                      <span v-on:click="${fieldName}.push(null);generateCustomHtml()" class="glyphicon glyphicon-plus-sign"></span>
                    </label>
                    <table class="table table-striped table-bordered">
                    `;
              for (let i = 0; i < data[f.key].length; i++) {
                that.customFieldHtml += `
                    <tr>
                      <td>${i+1}:</td>
                      <td>
                        ${getTemplate(f, varName, i)}
                      </td>
                      <td><span v-on:click="${fieldName}.splice(${i}, 1);generateCustomHtml()" class="glyphicon glyphicon-remove-sign"></span></td>
                    </tr>
                `;
              }
              that.customFieldHtml += `
                    </table>
                    <div v-if="${f.note ? "true" : "false"}"><i>* ${f.note}</i></div>
                    <div v-if="${notSaved}"><i class="text-danger">Chưa được lưu</i></div>
                  </fieldset>
                </div>`;
            }
            // that.fields.push(_html);
          }
        });
        that.customFieldHtml += `</div>`;
        return JSON.parse(JSON.stringify(data));
      }

      that.formData = initField(
        JSON.parse(JSON.stringify(that.customdata.fields)),
        JSON.parse(JSON.stringify(that.formData)),
        "formData"
      );

      that.customFieldHtml = `<div>${that.customFieldHtml}</div>`;
    }
  },
  components: {
    VRuntimeTemplate
  },
  created() {
    this.initService(this.apiUrl);
    let id = this.$route.params.id;
    if (id !== undefined) this.getItemById({ id });
    let type = this.$route.query.type;
    let that = this;
    if(type) {
      getDynamicdata(type)
      .then(resp => {
        that.customdata = resp.data;
        that.formData.type = type;
        that.generateCustomHtml();
      });
    }
  }
};

function getCustomdata(key) {
  return  Axios.get(`${window.settings.services.adminUrl}/customdata/ajaxOne?key=${key}`);
}

function getDynamicdata(type) {
  return Axios.get(`${window.settings.services.adminUrl}/dynamicdata/ajaxOne?id=${type}`)
    .then(resp => {
      return getCustomdata(resp.data.key);
    });
}
</script>

<style lang="scss" scoped>
</style>
