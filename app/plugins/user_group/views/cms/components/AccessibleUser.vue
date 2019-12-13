<template>
  <div>
    <input type="checkbox" v-model="formData.allUser" />
    <span>All User</span>
    <select2
      v-if="!formData.allUser"
      id="users"
      name="users"
      v-model="formData.userIds"
      :ajax="ajaxUsers"
      placeholder="Chọn..."
      :tags="true"
      :multiple="true"
    />
  </div>
</template>

<script>
export default {
  name: "AccessibleUser",
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      formData: {
        userIds: [window.user.uid],
        allUser: false
      },
      ajaxUsers: {
        url: `${window.settings.services.cmsUrl}/users/select2`,
        autoload: true
      }
    };
  },
  created() {},
  watch: {
    formData: {
      deep: true,
      handler(val) {
        if (!val.userIds.includes(window.user.uid))
          val.userIds.push(window.user.uid);

        if (val.allUser) {
          this.$emit("input", {
            user: { $ne: undefined }
          });
        } else {
          this.$emit("input", {
            user: { $in: val.userIds }
          });
        }
      }
    }
  }
};
</script>

<style>
</style>
