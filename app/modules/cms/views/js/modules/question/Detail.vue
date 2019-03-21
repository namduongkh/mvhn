<template>
    <div class="page-content">
        <div class="container-fluid">
            <DetailActions
                    title="Tư vấn"
                    listRouter="/questions"
                    routeDetail="/question"
                    :formData="formData"
                    :disable="errors.any()"
                    @action="save"
                    @reset="resetForm"
            />

            <form class="box-typical box-typical-padding">
                <div class="row">
                    <div class="col-sm-12">
                        <fieldset class="form-group">
                        <label class="form-label semibold" for="user">Người hỏi</label>
                            <input type="text" :value="formData.user ? formData.user.name : ''" class="form-control" disabled>
                        </fieldset>
                    </div>
                    <div class="col-sm-12">
                        <fieldset class="form-group">
                        <label class="form-label semibold" for="category">Chuyên mục</label>
                            <input type="text" :value="formData.category ? formData.category.name : ''" class="form-control" disabled>
                        </fieldset>
                    </div>
                    <div class="col-sm-12">
                        <fieldset class="form-group">
                            <label class="form-label" for="exampleInputPassword1">Nội dung câu hỏi</label>
                            <textarea rows="8" disabled class="form-control" v-model="formData.content"></textarea>
                        </fieldset>
                    </div>
                    <div class="col-sm-12">
                        <fieldset class="form-group">
                            <label class="form-label" for="exampleInputPassword1">Câu trả lời</label>
                            <textarea rows="8" class="form-control" v-model="formData.answer"></textarea>
                        </fieldset>
                    </div>
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                        <label class="form-label semibold" for="is_publish">Xuất bản</label>
                            <input type="checkbox" v-model="formData.is_publish">
                        </fieldset>
                    </div>
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                        <label class="form-label semibold" for="is_featured">Nổi bật</label>
                            <input type="checkbox" v-model="formData.is_featured">
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
                    <!-- <div class="col-sm-6">
                        <label class="form-label" for="status">{{testSelect2}}</label>
                        <select2 v-model="testSelect2" :options="testSelect2Opt"/>
                    </div> -->
                </div>
            </form><!--.box-typical-->
        </div><!--.container-fluid-->
    </div><!--.page-content-->
</template>
<script>
// TODO: Add select 2 category
let formData = {
  user: {},
  category: {},
  content: null,
  answer: null,
  is_publish: false
};

import { mapGetters, mapActions } from "vuex";

export default {
  name: "DetailQuestion",
  data() {
    return {
      formData: JSON.parse(JSON.stringify(formData)),
      apiUrl: `${window.settings.services.adminUrl}/question`,
      listCategory: [],
      ajaxCategory: {
        url: `${
          window.settings.services.adminUrl
        }/dynamicdata/ajaxOne?key=question_categories`,
        dataType: "json",
        xhrFields: { withCredentials: true },
        cache: true
      }
      //   ajaxAward: {
      //     url: `${window.settings.services.adminUrl}/award/ajax`,
      //     dataType: "json",
      //     xhrFields: { withCredentials: true },
      //     cache: true
      //   }
      // testSelect2:null,
      // testSelect2Opt: [
      //     {id: 'val1', text: 'Value 1'},
      //     {id: 'val2', text: 'Value 2'},
      //     {id: 'val3', text: 'Value 3'},
      //     {id: 'val4', text: 'Value 4'},
      //     {id: 'val5', text: 'Value 5'},
      // ]
    };
  },
  computed: {
    ...mapGetters(["itemSelected"])
  },
  watch: {
    itemSelected(data) {
      if (data) {
        let templateData = Object.assign({}, formData);
        this.formData = JSON.parse(
          JSON.stringify(Object.assign({}, templateData, data))
        );
      }
    },
    "formData.title"(val) {
      this.formData.slug = this.$options.filters["text2Slug"](val);
    },
    "formData.slug"(val) {
      this.formData.slug = this.$options.filters["text2Slug"](val);
    }
  },
  methods: {
    ...mapActions(["initService", "saveItem", "getItemById"]),
    save(options) {
      let self = this;
      this.$validator.validateAll().then(res => {
        if (res) {
          self.saveItem({ formData: self.formData, options });
        } else {
          this.$notify("Please check data", {
            type: "warning",
            placement: {
              from: "bottom"
            }
          });
        }
      });
    },
    resetForm() {
      this.formData = JSON.parse(JSON.stringify(formData));
      this.errors.clear();
    }
  },
  components: {},
  created() {
    this.initService(this.apiUrl);
    let id = this.$route.params.id;
    if (id !== undefined) this.getItemById({ id });
  },
  mounted() {}
};
</script>