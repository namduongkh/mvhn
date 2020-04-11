<template>
  <div>
    <form class="sign-box" @submit="register">
      <div class="form-group form-control-wrapper">
        <label>Tên của bạn</label>
        <input
          v-model="formData.name"
          type="text"
          id="name"
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
        />
        <div class="form-tooltip-error" v-show="errors.has('Email')">{{ errors.first('Email') }}</div>
      </div>
      <div class="form-group form-control-wrapper">
        <label>Mật khẩu</label>
        <input
          v-model="formData.password"
          type="password"
          name="password"
          class="form-control"
          placeholder="Mật khẩu"
          v-validate="'required|min:6'"
          data-vv-name="Mật khẩu"
          id="password"
          ref="mật khẩu"
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
      <!-- <div class="form-group">
                    <div class="checkbox float-left"></div>
                    <div class="float-right reset">
                      <a
                        href="javascript:void(0)"
                        @click="formType = formType === 'sign_in' ?  'reset_password' : 'sign_in' "
                      >{{ formType === 'sign_in' ? 'Quên mật khẩu?' : 'Quay lại đăng nhập' }}</a>
                    </div>
      </div>-->
      <p
        class="sign-note"
        v-if="authResult"
        :class="{'text-success': authResult.success, 'text-danger': !authResult.success }"
      >{{ authResult.message }}</p>
      <button type="submit" class="btn btn-success">
        <i class="fa fa-send"></i> Đăng ký
      </button>
    </form>
    <SocialLogin />
  </div>
</template>
<script>
import AuthService from "./auth_service";
import SocialLogin from "./SocialLogin";

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
    SocialLogin
  },
  methods: {
    register(evt) {
      evt.preventDefault();

      this.$validator.validateAll().then(result => {
        // eslint-disable-next-line
        if (result) {
          this.service
            .register(this.formData)
            .then(resp => {
              this.authResult = {
                success: true,
                message: "Đăng ký thành công"
              };
              this.service
                .login({
                  email: this.formData.email,
                  password: this.formData.password
                })
                .then(resp => {
                  window.location.reload();
                });
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
  }
};
</script>
