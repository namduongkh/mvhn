<template>
  <div>
    <div class="row" v-if="allowCustomMenu">
      <div class="col-12">
        <ToggleButton v-model="customMenuMode" text="Tự chọn" />
      </div>
    </div>
    <form @submit.prevent="selectCustomItem">
      <div class="row mb-5" v-if="customMenuMode">
        <div class="col-4">
          <label class="font-weight-bold d-block" for="customItemName"
            >Tên món</label
          >
          <input
            type="text"
            class="form-control"
            v-model="customItem.name"
            id="customItemName"
            placeholder="Tên món tuỳ chọn"
            v-validate="'required'"
            data-vv-name="Tên món"
            required
          />
        </div>
        <div class="col-4">
          <label class="font-weight-bold d-block" for="customItemPrice"
            >Giá</label
          >
          <input
            type="number"
            class="form-control"
            v-model="customItem.price"
            id="customItemPrice"
            placeholder="Giá tuỳ chọn"
            min="0"
          />
        </div>
        <div class="col-4">
          <label class="font-weight-bold d-block">&nbsp;</label>
          <button type="submit" class="btn btn-primary">
            <em class="fa fa-send"></em>
            Chọn
          </button>
        </div>
      </div>
    </form>
    <div class="row" v-if="!customMenuMode && menus.length">
      <div class="col-sm-6" v-for="menu in menus" :key="menu._id">
        <div class="media store-menu__item" @click="selectItem(menu)">
          <div class="media-left media-middle" style="width: 25%">
            <ImageAsAvatar :src="menu.image" :alt="menu.name" />
          </div>
          <div class="media-body">
            <h4 class="media-heading">{{ menu.name }}</h4>
            <div v-if="!hidePrice">{{ menu.price | currency }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">Chưa có mặt hàng</div>
  </div>
</template>
<script>
import ResourceService from "@CmsCore/vue/general/resources_service";
import { sumBy } from "lodash";

export default {
  name: "StoreMenu",
  props: {
    storeId: {
      type: String,
      required: true,
    },
    cartNumber: {
      type: Number,
      default: 0,
    },
    hidePrice: {
      type: Boolean,
      default: false,
    },
    allowCustomMenu: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      service: new ResourceService(
        window.settings.services.webUrl + `/stores/${this.storeId}/store_menus`
      ),
      menus: [],
      customItem: {},
      customMenuMode: false,
    };
  },
  methods: {
    index() {
      this.service
        .index({
          status: 1,
          type: "sale",
          product: JSON.stringify({ $eq: null }),
        })
        .then(({ data }) => {
          this.menus = data.data;
        });
    },
    selectItem(item) {
      this.$store.dispatch("store/selectMenuItems", item);
    },
    selectCustomItem() {
      this.customItem.price = this.customItem.price || 0;
      this.$validator.validateAll().then((res) => {
        if (res) this.selectItem(this.customItem);
      });
    },
  },
  created() {
    this.index();
  },
};
</script>
