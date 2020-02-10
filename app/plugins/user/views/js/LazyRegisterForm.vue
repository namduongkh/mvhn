<template>
  <div>
    <form class="sign-box" @submit="register">
      <div class="form-group form-control-wrapper">
        <h3>Xin chào, bạn tên là?</h3>
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
      <p
        class="sign-note"
        v-if="authResult"
        :class="{'text-success': authResult.success, 'text-danger': !authResult.success }"
        v-html="authResult.message"
      ></p>
      <button type="submit" class="btn btn-primary">
        <i class="fa fa-check"></i> Xong
      </button>
    </form>
  </div>
</template>
<script>
import AuthService from "./auth_service";

export default {
  name: "LazyRegisterForm",
  data() {
    return {
      formData: {},
      authResult: null,
      service: new AuthService()
    };
  },
  methods: {
    register(evt) {
      evt.preventDefault();

      this.$validator.validateAll().then(result => {
        let username = "user" + Date.now();
        this.formData = Object.assign(this.formData, {
          username,
          email: username + "@lazymode.com",
          password: "Qwerty123!",
          cfpassword: "Qwerty123!",
          lazyMode: true
        });

        if (result) {
          this.service
            .register(this.formData)
            .then(resp => {
              this.authResult = {
                success: true,
                message: `Cảm ơn <b>${this.formData.name}</b>!`
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
