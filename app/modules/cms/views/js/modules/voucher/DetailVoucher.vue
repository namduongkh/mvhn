<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Voucher"
        listRouter="/vouchers"
        routeDetail="/voucher"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      />

      <form class="box-typical box-typical-padding">
         <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>

        <div class="row">
          
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="title">Tiêu đề</label>
                <input v-model="formData.title" v-validate="'required'" data-vv-name="title" type="text"
                       class="form-control" id="title" placeholder="Enter title" >
              <small v-show="errors.has('title')" class="text-danger">{{ errors.first('title') }}</small>
            </fieldset>
          </div>                                                  
          
          
          
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="subtitle">Tiêu đề phụ</label>
                <input v-model="formData.subtitle" data-vv-name="subtitle" type="text"
                       class="form-control" id="subtitle" placeholder="Enter subtitle" >
              <small v-show="errors.has('subtitle')" class="text-danger">{{ errors.first('subtitle') }}</small>
            </fieldset>
          </div>                                                  
          
          
          
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="slug">Slug</label>
                <input v-model="formData.slug" data-vv-name="slug" type="text"
                       class="form-control" id="slug" placeholder="Enter slug" >
              <small v-show="errors.has('slug')" class="text-danger">{{ errors.first('slug') }}</small>
            </fieldset>
          </div>                                                  
          
          
                              
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-6">
                <fieldset class="form-group">
                  <label class="form-label semibold" for="quantity">Không giới hạn số lượng</label>
                  <input v-model="formData.infinity" data-vv-name="Số lượng"
                          type="checkbox" id="infinity">
                </fieldset>
              </div>
              <div class="col-sm-6">
                <fieldset class="form-group">
                  <label class="form-label semibold" for="quantity">Số lượng</label>
                    <input v-model="formData.quantity" v-validate="'required|numeric'" data-vv-name="Số lượng"
                          type="number" class="form-control" id="quantity" placeholder="Nhập số lượng" :disabled="formData.infinity">
                  <small v-show="errors.has('Số lượng')" class="text-danger">{{ errors.first('Số lượng') }}</small>
                </fieldset>
              </div>
            </div>
          </div>                              
                              
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="point">Số điểm</label>
                <input v-model="formData.point" v-validate="'required|numeric'" data-vv-name="Số điểm"
                       type="number" class="form-control" id="point" placeholder="Nhập số điểm">
              <small v-show="errors.has('Số điểm')" class="text-danger">{{ errors.first('Số điểm') }}</small>
            </fieldset>
          </div>                              
                              
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="price">Trị giá</label>
                <input v-model="formData.price" data-vv-name="price"
                       type="text" class="form-control" id="price" placeholder="Enter price">
              <small v-show="errors.has('price')" class="text-danger">{{ errors.first('price') }}</small>
            </fieldset>
          </div>                              
          
          
                                        
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="teaser">Mô tả ngắn</label>
                <froala :tag="'textarea'" v-model="formData.teaser" id="teaser" name="teaser" data-vv-name="teaser" />
              <small v-show="errors.has('teaser')" class="text-danger">{{ errors.first('teaser') }}</small>
            </fieldset>
          </div>                    
                                        
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="description">Mô tả chi tiết</label>
                <froala :tag="'textarea'" v-model="formData.description" id="description" name="description" data-vv-name="description" />
              <small v-show="errors.has('description')" class="text-danger">{{ errors.first('description') }}</small>
            </fieldset>
          </div>                    
          
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="position">Vị trí trên trang chủ</label>
                <select v-validate="'required'" data-vv-name="position" v-model="formData.position"  name="position" id="position" class="form-control" v-html="position_options">
                </select>
              <small v-show="errors.has('position')" class="text-danger">{{ errors.first('position') }}</small>
            </fieldset>
          </div>
                                                                                                        
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="featured">Nổi bật</label>
                <select v-validate="'required'" data-vv-name="featured" v-model="formData.featured"  name="featured" id="featured" class="form-control" v-html="featured_options">
                </select>
              <small v-show="errors.has('featured')" class="text-danger">{{ errors.first('featured') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="start_date">Ngày bắt đầu</label>
                <datepicker v-model="formData.start_date" data-vv-name="start_date" language="vi" name="start_date" id="start_date"
                            placeholder="Pick a date" format="dd/MM/yyyy" input-class="form-control" :clear-button="true" :clear-button-icon="'fa fa-times-circle'"/>
              <small v-show="errors.has('start_date')" class="text-danger">{{ errors.first('start_date') }}</small>
            </fieldset>
          </div>
          
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="end_date">Ngày kết thúc</label>
                <datepicker v-model="formData.end_date" data-vv-name="end_date" language="vi" name="end_date" id="end_date"
                            placeholder="Pick a date" format="dd/MM/yyyy" input-class="form-control" :clear-button="true" :clear-button-icon="'fa fa-times-circle'"/>
              <small v-show="errors.has('end_date')" class="text-danger">{{ errors.first('end_date') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12" v-if="formData.position == 2">
            <fieldset class="form-group">
              <label class="form-label semibold" for="thumb_2">Hình ảnh trên trang chủ</label>
                <imageUploader name="thumb_2" classButtonUpload="btn-secondary" id="thumb_2" v-validate="'required'" dir-upload="voucher"
                              data-vv-name="thumb_2" v-model="formData.thumb_2"/>
              <small v-show="errors.has('thumb_2')" class="text-danger">{{ errors.first('thumb_2') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="thumb">Hình ảnh</label>
                <imageUploader name="thumb" classButtonUpload="btn-secondary" id="thumb" v-validate="'required'" dir-upload="voucher"
                              data-vv-name="thumb" v-model="formData.thumb"/>
              <small v-show="errors.has('thumb')" class="text-danger">{{ errors.first('thumb') }}</small>
            </fieldset>
          </div>

          <!-- <div class="col-sm-6">
              <fieldset class="form-group">
                <label class="form-label" for="for_mom">Dành cho</label>
                <select data-vv-name="for_mom" v-model="formData.for_mom"  name="for_mom" id="for_mom" class="form-control">
                  <option :value="0">Mẹ có con</option>
                  <option :value="1">Mẹ bầu</option>
                </select>
              </fieldset>
          </div> -->
          
          
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

        <div class="row">
            <div class="col-sm-12">
                <h5 class="m-t-lg with-border">Những người đã đổi quà</h5>
                <button type="button" data-toggle="collapse" data-target="#histories" class="btn btn-default">Hiện/Ẩn</button>
                <div id="histories" class="collapse">
                    <table class="table table-bordered">
                        <tr v-for="(his) in histories" :key="his._id">
                            <td>
                                {{ his.user._id }}
                            </td>
                            <td>
                                {{ his.user.name }}
                            </td>
                            <td>
                                {{ his.point }}
                            </td>
                            <td>
                                {{ his.createdAt | formatDate('DD/MM/YYYY HH:mm:ss') }}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
      </form><!--.box-typical-->
    </div><!--.container-fluid-->
  </div><!--.page-content-->
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import VoucherHelper from "./voucher.helper";
import Axios from "axios";

let formData = {
  title: null,
  subtitle: null,
  slug: null,
  point: null,
  teaser: null,
  description: null,
  thumb: null,
  start_date: null,
  end_date: null,
  price: null,
  featured: 0,
  position: 0,
  quantity: 0,
  infinity: false,

  status: 1
};

export default {
  name: "DetailVoucher",
  data() {
    return {
      formData: JSON.parse(JSON.stringify(formData)),
      apiUrl: `${window.settings.services.adminUrl}/voucher`,
      featured_options: VoucherHelper.options_for_select(),
      position_options: VoucherHelper.position_options(),
      histories: []
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
    if (id !== undefined) {
      this.getItemById({ id });
      Axios.get(
        `${window.settings.services.adminUrl}/voucher/histories?voucherId=${id}`
      ).then(resp => {
        this.histories = resp.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
