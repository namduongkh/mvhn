<template>
  <select>
    <slot></slot>
  </select>
</template>

<script>
/**
 * Created by Tất Chủ <tatchu.it@gmail.com>
 * Base usage: <select2 v-model="model" :options="options"/>
 * More options see below and docs at https://select2.org
 */
import Axios from "axios";
import _ from "lodash";

export default {
  name: "select2",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {},
    placeholder: {
      type: String,
      default() {
        return "Select one item";
      }
    },
    ajax: {
      type: Object,
      default() {
        return null;
      }
    },
    createTag: {
      type: Function,
      default() {
        return null;
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
    },
    multiple: {
      type: Boolean,
      default() {
        return false;
      }
    },
    tags: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  computed: {
    elm() {
      return $(this.$el);
    }
  },
  data() {
    return {
      fixed_options: false
    };
  },
  mounted: function() {
    // init select2
    if (this.ajax && this.ajax.url && this.value) {
      this.initFixedOptions();
    } else {
      this.init();
    }
  },
  watch: {
    value: function(value, oldVal) {
      // update value
      if (this.multiple) {
        let current_val = this.elm.val();
        if (JSON.stringify(value) !== JSON.stringify(current_val)) {
          this.elm.val(value).trigger("change");
        }
      } else {
        let vm = this;
        if (vm.ajax && vm.ajax.url && vm.value && !vm.fixed_options) {
          this.initFixedOptions();
        } else {
          this.elm.val(value).trigger("change");
        }
      }
    },
    options: function(options) {
      // update options
      this.elm.select2("data", options);
    },
    disabled(val) {
      $(this.$el).select2.defaults.set("disabled", val);
    }
  },
  methods: {
    ajaxObject() {
      let that = this;
      return _.extend(
        {
          data: function(params) {
            var query = _.extend(
              {
                filter: params.term,
                idField: "_id",
                textField: that.ajax.textField,
                select2: true,
                status: 1,
                page: 1,
                per_page: 25
              },
              that.ajax.params
            );

            return query;
          },
          processResults: function(data) {
            return {
              results: data.data
            };
          },
          dataType: "json",
          xhrFields: { withCredentials: true },
          cache: true
        },
        that.ajax
      );
    },
    init() {
      if (this.ajax.autoload) {
        Axios.get(this.ajaxObject().url, {
          withCredentials: true,
          params: this.ajaxObject().data({})
        }).then(({ data }) => {
          bindSelect2(this, data.data);
        });
      } else {
        bindSelect2(this);
      }
    },
    initFixedOptions() {
      let vm = this;
      Axios.get(this.ajaxObject().url, {
        withCredentials: true,
        params: { notPaginate: true }
      }).then(({ data }) => {
        if (data.data && data.data.length) {
          vm.fixed_options = true;
          bindSelect2(vm, data.data);
          this.elm.val(vm.value).trigger("change");
        } else {
          vm.init();
        }
      });
    }
  },
  destroyed: function() {
    $(this.$el)
      .off()
      .select2("destroy");
  }
};

function bindSelect2(vm, options) {
  vm.elm
    .select2({
      data: options || vm.options,
      ajax: (vm.ajax && vm.ajax.url && vm.value) || vm.ajax.autoload ? null : vm.ajaxObject(),
      placeholder: vm.placeholder,
      disabled: vm.disabled,
      tags: vm.tags,
      multiple: vm.multiple,
      createTag: vm.createTag
    })
    .val(vm.value)
    .trigger("change")
    // emit event on change.
    .on("change", function() {
      vm.$emit("input", vm.elm.val());
    });
}
</script>

<style>
.select2-container--default .select2-selection--single {
  border: none;
}
.select2-container--default
  .select2-selection--single
  .select2-selection__rendered {
  height: 18px;
}
.select2-container--default
  .select2-selection--single
  .select2-selection__arrow {
  height: 38px;
}
.select2-container--default
  .select2-results__option--highlighted[aria-selected] {
}

.select2-container--default
  .select2-results__option--highlighted[aria-selected] {
  background-color: #5897fb !important;
  color: white;
}
.select2-results__option {
  background: #fff !important;
  color: #000;
}

.select2-container--default
  .select2-selection--multiple
  .select2-selection__rendered
  li {
  padding-right: 29px;
}
.select2-container--default
  .select2-selection--multiple
  .select2-selection__choice {
  background: #919fa9;
}
.select2-selection {
  min-height: 38px;
}
</style>