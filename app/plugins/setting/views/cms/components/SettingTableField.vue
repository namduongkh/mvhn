<template>
  <div>
    <!-- Trigger the modal with a button -->
    <button
      type="button"
      class="btn btn-secondary"
      data-toggle="modal"
      :data-target="'#array-field-' + elementId"
    >
      <i class="fa fa-table"></i> View/Edit
    </button>

    <!-- Modal -->
    <div :id="'array-field-' + elementId" class="modal fade table-setting" role="dialog">
      <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">
              {{ fieldInfo.name }}
              <small>[{{ fieldInfo.key }}]</small>
            </h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <table
                  class="table table-bordered table-striped"
                  v-if="fieldInfo.columns && fieldInfo.columns.length"
                >
                  <thead>
                    <tr>
                      <th v-for="(column, index) in fieldInfo.columns" :key="index">
                        {{ column.name }}
                        <a
                          class="text-danger"
                          href="javascript:void(0)"
                          @click="removeColumn(column.key)"
                        >
                          <i class="fa fa-remove"></i>
                        </a>
                        <br />
                        <small>[{{ column.key }}]</small>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, j) in rows" :key="j">
                      <td v-for="(column, i) in fieldInfo.columns" :key="i">
                        <FieldEditor :field="column" v-model="row[column.key]"></FieldEditor>
                      </td>
                      <td>
                        <a
                          class="btn btn-sm btn-danger-outline"
                          href="javascript:void(0)"
                          @click="removeRow(j)"
                        >
                          <i class="fa fa-trash"></i>
                        </a>
                        <a
                          class="btn btn-sm btn-secondary-outline"
                          href="javascript:void(0)"
                          @click="swap(j, j - 1)"
                        >
                          <i class="fa fa-arrow-up"></i>
                        </a>
                        <a
                          class="btn btn-sm btn-secondary-outline"
                          href="javascript:void(0)"
                          @click="swap(j, j + 1)"
                        >
                          <i class="fa fa-arrow-down"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="100">
                        <a class="btn btn-secondary" href="javascript:void(0)" @click="addRow()">
                          <i class="fa fa-plus"></i> Add row
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <i v-else>Please add column first</i>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <hr />
                <FieldConfigEditor @added="addColumn" :exceptTypes="['table']"></FieldConfigEditor>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FieldConfigEditor from "./FieldConfigEditor";

export default {
  name: "SettingTableField",
  props: {
    value: {
      type: Array,
      default: () => []
    },
    fieldInfo: {
      type: Object
    }
  },
  components: {
    FieldConfigEditor
  },
  computed: {
    refreshRows() {
      return this.rows;
    }
  },
  data() {
    return {
      elementId: Date.now(),
      rows: this.value
    };
  },
  created() {},
  methods: {
    addColumn(column) {
      this.$emit("columnAdded", column, this.fieldInfo.key);
      this.$forceUpdate();
    },
    removeColumn(key) {
      this.$emit("columnRemoved", key, this.fieldInfo.key);
      this.$forceUpdate();
      this.rows.forEach(row => {
        delete row[key];
      });
    },
    addRow() {
      this.rows.push({});
    },
    removeRow(index) {
      this.rows.splice(index, 1);
    },
    swap(i, j) {
      if (j < 0 || j >= this.rows.length) return;

      [this.rows[i], this.rows[j]] = [this.rows[j], this.rows[i]];
      this.$forceUpdate();
    }
  },
  watch: {
    rows: {
      handler: function(val) {
        this.$emit("input", val);
      },
      deep: true
    }
  }
};
</script>

<style>
</style>
