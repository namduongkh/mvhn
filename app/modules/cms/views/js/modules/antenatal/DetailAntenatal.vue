<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Antenatals"
        listRouter="/antenatals"
        routeDetail="/antenatal"
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
              <label class="form-label semibold" for="user">Lịch của mẹ</label>
                <select2 id="user" v-validate="'required'" data-vv-name="user"  name="user"
                       v-model="formData.user" :ajax="ajax_user" placeholder="Select one..."                 />
              <small v-show="errors.has('user')" class="text-danger">{{ errors.first('user') }}</small>
            </fieldset>
          </div>
                              
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="week">Tuần thứ</label>
                <input v-model="formData.week" v-validate="'required|numeric'" data-vv-name="week"
                       type="number" class="form-control" id="week" placeholder="Enter week">
              <small v-show="errors.has('week')" class="text-danger">{{ errors.first('week') }}</small>
            </fieldset>
          </div>                              
          
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="date">Ngày khám</label>
                <datepicker v-model="formData.date" v-validate="'required'" data-vv-name="date" language="vi" name="date" id="date"
                            placeholder="Pick a date" format="dd/MM/yyyy" input-class="form-control"/>
              <small v-show="errors.has('date')" class="text-danger">{{ errors.first('date') }}</small>
            </fieldset>
          </div>
          
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="checked">Đã khám</label>
                <input v-model="formData.checked" type="checkbox"
                       class="form-control" id="checked" placeholder="Enter checked" >
            </fieldset>
          </div>                                                  
          
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="checked">Đã gửi nhắc nhở</label>
                <input v-model="formData.sended_sms" type="checkbox"
                       class="form-control" id="checked" placeholder="Enter checked" >
            </fieldset>
          </div>                                                  
          
           <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="message">Cảm nhận</label>
                <input v-model="formData.message" type="text"
                       class="form-control" id="message" placeholder="Enter message" >
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
import { mapGetters, mapActions } from "vuex";

let formData = {
  user: null,
  week: null,
  date: null,
  message: null,
  checked: null,

  status: 1
};

export default {
  name: "DetailAntenatal",
  data() {
    return {
      formData: JSON.parse(JSON.stringify(formData)),
      apiUrl: `${window.settings.services.adminUrl}/antenatal`,

      ajax_user: {
        url: `${window.settings.services.adminUrl}/user/select2`,
        dataType: "json",
        xhrFields: { withCredentials: true },
        cache: true
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
  }
};
</script>

<style lang="scss" scoped>
</style>
