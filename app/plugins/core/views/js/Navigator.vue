<template>
  <div class="navigator">
    <nav class="navbar fixed-bottom navbar-dark bg-dark">
      <ul class="nav navbar-nav navbar-right" v-html="itemsHtml"></ul>
    </nav>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Navigator",
  computed: {
    ...mapGetters("core", ["navigatorItems"]),
    itemsHtml() {
      let html = [];
      let self = this;

      this.navigatorItems.forEach((item, index) => {
        html.push(`
        <li ${item.htmlOptions}>
          <a class="nav-link" href="${item.href || "javascript:void(0)"}">${item.label}</a>
          ${
            item.id && item.notifyNumber
              ? `
              <span class="navigator__notify-number">${item.notifyNumber}</span>
              `
              : ""
          }
        </li>
        `);
      });

      html.push(
        `<li><a class="nav-link" href="javascript:void(0)" onclick="CommonJS.scrollToTop()"><i class="fa fa-arrow-up"></i></a></li>`
      );

      return html.join("");
    }
  }
};
</script>

<style>
</style>
