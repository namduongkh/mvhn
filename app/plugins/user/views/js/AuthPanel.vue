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
        <!-- Modal content-->
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
                  <li>{{ user.email }}</li>
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
  </div>
</template>
<script>
import AuthService from "./auth_service";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default {
  name: "AuthPanel",
  components: {
    LoginForm,
    RegisterForm
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
      this.service.isLoggedIn().then(resp => {
        this.user = resp.data;
      });
    },
    logout() {
      this.service.logout();
      window.location.reload();
    }
  },
  created() {
    this.isLoggedIn();
  }
};
</script>
