<template>
  <div id="notification-modal" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <Notifications />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notifications from "./Notifications";

export default {
  name: "NotificationModal",
  data() {
    return {};
  },
  methods: {},
  created() {},
  components: {
    Notifications,
  },
};
</script>

<style>
</style>
