<template>
  <div class="row">
    <div v-for="(filter, index) in filters" :key="index" class="col-sm-3">
      <label :for="filter.name" v-text="filter.label + ':'"></label>
      <FieldEditor
        v-model="componentFilter[filter.name]"
        :field="{
          type: filter.type,
          key: filter.name,
          placeholder: filter.placeholder || filter.label,
          options: filter.options || ''
        }"
      ></FieldEditor>
    </div>
    <div class="col-sm-2">
      <div class="form-group">
        <label>Hành động</label>
        <button type="submit" ref="filterSubmit" class="btn btn-primary-outline">Lọc</button>
        <button type="button" @click="resetFilter()" class="btn btn-secondary-outline">Reset</button>
        <slot name="additionalAction" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "FilterLayout",
  components: {},
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    filters: {
      type: Array,
      default: () => [],
    },
  },
  data: () => {
    return {
      componentFilter: {},
    };
  },
  computed: {
    ...mapGetters(["filterData", "onResetParams", "isReloadTable"]),
  },
  methods: {
    ...mapActions(["resetParams", "reloadTable", "setParams"]),
    resetFilter() {
      this.componentFilter = {};
      this.resetParams();
      this.deleteFilterDataCookie();
      this.getDefaultValue();
      this.$router.push({
        name: this.$route.name,
        query: this.componentFilter,
      });
      setTimeout(() => {
        this.reloadTable();
      }, 100);
    },
    filterCookieName() {
      return this.$route.name + "_filters";
    },
    setFilterDataCookie() {
      this.$cookie.set(
        this.filterCookieName(),
        JSON.stringify(this.componentFilter),
        {
          expires: "30m",
        }
      );
    },
    getFilterDataCookie() {
      this.componentFilter =
        JSON.parse(this.$cookie.get(this.filterCookieName())) || {};
      this.setFilterData();
    },
    deleteFilterDataCookie() {
      this.$cookie.delete(this.filterCookieName());
    },
    setFilterData() {
      this.setParams(this.componentFilter);
    },
    getDefaultValue(watch = false) {
      let defaultValue = {};
      this.filters.forEach((f) => {
        if (watch && f.hotFilter)
          this.$watch(
            () => this.componentFilter[f.name],
            () => {
              this.reloadTable();
            }
          );
        if (f.default) defaultValue[f.name] = f.default;
      });
      this.componentFilter = defaultValue;
    },
  },
  created() {
    this.getFilterDataCookie();
    this.getDefaultValue(true);
  },
  watch: {
    componentFilter: {
      deep: true,
      handler(value) {
        this.setFilterDataCookie();
        this.setFilterData();
      },
    },
  },
};
</script>

<style>
</style>
