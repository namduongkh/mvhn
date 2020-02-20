<template>
  <div>
    <button
      type="button"
      class="btn btn-success"
      data-toggle="modal"
      data-target="#store-order-modal"
      v-if="user"
    >
      <i class="fa fa-cart-plus"></i> Tạo đơn mua chung
    </button>

    <div id="store-order-modal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <h3>Đơn mua chung</h3>
            <form class="sign-box" @submit="createOrder">
              <div class="form-group form-control-wrapper">
                <input
                  v-model="storeOrder.orderName"
                  type="text"
                  name="email"
                  class="form-control"
                  placeholder="Tên đơn mua"
                  v-validate="'required'"
                  data-vv-name="Tên đơn mua"
                />
                <div
                  class="form-tooltip-error"
                  v-show="errors.has('Tên đơn mua')"
                >{{ errors.first('Tên đơn mua') }}</div>
              </div>
              <button type="submit" class="btn btn-primary" v-if="!storeOrder._id">
                <i class="fa fa-save"></i> Tạo
              </button>
              <div v-else>
                Đơn mua của bạn:
                <a
                  target="_blank"
                  :href="'/store_orders/' + storeOrder._id"
                >{{ storeOrder.orderName }}</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResourceService from "@CmsCore/vue/general/resources_service";
import { mapState } from "vuex";

export default {
  name: "StoreOrderCreator",
  props: {
    storeId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      orderService: new ResourceService(
        window.settings.services.webUrl + `/store_orders`
      ),
      storeOrder: {}
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    createOrder(evt) {
      this.$validator.validateAll().then(result => {
        evt.preventDefault();

        if (result) {
          this.orderService
            .create(
              Object.assign(this.storeOrder, {
                store: this.storeId,
                customer: this.user._id,
                orderStatus: "ordering",
                type: "multiple"
              })
            )
            .then(({ data }) => {
              this.storeOrder = data.data;
            });
        }
      });
    }
  }
};
</script>

<style>
</style>
