<template>
  <div class="navigator__wrapper">
    <div class="navigator" :class="{ open: openNavigator }">
      <nav class="navbar fixed-bottom navbar-dark bg-dark">
        <ul class="nav navbar-nav navbar-right" v-html="itemsHtml"></ul>
      </nav>
    </div>
    <div class="navigator__mobile">
      <ul>
        <li>
          <a href="javascript:void(0)" onclick="CommonJS.scrollToTop()"
            ><i class="fa fa-arrow-up"></i
          ></a>
        </li>
        <li class="navigator__mobile__more" :class="{ open: openNavigator }">
          <a href="javascript:void(0)" @click="openNavigator = !openNavigator">
            <i :class="{ 'new-notify': numberOfNotify > 0 }"></i>
            <i class="fa fa-chevron-left" :class="{ open: openNavigator }"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Navigator",
  data() {
    return { openNavigator: false };
  },
  computed: {
    ...mapGetters("core", ["navigatorItems", "navigatorShouldOpen"]),
    numberOfNotify() {
      let number = 0;
      for (let item of this.navigatorItems) {
        number += (item.id && item.notifyNumber) || 0;
      }
      return number;
    },
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
        `<li class="scroll-top"><a class="nav-link" href="javascript:void(0)" onclick="CommonJS.scrollToTop()"><i class="fa fa-arrow-up"></i></a></li>`
      );

      return html.join("");
    },
  },
  watch: {
    navigatorShouldOpen() {
      this.openNavigator = true;
    },
  },
};
</script>

<style>
</style>
