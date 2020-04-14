<template>
  <div class="panel panel-default" v-if="carpool">
    <div class="panel-body">
      <h3>{{ carpool.user && carpool.user.name }}</h3>
      <div class="row">
        <div class="col-sm-5">
          <div class="journey-point">
            <strong>{{ carpool.fromPlace && carpool.fromPlace.name }}</strong>
            <br />
            <small>{{ carpool.fromPlace && carpool.fromPlace.address }}</small>
          </div>
        </div>
        <div class="col-sm-2 text-center">
          <i class="journey-arrow fa fa-exchange-alt"></i>
        </div>
        <div class="col-sm-5">
          <div class="journey-point">
            <strong>{{ carpool.toPlace && carpool.toPlace.name }}</strong>
            <br />
            <small>{{ carpool.toPlace && carpool.toPlace.address }}</small>
          </div>
        </div>
      </div>
      <div>
        <small>Dự kiến: {{ carpool.time | calendar }}</small>
      </div>
      <div>
        <small>Ngày tạo: {{ carpool.createdAt | calendar }}</small>
      </div>
      <div v-if="user" class="text-right">
        <div v-if="(carpool.user && carpool.user._id) == user._id">
          <a href="javascript:void(0)" class="btn btn-sm btn-danger" @click="remove()">
            <i class="fa fa-trash"></i> Xóa
          </a>
        </div>
        <div v-else>
          <a
            href="javascript:void(0)"
            class="btn btn-sm btn-success"
            @click="join()"
            v-if="!carpool.participates.length"
          >
            <i class="fa fa-link"></i> Kết nối
          </a>
          <a
            href="javascript:void(0)"
            class="btn btn-sm btn-success"
            @click="leave()"
            v-if="carpool.participates.includes(user._id)"
          >
            <i class="fa fa-unlink"></i> Huỷ kết nối
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ResourcesService from "@CmsCore/vue/general/resources_service";

export default {
  name: "Carpool",
  props: ["data"],
  data() {
    return {
      service: new ResourcesService(`${settings.services.webUrl}/carpools`),
      carpool: this.data
    };
  },
  computed: {
    ...mapGetters("user", ["user"])
  },
  methods: {
    remove() {
      if (!confirm("Bạn chắc chứ?")) return;

      this.service.delete(this.carpool._id).then(({ data }) => {
        toastr.success("Đã xoá thành công!");
        this.carpool = null;
      });
    },
    join() {
      this.service.member(`${this.carpool._id}/join`).then(({ data }) => {
        toastr.success("Đã kết nối thành công!");
        this.reload();
      });
    },
    leave() {
      if (!confirm("Bạn chắc chứ?")) return;

      this.service.member(`${this.carpool._id}/leave`).then(({ data }) => {
        toastr.success("Đã hủy kết nối thành công!");
        this.reload();
      });
    },
    reload() {
      this.service.show(this.carpool._id).then(({ data }) => {
        this.carpool = data;
      });
    }
  }
};
</script>

<style>
</style>
