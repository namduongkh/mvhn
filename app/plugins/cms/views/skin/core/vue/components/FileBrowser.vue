<template>
  <div style="display:inline">
    <button
      type="button"
      class="btn btn-upload"
      :class="buttonClass"
      @click="loadMedias()"
      data-toggle="modal"
      :data-target="'#medias_' + componentId"
    >
      <i class="fa fa-image"></i> Uploaded
    </button>
    <div :id="'medias_' + componentId" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Medias</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>External URL:</label>
              <input
                type="text"
                v-model="mediaUrl"
                class="form-control"
                placeholder="https://www.example.com/image.jpg"
              />
            </div>
            <div class="row">
              <div class="col-sm-12 medias-wrapper">
                <div v-if="selectedPath">
                  <a
                    href="javascript:void(0)"
                    @click="selectedPath = null"
                    class="btn btn-secondary-outline btn-sm"
                  >
                    <i class="fa fa-arrow-left"></i> Quay lại
                  </a>
                  <a
                    href="javascript:void(0)"
                    @click="selectMedia({path: selectedPath})"
                    data-dismiss="modal"
                    class="btn btn-secondary-outline btn-sm pull-right"
                  >
                    <i class="fa fa-check"></i> Chọn
                  </a>
                  <div class="selected-preview">
                    <img :src="selectedPath" class="img img-responsive" />
                  </div>
                </div>
                <div v-else class="row">
                  <div class="col-sm-12">
                    <div class="row">
                      <div class="col-sm-4 col-xs-12">
                        <label>Search:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="loadFilter.filter"
                          @change="loadMedias()"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                    <hr />
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Name</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody v-for="(media, index) in medias" :key="media._id + index">
                        <tr>
                          <td>{{ (page - 1) * 20 + index + 1 }}</td>
                          <td>
                            <a
                              href="javascript:void(0)"
                              @click="selectMedia(media)"
                              data-dismiss="modal"
                            >{{ media.name }}</a>
                          </td>
                          <td>
                            <a
                              href="javascript:void(0)"
                              @click="viewMedia(media)"
                              class="btn btn-secondary-outline btn-sm"
                            >
                              <i class="fa fa-eye"></i> Xem
                            </a>
                          </td>
                        </tr>
                        <tr v-if="media.isViewing">
                          <td colspan="2">
                            <img :src="media.path" class="img img-responsive" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <a
              href="javascript:void(0)"
              @click="loadMedias(page - 1)"
              class="btn btn-secondary-outline btn-sm"
            >
              <i class="fa fa-arrow-left"></i> Trước
            </a>
            <span class="label label-default">{{ page }}</span>
            <a
              href="javascript:void(0)"
              @click="loadMedias(page + 1)"
              class="btn btn-secondary-outline btn-sm"
            >
              <i class="fa fa-arrow-right"></i> Sau
            </a>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResourcesService from "@general/resources_service";

export default {
  name: "FileBrowser",
  props: {
    value: {
      type: String
    },
    buttonClass: {
      type: String
    }
  },
  data() {
    return {
      componentId: Date.now(),
      previewingMedia: null,
      service: new ResourcesService(
        window.settings.services.cmsUrl + "/medias"
      ),
      medias: [],
      mediaUrl: null,
      selectedPath: null,
      page: 1,
      lastPage: null,
      loadFilter: {}
    };
  },
  methods: {
    loadMedias(page = 1) {
      if (page < 1 || (this.lastPage && page > this.lastPage)) return;

      this.page = page;

      this.service
        .index({
          page,
          per_page: 20,
          ...this.loadFilter
        })
        .then(({ data }) => {
          this.medias = data.data;
          this.lastPage = data.last_page;
        });
    },
    viewMedia(media) {
      this.selectedPath = media.path;
      this.$forceUpdate();
    },
    selectMedia(media) {
      this.mediaUrl = media.path;
      this.$emit("input", media.path);
    }
  }
};
</script>

<style lang="scss">
.medias-wrapper {
  height: 65vh;
  overflow: auto;
}
[id^="medias_"] .modal-dialog {
  width: 90%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;

  .table {
    width: 100%;
    td {
      word-break: break-all;
    }
  }
}

.selected-preview {
  width: 100%;
  max-width: 350px;
  margin: 10px auto;
}
</style>