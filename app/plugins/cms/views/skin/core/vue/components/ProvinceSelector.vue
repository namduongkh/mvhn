<template>
  <div style="display:inline">
    <span v-if="showMode">{{ province }}</span>
    <select2
      v-else
      id="provinceId"
      name="provinceId"
      v-model="provinceId"
      placeholder="Select one..."
      :options="options"
    />
  </div>
</template>

<script>
import { Provinces } from "@general/constants";

export default {
  name: "ProvinceSelector",
  props: {
    value: {},
    showMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      provinceId: null,
      options: Provinces
    };
  },
  computed: {
    province() {
      if (!this.provinceId) return;
      return this.options.find(option => option.id + "" == this.provinceId + "")
        .text;
    }
  },
  mounted() {
    let valueWatcher = this.$watch(
      () => this.value,
      value => {
        if (value) {
          this.provinceId = Number(value);
          valueWatcher();
        }
      }
    );
  },
  watch: {
    provinceId(val) {
      this.$emit("input", val);
      this.$forceUpdate();
    }
  }
};
</script>

<style>
</style>
