<template>
  <div class="row">
    <div class="col-sm-12">
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            id="pills-css-tab"
            data-toggle="pill"
            href="#pills-css"
            role="tab"
            aria-controls="pills-css"
            aria-selected="true"
            >Custom CSS</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="pills-js-tab"
            data-toggle="pill"
            href="#pills-js"
            role="tab"
            aria-controls="pills-js"
            aria-selected="false"
            >Custom JS</a
          >
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-css"
          role="tabpanel"
          aria-labelledby="pills-css-tab"
        >
          <fieldset class="form-group">
            <label class="form-label semibold" for="importCss"
              >Import CSS</label
            >
            <bz-json-editor
              v-if="formData.importCss"
              data-vv-name="importCss"
              name="importCss"
              id="importCss"
              v-model="formData.importCss"
              mode="code"
            />
            <label class="form-label semibold" for="cssCode">Code</label>
            <codemirror
              v-model="formData.cssCode"
              :options="cssEditorOptions"
            />
          </fieldset>
        </div>
        <div
          class="tab-pane fade"
          id="pills-js"
          role="tabpanel"
          aria-labelledby="pills-js-tab"
        >
          <fieldset class="form-group">
            <label class="form-label semibold" for="importJs">Import JS</label>
            <bz-json-editor
              v-if="formData.importJs"
              data-vv-name="importJs"
              name="importJs"
              id="importJs"
              v-model="formData.importJs"
              mode="code"
            />
            <label class="form-label semibold" for="jsCode">Code</label>
            <codemirror v-model="formData.jsCode" :options="jsEditorOptions" />
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/css/css.js";

export default {
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      formData: {},
      preventEmit: false,
      jsEditorOptions: {
        tabSize: 2,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "text/javascript",
        lineWrapping: true,
        theme: "monokai",
        viewportMargin: Infinity,
      },
      cssEditorOptions: {
        tabSize: 2,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "text/css",
        lineWrapping: true,
        theme: "monokai",
        viewportMargin: Infinity,
      },
    };
  },
  created() {
    this.formData = this.value;
  },
  watch: {
    formData: {
      deep: true,
      handler(val) {
        if (this.preventEmit) {
          this.preventEmit = false;
        } else {
          this.$emit("input", val);
          this.$emit("onUpdateCode", val);
        }
      },
    },
    value: {
      deep: true,
      handler(val) {
        this.preventEmit = true;
        this.formData = Object.assign({}, val, {
          importCss: Array.from(val.importCss || []),
          importJs: Array.from(val.importJs || []),
        });
      },
    },
  },
};
</script>

<style>
</style>
