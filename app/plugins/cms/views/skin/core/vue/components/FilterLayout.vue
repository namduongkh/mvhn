<template>
  <div class="row">
    <div v-for="(filter, index) in filters" :key="index" class="col-sm-3">
      <label :for="filter.name" v-text="filter.label + ':'"></label>
      <FieldEditor
        v-model="filterData[filter.name]"
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
      default: () => {}
    },
    filters: {
      type: Array,
      default: () => []
    }
  },
  data: () => {
    return {
      filterData: {}
    };
  },
  methods: {
    ...mapActions(["resetParams"]),
    resetFilter() {
      this.filterData = {};
      this.deleteFilterDataCookie();
      this.$router
        .push({ name: this.$route.name, query: this.filterData })
        .catch(err => {});
      setTimeout(() => {
        this.$refs.filterSubmit.click();
      }, 50);
    },
    filterCookieName() {
      return this.$route.name + "_filters";
    },
    setFilterDataCookie() {
      this.$cookie.set(
        this.filterCookieName(),
        JSON.stringify(this.filterData),
        {
          expires: "30m"
        }
      );
    },
    getFilterDataCookie() {
      this.filterData =
        JSON.parse(this.$cookie.get(this.filterCookieName())) || {};
    },
    deleteFilterDataCookie() {
      this.$cookie.delete(this.filterCookieName());
    }
  },
  created() {
    this.getFilterDataCookie();

    let valueWatcher = this.$watch(
      () => this.value,
      value => {
        if (value) {
          if (!value) return;

          this.filterData = Object.assign({}, this.filterData, value);
          this.$emit("forceDoFilter");
          valueWatcher();
        }
      }
    );
  },
  watch: {
    filterData: {
      deep: true,
      handler(val) {
        this.setFilterDataCookie();
        this.$emit("input", this.filterData);
      }
    }
  }
};
</script>

<style>
</style>
