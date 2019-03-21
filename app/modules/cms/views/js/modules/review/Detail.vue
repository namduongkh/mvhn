<template>
    <div class="page-content">
        <div class="container-fluid">
            <DetailActions
                    title="Review"
                    listRouter="/reviews"
                    routeDetail="/review"
                    :formData="formData"
                    :disable="errors.any()"
                    @action="save"
                    @reset="resetForm"
            >
              <template slot="moreAction" slot-scope="props">

              </template>
            </DetailActions>

            <form class="box-typical box-typical-padding">
                <button :disabled="formData.verify_status == 1" type="button" class="btn btn-success pull-right" v-on:click="approved(true)">
                  <i class="fa fa-check-circle"></i> Duyệt
                </button>
                <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>
                <div class="row">
                    <div class="col-sm-12">
                        <fieldset class="form-group">
                            <label class="form-label" for="exampleInput">Sản phẩm</label>
                            <input type="text" class="form-control" id="exampleInput" placeholder="Title" disabled :value="formData.product.title">
                        </fieldset>
                    </div>

                    <div class="col-sm-12">
                        <fieldset class="form-group">
                            <label class="form-label" for="exampleInput">Người đăng</label>
                            <input type="text" class="form-control" id="exampleInput" placeholder="Title" disabled :value="formData.user.name">
                        </fieldset>
                    </div>

                    <div class="col-sm-12">
                        <fieldset class="form-group">
                            <label class="form-label" for="exampleInputPassword1">Cảm nhận</label>
                            <textarea name="content" id="content" rows="8" disabled v-model="formData.content" class="form-control"></textarea>
                        </fieldset>
                    </div>

                    <div class="col-sm-12">
                        <fieldset class="form-group">
                            <label class="form-label" for="exampleInput">Đã duyệt</label>
                            <label class="label" :class="{'label-success': formData.verify_status, 'label-default': !formData.verify_status}">{{formData.verify_status ? 'Đã duyệt' : 'Chưa duyệt'}}</label>
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
  product: {},
  user: {}
};

import { mapGetters, mapActions } from "vuex";
import Axios from "axios";

export default {
  name: "DetailReview",
  data() {
    return {
      formData: JSON.parse(JSON.stringify(formData)),
      apiUrl: `${window.settings.services.adminUrl}/review`
      //   listCategory: [],
      //   ajaxCategory: {
      //     url: `${window.settings.services.adminUrl}/category/ajax?type=review`,
      //     dataType: "json",
      //     xhrFields: { withCredentials: true },
      //     cache: true
      //   },
      //   ajaxAward: {
      //     url: `${window.settings.services.adminUrl}/award/ajax`,
      //     dataType: "json",
      //     xhrFields: { withCredentials: true },
      //     cache: true
      //   }
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
    ...mapGetters(["itemSelected", "onResetParams"])
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
    },
    approved(status) {
      if (!confirm("Bạn chắc chứ?")) return;
      Axios.post(
        `${window.settings.services.apiUrl}/review/approved/${this.formData._id}`,
        {
          approved: status
        }
      ).then(resp => {
            let id = this.$route.params.id;
            if (id !== undefined) this.getItemById({ id });
      });
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