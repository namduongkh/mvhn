<template>
  <div>
    <div class="row">
      <div
        data-dismiss="modal"
        class="col-sm-3"
        v-for="(product, index) in selectedProducts"
        :key="index"
      >
        <img :src="product.thumb" :alt="product.name" class="img img-fluid">
        <h6>
          {{ product.name }}
          <a @click="removeProduct(product)">
            <i class="fa fa-remove"></i>
          </a>
        </h6>
      </div>
    </div>
    <button
      @click="getProducts()"
      data-toggle="modal"
      data-target="#product-selector"
      type="button"
      class="btn btn-primary"
    >
      <i class="fa fa-plus"></i> Add product
    </button>
    <div id="product-selector" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Products</h4>
          </div>
          <div class="modal-body">
            <div class="row form-group">
              <div class="col-sm-8">
                <input
                  type="text"
                  v-model="filter"
                  class="form-control"
                  placeholder="Product name..."
                >
              </div>
              <div class="col-sm-4">
                <button @click="getProducts({filter})" type="button" class="btn btn-primary">
                  <i class="fa fa-search"></i> Filter
                </button>
                <button @click="filter = '';getProducts()" type="button" class="btn btn-secondary">
                  <i class="fa fa-remove"></i> Clear
                </button>
              </div>
            </div>
            <div class="row">
              <h6 class="text-center" v-if="products.length == 0">No products found</h6>
              <a
                @click="selectProduct(product)"
                data-dismiss="modal"
                class="col-sm-3"
                v-for="(product, index) in products"
                :key="index"
              >
                <img :src="product.thumb" :alt="product.name" class="img img-fluid">
                <h6>{{ product.name }}</h6>
              </a>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import Service from "@general/services.class";
import { extend, remove } from "lodash";

export default {
  name: "ProductSelector",
  props: {
    post: {
      type: Object,
      default: {}
    },
    value: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      products: [],
      selectedIds: this.value,
      selectedProducts: [],
      filter: "",
      service: new Service(`${CMS_URL}/products`)
    };
  },
  mounted() {
    setTimeout(() => {
      this.getProducts({ _id: { $in: this.selectedIds } }, true);
    }, 200);
  },
  methods: {
    selectProduct(product) {
      if (!this.selectedIds.includes(product._id)) {
        this.selectedIds.push(product._id);
        this.selectedProducts.push(product);
      }
    },
    removeProduct(product) {
      this.selectedIds = remove(this.selectedIds, function(id) {
        return id.toString() != product._id.toString();
      });
      this.selectedProducts = remove(this.selectedProducts, function(p) {
        return p._id.toString() != product._id.toString();
      });
    },
    getProducts(filters = { filter: "" }, init = false) {
      let vm = this;
      vm.service
        .getItems(
          extend(
            {
              select: "name thumb",
              status: 1,
              _id: { $nin: vm.selectedIds },
              sort: "createdAt|desc"
              // category: vm.post.category,
              // tags: { $in: vm.post.tags }
            },
            filters
          )
        )
        .then(resp => {
          vm.products = resp.data.data;
          if (init) {
            vm.selectedProducts = resp.data.data;
          }
        });
    }
  },
  watch: {
    value: {
      deep: true,
      handler: function(value) {
        this.selectedIds = value;
      }
    },
    selectedIds(val) {
      this.$emit("input", val);
    }
  }
};
</script>

