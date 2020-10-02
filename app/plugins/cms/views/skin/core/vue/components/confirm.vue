<template>
  <div id="pop-confirm" class="bzPopup mfp-hide bzPopupAnimation">
    <div class="modal-header">
      <h5 class="modal-title">{{ popupConfirm.title }}</h5>
    </div>
    <div class="modal-body">
      <p v-html="popupConfirm.message || message"></p>
    </div>
    <div class="modal-footer">
      <button type="button" @click="okClick" class="btn btn-primary">OK</button>
      <button
        v-if="popupConfirm.showCancel"
        type="button"
        @click="cancelClick"
        class="btn btn-secondary"
        data-dismiss="modal"
      >Cancel</button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "confirm",
  props: ["message", "ok", "cancel"],
  methods: {
    okClick() {
      if (
        this.popupConfirm &&
        this.popupConfirm.ok &&
        typeof this.popupConfirm.ok === "function"
      ) {
        this.popupConfirm.ok();
        this.closePopup();
      }
    },
    cancelClick() {
      if (
        this.popupConfirm &&
        this.popupConfirm.cancel &&
        typeof this.popupConfirm.cancel === "function"
      ) {
        this.popupConfirm.cancel();
        this.closePopup();
      }
    },
    closePopup() {
      let self = this;
      Popup.close({
        items: {
          src: "#pop-confirm",
        },
        afterClose: function () {
          self.resetConfirmState();
        },
      });
    },
  },
  data() {
    return {
      ...mapActions(["resetConfirmState"]),
    };
  },
  watch: {
    "popupConfirm.show"() {
      let self = this;
      if (this.popupConfirm.show) {
        Popup.open({
          items: {
            src: "#pop-confirm",
          },
          afterClose: function () {
            self.resetConfirmState();
          },
        });
      }
    },
  },
  computed: {
    ...mapGetters(["popupConfirm"]),
  },
};
</script>
<style lang="scss">
#pop-confirm {
  width: 100%;
  max-width: 550px;
  .mfp-close {
    color: #333;
  }
}
</style>
