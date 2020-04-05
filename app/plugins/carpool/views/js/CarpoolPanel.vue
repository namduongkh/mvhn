<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group form-control-wrapper">
          <label>Điểm đi</label>
          <PlaceFinder
            v-model="searchData.fromPlace"
            placeholder="VD: Bến xe miền đông, ga Sài Gòn..."
            :getPlaceId="true"
          />
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group form-control-wrapper">
          <label>Điểm đến</label>
          <PlaceFinder
            v-model="searchData.toPlace"
            placeholder="VD: Bến xe miền đông, ga Sài Gòn..."
            :getPlaceId="true"
          />
        </div>
      </div>
    </div>
    <div class="row" v-if="carpools.length">
      <div class="col-sm-12">
        <div class="panel panel-default" v-for="carpool in carpools" :key="carpool._id">
          <div class="panel-body">
            <div>
              <strong>{{ carpool.user && carpool.user.name }}</strong>
            </div>
            <div>
              Từ:
              <strong>{{ carpool.fromPlace && carpool.fromPlace.name }}</strong>
              <small>({{ carpool.fromPlace && carpool.fromPlace.address }})</small>
            </div>
            <div>
              Đến:
              <strong>{{ carpool.toPlace && carpool.toPlace.name }}</strong>
              <small>({{ carpool.toPlace && carpool.toPlace.address }})</small>
            </div>
            <div>Dự kiến: {{ carpool.time | calendar }}</div>
            <div>Ngày tạo: {{ carpool.createdAt | calendar }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlaceFinder from "@Plugin/place/views/js/PlaceFinder";
import ResourcesService from "@CmsCore/vue/general/resources_service";

export default {
  name: "CarpoolPanel",
  data() {
    return {
      searchData: {},
      service: new ResourcesService(`${settings.services.webUrl}/carpools`),
      placeService: new ResourcesService(`${settings.services.webUrl}/places`),
      carpools: []
    };
  },
  components: {
    PlaceFinder
  },
  methods: {
    search() {
      this.service.index(this.searchData).then(({ data }) => {
        this.carpools = data;
      });
    }
  },
  watch: {
    "searchData.fromPlace"(val) {
      if (!val) return;

      this.search();
    },
    "searchData.toPlace"(val) {
      if (!val) return;

      this.search();
    }
  }
};
</script>

<style>
</style>
