<template>
  <div>
    <div id="table-of-content-modal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <h3 class="text-center">Mục lục</h3>
            <div class="list-group">
              <a
                v-for="(heading, index) in headings"
                :key="index"
                href="javascript:void(0)"
                @click="goto(index)"
                class="list-group-item"
              >{{ heading }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableOfContent",
  props: ["selector"],
  data() {
    return {
      headings: []
    };
  },
  methods: {
    goto(index) {
      $("#table-of-content-modal").modal("hide");
      window.CommonJS.scrollTo(".toc_" + index, 200, function() {
        setTimeout(() => {
          $("#nav-fixed")
            .removeClass("slide-down")
            .addClass("slide-up");
        }, 50);
      });
    }
  },
  created() {
    let self = this;
    $(function() {
      if ($(self.selector).length) {
        $(self.selector)
          .find("h1, h2, h3, h4, h5, h6")
          .each(function(index) {
            $(this).addClass("toc_" + index);
            self.headings.push($(this).text());
            self.$forceUpdate();
          });

        self.$store.dispatch("core/addNavigatorItem", {
          label: "<i class='fa fa-list'></i>",
          htmlOptions: {
            "data-toggle": "modal",
            "data-target": "#table-of-content-modal"
          }
        });
      }
    });
  }
};
</script>

<style>
</style>