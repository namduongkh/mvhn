<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Playlists"
        listRouter="/playlists"
        routeDetail="/playlist"
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
              <label class="form-label semibold" for="title">Tiêu đề</label>
                <input v-model="formData.title" v-validate="'required'" data-vv-name="title" type="text"
                       class="form-control" id="title" placeholder="Enter title" >
              <small v-show="errors.has('title')" class="text-danger">{{ errors.first('title') }}</small>
            </fieldset>
          </div>                                                  
          
          
          
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="link">Link youtube</label>
                <input v-model="formData.link" v-validate="'required'" data-vv-name="link" type="text"
                       class="form-control" id="link" placeholder="Enter link" >
              <small v-show="errors.has('link')" class="text-danger">{{ errors.first('link') }}</small>
            </fieldset>
          </div>                                                  
          
          
                                                  
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="thumb">Hình Thumb</label>
                <imageUploader name="thumb" classButtonUpload="btn-secondary" id="thumb" v-validate="'required'" dir-upload="playlist"
                               data-vv-name="thumb" v-model="formData.thumb"/>
              <small v-show="errors.has('thumb')" class="text-danger">{{ errors.first('thumb') }}</small>
            </fieldset>
          </div>
                    
          
          
                    
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="description">Mô tả</label>
                <textarea v-model="formData.description" v-validate="'required'" data-vv-name="description" rows="5"
                          name="description" id="description" class="form-control" placeholder="Enter description"></textarea>
              <small v-show="errors.has('description')" class="text-danger">{{ errors.first('description') }}</small>
            </fieldset>
          </div>                                        
          
          
                                                            
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="group">Nhóm</label>
                <select v-validate="'required'" data-vv-name="group" v-model="formData.group"  name="group" id="group" class="form-control">
                  <option :value="null">Chọn nhóm</option>
                  <option v-for="item in OptionsGroup" :value="item.id">{{item.text}}</option>
                </select>
              <small v-show="errors.has('group')" class="text-danger">{{ errors.first('group') }}</small>
            </fieldset>
          </div>
          
          
                              
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="count">Lượt nghe</label>
                <input v-model="formData.count" v-validate="'required|numeric'" data-vv-name="count"
                       type="number" class="form-control" id="count" placeholder="Enter count">
              <small v-show="errors.has('count')" class="text-danger">{{ errors.first('count') }}</small>
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
        </div>


      </form><!--.box-typical-->

    </div><!--.container-fluid-->
  </div><!--.page-content-->
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';

  let formData = {
          title: null,
          link: null,
          thumb: null,
          description: null,
          group: null,
          count: 0,
    
    status: 1
  };

  export default {
    name: 'DetailPlaylist',
    data(){
      return {
        formData: JSON.parse(JSON.stringify(formData)),
        apiUrl: `${window.settings.services.adminUrl}/playlist`,
        OptionsGroup: [{id: 'ME_BAU', text: 'Cho mẹ bầu'}, {id: 'BE', text: 'Cho bé'}]
      }
    },

    computed: {
      ...mapGetters(['itemSelected', 'authUser'])
    },
    watch: {
      itemSelected(data){
        if(data){
          let templateData = Object.assign({}, formData);
          this.formData = Object.assign({}, templateData, data);
        }
      },
    },
    methods: {
      ...mapActions(['initService', 'saveItem', 'getItemById']),
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
          this.formData = JSON.parse(JSON.stringify(formData));
        }
        else{
          this.getItemById({ id: this.formatData._id });
        }
      }
    },
    components:{
    },
    created(){
      this.initService(this.apiUrl);
      let id = this.$route.params.id;
      if (id !== undefined)
        this.getItemById({ id });
    }
  }
</script>

<style lang="scss" scoped>
</style>
