<template>
  <a href="/payments"
    ><span class="text_2em text-primary">{{ user.point | currency }}</span></a
  >
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "UserPoint",
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
};
</script>

<style>
</style>
