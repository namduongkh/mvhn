<template>
  <div class="form-group">
    <label :for="config.name" class="font-weight-bold">{{
      config.label
    }}</label>
    <input
      v-if="config.type == 'text'"
      type="text"
      class="form-control"
      v-model="selected"
      :placeholder="config.placeholder"
      :name="config.name"
      @keyup="emitChange"
    />
    <select
      v-if="config.type == 'select'"
      type="text"
      class="form-control"
      v-model="selected"
      :placeholder="config.placeholder"
      :name="config.name"
      @change="emitChange"
    >
      <option value=""></option>
      <option
        v-for="(o, index) in config.options"
        :key="o.value + '_' + index"
        :value="o.value"
      >
        {{ o.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    config: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      selected: null,
    };
  },
  methods: {
    emitChange() {
      this.$emit("input", this.selected);
      this.$emit("change");
    },
  },
  watch: {
    value() {
      this.selected = this.value;
    },
  },
};
</script>

<style>
</style>
