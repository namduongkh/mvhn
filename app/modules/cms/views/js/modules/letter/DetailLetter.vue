<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Thư của mẹ"
        listRouter="/letters"
        routeDetail="/letter"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      />
      <button :disabled="[1,3].includes(formData.publish_status)" type="button" class="btn btn-success btn-inline" @click="approved(formData, true)"><span class="fa fa-check"></span> Duyệt</button>
      <button :disabled="[1,3].includes(formData.publish_status)" type="button" class="btn btn-inline" @click="rejected(formData, true)"><span class="fa fa-remove"></span> Từ chối</button>
      <form class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>

        <div class="row">
          
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="user">#</label>
                <input type="text" disabled v-model="formData.index" class="form-control">
            </fieldset>
          </div>
                                                            
          
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="user">Người gửi</label>
                <select2 id="user" v-validate="'required'" data-vv-name="user"  name="user"
                       v-model="formData.user" :ajax="ajax_user" placeholder="Select one..."                 />
              <small v-show="errors.has('user')" class="text-danger">{{ errors.first('user') }}</small>
            </fieldset>
          </div>
          
          
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
              <label class="form-label semibold" for="is_featured">Góc thư hay</label>
                <input v-model="formData.is_featured" data-vv-name="is_featured" type="checkbox"
                       class="form-control" id="is_featured" />
            </fieldset>
          </div>                                                  
          
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="content">Nội dung thư</label>
                <froala :config="froalaConfig" :tag="'textarea'" v-model="formData.content" id="content" name="content" data-vv-name="content" />
              <small v-show="errors.has('content')" class="text-danger">{{ errors.first('content') }}</small>
            </fieldset>
          </div>                                            
          
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="publish_status">Trang thái duyệt</label>
                <select v-validate="'required'" data-vv-name="publish_status" v-model="formData.publish_status"  name="publish_status" id="publish_status" class="form-control" v-html="publish_status_options">
                </select>
              <small v-show="errors.has('publish_status')" class="text-danger">{{ errors.first('publish_status') }}</small>
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
import LetterHelper from "./letter.helper";
import Axios from "axios";

let formData = {
  user: null,
  title: null,
  content: null,
  publish_status: null,

  status: 1
};

export default {
  name: "DetailLetter",
  data() {
    return {
      formData: JSON.parse(JSON.stringify(formData)),
      apiUrl: `${window.settings.services.adminUrl}/letter`,

      ajax_user: {
        url: `${window.settings.services.adminUrl}/user/select2`,
        dataType: "json",
        xhrFields: { withCredentials: true },
        cache: true
      },
      publish_status_options: LetterHelper.options_for_select(),
      froalaConfig: {
        imageUploadURL: window.settings.services.uploadApi,
        imageUploadMethod: "POST",
        imageUploadParams: {
          type: "wysiwyg/letter"
        }
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
    },
    approved(record, status) {
      if ([1, 3].includes(record.publish_status)) {
        return;
      }
      if (!confirm("Bạn chắc chứ?")) return;
      Axios.post(
        `${window.settings.services.apiUrl}/letter/approved/${record._id}`,
        {
          approved: status
        }
      ).then(resp => {
        record.publish_status = 1;
        this.getItemById({ id: record._id });
      });
    },
    rejected(record, status) {
      if ([1, 3].includes(record.publish_status)) {
        return;
      }
      if (!confirm("Bạn chắc chứ?")) return;
      Axios.post(
        `${window.settings.services.apiUrl}/letter/rejected/${record._id}`,
        {
          rejected: status
        }
      ).then(resp => {
        record.publish_status = 3;
        this.getItemById({ id: record._id });
      });
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
