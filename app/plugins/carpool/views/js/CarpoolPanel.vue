<template>
  <div>
    <ul class="nav nav-tabs">
      <li class="active">
        <a data-toggle="tab" href="#search-place" @click="search()">Hành trình</a>
      </li>
      <li>
        <a data-toggle="tab" href="#connected" @click="connected()">Hành trình đã kết nối</a>
      </li>
      <li>
        <a data-toggle="tab" href="#mine" @click="mine()">Hành trình của bạn</a>
      </li>
    </ul>
    <br />

    <div class="tab-content">
      <div id="search-place" class="tab-pane fade in active">
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
        <div class="panel panel-default" v-if="searchData.fromPlace && searchData.toPlace">
          <div class="panel-body">
            <h3>Khởi tạo hành trình</h3>
            <div class="row">
              <div class="col-sm-10 col-xs-9">
                <div class="form-group form-control-wrapper">
                  <label>Thời gian</label>
                  <datetime
                    v-model="newCarpool.time"
                    v-validate="'required'"
                    data-vv-name="Thời gian"
                    type="datetime"
                    format="dd/MM/yyyy HH:mm"
                    :auto="true"
                    :phrases="{ok: 'OK', cancel: 'Hủy'}"
                    input-class="form-control"
                    :min-datetime="minDatetime"
                  ></datetime>
                </div>
              </div>
              <div class="col-sm-2 col-xs-3 text-right">
                <div class="form-group form-control-wrapper">
                  <label>&nbsp;</label>
                  <a href="javascript:void(0)" class="btn btn-block btn-success" @click="create()">
                    <i class="fa fa-send"></i> Tạo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="carpools.length">
          <div class="col-sm-12">
            <h3>Hành trình có sẵn</h3>
            <Carpool v-for="carpool in carpools" :key="carpool._id" :data="carpool" />
          </div>
        </div>
      </div>
      <div id="connected" class="tab-pane fade">
        <div class="row" v-if="connectedCarpools.length">
          <div class="col-sm-12">
            <Carpool v-for="carpool in connectedCarpools" :key="carpool._id" :data="carpool" />
          </div>
        </div>
      </div>
      <div id="mine" class="tab-pane fade">
        <div class="row" v-if="myCarpools.length">
          <div class="col-sm-12">
            <Carpool v-for="carpool in myCarpools" :key="carpool._id" :data="carpool" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlaceFinder from "@/place/views/js/PlaceFinder";
import ResourcesService from "@CmsCore/vue/general/resources_service";
import Carpool from "./Carpool";

export default {
  name: "CarpoolPanel",
  data() {
    return {
      searchData: {},
      service: new ResourcesService(`${settings.services.webUrl}/carpools`),
      placeService: new ResourcesService(`${settings.services.webUrl}/places`),
      carpools: [],
      connectedCarpools: [],
      myCarpools: [],
      newCarpool: {},
      minDatetime: moment().add(15, "minutes").toISOString(),
    };
  },
  components: {
    PlaceFinder,
    Carpool,
  },
  methods: {
    search() {
      this.service.index(this.searchData).then(({ data }) => {
        this.carpools = data;
      });
    },
    connected() {
      this.service.member("connected").then(({ data }) => {
        this.connectedCarpools = data;
      });
    },
    mine() {
      this.service.member("mine").then(({ data }) => {
        this.myCarpools = data;
      });
    },
    create() {
      this.service.create(this.newCarpool).then(({ data }) => {
        this.search();
        this.newCarpool = {};
      });
    },
  },
  created() {
    this.search();
  },
  watch: {
    "searchData.fromPlace"(val) {
      if (!val) return;

      this.newCarpool.fromPlace = val;
      this.search();
    },
    "searchData.toPlace"(val) {
      if (!val) return;

      this.newCarpool.toPlace = val;
      this.search();
    },
  },
};
</script>

<style>
</style>
