<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Chi tiết đổi quà"
        listRouter="/voucherhistories"
        routeDetail="/voucherhistory"
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
              <label class="form-label semibold" for="voucher">Voucher</label>
                <select2 id="voucher" v-validate="'required'" data-vv-name="voucher"  name="voucher"
                       v-model="formData.voucher" :ajax="ajax_voucher" placeholder="Select one..."                 />
              <small v-show="errors.has('voucher')" class="text-danger">{{ errors.first('voucher') }}</small>
            </fieldset>
          </div>
          
                                                            
          
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="user">Người dùng</label>
                <select2 id="user" v-validate="'required'" data-vv-name="user"  name="user"
                       v-model="formData.user" :ajax="ajax_user" placeholder="Select one..."                 />
              <small v-show="errors.has('user')" class="text-danger">{{ errors.first('user') }}</small>
            </fieldset>
          </div>
          
                                                            
          
          
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="date">Ngày đổi</label>
                <datepicker v-model="formData.date" v-validate="'required'" data-vv-name="date" language="vi" name="date" id="date"
                            placeholder="Pick a date" format="dd/MM/yyyy" input-class="form-control"/>
              <small v-show="errors.has('date')" class="text-danger">{{ errors.first('date') }}</small>
            </fieldset>
          </div>
                              
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="point">Số điểm</label>
                <input v-model="formData.point" v-validate="'required|numeric'" data-vv-name="point"
                       type="number" class="form-control" id="point" placeholder="Enter point">
              <small v-show="errors.has('point')" class="text-danger">{{ errors.first('point') }}</small>
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
  voucher: null,
  user: null,
  date: null,
  point: null,

  status: 1
};

export default {
  name: "DetailVoucherhistory",
  data() {
    return {
      formData: JSON.parse(JSON.stringify(formData)),
      apiUrl: `${window.settings.services.adminUrl}/voucherhistory`,

      ajax_voucher: {
        url: `${window.settings.services.adminUrl}/voucher/select2`,
        dataType: "json",
        xhrFields: { withCredentials: true },
        cache: true
      },
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
