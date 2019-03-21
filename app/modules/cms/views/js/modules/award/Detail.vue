<template>
    <div class="page-content">
        <div class="container-fluid">
            <DetailActions
                    title="Award"
                    listRouter="/awards"
                    routeDetail="/award"
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
                            <label class="form-label semibold" for="exampleInput">Title</label>
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
                            <label class="form-label" for="point">Point</label>
                            <input v-model="formData.point" v-validate="'required'" data-vv-name="Slug" type="number" class="form-control" id="point" placeholder="Point" min="0">
                            <small v-show="errors.has('Point')" class="text-danger">{{ errors.first('Point') }}</small>
                        </fieldset>
                    </div>

                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="quantity">Quantity</label>
                            <input v-model="formData.quantity" v-validate="'required'" data-vv-name="Slug" type="number" class="form-control" id="quantity" placeholder="Quantity" min="0">
                            <small v-show="errors.has('Quantity')" class="text-danger">{{ errors.first('Quantity') }}</small>
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

                </div><!--.row-->

                <div class="row">
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label semibold" for="thumb">Thumb image</label>
                            <imageUploader name="thumb" classButtonUpload="btn-secondary" id="thumb" v-validate="'required'"  data-vv-name="Hình thumb"  v-model="formData.thumb"/>
                            <small v-show="errors.has('Hình thumb')" class="text-danger">{{ errors.first('Hình thumb') }}</small>
                        </fieldset>
                    </div>
                </div><!--.row-->


                <div class="row">
                    <div class="col-sm-12">
                        <fieldset class="form-group">
                            <label class="form-label" for="exampleInputPassword1">Description</label>
                            <froala :tag="'textarea'" v-model="formData.description"/>
                            <small v-show="errors.has('Description')" class="text-danger">{{ errors.first('Description') }}</small>
                        </fieldset>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <fieldset class="form-group">
                            <label class="form-label" for="gallery">Gallery</label>
                            <imageUploader :multiple="true" v-model="formData.gallery"/>
                        </fieldset>
                    </div>
                </div>

                <div class="row">
                    
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
  description: "",
  thumb: null,
  gallery: "",
  status: 1,
  point: 0,
  quantity: 0,
  recieved_users: null,
  point: 0
};

import { mapGetters, mapActions } from "vuex";

export default {
  name: "DetailAward",
  data() {
    return {
      formData: JSON.parse(JSON.stringify(formData)),
      apiUrl: `${window.settings.services.adminUrl}/award`,
      listCategory: [],
      ajaxCategory: {
        url: `${window.settings.services.adminUrl}/category/ajax`,
        dataType: "json",
        xhrFields: { withCredentials: true },
        cache: true
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