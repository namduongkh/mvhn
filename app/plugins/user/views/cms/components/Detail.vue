<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="User"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      />

      <form class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">
          Fill data below and click actions above
        </h5>

        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="name">Name</label>
              <input
                v-model="formData.name"
                v-validate="'required'"
                data-vv-name="name"
                type="text"
                class="form-control"
                id="name"
                placeholder="Enter name"
              />
              <small v-show="errors.has('name')" class="text-danger">{{
                errors.first("name")
              }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="username">Username</label>
              <input
                autocomplete="off"
                v-model="formData.username"
                data-vv-name="username"
                type="text"
                class="form-control"
                id="username"
                placeholder="Enter username"
              />
              <small v-show="errors.has('username')" class="text-danger">{{
                errors.first("username")
              }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="email">Email</label>
              <input
                autocomplete="off"
                v-model="formData.email"
                v-validate="'required'"
                data-vv-name="email"
                type="text"
                class="form-control"
                id="email"
                placeholder="Enter email"
              />
              <small v-show="errors.has('email')" class="text-danger">{{
                errors.first("email")
              }}</small>
            </fieldset>
          </div>
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="password">Password</label>
              <input
                autocomplete="new-password"
                v-model="formData.password"
                data-vv-name="password"
                type="password"
                class="form-control"
                id="password"
                placeholder="Enter password"
              />
              <small v-show="errors.has('password')" class="text-danger">{{
                errors.first("password")
              }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="cfpassword"
                >Confirm Password</label
              >
              <input
                autocomplete="off"
                v-model="formData.cfpassword"
                data-vv-name="cfpassword"
                type="password"
                class="form-control"
                id="cfpassword"
                placeholder="Enter cfpassword"
              />
              <small v-show="errors.has('cfpassword')" class="text-danger">{{
                errors.first("cfpassword")
              }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="phone">Phone</label>
              <input
                v-model="formData.phone"
                data-vv-name="phone"
                type="text"
                class="form-control"
                id="phone"
                placeholder="Enter phone"
              />
              <small v-show="errors.has('phone')" class="text-danger">{{
                errors.first("phone")
              }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="roles">Roles</label>
              <select2
                id="roles"
                v-validate="'required'"
                data-vv-name="roles"
                name="roles"
                v-model="formData.roles"
                placeholder="Select one..."
                :multiple="true"
                :ajax="ajaxRole"
              />
              <small v-show="errors.has('roles')" class="text-danger">{{
                errors.first("roles")
              }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="avatar">Avatar</label>
              <imageUploader
                name="avatar"
                classButtonUpload="btn-secondary"
                id="avatar"
                dir-upload="users"
                data-vv-name="avatar"
                v-model="formData.avatar"
              />
              <small v-show="errors.has('avatar')" class="text-danger">{{
                errors.first("avatar")
              }}</small>
            </fieldset>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="status">Status</label>
              <select
                v-model="formData.status"
                name="status"
                id="status"
                class="form-control"
              >
                <option :value="1">Publish</option>
                <option :value="0">Unpublish</option>
                <option :value="2">Trashed</option>
              </select>
            </fieldset>
          </div>
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="status">
                Access token
                <a href="javascript:void(0)" @click="renewAccessToken()"
                  >(Re-new access token)</a
                >
              </label>
              <input
                v-model="formData.accessToken"
                type="text"
                class="form-control"
                :disabled="true"
              />
            </fieldset>
          </div>
        </div>

        <PointLogs
          v-if="formData._id"
          :user="formData._id"
          :point="formData.point"
        />
      </form>
      <!--.box-typical-->
    </div>
    <!--.container-fluid-->
  </div>
  <!--.page-content-->
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import { omit } from "lodash";
import PointLogs from "./PointLogs";

export default {
  name: "DetailUser",
  data() {
    return {
      formData: {},
      apiUrl: `${CMS_URL}/users`,
      froalaConfig: {
        imageUploadURL: window.settings.services.webUrl + "/api/upload/image",
        imageUploadMethod: "POST",
        imageUploadParams: {
          type: "wysiwyg/post",
        },
      },
      ajaxRole: {
        url: `${CMS_URL}/user_groups/select2`,
        idField: "slug",
        textField: "name",
      },
    };
  },
  computed: {
    ...mapGetters(["itemSelected", "authUser"]),
  },
  watch: {
    itemSelected(data) {
      if (data) {
        this.formData = JSON.parse(JSON.stringify(Object.assign({}, data)));
      }
    },
    "formData.name"(val) {
      if (this.$route.name == "EditUser") return;
      this.formData.username = this.$options.filters["text2Slug"](val);
    },
    "formData.attribute"(attribute) {
      // Do something
    },
  },
  methods: {
    ...mapActions([
      "initService",
      "saveItem",
      "getItemById",
      "newItem",
      "openConfirm",
    ]),
    save(options) {
      let self = this;
      this.$validator.validateAll().then((res) => {
        if (res) {
          self.saveItem({
            formData: omit(self.formData, ["point", "activeToken"]),
            options,
          });
        } else {
          this.$notify("Please check your data", { type: "warning" });
        }
      });
    },
    resetForm() {
      this.errors.clear();
      if (!this.formData._id) {
        this.newItem();
      } else {
        this.getItemById({ id: this.formData._id });
      }
    },
    renewAccessToken() {
      axios
        .get(`${WEB_URL}/api/user/${this.formData._id}/renew-access-token`, {
          withCredentials: true,
        })
        .then(({ data }) => {
          this.formData.accessToken = data.token;
          this.openConfirm({
            title: "Kết quả",
            message: JSON.stringify(data),
            showCancel: false,
          });
        });
    },
  },
  components: {
    PointLogs,
  },
  created() {
    this.initService(this.apiUrl);
    let id = this.$route.params.id;
    if (id !== undefined) this.getItemById({ id });
    else this.newItem();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>
