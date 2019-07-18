<template>
  <div class="dropdown dropdown-notification messages" id="toast-notify">
    <a
      href="#"
      class="header-alarm"
      :class="{active: notifyData.length }"
      id="dd-messages"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <i class="font-icon-alarm"></i>
    </a>
    <div
      class="dropdown-menu dropdown-menu-right dropdown-menu-messages"
      aria-labelledby="dd-messages"
    >
      <div class="dropdown-menu-messages-header">
        <ul class="nav" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#tab-incoming" role="tab">
              Local
              <span class="label label-pill label-danger">{{ notifyData.length }}</span>
            </a>
          </li>
        </ul>
        <!--<button type="button" class="create">
                    <i class="font-icon font-icon-pen-square"></i>
        </button>-->
      </div>
      <div class="tab-content">
        <div class="tab-pane active" id="tab-incoming" role="tabpanel">
          <div class="dropdown-menu-messages-list">
            <a
              onclick="null"
              @click="index_opening = index"
              v-for="(noti, index) in notifyData"
              :key="'noti'+index"
              class="mess-item"
            >
              <span class="avatar-preview avatar-preview-32">
                <span data-notify="icon" :class="noti[0].icon"></span>
              </span>
              <span class="mess-item-name" v-if="noti && noti.length >= 1" v-html="noti[0].title"></span>
              <span
                class="mess-item-txt"
                :class="{'show-detail': index === index_opening }"
                v-if="noti && noti.length >= 1"
                v-html="noti[0].message"
              ></span>
            </a>
          </div>
        </div>
      </div>
      <div v-if="notifyData.length" class="dropdown-menu-notif-more">
        <button @click="resetNoti" type="button" class="btn btn-link">Delete all</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ToastNotify",
  methods: {
    ...mapActions(["resetNotiList"]),
    resetNoti() {
      this.resetNotiList();
    }
  },
  data() {
    return {
      index_opening: -1
    };
  },
  watch: {
    notifyData: {
      handler: function(notifyData, oldVal) {
        if (notifyData && notifyData.length) {
          let newestNotifyData = notifyData[notifyData.length - 1];
          this.$notify(...newestNotifyData);
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(["notifyData"])
  }
};
</script>
<style lang="scss">
.site-header .dropdown-menu-messages .mess-item .avatar-preview {
  position: absolute;
  left: 23px;
  top: 23px;
}
#toast-notify {
  .show-detail {
    white-space: unset;
  }
}
</style>