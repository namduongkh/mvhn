<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Tips"
        listRouter="/tips"
        routeDetail="/tip"
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
                <input v-model="formData.title" v-validate="'required'" data-vv-name="Tiêu đề" type="text"
                       class="form-control" id="Tiêu đề" placeholder="Nhập tiêu đề" >
              <small v-show="errors.has('Tiêu đề')" class="text-danger">{{ errors.first('Tiêu đề') }}</small>
            </fieldset>
          </div>                                                  
          
          
          
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="slug">Slug</label>
                <input v-model="formData.slug" v-validate="'required'" data-vv-name="slug" type="text"
                       class="form-control" id="slug" placeholder="Enter slug" >
              <small v-show="errors.has('slug')" class="text-danger">{{ errors.first('slug') }}</small>
            </fieldset>
          </div>                                                  
          
          
                                                            
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="group">Dành cho</label>
                <select v-validate="'required'" data-vv-name="Nhóm" v-model="formData.group"  name="group" id="group" class="form-control">
                  <option :value="null">Chọn nhóm</option>
                  <option v-for="item in OptionsGroup" :value="item.id">{{item.text}}</option>
                </select>
              <small v-show="errors.has('Nhóm')" class="text-danger">{{ errors.first('Nhóm') }}</small>
            </fieldset>
          </div>
          
          
                              
          <div v-if="formData.group === 'ME_BAU'" class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="month_of_pregnant">Dành cho mẹ bầu tháng thứ</label>
                <input v-model="formData.month_of_pregnant" data-vv-name="month_of_pregnant"
                       type="number" class="form-control" id="month_of_pregnant" placeholder="Nhập số tháng">
              <small v-show="errors.has('month_of_pregnant')" class="text-danger">{{ errors.first('month_of_pregnant') }}</small>
            </fieldset>
          </div>                              
          
          <div v-else class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="age_of_baby">Dành cho bé (tuổi)</label>
                <input v-model="formData.age_of_baby"  data-vv-name="age_of_baby"
                       type="number" class="form-control" id="age_of_baby" placeholder="Nhập số tuổi">
              <small v-show="errors.has('age_of_baby')" class="text-danger">{{ errors.first('age_of_baby') }}</small>
            </fieldset>
          </div>                              
          
          
                    
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="description">Mô tả ngắn</label>
                <textarea v-model="formData.description" v-validate="'required|max:400'" data-vv-name="Mô tả ngắn" rows="5"
                          name="description" id="description" class="form-control" placeholder="Nhập mô tả"></textarea>
              <small v-show="errors.has('Mô tả ngắn')" class="text-danger">{{ errors.first('Mô tả ngắn') }}</small>
            </fieldset>
          </div>                                        
          
          
                                                  
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="thumb">Hình Thumb</label>
                <imageUploader name="thumb" classButtonUpload="btn-secondary" id="thumb" v-validate="'required'" dir-upload="tip"
                               data-vv-name="thumb" v-model="formData.thumb"/>
              <small v-show="errors.has('thumb')" class="text-danger">{{ errors.first('thumb') }}</small>
            </fieldset>
          </div>
                    
          
          
                                        
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="content">Nội dung</label>
                <froala :tag="'textarea'" :config="froalaConfig" v-model="formData.content" v-validate="'required'" id="content" name="content" data-vv-name="Nội dung" />
              <small v-show="errors.has('Nội dung')" class="text-danger">{{ errors.first('Nội dung') }}</small>
            </fieldset>
          </div>                    
          
          
                                                            
          
          
          
          
        </div><!--.row-->

        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="content">Đánh dấu bài tiêu điểm</label>
              <select v-model="formData.is_special" name="is_special" id="is_special" class="form-control">
                <option :value="true">True</option>
                <option :value="false">False</option>
              </select>
            </fieldset>
          </div>
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
          slug: null,
          group: null,
          month_of_pregnant: null,
          age_of_baby: null,
          description: null,
          thumb: null,
          content: null,
          is_special: false,
    
    status: 1
  };

  export default {
    name: 'DetailTip',
    data(){
      return {
        formData: JSON.parse(JSON.stringify(formData)),
        apiUrl: `${window.settings.services.adminUrl}/tip`,
          OptionsGroup: [{id: 'ME_BAU', text: 'Cho mẹ bầu'}, {id: 'BE', text: 'Cho bé'}],
        froalaConfig: {
          imageUploadURL: window.settings.services.uploadApi,
          imageUploadMethod: 'POST',
          imageUploadParams: {
            type: 'wysiwyg/tip'
          }
        }
      }
    },

    computed: {
      ...mapGetters(['itemSelected', 'authUser'])
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
    },
    watch: {
        "formData.title"(val) {
            this.formData.slug = this.$options.filters["text2Slug"](val);
        },
        "formData.slug"(val) {
            this.formData.slug = this.$options.filters["text2Slug"](val);
        },
        itemSelected(data){
            console.log(data)
            if(data){
                let templateData = Object.assign({}, formData);
                this.formData = Object.assign({}, templateData, data);
            }
        },
    }
  }
</script>

<style lang="scss" scoped>
</style>
