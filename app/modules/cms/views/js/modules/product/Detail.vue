<template>
    <div class="page-content">
        <div class="container-fluid">
            <DetailActions
                    title="Product"
                    listRouter="/products"
                    routeDetail="/product"
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
                            <label class="form-label semibold" for="exampleInput">Tên sản phẩm</label>
                            <input v-model="formData.title" v-validate="'required'" data-vv-name="Tiêu đề" type="text" class="form-control" id="exampleInput" placeholder="Title" >
                            <small v-show="errors.has('Tiêu đề')" class="text-danger">{{ errors.first('Tiêu đề') }}</small>
                        </fieldset>
                    </div>

                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="exampleInputEmail1">Slug</label>
                            <input v-model="formData.slug" v-validate="'required'" data-vv-name="Slug" type="text" class="form-control" id="exampleInputEmail1" placeholder="Slug auto generator">
                            <small v-show="errors.has('Slug')" class="text-danger">{{ errors.first('Slug') }}</small>
                        </fieldset>
                    </div>
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label semibold" for="category">Loại sản phẩm</label>
                            <select2 id="category" v-validate="'required'" data-vv-name="Loại sản phẩm"  name="category"
                                     v-model="formData.category" :ajax="ajaxCategory" placeholder="Chọn..."/>
                            <small v-show="errors.has('Loại sản phẩm')" class="text-danger">{{ errors.first('Loại sản phẩm') }}</small>
                        </fieldset>
                    </div>
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label semibold" for="external_url">Liên kết ngoài</label>
                            <input v-model="formData.external_url"  type="text" class="form-control" id="external_url" placeholder="External Url" >
                        </fieldset>
                    </div>

                </div><!--.row-->

                <div class="row">
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label semibold" for="thumb">Hình ảnh</label>
                            <imageUploader name="thumb" classButtonUpload="btn-secondary" id="thumb" v-validate="'required'"  data-vv-name="Hình thumb"  v-model="formData.thumb"/>
                            <small v-show="errors.has('Hình thumb')" class="text-danger">{{ errors.first('Hình thumb') }}</small>
                        </fieldset>
                    </div>
                </div><!--.row-->


                <div class="row">
                    <div class="col-sm-12">
                        <fieldset class="form-group">
                            <label class="form-label" for="exampleInputPassword1">Mô tả sản phẩm</label>
                            <froala :config="froalaConfig" :tag="'textarea'" v-model="formData.description"/>
                            <small v-show="errors.has('Mô tả sản phẩm')" class="text-danger">{{ errors.first('Mô tả sản phẩm') }}</small>
                        </fieldset>
                    </div>
                </div>

                <!-- <div class="row">
                    <div class="col-sm-12">
                        <fieldset class="form-group">
                            <label class="form-label" for="exampleInputPassword1">How to use</label>
                            <froala :tag="'textarea'" v-model="formData.how_to_use"/>
                        </fieldset>
                    </div>
                </div> -->

                <!-- <div class="row">
                    <div class="col-sm-12">
                        <fieldset class="form-group">
                            <label class="form-label" for="gallery">Gallery</label>
                            <imageUploader :multiple="true" v-model="formData.gallery"/>
                        </fieldset>
                    </div>
                </div> -->

                <!-- <div class="row">
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="for_mom">Dành cho</label>
                            <select data-vv-name="for_mom" v-model="formData.for_mom"  name="for_mom" id="for_mom" class="form-control">
                            <option :value="0">Mẹ có con</option>
                            <option :value="1">Mẹ bầu</option>
                            </select>
                        </fieldset>
                    </div>
                </div> -->
                <div class="row">
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="status">Cân nặng (kg)</label>
                            <div class="row">
                                <div class="col-sm-6">
                                    <input v-model="formData.weight.from" type="number" :min="0" class="form-control" id="weight_from" placeholder="Từ" >
                                </div>
                                <div class="col-sm-6">
                                    <input v-model="formData.weight.to" type="number" :min="formData.weight.from || 0" class="form-control" id="weight_to" placeholder="Đến" >
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="status">Độ tuổi</label>
                            <div class="row">
                                <div class="col-sm-6">
                                    <input v-model="formData.age.from" type="number" :min="0" class="form-control" id="age_from" placeholder="Từ" >
                                </div>
                                <div class="col-sm-6">
                                    <input v-model="formData.age.to" type="number" :min="formData.age.from || 0" class="form-control" id="age_to" placeholder="Đến" >
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="for_mom">Giới tính</label>
                            <select data-vv-name="gender" v-model="formData.gender"  name="gender" id="gender" class="form-control">
                            <option :value="0">Bé gái</option>
                            <option :value="1">Bé trai</option>
                            </select>
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
                    <!-- <div class="col-sm-6">
                        <label class="form-label" for="status">{{testSelect2}}</label>
                        <select2 v-model="testSelect2" :options="testSelect2Opt"/>
                    </div> -->
                </div>
            </form><!--.box-typical-->


        </div><!--.container-fluid-->
    </div><!--.page-content-->
</template>
<script>
// TODO: Add select 2 category
let formData = {
  title: "",
  slug: "",
  category: null,
  content: "",
  thumb: null,
  gallery: "",
  status: 1,
  how_to_use: "",
  external_url: "",
  weight: {},
  age: {},
  for_pregnant: false
};

import { mapGetters, mapActions } from "vuex";

export default {
  name: "DetailProduct",
  data() {
    return {
      formData: JSON.parse(JSON.stringify(formData)),
      apiUrl: `${window.settings.services.adminUrl}/product`,
      listCategory: [],
      ajaxCategory: {
        url: `${window.settings.services.adminUrl}/category/ajax?type=product`,
        dataType: "json",
        xhrFields: { withCredentials: true },
        cache: true
      },
      froalaConfig: {
        imageUploadURL: window.settings.services.uploadApi,
        imageUploadMethod: "POST",
        imageUploadParams: {
          type: "wysiwyg/product"
        }
      }
      // testSelect2:null,
      // testSelect2Opt: [
      //     {id: 'val1', text: 'Value 1'},
      //     {id: 'val2', text: 'Value 2'},
      //     {id: 'val3', text: 'Value 3'},
      //     {id: 'val4', text: 'Value 4'},
      //     {id: 'val5', text: 'Value 5'},
      // ]
    };
  },
  computed: {
    ...mapGetters(["itemSelected"])
  },
  watch: {
    itemSelected(data) {
      if (data) {
        let templateData = Object.assign({}, formData);
        this.formData = JSON.parse(
          JSON.stringify(Object.assign({}, templateData, data))
        );
        if (typeof this.formData.age !== "object") {
          this.formData.age = {
            from: this.formData.age,
            to: this.formData.age
          };
        }
      }
    },
    "formData.title"(val) {
      this.formData.slug = this.$options.filters["text2Slug"](val);
    },
    "formData.slug"(val) {
      this.formData.slug = this.$options.filters["text2Slug"](val);
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
          this.$notify("Please check data", {
            type: "warning",
            placement: {
              from: "bottom"
            }
          });
        }
      });
    },
    resetForm() {
      this.formData = JSON.parse(JSON.stringify(formData));
      this.errors.clear();
    }
  },
  components: {},
  created() {
    this.initService(this.apiUrl);
    let id = this.$route.params.id;
    if (id !== undefined) this.getItemById({ id });
  },
  mounted() {}
};
</script>