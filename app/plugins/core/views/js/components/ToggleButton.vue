<template>
  <div class="checkbox switcher">
    <label :for="elementId">
      <input
        type="checkbox"
        v-model="model"
        :id="elementId"
        @change="onChange()"
      />
      <span><small></small></span>
      <small>{{ text }}</small>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Boolean },
    text: { type: String },
  },
  data() {
    return {
      elementId: "element" + Date.now(),
      model: false,
    };
  },
  methods: {
    onChange() {
      this.$emit("input", this.model);
    },
  },
  watch: {
    value() {
      this.model = this.value;
    },
  },
};
</script>

<style>
</style>
