<template>
  <div>
    <input
      v-if="field.type == 'text'"
      :id="field.key"
      :name="field.key"
      type="text"
      class="form-control"
      v-model="model"
    >
    <froala
      v-if="field.type == 'editor'"
      :id="field.key"
      :name="field.key"
      :tag="'textarea'"
      v-model="model"
    />
    <imageUploader
      v-if="field.type == 'image'"
      :id="field.key"
      :name="field.key"
      classButtonUpload="btn-secondary"
      dir-upload="images"
      v-model="model"
    />
    <input
      v-if="field.type == 'boolean'"
      :id="field.key"
      :name="field.key"
      v-model="model"
      type="checkbox"
    >
    <datepicker
      v-if="field.type == 'date'"
      :id="field.key"
      :name="field.key"
      v-model="model"
      placeholder="Pick a date"
      format="dd/MM/yyyy"
      input-class="form-control"
    />
    <select
      v-if="field.type == 'select'"
      :id="field.key"
      :name="field.key"
      v-model="model"
      class="form-control"
    >
      <option
        v-for="(option, index) in getOptions(field.options)"
        :key="index"
        :value="option[0]"
      >{{ option[1] }}</option>
    </select>
  </div>
</template>
<script>
export default {
  name: "setting-field",
  props: {
    field: {
      type: Object
    },
    value: {}
  },
  data() {
    return {
      model: this.value
    };
  },
  methods: {
    getOptions(options) {
      return options.split("|").map(elem => {
        return elem.split(",");
      });
    }
  },
  watch: {
    model(val) {
      // console.table(val)
      this.$emit("input", val);
    }
  }
};
</script>
