<template>
  <div>
    <fieldset class="form-group">
      <label class="form-label semibold" for="name">Name</label>
      <input
        v-model="formData.name"
        data-vv-name="name"
        type="text"
        class="form-control"
        id="name"
        v-validate="'required'"
        placeholder="Enter Name"
      />
      <small v-show="errors.has('name')" class="text-danger">{{
        errors.first("name")
      }}</small>
    </fieldset>
    <fieldset class="form-group">
      <label class="form-label semibold" for="rate">Rate</label>
      <input
        v-model="formData.rate"
        data-vv-name="rate"
        type="number"
        min="0.1"
        class="form-control"
        id="rate"
        v-validate="'required'"
        placeholder="Enter Rate"
      />
      <small v-show="errors.has('rate')" class="text-danger">{{
        errors.first("rate")
      }}</small>
    </fieldset>
    <fieldset class="form-group" v-if="formData._id">
      <label class="form-label semibold" for="win">Win Option</label>
      <input
        v-model="formData.win"
        data-vv-name="win"
        type="checkbox"
        id="win"
      />
    </fieldset>
    <fieldset class="form-group text-right">
      <button
        type="button"
        class="btn btn-sm btn-default"
        @click="onRemove"
        v-if="formData._id"
      >
        <i class="fa fa-trash"></i> Remove
      </button>
      <button type="button" class="btn btn-sm btn-success" @click="onSave">
        <i class="fa fa-save"></i> {{ formData._id ? "Save" : "Create" }}
      </button>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: "Option",
  props: {
    object: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      formData: this.object,
    };
  },
  methods: {
    onSave() {
      this.$validator.validateAll().then((res) => {
        if (!res)
          return this.$notify("Please check your data", { type: "warning" });

        this.$emit("onSave", this.formData);
        if (!this.formData._id) {
          this.formData = {};
        }
      });
    },
    onRemove() {
      if (!confirm("Are you sure?")) return;
      this.$emit("onRemove", this.formData);
    },
  },
};
</script>

<style>
</style>
