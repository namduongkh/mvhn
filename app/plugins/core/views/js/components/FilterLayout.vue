<template>
  <div class="row filter-layout">
    <div class="col-3" v-if="filterConfig && filterConfig.length">
      <div
        class="filter-layout__filter-item"
        v-for="(filter, index) in filterConfig"
        :key="`filter-${index}`"
      >
        <FilterLayoutItem
          :config="filter"
          v-model="filterParams[filter.name]"
          @change="onFilterChange"
        />
      </div>
      <div class="text-right">
        <button type="button" class="btn btn-secondary" @click="reset()">
          Reset
        </button>
        <button type="button" class="btn btn-primary" @click="onFilterChange">
          Lọc
        </button>
      </div>
    </div>
    <div class="col-9">
      <div class="row" v-if="items && items.length">
        <div
          class="col-sm-4 filter-layout__item"
          v-for="(item, index) in items"
          :key="index"
        >
          <slot name="filter-item" v-bind:item="item"></slot>
        </div>
      </div>
      <div v-else class="text-center">
        {{ noItemText }}
      </div>
    </div>
  </div>
</template>

<script>
import PagingService from "@Plugin/core/views/js/services/paging_service";
import FilterLayoutItem from "./FilterLayoutItem.vue";

export default {
  props: {
    apiUrl: {
      type: String,
    },
    noItemText: {
      type: String,
      default: () => "No Item",
    },
    filterConfig: {
      type: Array,
      default: () => [],
    },
    itemsPerPage: {
      type: Number,
      default: 30,
    },
  },
  data() {
    return {
      filterParams: {},
      pagingService: new PagingService(this.apiUrl, this.itemsPerPage, () => {
        return this.filterParams;
      }),
      items: [],
    };
  },
  components: { FilterLayoutItem },
  methods: {
    load() {
      this.pagingService.next().then(({ data }) => {
        this.items = data.data;
      });
    },
    onFilterChange() {
      this.pagingService.reset();
      this.load();
    },
    reset() {
      this.filterParams = {};
      this.onFilterChange();
    },
  },
  mounted() {
    this.load();
  },
};
</script>

<style>
</style>
