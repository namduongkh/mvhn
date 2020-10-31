<template>
  <div v-if="user">
    <div class="text-right">
      <UserPoint />
    </div>
    <div class="row">
      <div class="col-xs-12">
        <Form @onSave="onSave" />
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-xs-12">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payment in payments" :key="payment._id">
              <td>{{ payment.createdAt | formatDate }}</td>
              <td>{{ payment.amount | currency }}</td>
              <td>{{ payment.paymentStatus }}</td>
              <td>
                <a
                  v-if="payment.paymentStatus == 'pending'"
                  href="javascript:void(0)"
                  class="btn btn-sm btn-danger"
                  @click="remove(payment)"
                >
                  <i class="fa fa-trash"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import PagingService from "@Plugin/core/views/js/services/paging_service";
import { mapState } from "vuex";
import Form from "./Form";
import { pull } from "lodash";
import UserPoint from "@/user/views/js/UserPoint";

export default {
  name: "Payments",
  data() {
    return {
      payments: [],
      pagingService: new PagingService(
        `${window.settings.services.webUrl}/payments`,
        20
      ),
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  components: {
    Form,
    UserPoint,
  },
  methods: {
    index() {
      this.pagingService.next().then(({ data }) => {
        this.payments = data;
      });
    },
    onSave(data) {
      this.pagingService.service.create(data).then(({ data }) => {
        this.payments.unshift(data);
        toastr.success("Payment is pending");
      });
    },
    remove(payment) {
      if (!confirm("Are you sure?")) return;

      this.pagingService.service.delete(payment._id).then(({ data }) => {
        pull(this.payments, payment);
        this.$forceUpdate();
        toastr.success("Payment was removed");
      });
    },
  },
  created() {
    this.index();
  },
};
</script>

<style>
</style>
