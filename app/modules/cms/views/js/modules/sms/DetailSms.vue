<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Smss"
        listRouter="/smss"
        routeDetail="/sms"
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
              <label class="form-label semibold" for="phone">Số điện thoại</label>
                <input v-model="formData.phone" v-validate="'required'" data-vv-name="phone" type="text"
                       class="form-control" id="phone" placeholder="Enter phone" >
              <small v-show="errors.has('phone')" class="text-danger">{{ errors.first('phone') }}</small>
            </fieldset>
          </div>                                                  
          
          
          
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="content">Nội dung</label>
                <input v-model="formData.content" v-validate="'required'" data-vv-name="content" type="text"
                       class="form-control" id="content" placeholder="Enter content" >
              <small v-show="errors.has('content')" class="text-danger">{{ errors.first('content') }}</small>
            </fieldset>
          </div>                                                  
          
          
                                                            
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="type">Loại tin nhắn</label>
                <select v-validate="'required'" data-vv-name="type" v-model="formData.type"  name="type" id="type" class="form-control">
                  <option :value="null">Please update option...</option>
                  <option value="Verify">Verify</option>
                  <option value="Nhắc nhỏ">Nhắc nhỏ</option>
                  <option value="Khác">Khác</option>
                </select>
              <small v-show="errors.has('type')" class="text-danger">{{ errors.first('type') }}</small>
            </fieldset>
          </div>
          
          
                    
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="response">Kết quả gửi</label>
                <textarea v-model="formData.response" v-validate="'required'" data-vv-name="response" rows="5"
                          name="response" id="response" class="form-control" placeholder="Enter response"></textarea>
              <small v-show="errors.has('response')" class="text-danger">{{ errors.first('response') }}</small>
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
          phone: null,
          content: null,
          type: null,
          response: null,
    
    status: 1
  };

  export default {
    name: 'DetailSms',
    data(){
      return {
        formData: JSON.parse(JSON.stringify(formData)),
        apiUrl: `${window.settings.services.adminUrl}/sms`,
        
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
