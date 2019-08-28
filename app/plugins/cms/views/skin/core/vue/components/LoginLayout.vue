<template>
  <div id="login-layout" class="page-center">
    <link rel="stylesheet" href="/cms/assets/startui/css/separate/login.min.css" />
    <div class="page-center-in">
      <div class="container-fluid">
        <form class="sign-box" @submit="login">
          <div class="sign-avatar">
            <img src="/cms/assets/images/avatar-sign.png" alt />
          </div>
          <header class="sign-title">{{ formType }}</header>
          <div class="form-group form-control-wrapper">
            <input
              v-model="formData.email"
              type="text"
              id="email"
              name="email"
              class="form-control"
              placeholder="Email/Username"
              v-validate="'required'"
              data-vv-name="Email/Username"
            />
            <div class="form-tooltip-error" v-show="errors.has('Email/Username')">{{ errors.first('Email/Username') }}</div>
          </div>
          <div v-if="formType  === 'Sign in'" class="form-group form-control-wrapper">
            <input
              v-model="formData.password"
              type="password"
              id="password"
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
          <div class="form-group">
            <div class="checkbox float-left"></div>
            <div class="float-right reset">
              <a
                @click="formType = formType === 'Sign in' ?  'Reset password' : 'Sign in' "
              >{{ formType === 'Sign in' ? 'Reset password' : 'Go back sign in' }}</a>
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-rounded"
          >{{ formType === 'Sign in' ? 'Login' : 'Send email reset'}}</button>
          <p
            class="sign-note"
            v-if="authResult"
            :class="{'text-success': authResult.success, 'text-danger': !authResult.success }"
          >{{ authResult.message }}</p>
          <!--<button type="button" class="close">
                        <span aria-hidden="true">&times;</span>
          </button>-->
        </form>
      </div>
    </div>
  </div>
  <!--.page-center-->
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "LoginLayout",
  props: {
    path_reload: {
      type: String,
      default: null
    }
  },
  data: () => {
    return {
      formData: {
        email: "",
        password: ""
      },
      loading: false,
      formType: "Sign in" //'Reset password'
    };
  },
  computed: {
    ...mapGetters({
      authResult: "authResult",
      authUser: "authUser"
    })
  },
  watch: {
    authResult(newV) {
      if (newV && newV.success) {
        if (this.path_reload) {
          let self = this;
          setTimeout(function() {
            window.location.href = self.path_reload;
          }, 100);
        } else {
          setTimeout(function() {
            window.location.reload();
          }, 100);
        }
      }
    }
  },
  methods: {
    login(evt) {
      evt.preventDefault();
      let self = this;

      this.$validator.validateAll().then(result => {
        // eslint-disable-next-line
        if (result) {
          self.$store.dispatch("login", this.formData);
        } else {
          self.$emit("validate");
        }
      });
    }
  }
};
</script>
<style lang="scss">
#login-layout {
  height: 100vh;
}
</style>