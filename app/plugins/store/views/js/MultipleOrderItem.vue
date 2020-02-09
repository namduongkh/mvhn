<template>
  <div class="row">
    <div class="col-sm-6">
      <div class="form-group form-control-wrapper">
        <label>Xin chào:</label>
        <input
          type="text"
          class="form-control"
          v-model="orderItem.orderer"
          :disabled="user && user._id"
          placeholder="Tên"
          v-validate="'required'"
          data-vv-name="Tên"
        />
        <div class="form-tooltip-error" v-show="errors.has('Tên')">{{ errors.first('Tên') }}</div>
        <a v-if="!user" href="javascript:void(0)" onclick="$('.auth-panel__opener').click()">
          <small>Đã có tài khoản</small>
        </a>
      </div>
    </div>
    <div class="col-sm-6">
      <div v-if="selectedMenu">
        <label>Đã chọn:</label>
        <div class="media store-menu__item" style="margin:0">
          <div class="media-left media-middle" style="width:25%">
            <img class="media-object" :src="selectedMenu.image" style="width:100%" />
          </div>
          <div class="media-body">
            <h4 class="media-heading">{{ selectedMenu.name }}</h4>
            <div>{{ selectedMenu.price | currency }}</div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">Chưa có lựa chọn</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MultipleOrderItem",
  props: {
    storeOrderId: {
      type: String,
      require: true
    }
  },
  computed: {
    ...mapState({
      selectedMenuItems: state => state.store.selectedMenuItems,
      user: state => state.user.user
    })
  },
  data() {
    return {
      orderItem: {},
      selectedMenu: null
    };
  },
  methods: {
    initial() {
      this.orderItem = Object.assign({}, this.orderItem, {
        orderer: this.user.name,
        user: this.user._id
      });
    },
    selectItem(item) {
      this.selectedMenu = item;
      toastr.success(`Đã chọn ${this.selectedMenu.name}!`);

      this.$validator.validateAll().then(result => {
        if (!result) {
        } else {
        }
      });
    }
  },
  mounted() {
    this.$store.watch(
      state => state.user.user,
      (value, oldValue) => {
        if (!value) return;
        this.initial();
      }
    );

    this.$store.watch(
      state => state.store.selectedMenuItems,
      (value, oldValue) => {
        if (!value.length) return;
        this.selectItem(value.pop());
      }
    );
  }
};
</script>

<style>
</style>
