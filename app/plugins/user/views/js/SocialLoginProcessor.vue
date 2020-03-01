<template>
  <div>Đang xử lý...</div>
</template>

<script>
export default {
  name: "SocialLoginProcessor",
  props: {
    token: {
      type: String
    }
  },
  created() {
    if (window.settings.browserCookieSaving)
      this.$cookie.set(window.cookieKey, this.token, { expires: 7 });
    window.location.href = this.$cookie.get("social_login_callback_url") || "/";
  }
};
</script>

<style>
</style>
