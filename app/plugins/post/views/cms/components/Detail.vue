<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        :title="$route.meta.title"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      >
        <template slot="moreAction">
          <button
            type="button"
            class="btn btn-secondary"
            @click="goto({ name: 'MapLinkPost', params: { id: formData._id } })"
            v-if="$route.params.id && postType == 'post'"
          >
            <span class="fa fa-link"></span> Map Link
          </button>
        </template>
      </DetailActions>
      <div class="box-typical box-typical-padding row">
        <div class="panel-control col-sm-12" v-if="!$route.params.id">
          <button @click="showPanel('center')" class="btn btn-secondary">
            Expand
            <i class="fa fa-arrow-right"></i>
          </button>
          <button @click="showPanel('right')" class="btn btn-secondary">
            <i class="fa fa-arrow-left"></i>
            Collapse
          </button>
        </div>
        <div class="col-left no-width" v-if="!$route.params.id">
          <fieldset class="form-group">
            <label class="form-label semibold" for="leak.url">Url</label>
            <input
              v-model="leak.url"
              data-vv-name="Url"
              type="text"
              class="form-control"
              id="leak.url"
              placeholder="Url"
            />
          </fieldset>
          <div id="content-selector"></div>
          <div class="row">
            <div class="col-sm-10">
              <fieldset class="form-group">
                <input
                  v-model="leak.selector"
                  data-vv-name="Selector"
                  type="text"
                  class="form-control"
                  id="leak.selector"
                  placeholder="Selector"
                />
              </fieldset>
            </div>
            <div class="col-sm-2">
              <button class="btn btn-primary" @click="leakUrl()">Leak</button>
            </div>
          </div>
          <label class="form-label semibold">Heading</label>
          <div id="heading"></div>
          <label class="form-label semibold">Image</label>
          <div id="image"></div>
          <label class="form-label semibold">Content</label>
          <div id="content"></div>
          <button class="btn btn-primary" @click="getContent()">
            Get content
          </button>
        </div>
        <div :class="'col-right col-sm-12'">
          <form>
            <h5 class="m-t-lg with-border">
              Fill data below and click actions above
            </h5>

            <div class="row">
              <div class="col-sm-9">
                <div class="row">
                  <div class="col-sm-6">
                    <fieldset class="form-group">
                      <label class="form-label semibold" for="title"
                        >Title</label
                      >
                      <input
                        v-model="formData.title"
                        v-validate="'required'"
                        data-vv-name="Tiêu đề"
                        type="text"
                        class="form-control"
                        id="title"
                        placeholder="Title"
                      />
                      <small
                        v-show="errors.has('Tiêu đề')"
                        class="text-danger"
                        >{{ errors.first("Tiêu đề") }}</small
                      >
                    </fieldset>
                  </div>

                  <div class="col-sm-6">
                    <fieldset class="form-group">
                      <label class="form-label semibold" for="slug"
                        >Slug
                        <small>
                          <a
                            :href="`/${postType}/posts/` + formData.slug"
                            target="_blank"
                            >(View)</a
                          >
                        </small>
                      </label>
                      <input
                        v-model="formData.slug"
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

                <div
                  class="box-typical box-typical-padding"
                  v-if="formData.customFields && formData.customFields.length"
                >
                  <h4>Custom Data</h4>
                  <div class="row">
                    <div
                      v-for="(field, index) in formData.customFields"
                      :key="'field' + index"
                      class="col-sm-6"
                    >
                      <label
                        class="form-label semibold"
                        :for="field.key"
                        v-text="field.name + ':'"
                      ></label>
                      <FieldEditor
                        v-model="formData.customData[field.key]"
                        :field="{
                          type: field.type,
                          key: field.key,
                          placeholder: field.name,
                          options: field.options || '',
                        }"
                      ></FieldEditor>
                    </div>
                  </div>
                </div>

                <div
                  class="row"
                  v-if="
                    !postTypeConfig[`${postType}CustomConfig`] ||
                    !postTypeConfig[`${postType}CustomConfig`].onlyCustomData
                  "
                >
                  <div class="col-sm-12">
                    <fieldset class="form-group">
                      <label class="form-label semibold" for="content"
                        >Content</label
                      >
                      <froala
                        :tag="'textarea'"
                        v-model="formData.content"
                        :config="froalaConfig"
                      />
                    </fieldset>
                  </div>

                  <div class="col-sm-12">
                    <h5><strong>Custom Code</strong></h5>
                    <CustomCodeEditor v-model="formData.customCode" />
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-12">
                    <ProductSelector
                      :post="formData"
                      v-model="formData.products"
                    ></ProductSelector>
                  </div>
                </div>
              </div>

              <div class="col-sm-3">
                <div class="row">
                  <div class="col-sm-12">
                    <fieldset class="form-group">
                      <label class="form-label semibold" for="thumb"
                        >Thumb image</label
                      >
                      <imageUploader
                        name="thumb"
                        classButtonUpload="btn-secondary"
                        id="thumb"
                        data-vv-name="Hình thumb"
                        v-model="formData.thumb"
                      />
                      <small
                        v-show="errors.has('Hình thumb')"
                        class="text-danger"
                        >{{ errors.first("Hình thumb") }}</small
                      >
                    </fieldset>
                  </div>

                  <div class="col-sm-12">
                    <fieldset class="form-group">
                      <label class="form-label semibold" for="summary"
                        >Summary</label
                      >
                      <textarea
                        v-model="formData.summary"
                        type="text"
                        class="form-control"
                        id="summary"
                        placeholder="Summary"
                      ></textarea>
                    </fieldset>
                  </div>

                  <div class="col-sm-12">
                    <fieldset class="form-group">
                      <label class="form-label semibold" for="category"
                        >Category</label
                      >
                      <select2
                        id="category"
                        v-validate="'required'"
                        data-vv-name="Category"
                        name="category"
                        v-model="formData.category"
                        :ajax="ajaxCategory"
                        placeholder="Chọn..."
                        :tags="true"
                        :createItem="true"
                      />

                      <small
                        v-show="errors.has('Category')"
                        class="text-danger"
                        >{{ errors.first("Category") }}</small
                      >
                    </fieldset>
                  </div>

                  <div class="col-sm-12">
                    <fieldset class="form-group">
                      <label class="form-label semibold" for="tags">Tags</label>
                      <select2
                        id="tags"
                        data-vv-name="Tags"
                        name="tags"
                        v-model="formData.tags"
                        :ajax="ajaxTags"
                        placeholder="Chọn..."
                        :tags="true"
                        :multiple="true"
                        :createItem="true"
                      />
                      <small v-show="errors.has('Tags')" class="text-danger">{{
                        errors.first("Tags")
                      }}</small>
                    </fieldset>
                  </div>

                  <div class="col-sm-12">
                    <fieldset class="form-group">
                      <label class="form-label semibold" for="status"
                        >Status</label
                      >
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Axios from "axios";
import ProductSelector from "./ProductSelector";
import ResourcesService from "@general/resources_service";

