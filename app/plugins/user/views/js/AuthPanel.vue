<template>
  <div>
    <!-- Trigger the modal with a button -->
    <button
      type="button"
      class="btn btn-info auth-panel__opener"
      data-toggle="modal"
      data-target="#auth-modal"
    >
      <i class="fa fa-user"></i>
    </button>

    <!-- Modal -->
    <div id="auth-modal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" v-if="!user || !user._id">
            <ul class="nav nav-pills nav-justified">
              <li class="active">
                <a data-toggle="pill" href="#login">Đăng nhập</a>
              </li>
              <li>
                <a data-toggle="pill" href="#register">Đăng ký</a>
              </li>
            </ul>
          </div>
          <div class="modal-body">
            <div v-if="user && user._id" class="row">
              <div class="col-sm-4">
                <img
                  :src="user.avatar || '/cms/assets/images/avatar-sign.png'"
                  class="img-rounded img-responsive"
                  :alt="user.name"
                />
              </div>
              <div class="col-sm-8">
                <h3>{{ user.name }}</h3>
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
                    >Thông tin cá nhân</a>
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
              <div class="col-sm-8 col-sm-offset-2">
                <div class="tab-content">
                  <div id="login" class="tab-pane fade in active">
                    <LoginForm></LoginForm>
                  </div>
                  <div id="register" class="tab-pane fade">
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
              class="btn btn-default"
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
              <div class="col-sm-8 col-sm-offset-2">
                <LazyRegisterForm></LazyRegisterForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AuthService from "./auth_service";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import LazyRegisterForm from "./LazyRegisterForm";
import InfoForm from "./InfoForm";

export default {
  name: "AuthPanel",
  components: {
    LoginForm,
    RegisterForm,
    LazyRegisterForm,
    InfoForm
  },
  props: {
    lazyMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      service: new AuthService(),
      user: null,
      loading: false
    };
  },
  methods: {
    isLoggedIn() {
      this.service
        .isLoggedIn()
        .then(resp => {
          this.user = resp.data;
        })
        .finally(() => {
          if (this.lazyMode && !this.user) {
            $("#lazy-register-modal").modal("show");
          }
        });
    },
    logout() {
      this.service.logout();
      window.location.reload();
    }
  },
  created() {
    this.isLoggedIn();

    this.$store.watch(
      state => state.user.user,
      user => {
        this.user = Object.assign({}, user);

        if (this.user.lazyMode) {
          this.user.email = null;
          this.user.username = null;
        }
      }
    );
  }
};
</script>
