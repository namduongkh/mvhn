<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="<%= modelName %>"
        listRouter="/<%= pluralName %>"
        routeDetail="/<%= name %>"
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
          <% for (key in formInfo) { -%><% if (formInfo[key].type == 'text') { %>
          <div class="<% if (formInfo[key].wraper_class) { %> <%= formInfo[key].wrap_class %> <%} else { %>col-sm-6<% } -%>">
            <fieldset class="form-group">
              <label class="form-label semibold" for="<%= key %>"><%= formInfo[key].label %></label>
                <input v-model="formData.<%= key %>" data-vv-name="<%= key %>" type="text"
                       class="form-control" id="<%= key %>" placeholder="Enter <%= formInfo[key].label %>" >
              <small v-show="errors.has('<%= key %>')" class="text-danger">{{ errors.first('<%= key %>') }}</small>
            </fieldset>
          </div><% } -%>
          <% if (formInfo[key].type == 'textarea') { %>
          <div class="<% if (formInfo[key].wraper_class) { %> <%= formInfo[key].wrap_class %> <%} else { %>col-sm-6<% } -%>">
            <fieldset class="form-group">
              <label class="form-label semibold" for="<%= key %>"><%= formInfo[key].label %></label>
                <textarea v-model="formData.<%= key %>" data-vv-name="<%= key %>" rows="5"
                          name="<%= key %>" id="<%= key %>" class="form-control" placeholder="Enter <%= formInfo[key].label %>"></textarea>
              <small v-show="errors.has('<%= key %>')" class="text-danger">{{ errors.first('<%= key %>') }}</small>
            </fieldset>
          </div><% } -%>
          <% if (formInfo[key].type == 'number') { %>
          <div class="<% if (formInfo[key].wraper_class) { %> <%= formInfo[key].wrap_class %> <%} else { %>col-sm-6<% } -%>">
            <fieldset class="form-group">
              <label class="form-label semibold" for="<%= key %>"><%= formInfo[key].label %></label>
                <input v-model="formData.<%= key %>" v-validate="'required|numeric'" data-vv-name="<%= key %>"
                       type="number" class="form-control" id="<%= key %>" placeholder="Enter <%= formInfo[key].label %>">
              <small v-show="errors.has('<%= key %>')" class="text-danger">{{ errors.first('<%= key %>') }}</small>
            </fieldset>
          </div><% } -%><% if (formInfo[key].type == 'boolean') { %>
          <div class="<% if (formInfo[key].wraper_class) { %> <%= formInfo[key].wrap_class %> <%} else { %>col-sm-6<% } -%>">
              <fieldset class="form-group">
                <label class="form-label semibold" for="<%= key %>"><%= formInfo[key].label %></label>
                  <select v-model="formData.<%= key %>" data-vv-name="<%= key %>" name="<%= key %>" id="<%= key %>" class="form-control">
                    <option :value="null">Select value</option>
                    <option :value="true">True</option>
                    <option :value="false">False</option>
                  </select>
                <small v-show="errors.has('<%= key %>')" class="text-danger">{{ errors.first('<%= key %>') }}</small>
              </fieldset>
          </div><% } -%>
          <% if (formInfo[key].type == 'editor') { %>
          <div class="<% if (formInfo[key].wraper_class) { %> <%= formInfo[key].wrap_class %> <%} else { %>col-sm-12<% } -%>">
            <fieldset class="form-group">
              <label class="form-label semibold" for="<%= key %>"><%= formInfo[key].label %></label>
                <froala :tag="'textarea'" v-model="formData.<%= key %>" id="<%= key %>" name="<%= key %>" data-vv-name="<%= key %>" />
              <small v-show="errors.has('<%= key %>')" class="text-danger">{{ errors.first('<%= key %>') }}</small>
            </fieldset>
          </div><% } -%>
          <% if (formInfo[key].type == 'image') { %>
          <div class="<% if (formInfo[key].wraper_class) { %> <%= formInfo[key].wrap_class %> <%} else { %>col-sm-6<% } -%>">
            <fieldset class="form-group">
              <label class="form-label semibold" for="<%= key %>"><%= formInfo[key].label %></label>
                <imageUploader name="<%= key %>" classButtonUpload="btn-secondary" id="<%= key %>" dir-upload="<%= pluralName %>"
                               data-vv-name="<%= key %>" v-model="formData.<%= key %>"/>
              <small v-show="errors.has('<%= key %>')" class="text-danger">{{ errors.first('<%= key %>') }}</small>
            </fieldset>
          </div>
          <% } -%><% if (formInfo[key].type == 'images') { %>
          <div class="<% if (formInfo[key].wraper_class) { %> <%= formInfo[key].wrap_class %> <%} else { %>col-sm-6<% } -%>">
            <fieldset class="form-group">
              <label class="form-label semibold" for="<%= key %>"><%= formInfo[key].label %></label>
                <imageUploader :multiple="true" v-model="formData.<%= key %>"/>
              <small v-show="errors.has('<%= key %>')" class="text-danger">{{ errors.first('<%= key %>') }}</small>
            </fieldset>
          </div>
          <% } -%>
          <% if (formInfo[key].type == 'select') { %>
          <div class="<% if (formInfo[key].wraper_class) { %> <%= formInfo[key].wrap_class %> <%} else { %>col-sm-6<% } -%>">
            <fieldset class="form-group">
              <label class="form-label semibold" for="<%= key %>"><%= formInfo[key].label %></label>
                <select data-vv-name="<%= key %>" v-model="formData.<%= key %>" <% if (formInfo[key].multipe) { %> multiple <% } -%> name="<%= key %>" id="<%= key %>" class="form-control">
                  <option :value="null">Please update option...</option>
                  <option :value="1">Option 1</option>
                  <option :value="0">Option 2</option>
                  <option :value="2">Option 3</option>
                </select>
              <small v-show="errors.has('<%= key %>')" class="text-danger">{{ errors.first('<%= key %>') }}</small>
            </fieldset>
          </div><% } %>
          <% if (formInfo[key].type == 'select2') { %>
          <div class="<% if (formInfo[key].wraper_class) { %> <%= formInfo[key].wrap_class %> <%} else { %>col-sm-6<% } -%>">
            <fieldset class="form-group">
              <label class="form-label semibold" for="<%= key %>"><%= formInfo[key].label %></label>
                <select2 id="<%= key %>" data-vv-name="<%= key %>"  name="<%= key %>"
                       v-model="formData.<%= key %>" :ajax="ajax<%= capitalize(key) %>" placeholder="Select one..." <% if (formInfo[key].multipe) { %> :multiple="true" <% } -%>
                />
              <small v-show="errors.has('<%= key %>')" class="text-danger">{{ errors.first('<%= key %>') }}</small>
            </fieldset>
          </div><% } %>
          <% if (formInfo[key].type == 'date') { %>
          <div class="<% if (formInfo[key].wraper_class) { %> <%= formInfo[key].wrap_class %> <%} else { %>col-sm-6<% } -%>">
            <fieldset class="form-group">
              <label class="form-label semibold" for="<%= key %>"><%= formInfo[key].label %></label>
                <datepicker v-model="formData.<%= key %>" data-vv-name="<%= key %>" name="<%= key %>" id="<%= key %>"
                            placeholder="Pick a date" format="dd/MM/yyyy" input-class="form-control"/>
              <small v-show="errors.has('<%= key %>')" class="text-danger">{{ errors.first('<%= key %>') }}</small>
            </fieldset>
          </div><% } %>
          <% if (formInfo[key].type == 'json_editor') { %>
          <div class="<% if (formInfo[key].wraper_class) { %> <%= formInfo[key].wrap_class %> <%} else { %>col-sm-12<% } -%>">
            <fieldset class="form-group">
              <label class="form-label semibold" for="<%= key %>"><%= formInfo[key].label %></label>
                <bz-json-editor   data-vv-name="<%= key %>" name="<%= key %>" id="<%= key %>" v-model="formData.<%= key %>"/>
              <small v-show="errors.has('<%= key %>')" class="text-danger">{{ errors.first('<%= key %>') }}</small>
            </fieldset>
          </div><% } %><% } %>

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
  name: "Detail<%= modelName %>",
  data() {
    return {
      formData: {},
      cmsUrl: `${CMS_URL}/<%= pluralName %>`,
      <% for (key in formInfo) { -%><% if (formInfo[key].ref) { %>
      ajax<%= capitalize(key) %>: {
        url: `${CMS_URL}/<%= formInfo[key].ref %>/select2`,
        params: {},
        textField: "name",
        autoload: false
      },<% } -%><% } %>
      froalaConfig: {
        imageUploadURL: WEB_URL + "/api/upload/image",
        imageUploadMethod: "POST",
        imageUploadParams: {
          type: "wysiwyg/post"
        }
      }
    };
  },
  computed: {
    ...mapGetters(['itemSelected', 'authUser'])
  },
  watch: {
    itemSelected(data) {
      if (data) {
        this.formData = Object.assign({}, data);
      }
    },
    "formData.name"(val) {
      if (this.formData._id) return;
      this.formData.slug = this.$options.filters["text2Slug"](val);
    },
    "formData.attribute"(attribute) {
      // Do something
    }
  },
  methods: {
    ...mapActions(["initService", "saveItem", "getItemById", "newItem"]),
    save(options){
      let self = this;
      this.$validator.validateAll().then(res=>{
        if(res){
          self.saveItem({formData: self.formData, options});
        }
        else{
          this.$notify('Please check your data', {type: 'warning'});
        }
      });
    },
    resetForm(){
      this.errors.clear();
      if(!this.formData._id){
        this.newItem();
      }
      else{
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
