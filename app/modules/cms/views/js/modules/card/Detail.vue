<template>
    <div class="page-content">
        <div class="container-fluid">
            <DetailActions
                    title="Tem sản phẩm"
                    listRouter="/cards"
                    routeDetail="/card"
                    :formData="formData"
                    :disable="errors.any()"
                    @action="save"
                    @reset="resetForm"
            />

            <form class="box-typical box-typical-padding">
                <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>

                <div class="row">
                    <!-- <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label semibold" for="product_stamp">Product Stamp</label>
                            <input v-model="formData.product_stamp" v-validate="'required'" data-vv-name="Product Stamp" type="text" class="form-control" id="product_stamp" placeholder="Product Stamp" >
                            <small v-show="errors.has('Product Stamp')" class="text-danger">{{ errors.first('Product Stamp') }}</small>
                        </fieldset>
                    </div> -->

                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label semibold" for="card_code">Mã</label>
                            <input v-model="formData.card_code" v-validate="'required'" data-vv-name="Mã" type="text" class="form-control" id="card_code" placeholder="Mã" >
                            <small v-show="errors.has('Mã')" class="text-danger">{{ errors.first('Mã') }}</small>
                        </fieldset>
                    </div>

                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label semibold" for="used">Đã đổi</label>
                            <input v-model="formData.used" type="checkbox" class="form-control" id="used" placeholder="Đã đổi" >
                        </fieldset>
                    </div>

                    <!-- <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label semibold" for="point">Số điểm</label>
                            <input v-model="formData.point" type="number" min="0" class="form-control" id="used" placeholder="Số điểm" >
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
  product_stamp: "",
  card_code: "",
  // point: 10,
  used: false
};

import { mapGetters, mapActions } from "vuex";

export default {
  name: "DetailCard",
  data() {
    return {
      formData: JSON.parse(JSON.stringify(formData)),
      apiUrl: `${window.settings.services.adminUrl}/card`,
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