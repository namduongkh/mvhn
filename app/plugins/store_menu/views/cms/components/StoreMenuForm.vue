<template>
  <div class="row">
    <div class="col-xs-4">
      <fieldset class="form-group">
        <label class="form-label semibold" for="image">Image</label>
        <imageUploader
          name="image"
          classButtonUpload="btn-secondary"
          id="image"
          v-validate="'required'"
          dir-upload="store_menus"
          data-vv-name="image"
          v-model="storeMenu.image"
        />
        <small v-show="errors.has('image')" class="text-danger">{{ errors.first('image') }}</small>
      </fieldset>
    </div>
    <div class="col-xs-8">
      <div class="col-sm-12">
        <fieldset class="form-group">
          <label class="form-label semibold" for="name">Name</label>
          <input
            v-model="storeMenu.name"
            v-validate="'required'"
            data-vv-name="name"
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter name"
          />
          <small v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</small>
        </fieldset>
      </div>
      <div class="col-sm-12">
        <fieldset class="form-group">
          <label class="form-label semibold" for="price">Price</label>
          <input
            v-model="storeMenu.price"
            v-validate="'required'"
            data-vv-name="price"
            type="number"
            step="5000"
            class="form-control"
            id="price"
            placeholder="Enter price"
          />
          <small v-show="errors.has('price')" class="text-danger">{{ errors.first('price') }}</small>
        </fieldset>
      </div>
      <div class="col-sm-12">
        <slot name="actions" :item="storeMenu" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StoreMenuForm",
  props: {
    storeMenu: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
</style>
