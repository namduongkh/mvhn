<template>
  <div>
    <div class="row" v-if="menus.length">
      <div class="col-sm-6" v-for="menu in menus" :key="menu._id">
        <div class="media store-menu__item" @click="selectItem(menu)">
          <div class="media-left media-middle" style="width:25%">
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
  },
  data() {
    return {
      service: new ResourceService(
        window.settings.services.webUrl + `/stores/${this.storeId}/store_menus`
      ),
      menus: [],
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
  },
  created() {
    this.index();
  },
};
</script>
