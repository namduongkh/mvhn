<template>
  <nav class="side-menu">
    <ul class="side-menu-list">
      <li
        v-for="(menu, index) in filteredMenuItems"
        :key="index"
        :class="[
          { 'sub-menu': !menu.childrens },
          menu.meta.color,
          {
            opened: index === indexRouteActive || menu.path === route.path,
            'with-sub': menu.childrens,
          },
        ]"
      >
        <router-link v-if="!menu.childrens" :to="{ path: menu.path }">
          <i class="font-icon" :class="[menu.meta.iconClass]"></i>
          <span class="lbl">{{ menu.meta ? menu.meta.title : menu.name }}</span>
        </router-link>
        <span v-if="menu.childrens">
          <i
            class="font-icon fa"
            :class="[menu.meta.iconClass, { active: menu.newNoti }]"
          ></i>
          <span class="lbl">{{ menu.meta ? menu.meta.title : menu.name }}</span>
        </span>
        <ul v-if="menu.childrens">
          <li
            v-for="(subMenu, subIndex) in menu.childrens"
            :key="subIndex"
            class="sub-menu"
            v-show="!subMenu.hidden"
          >
            <router-link v-if="!subMenu.redirect" :to="{ path: subMenu.path }">
              <span class="lbl">{{ subMenu.meta.title || subMenu.name }}</span>
            </router-link>
            <router-link
              v-else
              :to="{ name: subMenu.name, params: subMenu.params }"
            >
              <span class="lbl">{{ subMenu.title || subMenu.name }}</span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
  <!--.side-menu-->
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Slidebar",
  data: () => {
    return {
      listRoute: [],
      windowWidth: $(window).width(),
      cmsUrl: window.settings.services.cmsUrl,
    };
  },
  computed: {
    ...mapGetters(["menuItems", "route", "authUser"]),
    // menuFiltered() {
    //   let menus = JSON.parse(JSON.stringify(this.menuItems));
    //   let authUser = JSON.parse(JSON.stringify(this.authUser));

    //   function isHiddenMenu(menuItem) {
    //     if (menuItem.hidden) return menuItem.hidden;
    //     if (
    //       menuItem.meta &&
    //       menuItem.meta.permission &&
    //       menuItem.meta.permission.length
    //     ) {
    //       let intersaction = menuItem.meta.permission.filter(
    //         value => -1 != authUser.scope.indexOf(value)
    //       );
    //       return intersaction.length === 0;
    //     }
    //     return false;
    //   }

    //   for (let idx = 0; idx < menus.length; idx++) {
    //     menus[idx].hidden = isHiddenMenu(menus[idx]);
    //     if (menus[idx].childrens) {
    //       for (
    //         let sub_idx = 0;
    //         sub_idx < menus[idx].childrens.length;
    //         sub_idx++
    //       ) {
    //         menus[idx].childrens[sub_idx].hidden = isHiddenMenu(
    //           menus[idx].childrens[sub_idx]
    //         );
    //       }
    //     }
    //   }
    //   return menus;
    // },
    indexRouteActive() {
      let index = -1;

      for (let i in this.filteredMenuItems) {
        if (this.filteredMenuItems[i].hasOwnProperty("childrens")) {
          for (let j in this.filteredMenuItems[i]["childrens"]) {
            if (
              this.route.path ===
                this.filteredMenuItems[i]["childrens"][j]["path"] ||
              this.route.name ===
                this.filteredMenuItems[i]["childrens"][j]["name"]
            ) {
              index = i;
            }
          }
        }
      }

      return parseInt(index);
    },
    filteredMenuItems() {
      return this.menuItems.filter((menu) => {
        return !menu.hidden;
      });
    },
  },
  watch: {},

  created() {
    let vm = this;
    $(window).on("resize", function () {
      vm.windowWidth = $(window).width();
    });
  },
  mounted() {
    let vm = this;
    $(".sub-menu").on("click", function () {
      if (vm.windowWidth <= 1056) {
        $("#btn-hide-slidebar").trigger("click");
      }
    });
  },
};
</script>
