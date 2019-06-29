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
        <slot name="moreAction"/>

        <button
          :disable="disable"
          @click="saveData({gotoList: true, listRouter: listRouter})"
          class="btn btn-primary"
        >Lưu & Thoát</button>
        <button
          :disable="disable"
          @click="saveData({ routeDetail: routeDetail })"
          class="btn btn-success"
        >Lưu</button>
        <button @click="resetFormData()" class="btn btn-warning">Reset</button>
        <button @click="gotoList()" class="btn btn-secondary">Thoát</button>
      </div>
    </div>
    <div class="clearfix"></div>
  </header>
</template>

<script>
export default {
  name: "DetailActions",
  props: {
    title: {
      type: String,
      required: true
    },
    // listRouter: {
    //   type: String,
    //   required: true
    // },
    // routeDetail: {
    //   type: String,
    //   required: true
    // },
    formData: {
      type: Object,
      required: true
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    saveData(options) {
      this.$emit("action", options);
    },
    resetFormData() {
      this.$emit("reset");
    },
    gotoList() {
      this.$router.push({ path: this.listRouter });
    }
  },
  computed: {
    subTitle() {
      if (this.formData && this.formData._id) return "Cập nhật";
      else return "Tạo mới";
    }
  },
  created() {
    this.listRouter = this.$route.path.replace(/(\/\w+)\/.+/, "$1");
    this.routeDetail = this.$route.path.replace(/(\/\w+)\/.+/, "$1");
  }
};
</script>
