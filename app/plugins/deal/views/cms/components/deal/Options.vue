<template>
  <div class="row">
    <div class="col-sm-12">
      <h3>Deal Options</h3>
    </div>
    <div class="col-3" v-for="option in options" :key="option._id">
      <Option :object="option" @onSave="onSave" @onRemove="onRemove" />
    </div>
    <div class="col-3">
      <Option @onSave="onSave" />
    </div>
  </div>
</template>

<script>
import Option from "./Option";
import ResourcesService from "@general/resources_service";

export default {
  name: "Options",
  props: {
    deal: { type: String },
  },
  data() {
    return {
      options: [],
      service: new ResourcesService(
        `${CMS_URL}/deals/${this.deal}/deal_options`
      ),
    };
  },
  components: {
    Option,
  },
  methods: {
    onSave(option) {
      let promise;
      if (option._id) {
        promise = this.service.update(option._id, option);
      } else {
        promise = this.service.create(option);
      }
      promise.then(({ data }) => {
        this.index();
        return this.$notify("Option saved!", { type: "success" });
      });
    },
    onRemove(option) {
      let promise;
      promise = this.service.delete(option._id);
      promise.then(({ data }) => {
        this.index();
        return this.$notify("Option removed!", { type: "success" });
      });
    },
    index() {
      this.service.index().then(({ data }) => {
        this.options = data.data;
      });
    },
  },
  created() {
    this.index();
  },
};
</script>

<style>
</style>
