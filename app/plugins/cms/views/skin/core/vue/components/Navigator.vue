<template>
  <div>
    <header class="site-header">
      <div class="container-fluid">
        <a href="#" class="site-logo">
          <img class="hidden-md-down" src="/assets/images/logo-2.png" alt />
          <img class="hidden-lg-down" src="/assets/images/logo-2-mob.png" alt />
        </a>

        <button id="show-hide-sidebar-toggle" class="show-hide-sidebar">
          <span>toggle menu</span>
        </button>

        <button id="btn-hide-slidebar" class="hamburger hamburger--htla">
          <span>toggle menu</span>
        </button>
        <div class="site-header-content">
          <div class="site-header-content-in">
            <div class="site-header-shown">
              <ToastNotify />

              <div class="dropdown user-menu">
                <button
                  class="dropdown-toggle"
                  id="dd-user-menu"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img src="/assets/images/avatar-2-64.png" alt />
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dd-user-menu">
                  <!-- <router-link v-if="authUser && authUser._id" class="dropdown-item" :to="{ name: 'edit_user', params: { id: authUser._id }}"><span class="font-icon glyphicon glyphicon-user" ></span>{{ authUser.name }}'s profile</router-link> -->
                  <a class="dropdown-item" href="/" target="_blank">
                    <span class="font-icon glyphicon glyphicon-home"></span>Home
                  </a>
                  <!-- <a class="dropdown-item" href="#"><span class="font-icon glyphicon glyphicon-cog"></span>Settings</a> -->
                  <!-- <a class="dropdown-item" href="#"><span class="font-icon glyphicon glyphicon-question-sign"></span>Help</a> -->
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" @click="logout">
                    <span class="font-icon glyphicon glyphicon-log-out"></span>Logout
                  </a>
                </div>
              </div>

              <button type="button" class="burger-right">
                <i class="font-icon-menu-addl"></i>
              </button>
            </div>
            <!--.site-header-shown-->

            <div class="mobile-menu-right-overlay"></div>
            <div class="site-header-collapsed">
              <div class="site-header-collapsed-in">
                <!--<div class="dropdown dropdown-typical">-->
                <!--<a class="dropdown-toggle" id="dd-header-marketing" data-target="#" href="http://example.com" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
                <!--<span class="font-icon font-icon-cogwheel"></span>-->
                <!--<span class="lbl">Marketing automation</span>-->
                <!--</a>-->

                <!--<div class="dropdown-menu" aria-labelledby="dd-header-marketing">-->
                <!--<a class="dropdown-item" href="#">Current Search</a>-->
                <!--<a class="dropdown-item" href="#">Search for Issues</a>-->
                <!--<div class="dropdown-divider"></div>-->
                <!--<div class="dropdown-header">Recent issues</div>-->
                <!--<a class="dropdown-item" href="#"><span class="font-icon font-icon-home"></span>Quant and Verbal</a>-->
                <!--<a class="dropdown-item" href="#"><span class="font-icon font-icon-cart"></span>Real Gmat Test</a>-->
                <!--<a class="dropdown-item" href="#"><span class="font-icon font-icon-speed"></span>Prep Official App</a>-->
                <!--<a class="dropdown-item" href="#"><span class="font-icon font-icon-users"></span>CATprer Test</a>-->
                <!--<a class="dropdown-item" href="#"><span class="font-icon font-icon-comments"></span>Third Party Test</a>-->
                <!--<div class="dropdown-more">-->
                <!--<div class="dropdown-more-caption padding">more...</div>-->
                <!--<div class="dropdown-more-sub">-->
                <!--<div class="dropdown-more-sub-in">-->
                <!--<a class="dropdown-item" href="#"><span class="font-icon font-icon-home"></span>Quant and Verbal</a>-->
                <!--<a class="dropdown-item" href="#"><span class="font-icon font-icon-cart"></span>Real Gmat Test</a>-->
                <!--<a class="dropdown-item" href="#"><span class="font-icon font-icon-speed"></span>Prep Official App</a>-->
                <!--<a class="dropdown-item" href="#"><span class="font-icon font-icon-users"></span>CATprer Test</a>-->
                <!--<a class="dropdown-item" href="#"><span class="font-icon font-icon-comments"></span>Third Party Test</a>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <!--<div class="dropdown-divider"></div>-->
                <!--<a class="dropdown-item" href="#">Import Issues from CSV</a>-->
                <!--<div class="dropdown-divider"></div>-->
                <!--<div class="dropdown-header">Filters</div>-->
                <!--<a class="dropdown-item" href="#">My Open Issues</a>-->
                <!--<a class="dropdown-item" href="#">Reported by Me</a>-->
                <!--<div class="dropdown-divider"></div>-->
                <!--<a class="dropdown-item" href="#">Manage filters</a>-->
                <!--<div class="dropdown-divider"></div>-->
                <!--<div class="dropdown-header">Timesheet</div>-->
                <!--<a class="dropdown-item" href="#">Subscribtions</a>-->
                <!--</div>-->
                <!--</div>-->

                <div
                  class="site-header-search-container"
                  style="margin-right: -100px; width: 200px;"
                >
                  <form @submit.prevent="gotoSearch()" class="site-header-search closed">
                    <input v-model="keyword" type="text" placeholder="Search" />
                    <button type="submit">
                      <span class="font-icon-search"></span>
                    </button>
                    <div class="overlay"></div>
                  </form>
                </div>
              </div>
              <!--.site-header-collapsed-in-->
            </div>
            <!--.site-header-collapsed-->
          </div>
          <!--site-header-content-in-->
        </div>
        <!--.site-header-content-->
      </div>
      <!--.container-fluid-->
    </header>
    <!--.site-header-->
    <div class="mobile-menu-left-overlay"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ToastNotify from "./ToastNotify";

export default {
  name: "Navigator",
  data: () => {
    return {
      keyword: "",
      windowWidth: $(window).width()
    };
  },
  computed: {
    ...mapGetters(["authUser"])
  },
  watch: {},
  methods: {
    ...mapActions(["goto"]),
    logout() {
      this.$store.dispatch("logout", this.formData);
    },
    gotoSearch() {
      this.$router.push({ path: "search", query: { filter: this.keyword } });
      if (this.windowWidth <= 1056) {
        $(".mobile-menu-right-overlay").trigger("click");
      }
    }
  },
  components: {
    ToastNotify
  },
  created() {
    let vm = this;
    $(window).on("resize", function() {
      vm.windowWidth = $(window).width();
    });
  }
};
</script>