<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Khung dữ liệu"
        listRouter="/customdatas"
        routeDetail="/customdata"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      />

      <form class="box-typical box-typical-padding">
         <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>

        <div class="row">
          
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="name">Name</label>
                <input v-model="formData.name" v-validate="'required'" data-vv-name="name" type="text"
                       class="form-control" id="name" placeholder="Enter name" >
              <small v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</small>
            </fieldset>
          </div>                                                  
          
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="key">Key</label>
                <input v-model="formData.key" v-validate="'required'" data-vv-name="key" type="text"
                       class="form-control" id="key" placeholder="Enter key" >
              <small v-show="errors.has('key')" class="text-danger">{{ errors.first('key') }}</small>
            </fieldset>
          </div>                                                  
          
                                                          
          
          <div class="col-sm-12">
            <fieldset class="form-group" v-if="!showFieldsEditor">
              <label class="form-label semibold" for="fields">Đang tải...</label>
            </fieldset>
            <fieldset class="form-group" v-if="showFieldsEditor">
              <label class="form-label semibold" for="fields">Danh sách field</label>
              <div>
                <i>Ví dụ thiết lập field:</i>
                <pre style="font-size: 12px">
                  <i>{{ example }}</i>
                </pre>
              </div>
              
              <bz-json-editor  v-validate="'required'"  data-vv-name="fields" name="fields" id="fields" v-model="formData.fields" mode="code" height="600"/>
              <small v-show="errors.has('fields')" class="text-danger">{{ errors.first('fields') }}</small>
            </fieldset>
          </div>
          
        </div><!--.row-->

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
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="is_table">Bảng dữ liệu</label>
                <input v-model="formData.is_table" type="checkbox" id="is_table" placeholder="Enter is_table" >
              <!-- <small v-show="errors.has('is_table')" class="text-danger">{{ errors.first('is_table') }}</small> -->
            </fieldset>
          </div>  
          <div class="col-sm-12">
            <fieldset class="form-group" v-if="!showFieldsEditor">
              <label class="form-label semibold" for="fields">Đang tải...</label>
            </fieldset>
            <fieldset class="form-group" v-if="showFieldsEditor && formData.is_table">
              <label class="form-label semibold" for="fields">Cấu hình hiển thị</label>
              <bz-json-editor  v-validate="'required'"  data-vv-name="display" name="display" id="display" v-model="formData.display" mode="code" height="600"/>
              <small v-show="errors.has('display')" class="text-danger">{{ errors.first('display') }}</small>
            </fieldset>
          </div>
        </div>

      </form><!--.box-typical-->

    </div><!--.container-fluid-->
  </div><!--.page-content-->
</template>
<script>
import { mapGetters, mapActions } from "vuex";

let formData = {
  name: null,
  key: null,
  fields: [],
  status: 1,
  is_table: false
};

export default {
  name: "DetailCustomdata",
  data() {
    return {
      formData: JSON.parse(JSON.stringify(formData)),
      apiUrl: `${window.settings.services.adminUrl}/customdata`,
      showFieldsEditor: false,
      example: {
        name: "Tên field",
        key: 'ten_field',
        type: "text | date | textarea | image | boolean | select | number | editor",
        array: "true | false",
        default: "Giá trị mặc định",
        options: "[[0, 'Giá trị 0'], [1, 'Giá trị 1']]",
        fields: "[danh sách field...]"
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
      if (!this.formatData._id) {
        this.formData = JSON.parse(JSON.stringify(formData));
      } else {
        this.getItemById({ id: this.formatData._id });
      }
    }
  },
  components: {},
  created() {
    this.initService(this.apiUrl);
    let id = this.$route.params.id;
    if (id !== undefined) this.getItemById({ id });
    setTimeout(() => {
      this.showFieldsEditor = true;
    }, 2000);
  }
};
</script>

<style lang="scss" scoped>
</style>
