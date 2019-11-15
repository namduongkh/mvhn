<template>
  <div>
    <FieldEditor v-model="model" :field="field"></FieldEditor>
    <SettingTableField
      v-if="field.type == 'table'"
      :id="field.key"
      :name="field.key"
      v-model="model"
      :field-info="field"
      @columnAdded="addFieldColumn"
      @columnRemoved="removeFieldColumn"
    ></SettingTableField>
  </div>
</template>
<script>
import SettingTableField from "./SettingTableField";

export default {
  name: "SettingField",
  props: {
    field: {
      type: Object
    },
    value: {}
  },
  components: {
    SettingTableField
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
    },
    addFieldColumn(column) {
      this.$emit("columnAdded", column, this.field.key);
      this.$forceUpdate();
    },
    removeFieldColumn(key) {
      this.$emit("columnRemoved", key, this.field.key);
      this.$forceUpdate();
    }
  },
  watch: {
    model(val) {
      this.$emit("input", val);
    }
  }
};
</script>
<style>
.table-setting .modal-dialog {
  width: 100%;
  margin: 0;
}
.table-setting .modal-dialog .modal-content {
  border-radius: 0;
}
</style>
