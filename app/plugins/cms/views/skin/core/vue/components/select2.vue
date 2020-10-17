<template>
  <select style="width: 100%">
    <slot></slot>
  </select>
</template>

<script>
import Axios from "axios";
import _ from "lodash";

export default {
  name: "select2",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    value: {},
    placeholder: {
      type: String,
      default() {
        return "Select one item";
      },
    },
    ajax: {
      type: Object,
      default() {
        return null;
      },
    },
    createItem: {
      type: [Function, Boolean],
      default() {
        return null;
      },
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
    },
    multiple: {
      type: Boolean,
      default() {
        return false;
      },
    },
    tags: {
      type: Boolean,
      default() {
        return false;
      },
    },
    allowClear: {
      type: Boolean,
      default() {
        return true;
      },
    },
    minimumInputLength: {
      type: Number,
      default: 0,
    },
    callback: {
      type: Function,
    },
  },
  computed: {
    elm() {
      return $(this.$el);
    },
  },
  data() {
    return {
      fixed_options: false,
    };
  },
  mounted: function () {
    this.init();
  },
  watch: {
    value: function (value, oldVal) {
      // update value
      if (this.multiple) {
        let current_val = this.elm.val();
        if (JSON.stringify(value) !== JSON.stringify(current_val)) {
          this.elm.val(value).trigger("change");
        }
      } else {
        this.init().then(() => {
          this.elm.val(value).trigger("change");
        });
      }
    },
    options: function (options) {
      // update options
      this.elm.select2("data", options);
    },
    disabled(val) {
      $(this.$el).select2.defaults.set("disabled", val);
    },
  },
  methods: {
    ajaxObject() {
      let self = this;

      return _.extend(
        {
          data: function (params) {
            var query = _.extend(
              {
                filter: params.term,
                select2: JSON.stringify({
                  id: params.id,
                  idField: (self.ajax && self.ajax.idField) || "_id",
                  textField:
                    self.ajax && self.ajax.textTemplate
                      ? null
                      : (self.ajax && self.ajax.textField) || "name",
                  textTemplate: self.ajax && self.ajax.textTemplate,
                  select: self.ajax && self.ajax.select,
                }),
                status: 1,
                page: 1,
                perPage: 25,
              },
              (self.ajax && self.ajax.params) || {}
            );

            return query;
          },
          processResults: function (data) {
            return {
              results: data.data,
            };
          },
          dataType: "json",
          xhrFields: { withCredentials: true },
          cache: true,
        },
        self.ajax
      );
    },
    init() {
      if (this.ajax && this.value) {
        return Axios.get(this.ajaxObject().url, {
          withCredentials: true,
          params: this.ajaxObject().data({ id: this.value }),
        }).then(({ data }) => {
          bindSelect2(this, data.data);
        });
      } else {
        bindSelect2(this);
      }
    },
    initFixedOptions() {
      // let vm = this;
      // Axios.get(this.ajaxObject().url, {
      //   withCredentials: true,
      //   params: { ...this.ajaxObject().data({}) },
      // }).then(({ data }) => {
      //   if (data.data && data.data.length) {
      //     vm.fixed_options = true;
      //     bindSelect2(vm, data.data);
      //     this.elm.val(vm.value).trigger("change");
      //   } else {
      //     vm.init();
      //   }
      // });
    },
  },
  destroyed: function () {
    $(this.$el).off().select2("destroy");
  },
};

function bindSelect2(vm, options) {
  options = options || vm.options || [];
  let callback = vm.callback || function (e) {};

  let selectedOption = options.find((o) => {
    return o == vm.value || o.id == vm.value;
  });

  vm.elm
    .select2({
      data: options,
      ajax: vm.ajax && vm.ajax.url ? vm.ajaxObject() : null,
      placeholder: vm.placeholder,
      disabled: vm.disabled,
      multiple: vm.multiple,
      tags: vm.tags || vm.createItem,
      createTag:
        vm.createItem == true
          ? function (params) {
              var term = $.trim(params.term);
              if (term === "") return null;

              return { id: term, text: term };
            }
          : vm.createItem,
      minimumInputLength: vm.ajax && vm.ajax.url ? vm.minimumInputLength : 0,
      allowClear: vm.allowClear,
    })
    .val(vm.value)
    .trigger("change")
    // emit event on change.
    .on("change", function (e) {
      vm.$emit("input", vm.elm.val());
    })
    .on("select2:select", callback);

  setTimeout(() => {
    if (selectedOption) callback({ params: { data: selectedOption } });
  }, 100);
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
