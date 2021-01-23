<template>
  <div>
    <!-- Modal -->
    <div id="auth-modal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" v-if="!user || !user._id">
            <nav class="nav nav-pills nav-justified w-100" role="tablist">
              <a
                class="nav-item nav-link active"
                data-toggle="pill"
                href="#login"
                @click="activeTab = 'login'"
                >Đăng nhập</a
              >
              <a
                class="nav-item nav-link"
                data-toggle="pill"
                href="#register"
                @click="activeTab = 'register'"
                >Đăng ký</a
              >
            </nav>
          </div>
          <div class="modal-body">
            <div v-if="user && user._id" class="row">
              <div class="col-sm-4">
                <ImageAsAvatar
                  :src="user.avatar || '/cms/assets/images/avatar-sign.png'"
                  :alt="user.name"
                  :circle="true"
                />
              </div>
              <div class="col-sm-8">
                <h3>
                  {{ user.name }}
                  <div class="pull-right">
                    <a href="/payments">
                      <span class="text-primary">
                        {{ user.point | currency }}
                      </span>
                    </a>
                  </div>
                </h3>
                <ul>
                  <li v-if="!user.lazyMode">{{ user.email }}</li>
                  <li v-else>
                    <em>(Tài khoản vãng lai, hãy cập nhật thông tin)</em>
                  </li>
                  <li>
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#info-modal"
                      data-dismiss="modal"
                      >Thông tin cá nhân</a
                    >
                  </li>
                  <li v-if="user.roles.includes('admin')">
                    <a href="/cms" target="_blank">Admin Portal</a>
                  </li>
                  <li v-if="user.roles.includes('store-owner')">
                    <a href="/cms" target="_blank">Store Portal</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" @click="logout()">Đăng xuất</a>
                  </li>
                </ul>
              </div>
            </div>
            <div v-else class="row text-center">
              <div class="col-sm-8 offset-sm-2">
                <div class="tab-content">
                  <div id="login" v-if="activeTab == 'login'">
                    <LoginForm></LoginForm>
                  </div>
                  <div id="register" v-if="activeTab == 'register'">
                    <RegisterForm></RegisterForm>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="info-modal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <a
              class="btn btn-secondary"
              href="javascript:void(0)"
              data-toggle="modal"
              data-target="#auth-modal"
              data-dismiss="modal"
            >
              <i class="fa fa-arrow-left"></i>
            </a>
          </div>
          <div class="modal-body">
            <InfoForm></InfoForm>
          </div>
        </div>
      </div>
    </div>

    <div id="lazy-register-modal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="row text-center">
              <div class="col-sm-8 offset-sm-2">
                <LazyRegisterForm></LazyRegisterForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <NotificationModal />
  </div>
</template>
<script>
import AuthService from "./auth_service";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import LazyRegisterForm from "./LazyRegisterForm";
import InfoForm from "./InfoForm";
import NotificationService from "@Plugin/socket/views/js/services/notification_service";
import NotificationModal from "@Plugin/socket/views/js/NotificationModal";

export default {
  name: "AuthPanel",
  components: {
    LoginForm,
    RegisterForm,
    LazyRegisterForm,
    InfoForm,
    NotificationModal,
  },
  props: {
    lazyMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      service: new AuthService(),
      user: null,
      loading: false,
      activeTab: "login",
    };
  },
  methods: {
    isLoggedIn() {
      this.service
        .isLoggedIn()
        .then((resp) => {
          this.user = resp.data;
        })
        .finally(() => {
          window.onload = function () {
            setTimeout(() => {
              if (
                this.lazyMode &&
                !this.user &&
                $("#auth-modal").is(":hidden")
              ) {
                $("#lazy-register-modal").modal("show");
              }
            }, 1000);
          }.bind(this);
        });
    },
    logout() {
      this.service.logout();
      window.location.reload();
    },
  },
  created() {
    this.isLoggedIn();
    this.$store.dispatch("user/fetchUser");
    this.$store.dispatch("core/addNavigatorItem", {
      id: "auth-panel",
      label: '<i class="fa fa-user"></i>',
      htmlOptions: {
        "data-toggle": "modal",
        "data-target": "#auth-modal",
        class: "auth-panel__opener",
      },
      order: 1,
    });

    this.$store.watch(
      (state) => state.user.user,
      (user) => {
        this.user = Object.assign({}, user);

        if (this.user.lazyMode) {
          this.user.email = null;
          this.user.username = null;
        }

        this.$store.dispatch("core/updateNavigatorItem", {
          id: "auth-panel",
          label: `<i class="fa fa-user"></i> ${this.user.name
            .split(" ")
            .pop()}`,
        });

        NotificationService.getInstance()
          .member(`unseen_number`)
          .then(({ data }) => {
            this.$store.dispatch("core/addNavigatorItem", {
              id: "notify-panel",
              label: '<i class="fa fa-bell"></i>',
              htmlOptions: {
                "data-toggle": "modal",
                "data-target": "#notification-modal",
              },
              notifyNumber: data,
              order: 2,
            });
          });
      }
    );
  },
};
</script>
