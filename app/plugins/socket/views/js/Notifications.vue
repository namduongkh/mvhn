<template>
  <div>
    <div class="list-group" v-if="user">
      <a
        href="javascript:void(0)"
        v-for="(notify) in notifications"
        :key="notify._id"
        class="list-group-item"
        :class="{'active': !$options.filters.isSeen(notify, user._id)}"
        @click="seen(notify)"
      >
        <div class="row">
          <div class="col-xs-2">
            <ImageAsAvatar
              :src="notify.icon || '/assets/img/favicon/favicon-96x96.png'"
              :circle="true"
            />
          </div>
          <div class="col-xs-10">
            <div v-html="notify.content"></div>
            <div>
              <small>{{ notify.createdAt | timeFrom }}</small>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import NotificationService from "./services/notification_service";
import { mapState } from "vuex";

export default {
  name: "Notifications",
  data() {
    return {
      notifications: [],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  methods: {
    index() {
      NotificationService.getInstance()
        .index()
        .then(({ data }) => {
          this.notifications = data;
        });
    },

    seen(notify) {
      if (this.$options.filters.isSeen(notify, this.user._id)) return;

      NotificationService.getInstance()
        .member(`${notify._id}/seen`, "PUT", {
          userId: this.user._id,
        })
        .then(({ data }) => {
          notify = data;
        });
    },
  },
  filters: {
    isSeen(notify, userId) {
      return notify.seen && notify.seen.indexOf(userId.toString()) !== -1;
    },
  },
  created() {
    this.index();
  },
};
</script>

<style>
</style>
