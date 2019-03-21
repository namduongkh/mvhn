<template>
    <div class="page-content">
        <div class="container-fluid">
            <DetailActions
                    title="Redeem History"
                    listRouter="/redeemhistories"
                    routeDetail="/redeemhistory"
                    :formData="formData"
                    :disable="errors.any()"
                    @action="save"
                    @reset="resetForm"
            />

            <form class="box-typical box-typical-padding">
                <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>

                <div class="row" v-if="formData.redeem_status == 'pending'">
                  <div class="col-sm-12">
                    <button type="button" @click="approve(formData._id, authUser._id)" class="btn btn-success">Approve</button>
                    <button type="button" @click="reject(formData._id, authUser._id)" class="btn btn-danger">Reject</button>
                  </div>
                  <hr>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label semibold" for="award">Award</label>
                            <select2 id="award" v-validate="'required'" data-vv-name="Award"  name="award"
                                     v-model="formData.award" :ajax="ajaxAward" placeholder="Chọn..."/>
                            <small v-show="errors.has('Award')" class="text-danger">{{ errors.first('Award') }}</small>
                        </fieldset>
                    </div>

                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label semibold" for="user">User</label>
                            <select2 id="user" v-validate="'required'" data-vv-name="User"  name="user"
                                     v-model="formData.user" :ajax="ajaxUser" placeholder="Chọn..."/>
                            <small v-show="errors.has('User')" class="text-danger">{{ errors.first('User') }}</small>
                        </fieldset>
                    </div>
                </div><!--.row-->

                <div class="row">
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="redeem_status">Redeem Status</label>
                            <select v-model="formData.redeem_status" name="redeem_status" id="redeem_status" class="form-control">
                                <option :value="'pending'">Pending</option>
                                <option :value="'approved'">Approved</option>
                                <option :value="'rejected'">Rejected</option>
                            </select>
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
                    <!-- <div class="col-sm-6">
                        <label class="form-label" for="status">{{testSelect2}}</label>
                        <select2 v-model="testSelect2" :options="testSelect2Opt"/>
                    </div> -->
                </div>

                <div class="row" v-if="formData.logs && formData.logs.length">
                  <div class="col-sm-12">
                    <h5 class="m-t-lg with-border">Logs</h5>
                    <table class="table table-striped table-bordered">
                      <tr>
                        <th>Redeem status</th>
                        <th>Admin</th>
                        <th>Date</th>
                      </tr>
                      <tr v-for="log in formData.logs" :key="log._id">
                        <td>{{ log.redeem_status }}</td>
                        <td>{{ log.admin ? log.admin.name : '' }}</td>
                        <td>{{ log.date | formatDate }}</td>
                      </tr>
                    </table>
                  </div>
                </div>
            </form><!--.box-typical-->


        </div><!--.container-fluid-->
    </div><!--.page-content-->
</template>
<script>
// TODO: Add select 2 category
let formData = {
  user: null,
  award: null,
  redeem_status: "pending"
};

import { mapGetters, mapActions } from "vuex";
import Axios from "axios";

export default {
  name: "DetailRedeemHistory",
  data() {
    return {
      formData: JSON.parse(JSON.stringify(formData)),
      apiUrl: `${window.settings.services.adminUrl}/redeemhistory`,
      ajaxAward: {
        url: `${window.settings.services.adminUrl}/award/ajax`,
        dataType: "json",
        xhrFields: { withCredentials: true },
        cache: true
      },
      ajaxUser: {
        url: `${window.settings.services.adminUrl}/user/ajax`,
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
    ...mapGetters(["itemSelected", "authUser"])
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
    approve(redeemId, adminId) {
      let that = this;
      if (confirm("Are you sure?")) {
        Axios.post(`${window.settings.services.apiUrl}/redeem/approve`, {
          redeemId,
          adminId
        }).then(resp => {
          // console.log("Approved:", resp);
          that.loadDetail();
          that.$notify("Approve success!", {
            type: "success",
            placement: {
              from: "bottom"
            }
          });
        });
      }
    },
    reject(redeemId, adminId) {
      let that = this;
      if (confirm("Are you sure?")) {
        Axios.post(`${window.settings.services.apiUrl}/redeem/reject`, {
          redeemId,
          adminId
        }).then(resp => {
          // console.log("Rejected:", resp);
          that.loadDetail();
          that.$notify("Reject success!", {
            type: "success",
            placement: {
              from: "bottom"
            }
          });
        });
      }
    },
    loadDetail() {
      let id = this.$route.params.id;
      if (id !== undefined) this.getItemById({ id });
    }
  },
  components: {},
  created() {
    this.initService(this.apiUrl);
    this.loadDetail();
  },
  mounted() {}
};
</script>