<template>
  <div v-if="user">
    <div v-if="notifications.length">
      <div class="list-group">
        <a
          href="javascript:void(0)"
          v-for="(notify, index) in notifications"
          :key="notify._id"
          class="list-group-item"
          :class="{'active': !isSeen(notify.seen)}"
          @click="seen(index)"
        >
          <div class="row">
            <div class="col-2">
              <ImageAsAvatar
                :src="notify.icon || '/assets/img/favicon/favicon-96x96.png'"
                :circle="true"
              />
            </div>
            <div class="col-10">
              <div v-html="notify.content"></div>
              <div>
                <small>{{ notify.createdAt | calendar }}</small>
              </div>
            </div>
          </div>
        </a>
      </div>
      <button
        class="btn btn-default btn-block"
        @click.prevent="index()"
        :disabled="pagingService.lastPage"
      >
        <i class="fa fa-spinner"></i> Tải thêm
      </button>
    </div>
    <div v-else class="text-center">Không có thông báo mới</div>
  </div>
</template>

<script>
import NotificationService from "./services/notification_service";
import { mapState } from "vuex";
import PagingService from "@Plugin/core/views/js/services/paging_service";

export default {
  name: "Notifications",
  data() {
    return {
      notifications: [],
      pagingService: new PagingService(
        `${window.settings.services.webUrl}/notifications`,
        20
      ),
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  methods: {
    index() {
      this.pagingService.next().then(({ data }) => {
        this.notifications = data;
      });
    },

    seen(index) {
      if (this.isSeen(this.notifications[index].seen)) return;

      NotificationService.getInstance()
        .member(`${this.notifications[index]._id}/seen`, "PUT", {
          userId: this.user._id,
        })
        .then(({ data }) => {
          this.notifications[index] = data;
          this.$forceUpdate();
        });
    },

    isSeen(seen = []) {
      return seen.indexOf(this.user._id.toString()) !== -1;
    },
  },
  created() {
    this.index();
  },
};
</script>

<style>
</style>
