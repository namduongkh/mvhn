<template>
  <div class="image-uploader" :class="wrapClass">
    <div v-if="imgSrc && !multiple" class="img-preview">
      <img :src="imgSrc" class="img img-fluid" :class="classImg" alt="Img src" />
      <div class="actions">
        <a href="javascript:void(0)" @click="removeImg(imgSrc)" class="text-danger">
          <i class="fa fa-trash"></i> Remove
        </a>
        <a href="javascript:void(0)" v-if="cropButton" @click="crop(imgSrc)" class="text-warning">
          <i class="fa fa-crop"></i> Crop
        </a>
      </div>
    </div>

    <div v-if="multiple" class="row">
      <div v-for="(img, index) in listImg" :key="index" class="img-preview col-sm-4">
        <img :src="img" class="img img-fluid" :class="classImg" alt="Img src" />
        <div class="actions">
          <a href="javascript:void(0)" @click="removeImg(img, index)" class="text-danger">
            <i class="fa fa-trash"></i> Remove
          </a>
          <a
            href="javascript:void(0)"
            v-if="cropButton"
            @click="crop(img, index)"
            class="text-warning"
          >
            <i class="fa fa-crop"></i> Crop
          </a>
        </div>
      </div>
    </div>

    <div v-show="uploading" class="img-preview">
      <small>Đang tải...</small>
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
      v-if="!imgSrc || multiple"
      class="btn btn-upload"
      :class="classButtonUpload"
      @click="uploadImg"
    >
      <i class="fa fa-folder-open"></i>
      {{ placeholder }}
    </button>&nbsp;
    <FileBrowser
      v-show="!uploading"
      v-if="!imgSrc || multiple"
      v-model="uploadedSrc"
      :button-class="classButtonUpload"
    ></FileBrowser>

    <CropImage
      v-if="cropButton"
      @save="saveImgCrop"
      :image="img_src_crop"
      :showCrop="showCrop"
      :aspectRatio="aspectRatio"
      @cancel="showCrop = false"
    />
  </div>
</template>

<script>
/**
 * Created by Tất Chủ <tatchu.it@gmail.com>
 * Base usage: <imageUploader v-model="model" />
 * More options read below
 */

import UploadSrv from "./../services/upload";
import CropImage from "./cropImage";

export default {
  name: "image-uploader",
  props: {
    value: {
      type: [String, Array],
      default: null
    },
    placeholder: {
      type: String,
      default: "Browser"
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
      imgSrc: this.value,
      listImg: this.value || [],
      img_src_crop: null,
      index_crop: -1,
      uploading: false,
      medias: [],
      previewingMedia: "",
      componentId: Date.now(),
      uploadedSrc: null
    };
  },
  methods: {
    uploadImg() {
      this.$refs.fileUpload.click();
    },
    selectMedias() {
      let that = this;
      UploadSrv.medias().then(resp => {
        that.medias = resp.data.data;
      });
    },
    removeImg(img_src, index) {
      if (this.multiple) {
        this.listImg.splice(index, 1);
        $("#" + this.id).val("");
        this.$emit("remove", img_src);
      } else {
        this.$emit("remove", img_src);
        $("#" + this.id).val("");
        this.imgSrc = null;
      }
    },
    crop(img_src, index) {
      this.img_src_crop = img_src;
      if (this.multiple) {
        this.index_crop = index;
      }
      this.showCrop = true;
    },
    upload(e) {
      let _this = this;
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      if (!file.type.includes("image/")) {
        _this.$notify("Vui lòng chọn hình ảnh", { type: "danger" });
        return;
      }
      let data = new FormData();
      data.append("file", files[0]);

      this.uploading = true;
      UploadSrv.uploadImg(data)
        .then(res => {
          if (res.data) {
            if (_this.multiple) {
              if (!_this.listImg) {
                _this.listImg = [];
              }
              _this.listImg.push(res.data.data.link);
            } else {
              _this.imgSrc = res.data.data.link;
            }
          }
        })
        .catch(err => {
          console.log(err);
          _this.uploading = false;
          _this.$notify(err.message, { type: "danger" });
        })
        .finally(() => {
          _this.uploading = false;
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
              _this.listImg[_this.index_crop] = res.data.link;
              _this.$forceUpdate();
            } else {
              _this.imgSrc = res.data.link;
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
          this.listImg = Object.assign([], value);
        } else {
          this.imgSrc = value;
        }
        valueWatcher();
      }
    );
  },
  watch: {
    uploadedSrc(val) {
      if (!val) return;

      if (this.multiple) {
        this.listImg.push(val);
      } else {
        this.imgSrc = val;
      }
      this.uploadedSrc = null;
    },
    imgSrc(val) {
      // console.table(val)
      this.$emit("input", val);
    },
    listImg: {
      handler: function(val) {
        this.$emit("input", val);
      },
      deep: true
    }
  },
  components: {
    CropImage
  }
};
</script>

<style lang="scss">
.btn-upload {
  margin-bottom: 5px;
}
.image-uploader {
  display: table;
  width: fit-content;
  .actions {
    width: 100%;
    text-align: center;

    a {
      white-space: nowrap;
    }
  }
  .img-preview {
    position: relative;
    max-width: 350px;
    display: inline-block;
    margin-bottom: 20px;
    img {
      width: 100%;
    }
  }
}
</style>
