<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        :title="pageTitle + ' property'"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      />

      <form class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">
          Fill data below and click actions above
        </h5>

        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="name">Name</label>
              <input
                v-model="formData.name"
                v-validate="'required'"
                data-vv-name="Name"
                type="text"
                class="form-control"
                id="name"
                placeholder="Name"
              />
              <small v-show="errors.has('Name')" class="text-danger">{{
                errors.first("Name")
              }}</small>
            </fieldset>
          </div>
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="slug">Slug</label>
              <input
                v-model="formData.slug"
                v-validate="'required'"
                data-vv-name="Slug"
                type="text"
                class="form-control"
                id="slug"
                placeholder="Slug auto generator"
              />
              <small v-show="errors.has('Slug')" class="text-danger">{{
                errors.first("Slug")
              }}</small>
            </fieldset>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="color">Color</label>
              <color-picker
                v-if="formData.color"
                id="color"
                v-model="formData.color"
              />
              <small v-show="errors.has('Color')" class="text-danger">{{
                errors.first("Color")
              }}</small>
            </fieldset>
          </div>
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="type">Type</label>
              <input
                v-model="formData.type"
                v-validate="'required'"
                data-vv-name="Type"
                type="text"
                class="form-control"
                id="type"
                placeholder="Type auto generator"
              />
              <small v-show="errors.has('Type')" class="text-danger">{{
                errors.first("Type")
              }}</small>
            </fieldset>
          </div>
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="order">Order</label>
              <input
                v-model="formData.order"
                data-vv-name="Order"
                type="number"
                class="form-control"
                id="order"
                placeholder="Order"
                min="0"
              />
              <small v-show="errors.has('Order')" class="text-danger">{{
                errors.first("Order")
              }}</small>
            </fieldset>
          </div>
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="parent">Parent</label>
              <select2
                id="parent"
                data-vv-name="parent"
                name="parent"
                v-model="formData.parent"
                :ajax="ajaxCategory"
                placeholder="Select one..."
              />
              <small v-show="errors.has('Order')" class="text-danger">{{
                errors.first("Order")
              }}</small>
            </fieldset>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="textClassname">Text color</label>
              <select
                v-model="formData.textClassname"
                name="textClassname"
                id="textClassname"
                class="form-control"
              >
                <option :value="'property-text-white'">White</option>
                <option :value="'property-text-black'">Black</option>
              </select>
            </fieldset>
          </div>
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="status">Status</label>
              <select
                v-model="formData.status"
                name="status"
                id="status"
                class="form-control"
              >
                <option :value="1">Publish</option>
                <option :value="0">Unpublish</option>
                <option :value="2">Trashed</option>
              </select>
            </fieldset>
          </div>
        </div>
      </form>
      <!--.box-typical-->
    </div>
    <!--.container-fluid-->
  </div>
  <!--.page-content-->
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import FieldConfigEditor from "@Plugin/setting/views/cms/components/FieldConfigEditor";

export default {
  name: "DetailProperty",
  data() {
    return {
      formData: {},
      cmsUrl: `${CMS_URL}/${this.$route.params.postType}/properties`,
      pageTitle: allowedPostTypes[this.$route.params.postType].name,
      ajaxCategory: {
        url: `${CMS_URL}/${this.$route.params.postType}/properties/select2`,
      },
    };
  },
  computed: {
    ...mapGetters(["itemSelected"]),
  },
  watch: {
    itemSelected(data) {
      if (data) {
        this.formData = JSON.parse(
          JSON.stringify(
            Object.assign(
              {
                customFields: [],
                customConfig: {},
              },
              data
            )
          )
        );
      }
    },
    "formData.name"(val) {
      this.formData.slug = this.$options.filters["text2Slug"](val);
    },
    "formData.color"(val) {
      if (!val || typeof val == "string") return;
      this.formData.color = val.hex;
    },
    // "formData.slug"(val) {
    //   this.formData.slug = this.$options.filters["text2Slug"](val);
    // }
  },
  methods: {
    ...mapActions(["initService", "saveItem", "getItemById", "newItem"]),
    save(options) {
      let self = this;
      this.$validator.validateAll().then((res) => {
        if (res) {
          self.saveItem({ formData: self.formData, options });
        } else {
          this.$notify("Please check data", {
            type: "warning",
            placement: {
              from: "bottom",
            },
          });
        }
      });
    },
    resetForm() {
      this.errors.clear();
      if (!this.formData._id) {
        this.newItem();
      } else {
        this.getItemById({ id: this.formData._id });
      }
    },
  },
  components: {
    FieldConfigEditor,
  },
  created() {
    this.initService(this.cmsUrl);
    let id = this.$route.params.id;
    if (id !== undefined) this.getItemById({ id });
    else this.newItem();
  },
  mounted() {},
};
</script>
