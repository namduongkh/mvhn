<template>
  <div>
    <br />
    <h2>Sản phẩm:</h2>
    <div class="row" v-if="products.length">
      <div class="col-sm-3 col-xs-2" v-for="product in products" :key="product._id">
        <div class="post store-product">
          <a class="post-img" :href="'/products/' + product.slug" :title="product.name">
            <img src="/assets/webmag/img/post-1.jpg" :alt="product.name" class="hide-img" />
            <img :src="product.thumb" :alt="product.name" class="show-img" />
          </a>

          <div class="post-body store-product__body">
            <div class="post-meta">
              <a
                class="post-category cat-4 property-text-black"
                :href="'/products/' + product.slug"
                :title="product.name"
              >{{ product.price | currency }}</a>

              <span
                class="post-date store-product__root-price"
                v-if="product.rootPrice"
              >{{ product.rootPrice | currency }}</span>
            </div>
            <h3 class="post-title">
              <a :href="'/products/' + product.slug">{{ product.name }}</a>

              <div v-if="product.category">
                <small>{{ product.category.name }}</small>
              </div>
            </h3>
            <a
              class="store-product__selector"
              href="javascript:void(0)"
              @click="selectItem(product._id)"
            >
              <i class="fa fa-cart-plus"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">Chưa có sản phẩm</div>
  </div>
</template>
<script>
import ResourcesService from "@CmsCore/vue/general/resources_service";

export default {
  name: "StoreProducts",
  props: {
    storeId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      service: new ResourcesService(
        window.settings.services.webUrl + `/stores/${this.storeId}/products`
      ),
      storeMenuSvc: new ResourcesService(
        `${window.settings.services.webUrl}/stores/${this.storeId}/store_menus`
      ),
      products: []
    };
  },
  methods: {
    index() {
      this.service
        .index({
          status: 1
        })
        .then(({ data }) => {
          this.products = data.data;
        });
    },
    selectItem(productId) {
      this.storeMenuSvc
        .member(
          "get_from_product",
          "GET",
          {},
          {
            params: { productId, storeId: this.storeId }
          }
        )
        .then(({ data }) => {
          this.$store.dispatch("store/selectMenuItems", data);
        });
    }
  },
  created() {
    this.index();
  }
};
</script>
