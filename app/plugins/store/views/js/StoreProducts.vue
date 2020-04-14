<template>
  <div class="product-detail">
    <div v-if="products.length">
      <div class="row store-products">
        <div :class="itemClass || 'col-sm-3 col-xs-6'" v-for="product in products" :key="product._id">
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
                v-if="enabledSelectProduct"
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
      <div class="row" v-if="enabledLoadMore && page !== lastPage && !slickMode">
        <p class="col-sm-12">
          <a href="javascript:void(0)" class="btn btn-block btn-default" @click="loadMore()">
            <i class="fa fa-eye" /> Xem thêm
          </a>
        </p>
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
    },
    perPage: {
      type: Number,
      default: 8
    },
    itemClass: {
      type: String
    },
    enabledLoadMore: {
      type: Boolean,
      default: true
    },
    exceptId: {
      type: String
    },
    enabledSelectProduct: {
      type: Boolean,
      default: true
    },
    slickMode: {
      type: Boolean,
      default: false
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
      products: [],
      page: 1,
      lastPage: null
    };
  },
  methods: {
    index() {
      let params = {
        status: 1,
        page: this.page,
        per_page: this.perPage,
        sort: "createdAt|desc"
      };
      if (this.exceptId) {
        params._id = JSON.stringify({ $ne: this.exceptId });
      }

      this.service.index(params).then(({ data }) => {
        this.products = this.products.concat(data.data);
        this.lastPage = data.last_page;
        if (this.slickMode) this.runSlick();
      });
    },
    loadMore() {
      if (this.page == this.lastPage) return;

      this.page++;
      this.index();
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
    },
    runSlick() {
      let arrow = {
        left:
          '<button type="button" class="slick-prev"><i class="fa fa-arrow-left"></i></button>',
        right:
          '<button type="button" class="slick-next"><i class="fa fa-arrow-right"></i></button>'
      };

      setTimeout(() => {
        $(".store-products").slick({
          prevArrow: arrow.left,
          nextArrow: arrow.right,
          infinity: true
        });
      });
    }
  },
  created() {
    this.index();
  }
};
</script>
