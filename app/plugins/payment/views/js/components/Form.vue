<template>
  <div class="text-center payment-form">
    <div class="form-group">
      <label for="">Amount</label>
      <input
        class="form-control payment-form__amount"
        v-model="formData.amount"
        type="number"
        data-vv-name="Amount"
        v-validate="'required'"
        placeholder="0"
        min="0"
        step="1000"
      />
    </div>
    <div class="form-group"><input type="radio" checked /> Cash</div>
    <button type="button" class="btn btn-primary" @click="onSave()">
      <i class="fa fa-dollar-sign"></i> Submit
    </button>
  </div>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      formData: {},
    };
  },
  methods: {
    onSave() {
      this.$validator.validateAll().then((res) => {
        if (!res) return;

        this.$emit("onSave", this.formData);
        this.formData = {};
      });
    },
  },
};
</script>

<style>
.payment-form {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}
.payment-form__amount {
  text-align: center;
  font-size: 1.5em;
  height: unset;
  border: none;
  border-bottom: 2px solid #ccc;
  box-shadow: unset;
  border-radius: 0;
}
</style>
