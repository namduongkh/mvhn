<template>
  <div class="file-uploader" :class="wrapClass">
    <div v-if="fileUrl && !multiple" class="img-preview">
      <a :href="fileUrl" target="_blank">{{ fileUrl }}</a>
      <a href="javascript:void(0)" @click="removeImg(fileUrl)" class="text-danger">
        <i class="fa fa-trash"></i>
      </a>
    </div>

    <div v-if="multiple">
      <div v-for="(file, index) in listFile" class="file-preview" :key="index">
        <a :href="file" target="_blank">{{ file }}</a>
        <a href="javascript:void(0)" @click="removeImg(file, index)" class="text-danger">
          <i class="fa fa-trash"></i>
        </a>
      </div>
    </div>

    <div v-show="uploading" class="img-preview">
      <img
        src="/assets/images/loading.svg"
        class="img img-responsive"
        :class="classImg"
        alt="Img src"
      />
    </div>

    <input
      :id="id"
      :name="name"
      :multiple="false"
      class="hidden"
      type="file"
      ref="fileUpload"
      @change="upload"
    />
    <button
      v-show="!uploading"
      type="button"
      v-if="!fileUrl || multiple"
      class="btn btn-upload"
      :class="classButtonUpload"
      @click="uploadImg"
    >
      <i class="fa fa-folder-open"></i>
      {{ placeholder }}
    </button>

    <FileBrowser
      v-show="!uploading"
      v-if="!fileUrl || multiple"
      v-model="uploadedSrc"
      :button-class="classButtonUpload"
    ></FileBrowser>
  </div>
</template>

<script>
/**
 * Base usage: <imageUploader v-model="model" />
 * More options read below
 */

import UploadSrv from "./../services/upload";
import filePreviewer from "./filePreviewer";

export default {
  name: "file-uploader",
  props: {
    value: {
      type: [String, Array],
      default: null
    },
    placeholder: {
      type: String,
      default: "Browse"
    },
    wrapClass: {
      type: String,
      default: ""
    },
    classButtonUpload: {
      type: String,
      default: "btn-secondary"
    },
    classImg: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: () => Date.now() + ""
    },
    dirUpload: {
      type: String,
      default: null
    },
    prefix: {
      type: String,
      default: null
    },
    aspectRatio: {
      type: Number,
      default: 1
    },
    cropButton: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showCrop: false,
      fileUrl: this.value,
      listFile: this.value || [],
      index_crop: -1,
      uploading: false,
      componentId: Date.now(),
      previewingMedia: "",
      medias: [],
      uploadedSrc: null
    };
  },
  components: {
    filePreviewer
  },
  methods: {
    selectMedias() {
      let that = this;
      UploadSrv.medias({
        ext: { $nin: ["jpg", "png", "gif"] }
      }).then(resp => {
        that.medias = resp.data.data;
      });
    },
    uploadImg() {
      this.$refs.fileUpload.click();
    },
    removeImg(img_src, index) {
      if (this.multiple) {
        this.listFile.splice(index, 1);
        $("#" + this.id).val("");
        this.$emit("remove", img_src);
      } else {
        this.$emit("remove", img_src);
        $("#" + this.id).val("");
        this.fileUrl = null;
      }
    },
    upload(e) {
      let _this = this;
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      //   if (!file.type.includes("image/")) {
      //     _this.$notify("Vui lòng chọn hình ảnh", { type: "danger" });
      //     return;
      //   }
      let data = new FormData();
      data.append("file", files[0]);

      this.uploading = true;
      UploadSrv.uploadFile(data)
        .then(res => {
          if (res.data) {
            if (_this.multiple) {
              if (!_this.listFile) {
                _this.listFile = [];
              }
              _this.listFile.push(res.data.data.imgUrl);
            } else {
              _this.fileUrl = res.data.data.imgUrl;
            }
          }
          _this.uploading = false;
        })
        .catch(err => {
          console.log(err);
          _this.uploading = false;
          _this.$notify(err.message, { type: "danger" });
        });
    },
    saveImgCrop(base64) {
      let data = new FormData();
      data.append("image", base64);
      if (this.prefix) {
        data.append("prefix", this.prefix);
      }
      if (this.dirUpload) {
        data.append("directory", this.dirUpload);
      }

      let _this = this;
      UploadSrv.uploadBase64(data)
        .then(res => {
          if (res.data) {
            if (_this.multiple) {
              _this.listFile[_this.index_crop] = res.data.imgUrl;
              _this.$forceUpdate();
            } else {
              _this.fileUrl = res.data.imgUrl;
            }
          }
        })
        .catch(err => {
          _this.$notify(err.message, { type: "danger" });
        });
    }
  },
  computed: {},
  created() {
    let valueWatcher = this.$watch(
      () => this.value,
      value => {
        if (this.multiple) {
          this.listFile = Object.assign([], value);
        } else {
          this.fileUrl = value;
        }
        valueWatcher();
      }
    );
  },
  watch: {
    uploadedSrc(val) {
      if (!val) return;

      if (this.multiple) {
        this.listFile.push(val);
      } else {
        this.fileUrl = val;
      }
      this.uploadedSrc = null;
    },
    fileUrl(val) {
      this.$emit("input", val);
    },
    listFile: {
      handler: function(val) {
        this.$emit("input", val);
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
.img-preview {
  border: 1px solid #aaa;
  border-radius: 5px;
  padding: 10px;
}
</style>
