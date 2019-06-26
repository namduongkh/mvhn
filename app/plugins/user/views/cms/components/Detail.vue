<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="User"
        listRouter="/users"
        routeDetail="/user"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      />

      <form class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>

        <div class="row">
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="name">Name</label>
              <input
                v-model="formData.name"
                v-validate="'required'"
                data-vv-name="name"
                type="text"
                class="form-control"
                id="name"
                placeholder="Enter name"
              >
              <small v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="email">Email</label>
              <input
                v-model="formData.email"
                v-validate="'required'"
                data-vv-name="email"
                type="text"
                class="form-control"
                id="email"
                placeholder="Enter email"
              >
              <small v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="password">Password</label>
              <input
                v-model="formData.password"
                data-vv-name="password"
                type="password"
                class="form-control"
                id="password"
                placeholder="Enter password"
              >
              <small
                v-show="errors.has('password')"
                class="text-danger"
              >{{ errors.first('password') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="cfpassword">Confirm Password</label>
              <input
                v-model="formData.cfpassword"
                data-vv-name="cfpassword"
                type="password"
                class="form-control"
                id="cfpassword"
                placeholder="Enter cfpassword"
              >
              <small
                v-show="errors.has('cfpassword')"
                class="text-danger"
              >{{ errors.first('cfpassword') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="phone">Phone</label>
              <input
                v-model="formData.phone"
                data-vv-name="phone"
                type="text"
                class="form-control"
                id="phone"
                placeholder="Enter phone"
              >
              <small v-show="errors.has('phone')" class="text-danger">{{ errors.first('phone') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="roles">Roles</label>
              <select2
                id="roles"
                v-validate="'required'"
                data-vv-name="roles"
                name="roles"
                v-model="formData.roles"
                placeholder="Select one..."
                :multiple="true"
                :ajax="ajaxRole"
              />
              <small v-show="errors.has('roles')" class="text-danger">{{ errors.first('roles') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label semibold" for="avatar">Avatar</label>
              <imageUploader
                name="avatar"
                classButtonUpload="btn-secondary"
                id="avatar"
                dir-upload="users"
                data-vv-name="avatar"
                v-model="formData.avatar"
              />
              <small v-show="errors.has('avatar')" class="text-danger">{{ errors.first('avatar') }}</small>
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
  name: "DetailUser",
  data() {
    return {
      formData: {},
      apiUrl: `${window.settings.services.cmsUrl}/users`,
      froalaConfig: {
        imageUploadURL: window.settings.services.webUrl + "/api/upload/image",
        imageUploadMethod: "POST",
        imageUploadParams: {
          type: "wysiwyg/post"
        }
      },
      ajaxRole: {
        url: `${window.settings.services.cmsUrl}/user_groups/select2`,
        idField: "slug",
        textField: "name",
        autoload: true
      }
    };
  },
  computed: {
    ...mapGetters(["itemSelected", "authUser"])
  },
  watch: {
    itemSelected(data) {
      if (data) {
        this.formData = JSON.parse(JSON.stringify(Object.assign({}, data)));
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
      if (!this.formatData._id) {
        this.newItem();
      } else {
        this.getItemById({ id: this.formatData._id });
      }
    }
  },
  components: {},
  created() {
    this.initService(this.apiUrl);
    let id = this.$route.params.id;
    if (id !== undefined) this.getItemById({ id });
    else this.newItem();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>