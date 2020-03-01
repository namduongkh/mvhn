<template>
  <div>
    <h3>Đăng nhập</h3>
    <form class="sign-box" @submit="login">
      <div class="form-group form-control-wrapper">
        <label>Email/Username</label>
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
          placeholder="Password"
          v-validate="'required|min:6'"
          data-vv-name="Mật khẩu"
        />
        <div
          class="form-tooltip-error"
          v-show="errors.has('Mật khẩu')"
        >{{ errors.first('Mật khẩu') }}</div>
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
      <button type="submit" class="btn btn-primary">
        <i class="fa fa-sign-in"></i> Đăng nhập
      </button>
    </form>
    <SocialLogin />
  </div>
</template>
<script>
import AuthService from "./auth_service";
import SocialLogin from "./SocialLogin";

export default {
  name: "LoginForm",
  props: {
    url: {
      type: String,
      default: null
    }
  },
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
    login(evt) {
      evt.preventDefault();

      this.$validator.validateAll().then(result => {
        // eslint-disable-next-line
        if (result) {
          this.service
            .login(this.formData)
            .then(resp => {
              this.authResult = {
                success: true,
                message: "Đăng nhập thành công"
              };
              if (this.url) {
                window.location.href = this.url;
              } else {
                window.location.reload();
              }
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
