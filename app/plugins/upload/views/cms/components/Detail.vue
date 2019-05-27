<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Media"
        listRouter="/medias"
        routeDetail="/media"
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
              <label class="form-label semibold" for="path">Path</label>
                <input v-model="formData.path" v-validate="'required'" data-vv-name="path" type="text"
                       class="form-control" id="path" placeholder="Enter path" >
              <small v-show="errors.has('path')" class="text-danger">{{ errors.first('path') }}</small>
            </fieldset>
          </div>                                                  
          
          
          
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="ext">Ext</label>
                <input v-model="formData.ext" v-validate="'required'" data-vv-name="ext" type="text"
                       class="form-control" id="ext" placeholder="Enter ext" >
              <small v-show="errors.has('ext')" class="text-danger">{{ errors.first('ext') }}</small>
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
  name: "DetailMedia",
  data() {
    return {
      formData: {},
      cmsUrl: `${window.settings.services.cmsUrl}/medias`,
      
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
        this.formData = JSON.parse(JSON.stringify(Object.assign({}, data)));
      }
    },
    "formData.name"(val) {
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
      if(!this.formatData._id){
        this.newItem();
      }
      else{
        this.getItemById({ id: this.formatData._id });
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