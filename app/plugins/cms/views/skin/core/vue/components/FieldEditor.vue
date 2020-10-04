<template>
  <div>
    <input
      v-if="['text'].includes(field.type)"
      :id="field.key"
      :name="field.key"
      :type="field.type"
      class="form-control"
      v-model="model"
      :placeholder="field.placeholder || field.name"
    />
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
      v-if="['boolean', 'checkbox'].includes(field.type)"
      :id="field.key"
      :name="field.key"
      v-model="model"
      type="checkbox"
    />
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
        v-for="(option) in handledOptions"
        :key="'select-' + option.value"
        :value="option.value"
      >{{ option.text }}</option>
    </select>
    <bz-json-editor
      v-if="field.type == 'jsoneditor'"
      :id="field.key"
      :name="field.key"
      v-model="model"
      mode="code"
    />
    <div
      v-if="field.type == 'button-group'"
      class="btn-group"
      role="group"
      :aria-label="field.placeholder||field.name"
    >
      <button
        v-for="(option) in handledOptions"
        type="button"
        class="btn"
        :class="{'btn-primary': model == option.value, 'btn-primary-outline': model != option.value}"
        :key="'button-group-' + option.value"
        @click="updateModel(option.value)"
      >{{ option.text }}</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "FieldEditor",
  props: {
    field: {
      type: Object,
    },
    value: {},
  },
  data() {
    return {
      model: this.value,
      handledOptions: [],
    };
  },
  methods: {
    handleOptions(options) {
      if (typeof options == "string") {
        options = options.split("|").map((elem) => {
          let splitted = elem.split(",");

          return {
            value: splitted[0],
            text: splitted[1] || splitted[0],
          };
        });
      }

      return options.map((o) => {
        try {
          o.value = o.value.toString();
        } catch (error) {}
        o.text = o.text || o.value;
        return o;
      });
    },
    updateModel(value) {
      this.model = value;
    },
  },
  created() {
    if (this.field.options) {
      this.handledOptions = this.handleOptions(this.field.options);
    }
  },
  watch: {
    model(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.model = val || null;
    },
  },
};
</script>
