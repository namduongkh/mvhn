<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Campaigns"
        listRouter="/campaigns"
        routeDetail="/campaign"
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
              <label class="form-label semibold" for="name">Tên Campaign</label>
              <input
                v-model="formData.name"
                v-validate="'required'"
                data-vv-name="Tên campaign"
                type="text"
                class="form-control"
                id="name"
                placeholder="Tên campaign"
              >
              <small
                v-show="errors.has('Tên campaign')"
                class="text-danger"
              >{{ errors.first('Tên campaign') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="start_date">Ngày bắt đầu</label>
              <input
                v-if="formData._id && disabledStartDate(formData.start_date)"
                type="text"
                :value="formData.start_date | formatDate('DD/MM/YYYY')"
                class="form-control"
                disabled
              >
              <datepicker
                v-else
                v-model="formData.start_date"
                v-validate="'required'"
                data-vv-name="Ngày bắt đầu"
                language="vi"
                name="start_date"
                id="start_date"
                placeholder="Pick a date"
                format="dd/MM/yyyy"
                input-class="form-control"
              />
              <small
                v-show="errors.has('Ngày bắt đầu')"
                class="text-danger"
              >{{ errors.first('Ngày bắt đầu') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="end_date">Ngày kết thúc</label>
              <input
                v-if="formData._id && disabledEndDate(formData.end_date)"
                type="text"
                :value="formData.end_date | formatDate('DD/MM/YYYY')"
                class="form-control"
                disabled
              >
              <datepicker
                v-else
                v-model="formData.end_date"
                v-validate="'required'"
                data-vv-name="Ngày kết thúc"
                language="vi"
                name="end_date"
                id="end_date"
                placeholder="Pick a date"
                format="dd/MM/yyyy"
                input-class="form-control"
              />
              <small
                v-show="errors.has('Ngày kết thúc')"
                class="text-danger"
              >{{ errors.first('Ngày kết thúc') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="review_point">Điểm viết cảm nhận</label>
              <input
                v-model="formData.review_point"
                v-validate="'numeric'"
                data-vv-name="Điểm cảm nhận"
                type="number"
                class="form-control"
                id="review_point"
                placeholder="Điểm cảm nhận"
                min="0"
              >
              <i>* Để trống nếu muốn giữ số điểm mặc định</i>
              <small
                v-show="errors.has('Điểm cảm nhận')"
                class="text-danger"
              >{{ errors.first('Điểm cảm nhận') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="stamp_point">Điểm đổi tem sản phẩm</label>
              <input
                v-model="formData.stamp_point"
                v-validate="'numeric'"
                data-vv-name="Điểm đổi tem sản phẩm"
                type="number"
                class="form-control"
                id="stamp_point"
                min="0"
                placeholder="Điểm đổi tem sản phẩm"
              >
              <i>* Để trống nếu muốn giữ số điểm mặc định</i>
              <small
                v-show="errors.has('Điểm đổi tem sản phẩm')"
                class="text-danger"
              >{{ errors.first('Điểm đổi tem sản phẩm') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="is_refered_point">Điểm cho người mời</label>
              <input
                v-model="formData.is_refered_point"
                v-validate="'numeric'"
                data-vv-name="Điểm cho người mời"
                type="number"
                class="form-control"
                id="is_refered_point"
                min="0"
                placeholder="Điểm cho người mời"
              >
              <i>* Để trống nếu muốn giữ số điểm mặc định</i>
              <small
                v-show="errors.has('Điểm cho người mời')"
                class="text-danger"
              >{{ errors.first('Điểm cho người mời') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="refer_point">Điểm cho người được mời</label>
              <input
                v-model="formData.refer_point"
                v-validate="'numeric'"
                data-vv-name="Điểm cho người được mời"
                type="number"
                class="form-control"
                id="refer_point"
                min="0"
                placeholder="Điểm cho người được mời"
              >
              <i>* Để trống nếu muốn giữ số điểm mặc định</i>
              <small
                v-show="errors.has('Điểm cho người được mời')"
                class="text-danger"
              >{{ errors.first('Điểm cho người được mời') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="letter_point">Điểm duyệt thư</label>
              <input
                v-model="formData.letter_point"
                v-validate="'numeric'"
                data-vv-name="Điểm duyệt thư"
                type="number"
                class="form-control"
                id="letter_point"
                min="0"
                placeholder="Điểm duyệt thư"
              >
              <i>* Để trống nếu muốn giữ số điểm mặc định</i>
              <small
                v-show="errors.has('Điểm duyệt thư')"
                class="text-danger"
              >{{ errors.first('Điểm duyệt thư') }}</small>
            </fieldset>
          </div>
        </div>
        <!--.row-->
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
      </form>
      <!--.box-typical-->
    </div>
    <!--.container-fluid-->
  </div>
  <!--.page-content-->
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

let formData = {
  name: null,
  start_date: null,
  end_date: null,
  review_point: null,
  stamp_point: null,
  refer_point: null,
  letter_point: null,

  status: 1
};

export default {
  name: "DetailCampaign",
  data() {
    return {
      formData: JSON.parse(JSON.stringify(formData)),
      apiUrl: `${window.settings.services.adminUrl}/campaign`
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
    disabledStartDate(date) {
      return moment(date).startOf("days") <= moment().startOf("days");
    },
    disabledEndDate(date) {
      return moment(date).startOf("days") < moment().startOf("days");
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
