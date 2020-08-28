<template>
  <div class="image-as-avatar" :style="`background-image: url('${src || ''}');`">
    <img src="/assets/img/square-default.png" :alt="alt" class="hide-img" />
  </div>
</template>

<script>
export default {
  name: "ImageAsAvatar",
  props: {
    src: {
      type: String,
    },
    alt: {
      type: String,
    },
  },
};
</script>

<style>
</style>
