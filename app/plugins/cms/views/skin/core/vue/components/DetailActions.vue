<template>
  <header class="section-header">
    <div class="row">
      <div class="col-sm-4">
        <div class="tbl">
          <div class="tbl-row">
            <div class="tbl-cell">
              <h3>{{ title }}</h3>
              <div class="subtitle">{{ subTitle }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-8 text-right">
        <button
          :disable="disable"
          @click="saveData({ route: { name: routeConfigComputed.index, params: { ...$route.params, id: formData._id }}})"
          class="btn btn-primary"
          v-if="enabledButton.saveAndList"
        >
          <i class="fa fa-save"></i> Lưu & Thoát
        </button>
        <button
          :disable="disable"
          @click="saveData({ route: { name: routeConfigComputed.edit, params: { ...$route.params, id: formData._id }}})"
          class="btn btn-success"
          v-if="enabledButton.save"
        >
          <i class="fa fa-save"></i> Lưu
        </button>
        <button v-if="enabledButton.reset" @click="resetFormData()" class="btn btn-warning">
          <i class="fa fa-refresh"></i> Reset
        </button>
        <button v-if="enabledButton.list" @click="gotoList()" class="btn btn-secondary">
          <i class="fa fa-chevron-left"></i> Thoát
        </button>
        <button
          v-if="enabledButton.remove && formData._id"
          @click="remove()"
          class="btn btn-danger"
        >
          <i class="fa fa-trash"></i> Xóa
        </button>
        <slot name="moreAction" />
      </div>
    </div>
    <div class="clearfix"></div>
  </header>
</template>

<script>
import ResourcesService from "@general/resources_service";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DetailActions",
  props: {
    title: {
      type: String,
      required: true,
    },
    formData: {
      type: Object,
      required: true,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    buttonEnabled: {
      type: Object,
      default() {
        return {};
      },
    },
    routeConfig: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      enabledButton: {},
    };
  },
  methods: {
    ...mapActions(["deleteItem", "openConfirm"]),
    saveData(options) {
      this.$emit("action", options);
    },
    resetFormData() {
      this.$emit("reset");
    },
    remove() {
      let self = this;
      this.openConfirm({
        message: "Bạn chắc chắn muốn xóa? Hành động không thể hoàn tác.",
        ok: function () {
          self.deleteItem({
            id: self.formData._id,
            options: {
              route: {
                name: self.routeConfigComputed.index,
                params: { ...self.$route.params, id: self.formData._id },
              },
            },
          });
        },
      });
    },
    gotoList() {
      this.$router.push({
        name: this.routeConfigComputed.index,
        params: this.$route.params,
      });
    },
  },
  computed: {
    subTitle() {
      if (this.formData && this.formData._id) return "Cập nhật";
      else return "Tạo mới";
    },
    routeConfigComputed() {
      let config = this.routeConfig || this.$route.meta.actions;
      return config;
    },
  },
  created() {
    this.enabledButton = Object.assign(
      {},
      {
        save: true,
        saveAndList: true,
        reset: true,
        list: true,
        remove: true,
      },
      this.buttonEnabled
    );
  },
};
</script>
