<template>
  <div>
    <audio controls v-if="sourceExt == 'mp3'" style="width:100%">
      <source :src="source + '?v=' + v" type="audio/mpeg" />
    </audio>
    <video controls v-else-if="sourceExt == 'mp4'" :style="'width:100%;max-width:' + width + 'px'">
      <source :src="source + '?v=' + v" :type="'video/mp4'" />
    </video>
    <img v-else-if="['png', 'jpg', 'jpeg', 'gif'].includes(sourceExt)" :src="source" :style="'width:100%;max-width:' + width + 'px'">
    <a v-else :href="source + '?v=' + v" target="_blank">{{ source }}</a>
  </div>
</template>

<script>
export default {
  name: "filePreviewer",
  props: {
    width: {
      type: String,
      default: "400"
    },
    source: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      v: Date.now()
    };
  },
  computed: {
    sourceExt() {
      if (!this.source) return;
      return this.source.split(".").pop().toLowerCase();
    }
  }
};
</script>

<style>
</style>
