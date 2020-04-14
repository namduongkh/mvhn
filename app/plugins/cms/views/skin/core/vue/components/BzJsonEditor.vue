<template>
  <div>
    <div class="bz-json-editor" :style="style"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import jsoneditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";

export default {
  name: "BzJsonEditor",
  props: ["value", "mode", "height"],
  methods: {},
  beforeUpdate() {},
  data() {
    return {
      obj_json: this.value,
      editor: null,
      error: false,
      internalChange: false,
      style: this.height ? `height: ${this.height}px` : ``
    };
  },
  computed: {},
  watch: {},
  components: {},
  mounted() {
    var self = this;
    var options = {
      mode: self.mode || "tree",
      modes: ["tree", "code", "form", "text", "view"], // allowed modes
      onChange() {
        try {
          var json = self.editor.get();
          self.error = false;
        } catch (e) {
          self.error = true;
          self.$emit("has-error");
        }
        if (!self.error) {
          self.json = json;
          self.$emit("json-change", json);
          self.internalChange = true;
          self.$emit("input", json);
          self.$nextTick(function() {
            self.internalChange = false;
          });
        }
      }
    };
    this.editor = new jsoneditor(
      this.$el.querySelector(".bz-json-editor"),
      options,
      this.obj_json
    );
  }
};
</script>
<style>
div.jsoneditor-tree table.jsoneditor-tree {
  margin: 0 0 160px;
}
</style>
