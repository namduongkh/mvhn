<template>
  <div class="row">
    <div class="col-sm-12" v-for="(section, index) in sections" :key="section._id">
      <div class="box-typical box-typical-padding">
        {{ section.title || section._id }}
        <div class="pull-right">
          <a
            :href="'/page_sections/' + section._id"
            target="_blank"
            class="btn btn-sm btn-secondary-outline"
          >
            <i class="fa fa-edit"></i>
          </a>
          <a @click="remove(section._id)" class="btn btn-sm btn-secondary-outline">
            <i class="fa fa-trash"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="col-sm-12">
      <a @click="create()" class="btn btn-block btn-secondary-outline">
        <i class="fa fa-plus"></i> New Section
      </a>
    </div>
  </div>
</template>

<script>
import ResourcesService from "@general/resources_service";

export default {
  name: "PageSections",
  props: {
    pageId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      service: new ResourcesService(`${CMS_URL}/page_sections`),
      sections: []
    };
  },
  methods: {
    index() {
      this.service
        .index({ page: this.pageId, sort: "order" })
        .then(({ data }) => {
          this.sections = data.data;
        });
    },
    remove(id) {
      if (!confirm("Are you sure?")) return;

      this.service.delete(id).then(() => {
        this.index();
      });
    },
    create() {
      this.service.create({ page: this.pageId }).then(() => {
        this.index();
      });
    },
    reorder(section1, order1, section2, order2) {
      this.service
        .update(section1._id, {
          order: order2
        })
        .then(() => {
          return this.service.update(section2._id, {
            order: order1
          });
        })
        .then(() => {
          this.index();
        });
    }
  },
  created() {
    this.index();
  }
};
</script>

<style>
</style>
