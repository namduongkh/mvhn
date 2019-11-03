<template>
  <div class="form-inline">
    <label class="form-label semibold" for="field.name">Name</label>
    <input
      v-model="field.name"
      data-vv-name="field.name"
      type="text"
      class="form-control"
      id="field.name"
      placeholder="Name"
    />
    <label class="form-label semibold" for="field.name">Key</label>
    <input
      v-model="field.key"
      data-vv-name="field.key"
      type="text"
      class="form-control"
      id="field.key"
      placeholder="Key"
    />
    <label class="form-label semibold" for="field.type">Type</label>
    <select v-model="field.type" name="field.type" id="field.type" class="form-control">
      <option v-for="(type, index) in acceptTypes" :key="index" :value="type[0]">{{ type[1] }}</option>
    </select>
    <label v-if="field.type == 'select'" class="form-label semibold" for="field.options">Options</label>
    <input
      v-if="field.type == 'select'"
      v-model="field.options"
      data-vv-name="field.options"
      type="text"
      class="form-control"
      id="field.options"
      placeholder="1, 'ABC' | 2, 'XYZ' | ..."
    />
    <button class="btn btn-sm btn-primary" type="button" @click="addedField(field)">
      <i class="fa fa-plus"></i> Add
    </button>
  </div>
</template>

<script>
import { camelCase } from "lodash";

export default {
  name: "FieldConfigEditor",
  props: {
    exceptTypes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      field: {},
      types: [
        ["text", "Text"],
        ["select", "Select"],
        ["editor", "Editor"],
        ["image", "Image"],
        ["boolean", "Checkbox"],
        ["date", "Date"],
        ["table", "Table"]
      ]
    };
  },
  computed: {
    acceptTypes() {
      return this.types.filter(type => !this.exceptTypes.includes(type[0]));
    }
  },
  methods: {
    addedField(field) {
      if (!field.name || !field.key || !field.type) {
        return alert("Please provide missed data!");
      }
      this.$emit("added", field);
      this.field = {};
    }
  },
  watch: {
    "field.name"(val) {
      this.field.key = camelCase(val);
    }
  }
};
</script>

<style>
</style>