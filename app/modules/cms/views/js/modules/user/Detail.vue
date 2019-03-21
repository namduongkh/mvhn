<template>
    <div class="page-content">
        <div class="container-fluid">
            <DetailActions
                    title="User"
                    listRouter="/users"
                    routeDetail="/user"
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
                            <label class="form-label semibold" for="exampleInput">Họ tên</label>
                            <input v-model="formData.name" v-validate="'required'" data-vv-name="Tên" type="text" class="form-control" id="exampleInput" placeholder="Full name" >
                            <small v-show="errors.has('Tên')" class="text-danger">{{ errors.first('Tên') }}</small>
                        </fieldset>
                    </div>

                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="email">Email address</label>
                            <input v-model="formData.email" v-validate="'required|email'" data-vv-name="Email"  type="email" name="email" class="form-control" id="email" placeholder="Email">
                            <small v-show="errors.has('Email')" class="text-danger">{{ errors.first('Email') }}</small>
                        </fieldset>
                    </div>

                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="refer_code">Refer code</label>
                            <input disabled="disabled" v-model="formData.refer_code" v-validate="'required'" data-vv-name="Refer code" type="text" name="refer_code" class="form-control" id="refer_code" placeholder="Refer code">
                            <small v-show="errors.has('Refer code')" class="text-danger">{{ errors.first('Refer code') }}</small>
                        </fieldset>
                    </div>

                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="refered_code">Refered code</label>
                            <input disabled="disabled" v-model="formData.refered_code" data-vv-name="Refer code" type="text" name="refered_code" class="form-control" id="refered_code" placeholder="Refered code">
                        </fieldset>
                    </div>

                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="total_points">Điểm tích lũy</label>
                            <input disabled v-model="formData.total_points" type="number" v-validate="'min:0'" name="total_points" class="form-control" id="total_points" placeholder="Total points">
                            <small v-show="errors.has('Total points')" class="text-danger">{{ errors.first('Total points') }}</small>
                        </fieldset>
                    </div>
                </div><!--.row-->

                <div class="row">
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="is_pregnant">Mẹ đang mang thai?</label>
                            <select v-model="formData.is_pregnant" name="is_pregnant" id="is_pregnant" class="form-control">
                                <option value="">-- choose</option>
                                <option :value="true">True</option>
                                <option :value="false">False</option>
                            </select>
                        </fieldset>
                    </div>
                    <div v-if="formData.is_pregnant" class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="estimate_baby_dob">Ngày dự sinh của bé</label>
                            <datepicker v-model="formData.estimate_baby_dob" name="estimate_baby_dob" id="estimate_baby_dob" data-vv-name="Baby Date of Birth" placeholder="Pick a date" format="dd/MM/yyyy" input-class="form-control" :monday-first="true"/>
                            <small v-show="errors.has('Ngày dự sinh')" class="text-danger">{{ errors.first('Ngày dự sinh') }}</small>
                        </fieldset>
                    </div>
                    <div v-else class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="baby_dob">Ngày sinh của bé</label>
                            <datepicker v-model="formData.baby_dob" name="baby_dob" id="baby_dob" data-vv-name="Baby Date of Birth" placeholder="Pick a date" format="dd/MM/yyyy" input-class="form-control" :monday-first="true"/>
                            <small v-show="errors.has('Ngày sinh của bé')" class="text-danger">{{ errors.first('Ngày sinh của bé') }}</small>
                        </fieldset>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label semibold" for="phone">Phone</label>
                            <input v-model="formData.phone" v-validate="'min:9|max:11'" data-vv-name="Điện thoại"  type="tel" name="phone" class="form-control" id="phone" placeholder="Phone">
                            <small v-show="errors.has('Điện thoại')" class="text-danger">{{ errors.first('Điện thoại') }}</small>
                        </fieldset>
                    </div>
                </div><!--.row-->

                <div class="row">
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label semibold" for="province">Tỉnh thành</label>
                            <select2 v-model="formData.province" name="province" data-vv-name="Tỉnh" :options="Provinces"/>
                            <small v-show="errors.has('Tỉnh')" class="text-danger">{{ errors.first('Tỉnh') }}</small>

                        </fieldset>
                    </div>
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="address">Địa chỉ</label>
                            <textarea v-model="formData.address" type="email" class="form-control" id="address" placeholder="Enter address"></textarea>
                        </fieldset>
                    </div>
                </div><!--.row-->


                <div class="row">
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="password">Password</label>
                            <input v-model="formData.password" v-validate="'min:6'" data-vv-name="Mật khẩu" name="password" type="password" class="form-control" id="password" placeholder="Password">
                            <small v-show="errors.has('Mật khẩu')" class="text-danger">{{ errors.first('Mật khẩu') }}</small>
                        </fieldset>
                    </div>
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="exampleInputPassword2">Confirm password</label>
                            <input v-model="formData.cfpassword" v-validate="'min:6|confirmed:password'" data-vv-name="Mật khẩu xác nhận"  type="password" class="form-control" id="exampleInputPassword2" placeholder="Type password again">
                            <small v-show="errors.has('Mật khẩu xác nhận')" class="text-danger">{{ errors.first('Mật khẩu xác nhận') }}</small>
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

                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="roles">Roles</label>
                            <select v-model="formData.roles" multiple v-validate="'required'" data-vv-name="Quyền" name="roles" id="roles" class="form-control">
                                <option value="user">User</option>
                                <option value="supporter">Nhân viên hỗ trợ</option>
                                <option value="consultant">Nhân viên tư vấn</option>
                                <option value="admin">Admin</option>
                            </select>
                            <small v-show="errors.has('Quyền')" class="text-danger">{{ errors.first('Quyền') }}</small>
                        </fieldset>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <h5 class="m-t-lg with-border">Lịch sử thu thập điểm</h5>
                        <table class="table table-bordered">
                            <tr>
                                <th>Viết cảm nhận</th>
                                <th>Đổi mã sp</th>
                                <th>Điểm cho người mời</th>
                                <th>Điểm cho người được mời</th>
                                <th>Viết thư</th>
                                <th>Tổng điểm</th>
                            </tr>
                            <tr>
                                <td>{{ detailPoints.review }}</td>
                                <td>{{ detailPoints.card }}</td>
                                <td>{{ detailPoints.isRefered }}</td>
                                <td>{{ detailPoints.refer }}</td>
                                <td>{{ detailPoints.letter }}</td>
                                <td>{{ detailPoints.total }}</td>
                            </tr>
                        </table>
                        <hr/>
                        <button type="button" data-toggle="collapse" data-target="#pointlogs" class="btn btn-default">Hiện/Ẩn</button>
                        <div id="pointlogs" class="collapse">
                            <table class="table table-bordered">
                                <tr>
                                    <th>STT</th>
                                    <th>Điểm</th>
                                    <th>Nội dung</th>
                                    <th>ID đối tượng</th>
                                    <th>Campaign</th>
                                    <th>Thời gian</th>
                                </tr>
                                <tr v-for="(log, i) in pointlogs" :key="log._id">
                                    <td>
                                        {{ i + 1 }}
                                    </td>
                                    <td>
                                        {{ log.point > 0 ? '+' + log.point : log.point }}
                                    </td>
                                    <td>
                                        {{ log.content }}
                                    </td>
                                    <td>
                                        {{ log.ref_id }}
                                    </td>
                                    <td>
                                        {{ log.campaign && log.campaign.name }}
                                    </td>
                                    <td>
                                        {{ log.createdAt | formatDate('DD/MM/YYYY HH:mm:ss') }}
                                    </td>
                                </tr>
                            </table>
                            <button type="button" v-on:click="syncPointlogToPoint(formData._id)" class="btn btn-success">Đồng bộ điểm</button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <h5 class="m-t-lg with-border">User khác đã sử dụng mã chia sẻ</h5>
                        <button type="button" data-toggle="collapse" data-target="#referlogs" class="btn btn-default">Hiện/Ẩn</button>
                        <div id="referlogs" class="collapse">
                            <table class="table table-bordered">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                </tr>
                                <tr v-for="(log) in referlogs" :key="log._id">
                                    <td>
                                        {{ log.register_user._id }}
                                    </td>
                                    <td>
                                        {{ log.register_user.name }}
                                    </td>
                                    <td>
                                        {{ log.createdAt | formatDate('DD/MM/YYYY HH:mm:ss') }}
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
let formData = {
  name: "",
  roles: ["user"],
  email: "",
  phone: "",
  address: "",
  password: "",
  cfpassword: "",
  status: 1,
  refer_code: "",
  total_points: 0,
  is_pregnant: ""
};

