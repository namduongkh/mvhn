<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="NotificationClients"
        listRouter="/notificationclients"
        routeDetail="/notificationclient"
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
              <label class="form-label semibold" for="user">User</label>
                <select2 id="user" name="user"
                       v-model="formData.user" :ajax="ajax_user" placeholder="Select one..."                 />
              <small v-show="errors.has('user')" class="text-danger">{{ errors.first('user') }}</small>
            </fieldset>
          </div>
          
                    
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="client_token">Token</label>
                <textarea v-model="formData.client_token" v-validate="'required'" data-vv-name="client_token" rows="5"
                          name="client_token" id="client_token" class="form-control" placeholder="Enter client_token"></textarea>
              <small v-show="errors.has('client_token')" class="text-danger">{{ errors.first('client_token') }}</small>
            </fieldset>
          </div>                                        
          

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="registration_info">Registration info</label>
                <bz-json-editor name="registration_info" id="registration_info" v-model="formData.registration_info"/>
              <small v-show="errors.has('registration_info')" class="text-danger">{{ errors.first('registration_info') }}</small>
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
          user: null,
          client_token: null,
          registration_info: null,
    
    status: 1
  };

  export default {
    name: 'DetailNotificationClient',
    data(){
      return {
        formData: JSON.parse(JSON.stringify(formData)),
        apiUrl: `${window.settings.services.adminUrl}/notificationclient`,
        
        ajax_user: {
          url: `${window.settings.services.adminUrl}/user/select2`,
          dataType: 'json',xhrFields: { withCredentials: true },cache: true
        }
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
