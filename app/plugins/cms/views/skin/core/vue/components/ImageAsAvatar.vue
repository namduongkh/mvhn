<template>
  <div
    class="image-as-avatar"
    :class="{'circle': circle}"
    :style="`background-image: url('${src || ''}');`"
  >
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
    circle: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.image-as-avatar {
  background-color: rgba($color: #000000, $alpha: 0.2);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  .hide-img {
    width: 100%;
    opacity: 0;
  }
  .show-img {
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    transition: 0.15s ease-in-out;
    text-align: center;
  }
}
.image-as-avatar.circle {
  border-radius: 100%;
}
</style>
