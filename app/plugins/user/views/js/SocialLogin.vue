<template>
  <div class="text-center" v-if="enable">
    <div class="seperator">
      <div class="seperator__text">Hoặc</div>
    </div>
    <a
      class="facebook-login"
      href="javascript:void(0)"
      @click="goLogin('facebook')"
      title="Đăng nhập bằng Facebook"
    >
      <i class="fab fa-facebook fa-2x"></i>
    </a>
    <a
      class="google-login"
      href="javascript:void(0)"
      @click="goLogin('google')"
      title="Đăng nhập bằng Google"
    >
      <i class="fab fa-google-plus-square fa-2x"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: "SocialLogin",
  data() {
    return {
      enable: window.enableSocialLogin
    };
  },
  methods: {
    goLogin(type) {
      this.$cookie.set("social_login_callback_url", window.location.href);
      window.location.href = `/users/${type}-login`;
    }
  }
};
</script>

<style>
.facebook-login,
.facebook-login:hover,
.facebook-login:focus,
.facebook-login:active {
  color: #4267b2;
}
.google-login,
.google-login:hover,
.google-login:focus,
.google-login:active {
  color: #ea4335;
}
</style>
