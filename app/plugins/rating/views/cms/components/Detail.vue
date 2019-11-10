<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="Rating"
        listRouter="/ratings"
        routeDetail="/rating"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      >
        <template slot="moreAction"></template>
      </DetailActions>

      <form class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>

        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="object">Object</label>
              <input
                v-model="formData.object"
                v-validate="'required'"
                data-vv-name="object"
                type="text"
                class="form-control"
                id="object"
                placeholder="Enter object"
                disabled
              />
              <small v-show="errors.has('object')" class="text-danger">{{ errors.first('object') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="star">Star</label>
              <input
                v-model="formData.star"
                v-validate="'required'"
                data-vv-name="star"
                type="number"
                class="form-control"
                id="star"
                placeholder="Enter star"
              />
              <small v-show="errors.has('star')" class="text-danger">{{ errors.first('star') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="guest">Name</label>
              <input
                v-model="formData.guest"
                v-validate="'required'"
                data-vv-name="Name"
                type="text"
                class="form-control"
                id="guest"
                placeholder="Name"
              />
              <small v-show="errors.has('Name')" class="text-danger">{{ errors.first('Name') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="guest">Comment</label>
              <textarea
                v-model="formData.comment"
                v-validate="'required'"
                data-vv-name="Comment"
                type="text"
                class="form-control"
                id="comment"
                placeholder="Comment"
              ></textarea>
              <small
                v-show="errors.has('Comment')"
                class="text-danger"
              >{{ errors.first('Comment') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="additionalInfo">Additional Info</label>
              <textarea
                v-model="formData.additionalInfo"
                v-validate="'required'"
                data-vv-name="Additional Info"
                type="text"
                class="form-control"
                id="additionalInfo"
                placeholder="Additional Info"
              ></textarea>
              <small
                v-show="errors.has('Additional Info')"
                class="text-danger"
              >{{ errors.first('Additional Info') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label semibold" for="avatar">Avatar</label>
              <imageUploader
                name="avatar"
                classButtonUpload="btn-secondary"
                id="avatar"
                data-vv-name="Hình avatar"
                v-model="formData.avatar"
              />
              <small
                v-show="errors.has('Hình avatar')"
                class="text-danger"
              >{{ errors.first('Hình avatar') }}</small>
            </fieldset>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="status">Status</label>
              <select v-model="formData.status" name="status" id="status" class="form-control">
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

export default {
  name: "DetailRating",
  data() {
    return {
      formData: {},
      cmsUrl: `${window.settings.services.cmsUrl}/ratings`,

      froalaConfig: {
        imageUploadURL: window.settings.services.webUrl + "/api/upload/image",
        imageUploadMethod: "POST",
        imageUploadParams: {
          type: "wysiwyg/post"
        }
      }
    };
  },
  computed: {
    ...mapGetters(["itemSelected", "authUser"])
  },
  watch: {
    itemSelected(data) {
      if (data) {
        this.formData = Object.assign({}, data);
      }
    },
    "formData.name"(val) {
      this.formData.slug = this.$options.filters["text2Slug"](val);
    },
    "formData.attribute"(attribute) {
      // Do something
    }
  },
  methods: {
    ...mapActions(["initService", "saveItem", "getItemById", "newItem"]),
    save(options) {
      let self = this;
      this.$validator.validateAll().then(res => {
        if (res) {
          self.saveItem({ formData: self.formData, options });
        } else {
          this.$notify("Please check your data", { type: "warning" });
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
    }
  },
  components: {},
  created() {
    this.initService(this.cmsUrl);
    let id = this.$route.params.id;
    if (id !== undefined) this.getItemById({ id });
    else this.newItem();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