export default {
  name: "DetailPost",
  data() {
    return {
      leak: {},
      formData: {},
      cmsUrl: `${CMS_URL}/${this.$route.meta.controller}`,
      postType: this.$route.meta.controller.replace(/([^\/]+)\/posts/, "$1"),
      postTypeConfig: {},
      ajaxCategory: {
        url: `${CMS_URL}/${this.$route.meta.controller.replace(
          /([^\/]+)\/posts/,
          "$1"
        )}/properties/select2`,
        params: {
          type: "category",
        },
        textField: "name",
      },
      ajaxTags: {
        url: `${CMS_URL}/${this.$route.meta.controller.replace(
          /([^\/]+)\/posts/,
          "$1"
        )}/properties/select2`,
        params: {
          type: "tag",
        },
        textField: "name",
      },
      froalaConfig: {
        imageUploadURL: window.settings.services.webUrl + "/api/upload/image",
        imageUploadMethod: "POST",
        imageUploadParams: {
          type: "wysiwyg/post",
        },
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
                customData: {},
                customCode: {},
              },
              data
            )
          )
        );
      }
    },
    "formData.title"(val) {
      if (!this.$route.params.id)
        this.formData.slug = this.$options.filters["text2Slug"](val);
    },
    // "formData.slug"(val) {
    //   this.formData.slug = this.$options.filters["text2Slug"](val);
    // }
  },
  methods: {
    ...mapActions([
      "initService",
      "saveItem",
      "getItemById",
      "newItem",
      "goto",
    ]),
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
    leakUrl() {
      let that = this;
      Axios.post(`${CMS_URL}/fetchUrl`, {
        url: that.leak.url,
      }).then((resp) => {
        let content = resp.data
          .replace(/\n/gim, "")
          .replace(/>\s+</gim, "><")
          .replace(/<head(((?!<\/head>).)|\n)+<\/head>/gim, "")
          .replace(/<script(((?!<\/script>).)|\n)+<\/script>/gim, "")
          .replace(/href="[^"]+"/gim, 'href="#"');

        var div = document.createElement("div");
        div.innerHTML = content;
        if (!that.leak.selector) {
          let selector = "";
          $(div)
            .find('[id*="content"], [class*="content"]')
            .each(function () {
              let text = "";
              if ($(this).attr("id")) text += "#" + $(this).attr("id");
              if ($(this).attr("class")) text += "." + $(this).attr("class");
              selector +=
                '<a href="javascript:void(0)" class="selector-text">' +
                text +
                "</a> ";
            });
          $("#content-selector").html(selector);
          $("#content-selector .selector-text").on("click", function () {
            that.leak.selector = $(this).text();
            that.$forceUpdate();
            that.leakUrl();
          });
          return;
        }

        // Bind the content
        $("#content").html($(div).find(that.leak.selector).html());
        // Remove redundancy element
        $("#content div:has(>div)").each(function () {
          $(this).replaceWith($(this).html());
        });
        $("#content div, #content p").each(function () {
          let html = $(this).html();
          if (!html || html == "&nbsp;") {
            $(this).remove();
          }
        });
        $("#content div, #content p")
          .off("click")
          .on("click", function () {
            if ($(this).find("div, p").length == 0) {
              $(this).remove();
            }
          });

        // Bind heading to use to title
        let heading = "";
        $(div)
          .find("h1, h2")
          .each(function (i) {
            if (i == 0) {
              that.formData.title = $(this).text();
              that.$forceUpdate();
            }
            heading += this.outerHTML;
          });
        $("#heading").html(heading);
        $("#heading h1, #heading h2").on("click", function () {
          that.formData.title = $(this).text();
          $("#heading .hidden").not($(this)).removeClass("hidden");
          $(this).addClass("hidden");
          that.$forceUpdate();
        });

        // Bind image to use to thumb
        let image = "";
        $("#content img").each(function (i) {
          if (i == 0) {
            that.formData.thumb = $(this).attr("src");
            that.$forceUpdate();
          }
          image += this.outerHTML;
        });
        $("#image").html(image);
        $("#image img").on("click", function () {
          that.formData.thumb = $(this).attr("src");
          $("#image img.hidden").not($(this)).removeClass("hidden");
          $(this).addClass("hidden");
          that.$forceUpdate();
        });
      });
    },
    showPanel(position) {
      $(".col-left, .col-right")
        .removeClass("col-md-12")
        .removeClass("col-md-6")
        .removeClass("no-width");
      switch (position) {
        case "left":
          $(".col-left").addClass("col-md-12");
          $(".col-right").addClass("no-width");
          break;
        case "center":
          $(".col-left").addClass("col-md-6");
          $(".col-right").addClass("col-md-6");
          break;
        case "right":
          $(".col-left").addClass("no-width");
          $(".col-right").addClass("col-md-12");
          break;
      }
    },
    getContent() {
      this.formData.content = $("#content").html();
      this.$forceUpdate();
    },
    getPostTypeConfig() {
      new ResourcesService(`${CMS_URL}/settings`)
        .index({
          key: "post_type",
          perPage: 1,
        })
        .then(({ data }) => {
          this.postTypeConfig = data.data[0] || {};
          this.formData.customFields =
            this.postTypeConfig[`${this.postType}CustomFields`] || [];
          this.formData.customData = this.formData.customData || {};
        });
    },
  },
  components: {
    ProductSelector,
  },
  created() {
    this.initService(this.cmsUrl);
    let id = this.$route.params.id;
    if (id !== undefined) this.getItemById({ id });
    else this.newItem();
    this.getPostTypeConfig();
  },
  mounted() {},
};
</script>
<style type="text/css">
#content {
  height: 500px;
  overflow: hidden;
  overflow-y: scroll;
}
#content div,
#content p {
  border: 1px solid #eee;
  padding: 0.5em;
}
.no-width {
  width: 0;
  flex-basis: 0;
  overflow: hidden;
  margin: 0;
  padding: 0;
  height: 0;
}
#heading h1,
#heading h2 {
  border: 1px solid #eee;
  padding: 0.25em;
  font-size: 1em;
}
#image img {
  width: 25%;
  height: auto;
}
img {
  max-width: 100%;
  height: auto;
}
</style>
