<template>
  <div>
    <h3>Thông tin cá nhân</h3>
    <form class="sign-box" @submit="update">
      <div class="form-group form-control-wrapper">
        <label>Họ tên</label>
        <input
          v-model="formData.name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Họ tên"
          v-validate="'required'"
          data-vv-name="Họ tên"
        />
        <div class="form-tooltip-error" v-show="errors.has('Họ tên')">{{ errors.first('Họ tên') }}</div>
      </div>
      <div class="form-group form-control-wrapper">
        <label>Email</label>
        <input
          v-model="formData.email"
          type="text"
          name="email"
          class="form-control"
          placeholder="Email"
          v-validate="'required'"
          data-vv-name="Email"
          :disabled="!user || !user.lazyMode"
        />
        <div class="form-tooltip-error" v-show="errors.has('Email')">{{ errors.first('Email') }}</div>
      </div>
      <div v-if="user && user.lazyMode">
        <div class="form-group form-control-wrapper">
          <label>Đặt mật khẩu</label>
          <input
            v-model="formData.password"
            type="password"
            name="password"
            id="password"
            ref="mật khẩu"
            class="form-control"
            placeholder="Mật khẩu"
            v-validate="'required|min:6'"
            data-vv-name="Mật khẩu"
          />
          <div
            class="form-tooltip-error"
            v-show="errors.has('Mật khẩu')"
          >{{ errors.first('Mật khẩu') }}</div>
        </div>
        <div class="form-group form-control-wrapper">
          <label>Xác nhận mật khẩu</label>
          <input
            v-model="formData.cfpassword"
            type="password"
            id="cfpassword"
            name="cfpassword"
            class="form-control"
            placeholder="Xác nhận mật khẩu"
            v-validate="'required|min:6|confirmed:mật khẩu'"
            data-vv-name="Xác nhận mật khẩu"
          />
          <div
            class="form-tooltip-error"
            v-show="errors.has('Xác nhận mật khẩu')"
          >{{ errors.first('Xác nhận mật khẩu') }}</div>
        </div>
      </div>
      <div class="form-group form-control-wrapper">
        <label>SĐT</label>
        <input
          v-model="formData.phone"
          type="tel"
          name="phone"
          class="form-control"
          placeholder="SĐT"
          data-vv-name="SĐT"
        />
        <div class="form-tooltip-error" v-show="errors.has('SĐT')">{{ errors.first('SĐT') }}</div>
      </div>
      <div class="form-group form-control-wrapper">
        <label>Địa chỉ</label>
        <input
          v-model="formData.address"
          type="text"
          name="address"
          class="form-control"
          placeholder="Địa chỉ"
          data-vv-name="Địa chỉ"
        />
        <div class="form-tooltip-error" v-show="errors.has('Địa chỉ')">{{ errors.first('Địa chỉ') }}</div>
      </div>
      <p
        class="sign-note"
        v-if="authResult"
        :class="{'text-success': authResult.success, 'text-danger': !authResult.success }"
        v-html="authResult.message"
      ></p>
      <div class="text-right">
        <button type="submit" class="btn btn-primary">
          <i class="fa fa-save"></i> Cập nhật
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import AuthService from "./auth_service";
import ImageUploader from "../../../upload/views/js/image-uploader";
import { mapState } from "vuex";

export default {
  name: "RegisterForm",
  data() {
    return {
      formData: {},
      authResult: null,
      service: new AuthService()
    };
  },
  components: {
    ImageUploader
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    update(evt) {
      evt.preventDefault();

      this.$validator.validateAll().then(result => {
        if (user.lazyMode) {
          this.formData = Object.assign(this.formData, {
            lazyMode: false,
            username: this.formData.email
          });
        }

        if (result) {
          this.service
            .update(this.formData)
            .then(({ data }) => {
              this.$store.dispatch("user/updateInfo", data.user);
              this.authResult = {
                success: true,
                message: "Cập nhật thông tin thành công"
              };
            })
            .catch(err => {
              this.authResult = {
                success: false,
                message: err.response.data.message
              };
            });
        } else {
          this.$emit("validate");
        }
      });
    }
  },
  created() {
    this.$store.watch(
      state => state.user.user,
      user => {
        let { _id, email, name, phone, address, avatar } = user;
        this.formData = {
          _id,
          email,
          name,
          phone,
          address,
          avatar
        };

        if (user.lazyMode) {
          this.formData.email = null;
          this.formData.username = null;
        }
      }
    );
  }
};
</script>
