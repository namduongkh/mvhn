<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Rating"
        listRouter="/ratings"
        routeDetail="/rating"
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
              <label class="form-label semibold" for="object">Object</label>
                <input v-model="formData.object" v-validate="'required'" data-vv-name="object" type="text"
                       class="form-control" id="object" placeholder="Enter object" >
              <small v-show="errors.has('object')" class="text-danger">{{ errors.first('object') }}</small>
            </fieldset>
          </div>                                                  
          
          
          
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="star">Star</label>
                <input v-model="formData.star" v-validate="'required'" data-vv-name="star" type="text"
                       class="form-control" id="star" placeholder="Enter star" >
              <small v-show="errors.has('star')" class="text-danger">{{ errors.first('star') }}</small>
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
  name: "DetailRating",
  data() {
    return {
      formData: {},
      cmsUrl: `${window.settings.services.cmsUrl}/ratings`,
      
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