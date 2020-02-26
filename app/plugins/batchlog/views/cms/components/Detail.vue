<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Batchlog"
        listRouter="/batchlogs"
        routeDetail="/batchlog"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      >
        <template slot="moreAction"></template>
      </DetailActions>

      <form class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>

        <div class="row">

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="name">Name</label>
                <input v-model="formData.name" data-vv-name="name" type="text"
                       class="form-control" id="name" placeholder="Enter Name" >
              <small v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</small>
            </fieldset>
          </div>



          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="model">Model</label>
                <input v-model="formData.model" data-vv-name="model" type="text"
                       class="form-control" id="model" placeholder="Enter Model" >
              <small v-show="errors.has('model')" class="text-danger">{{ errors.first('model') }}</small>
            </fieldset>
          </div>



          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="object">Object</label>
                <input v-model="formData.object" data-vv-name="object" type="text"
                       class="form-control" id="object" placeholder="Enter Object" >
              <small v-show="errors.has('object')" class="text-danger">{{ errors.first('object') }}</small>
            </fieldset>
          </div>



          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="progress">Progress</label>
                <input v-model="formData.progress" data-vv-name="progress" type="text"
                       class="form-control" id="progress" placeholder="Enter Progress" >
              <small v-show="errors.has('progress')" class="text-danger">{{ errors.first('progress') }}</small>
            </fieldset>
          </div>






          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="logs">Logs</label>
                <bz-json-editor   data-vv-name="logs" name="logs" id="logs" v-model="formData.logs"/>
              <small v-show="errors.has('logs')" class="text-danger">{{ errors.first('logs') }}</small>
            </fieldset>
          </div>



          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="options">Options</label>
                <bz-json-editor   data-vv-name="options" name="options" id="options" v-model="formData.options"/>
              <small v-show="errors.has('options')" class="text-danger">{{ errors.first('options') }}</small>
            </fieldset>
          </div>
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="type">Type</label>
                <input v-model="formData.type" data-vv-name="type" type="text"
                       class="form-control" id="type" placeholder="Enter Type" >
              <small v-show="errors.has('type')" class="text-danger">{{ errors.first('type') }}</small>
            </fieldset>
          </div>



          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="outputFiles">Output Files</label>
                <input v-model="formData.outputFiles" data-vv-name="outputFiles" type="text"
                       class="form-control" id="outputFiles" placeholder="Enter Output Files" >
              <small v-show="errors.has('outputFiles')" class="text-danger">{{ errors.first('outputFiles') }}</small>
            </fieldset>
          </div>



          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="processStatus">Process Status</label>
                <select data-vv-name="processStatus" v-model="formData.processStatus"  name="processStatus" id="processStatus" class="form-control">
                  <option :value="null">Please update option...</option>
                  <option :value="1">Option 1</option>
                  <option :value="0">Option 2</option>
                  <option :value="2">Option 3</option>
                </select>
              <small v-show="errors.has('processStatus')" class="text-danger">{{ errors.first('processStatus') }}</small>
            </fieldset>
          </div>




        </div>

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
      </form>
      <!--.box-typical-->
    </div>
    <!--.container-fluid-->
  </div>
  <!--.page-content-->
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DetailBatchlog",
  data() {
    return {
      formData: {},
      cmsUrl: `${CMS_URL}/batchlogs`,

      froalaConfig: {
        imageUploadURL: window.settings.services.webUrl + "/api/upload/image",
        imageUploadMethod: "POST",
        imageUploadParams: {
          type: "wysiwyg/post"
        }
      }
    };
  },
  computed: {
    ...mapGetters(['itemSelected', 'authUser'])
  },
  watch: {
    itemSelected(data) {
      if (data) {
        this.formData = Object.assign({}, data);
      }
    },
    "formData.name"(val) {
      if (this.formData._id) return;
      this.formData.slug = this.$options.filters["text2Slug"](val);
    },
    "formData.attribute"(attribute) {
      // Do something
    }
  },
  methods: {
    ...mapActions(["initService", "saveItem", "getItemById", "newItem"]),
    save(options){
      let self = this;
      this.$validator.validateAll().then(res=>{
        if(res){
          self.saveItem({formData: self.formData, options});
        }
        else{
          this.$notify('Please check your data', {type: 'warning'});
        }
      });
    },
    resetForm(){
      this.errors.clear();
      if(!this.formData._id){
        this.newItem();
      }
      else{
        this.getItemById({ id: this.formData._id });
      }
    }
  },
  components: {},
  created() {
    this.initService(this.cmsUrl);
    let id = this.$route.params.id;
    if (id !== undefined) this.getItemById({ id });
    else this.newItem();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
