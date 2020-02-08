<template>
  <div class="image-uploader" :class="wrapClass">
    <div v-if="imgSrc && !multiple" class="img-preview">
      <img :src="imgSrc" class="img img-responsive" :class="classImg" alt="Img src" />
      <div class="actions">
        <button type="button" @click="removeImg(imgSrc)" class="btn btn-danger">Remove</button>
        <button type="button" v-if="cropButton" @click="crop(imgSrc)" class="btn btn-warning">Crop</button>
      </div>
    </div>

    <div v-if="multiple">
      <div v-for="(img, index) in listImg" :key="index" class="img-preview">
        <img :src="img" class="img img-responsive" :class="classImg" alt="Img src" />
        <div class="actions">
          <button type="button" @click="removeImg(img, index)" class="btn btn-danger">Remove</button>
          <button
            type="button"
            v-if="cropButton"
            @click="crop(img, index)"
            class="btn btn-warning"
          >Crop</button>
        </div>
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
      v-if="!imgSrc || multiple"
      class="btn btn-upload"
      :class="classButtonUpload"
      @click="uploadImg"
    >{{ placeholder }}</button>

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
 * Base usage: <imageUploader v-model="model" />
 * More options read below
 */

import UploadSrv from "./services/upload";
import CropImage from "./crop-image";

export default {
  name: "image-uploader",
  props: {
    value: {
      type: [String, Array],
      default: null
    },
    placeholder: {
      type: String,
      default: "Upload"
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
      uploading: false
    };
  },
  methods: {
    uploadImg() {
      this.$refs.fileUpload.click();
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
        // _this.$notify("Vui lòng chọn hình ảnh", { type: "danger" });
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
              _this.listImg.push(res.data.data.imgUrl);
            } else {
              _this.imgSrc = res.data.data.imgUrl;
            }
          }
          _this.uploading = false;
        })
        .catch(err => {
          console.log(err);
          _this.uploading = false;
          // _this.$notify(err.message, { type: "danger" });
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
              _this.listImg[_this.index_crop] = res.data.imgUrl;
              _this.$forceUpdate();
            } else {
              _this.imgSrc = res.data.imgUrl;
            }
          }
        })
        .catch(err => {
          // _this.$notify(err.message, { type: "danger" });
        });
    }
  },
  computed: {},
  watch: {
    imgSrc(val) {
      console.table(val);
      this.$emit("input", val);
    },
    listImg: {
      handler: function(val) {
        this.$emit("input", val);
      },
      deep: true
    },
    value: {
      deep: true,
      handler: function(value) {
        if (this.multiple) {
          this.listImg = value;
        } else {
          this.imgSrc = value;
        }
      }
    }
  },
  components: {
    CropImage
  },
  created() {}
};
</script>

<style lang="scss">
.image-uploader {
  display: table;
  width: fit-content;
  .actions {
    position: absolute;
    z-index: 10;
    width: 100%;
    text-align: center;
    top: 45%;
    display: none;
  }
  .img-preview {
    position: relative;
    max-width: 350px;
    display: inline-block;
    margin-right: 20px;
    img {
      width: 100%;
    }
    &:hover {
      .actions {
        display: block;
      }
    }
  }
}
</style>
