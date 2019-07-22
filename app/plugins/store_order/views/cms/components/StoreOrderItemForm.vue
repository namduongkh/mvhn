<template>
  <div class="row">
    <div class="col-sm-3">
      <label for># {{ index }}</label>
      <select2
        :id="'storeMenu' + index"
        v-validate="'required'"
        data-vv-name="storeMenu"
        :name="'storeMenu' + index"
        v-model="item.storeMenu"
        :ajax="ajaxStoreMenu"
        placeholder="Select one..."
      />
    </div>
    <div class="col-sm-3">
      <label for>Note</label>
      <input type="text" class="form-control" v-model="item.note" />
    </div>
    <div class="col-sm-3">
      <label for>Actions</label>
      <slot name="actions" :item="item" />
    </div>
  </div>
</template>

<script>
export default {
  name: "StoreOrderItemForm",
  props: {
    index: {
      type: Number,
      default: 1
    },
    value: {
      type: Object
    },
    item: {
      type: Object
    }
  },
  data() {
    return {
      ajaxStoreMenu: {
        url: `${window.settings.services.cmsUrl}/store_menus/select2`,
        params: {
          store: this.store,
          notPaginate: true
        },
        textField: "name",
        autoload: true
      },
      storeOrderItem: {}
    };
  }
  // watch: {
  //   item: {
  //     deep: true,
  //     handler(val) {
  //       this.storeOrderItem = val;
  //     }
  //   }
  // }
};
</script>

<style>
</style>