import { mapGetters, mapActions } from "vuex";
import { Provinces } from "@general/constants";
import Axios from "axios";

export default {
  name: "DetailUser",
  data() {
    return {
      formData: JSON.parse(JSON.stringify(formData)),
      apiUrl: `${window.settings.services.adminUrl}/user`,
      Provinces,
      ajax: {
        url: `${window.settings.services.apiUrl}/provinces`,
        dataType: "json",
        xhrFields: { withCredentials: true }
      },
      pointlogs: [],
      referlogs: [],
      detailPoints: {}
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
          this.$notify("Please check data", { type: "warning" });
        }
      });
    },
    resetForm() {
      this.formData = JSON.parse(JSON.stringify(formData));
      this.$validator.reset();
    },
    syncPointlogToPoint(id) {
        if(!confirm("Are you sure?")) return;
        Axios.put(
            `${window.settings.services.apiUrl}/user/${id}/syncPointlogToPoint`, {
                password: "123456a!"
            }
        ).then(resp => {
            alert("Done!");
        });
    }
  },
  components: {},
  created() {
    this.initService(this.apiUrl);
    let id = this.$route.params.id;
    if (id !== undefined) {
      this.getItemById({ id });
      Axios.get(
        `${window.settings.services.adminUrl}/user/pointlogs?userId=${id}`
      ).then(resp => {
        this.detailPoints = resp.data.points;
        this.pointlogs = resp.data.logs;
      });
      Axios.get(
        `${window.settings.services.adminUrl}/user/referlogs?userId=${id}`
      ).then(resp => {
        this.referlogs = resp.data;
      });
    }
  },
  mounted() {}
};
</script>