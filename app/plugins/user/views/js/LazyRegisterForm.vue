<template>
  <div>
    <form class="sign-box" @submit="register">
      <div class="form-group form-control-wrapper">
        <h3 v-if="formData._id">Chào mừng {{ formData.name }}!</h3>
        <div v-else>
          <h3>
            Người lạ ơi!
            <br />Xin hãy cho tôi biết tên.
          </h3>
          <input
            v-model="formData.name"
            type="text"
            id="name"
            name="name"
            class="form-control"
            placeholder="Tên của bạn"
            v-validate="'required'"
            data-vv-name="Tên của bạn"
          />
          <div
            class="form-tooltip-error"
            v-show="errors.has('Tên của bạn')"
          >{{ errors.first('Tên của bạn') }}</div>
          <div>
            <a
              href="javascript:void(0)"
              data-toggle="modal"
              data-target="#auth-modal"
              data-dismiss="modal"
            >
              <small>Đã có tài khoản</small>
            </a>
          </div>
        </div>
      </div>
      <p
        class="sign-note"
        v-if="authResult"
        :class="{'text-success': authResult.success, 'text-danger': !authResult.success }"
        v-html="authResult.message"
      ></p>
      <div v-if="formData._id" class="account-info">
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
            :disabled="everythingOk"
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
            :disabled="everythingOk"
          />
          <div
            class="form-tooltip-error"
            v-show="errors.has('Mật khẩu')"
          >{{ errors.first('Mật khẩu') }}</div>
        </div>
      </div>
      <button v-if="!everythingOk" type="submit" class="btn btn-success">
        <i class="fa fa-check"></i> Xong
      </button>
      <button v-else type="button" class="btn btn-secondary" data-dismiss="modal">
        <i class="fa fa-arrow-right"></i> Tiếp tục
      </button>
    </form>
    <SocialLogin />
  </div>
</template>
<script>
import AuthService from "./auth_service";
import SocialLogin from "./SocialLogin";

export default {
  name: "LazyRegisterForm",
  data() {
    return {
      formData: {},
      authResult: null,
      service: new AuthService(),
      everythingOk: false
    };
  },
  components: {
    SocialLogin
  },
  methods: {
    register(evt) {
      evt.preventDefault();

      this.$validator.validateAll().then(result => {
        if (result) {
          if (this.formData._id) {
            let updateData = Object.assign(
              {},
              {
                username: this.formData.email,
                email: this.formData.email,
                password: this.formData.password,
                cfpassword: this.formData.password,
                lazyMode: false
              }
            );

            this.service
              .update(updateData)
              .then(({ data }) => {
                this.$store.dispatch("user/updateInfo", data.user);
                this.authResult = {
                  success: true,
                  message: "Tuyệt! Mọi thứ đều ổn."
                };
                this.everythingOk = true;
              })
              .catch(err => {
                this.authResult = {
                  success: false,
                  message: err.response.data.message
                };
              });
          } else {
            let username = "user" + Date.now();
            this.formData = Object.assign(this.formData, {
              username,
              email: username + "@lazymode.com",
              password: "Qwerty123!",
              cfpassword: "Qwerty123!",
              lazyMode: true
            });

            this.service
              .register(this.formData)
              .then(({ data }) => {
                let loginInfo = {
                  email: this.formData.email,
                  password: this.formData.password
                };
                this.authResult = {
                  success: true,
                  message: `Chỉ 1 bước nữa hoặc <a href="javascript:void(0)" data-dismiss="modal">tiếp tục sử dụng</a><br/><b>Tài khoản đăng nhập:</b>`
                };
                this.formData = data;
                this.service.login(loginInfo).then(({ data }) => {
                  this.$store.dispatch("user/updateInfo", this.formData);
                  delete this.formData.email;
                  delete this.formData.password;

                  $(".account-info").slideDown();
                });
              })
              .catch(err => {
                this.authResult = {
                  success: false,
                  message: err.response.data.message
                };
              });
          }
        } else {
          this.$emit("validate");
        }
      });
    }
  }
};
</script>
<style>
.account-info {
  display: none;
}
</style>
