<template>
  <div class="product-detail">
    <FilterLayout
      :apiUrl="`/stores/${storeId}/products`"
      :filterConfig="[
        {
          label: 'Search',
          name: 'filter',
          type: 'text',
          placeholder: 'Search...',
        },
      ]"
    >
      <template v-slot:filter-item="props">
        <div class="post store-product">
          <a
            class="post-img"
            :href="'/products/' + props.item.slug"
            :title="props.item.name"
          >
            <img
              src="/assets/webmag/img/post-1.jpg"
              :alt="props.item.name"
              class="hide-img"
            />
            <img
              :src="props.item.thumb"
              :alt="props.item.name"
              class="show-img"
            />
          </a>

          <div class="post-body store-product__body">
            <div class="post-meta">
              <a
                class="post-category cat-4 property-text-black"
                :href="'/products/' + props.item.slug"
                :title="props.item.name"
                >{{ props.item.price | currency }}</a
              >

              <span
                class="post-date store-product__root-price"
                v-if="props.item.rootPrice"
                >{{ props.item.rootPrice | currency }}</span
              >
            </div>
            <h3 class="post-title">
              <a :href="'/products/' + props.item.slug">{{
                props.item.name
              }}</a>

              <div v-if="props.item.category">
                <small>{{ props.item.category.name }}</small>
              </div>
            </h3>
            <a
              v-if="enabledSelectProduct"
              class="store-product__selector"
              href="javascript:void(0)"
              @click="selectItem(props.item._id)"
            >
              <i class="fa fa-cart-plus"></i>
            </a>
          </div>
        </div>
      </template>
    </FilterLayout>
  </div>
</template>
<script>
import ResourcesService from "@CmsCore/vue/general/resources_service";

export default {
  name: "StoreProductsFilterLayout",
  props: {
    storeId: {
      type: String,
      required: true,
    },
    perPage: {
      type: Number,
      default: 8,
    },
    itemClass: {
      type: String,
    },
    enabledLoadMore: {
      type: Boolean,
      default: true,
    },
    exceptId: {
      type: String,
    },
    enabledSelectProduct: {
      type: Boolean,
      default: true,
    },
    slickMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      storeMenuSvc: new ResourcesService(
        `${window.settings.services.webUrl}/stores/${this.storeId}/store_menus`
      ),
      products: [],
      page: 1,
      lastPage: null,
    };
  },
  methods: {
    selectItem(productId) {
      this.storeMenuSvc
        .member(
          "get_from_product",
          "GET",
          {},
          {
            params: { productId, storeId: this.storeId },
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
          '<button type="button" class="slick-next"><i class="fa fa-arrow-right"></i></button>',
      };

      setTimeout(() => {
        $(".store-products").slick({
          prevArrow: arrow.left,
          nextArrow: arrow.right,
          infinity: true,
        });
      });
    },
  },
  created() {},
};
</script>
