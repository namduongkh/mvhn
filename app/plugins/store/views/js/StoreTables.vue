<template>
  <div class="row">
    <div v-for="table in storeTables" :key="table._id" class="col-sm-3 col-xs-2">
      <div class="table-item" :class="{'table-item--active': table.activeOrder}">
        <h3 v-text="table.name"></h3>
        <div v-if="table.activeOrder">
          <div v-if="user._id == table.activeOrder.customer">
            <a :href="'/store_tables/' + table._id">Đang phục vụ bạn</a>
          </div>
          <div v-else>Đang phục vụ</div>
          <div>{{ table.activeOrder.createdAt | timeFrom }}</div>
        </div>
        <div v-else>
          <div>Trống</div>
          <div>
            <a href="javascript:void(0)" @click="selectTable(table._id)">Chọn</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResourcesService from "@CmsCore/vue/general/resources_service";
import { mapState, mapGetters } from "vuex";

export default {
  name: "StoreTables",
  props: {
    storeId: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      storeService: new ResourcesService(
        window.settings.services.webUrl + `/stores`
      ),
      storeTableService: new ResourcesService(
        window.settings.services.webUrl + `/stores/${this.storeId}/store_tables`
      ),
      store: null,
      storeTables: null
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    loadStore() {
      this.storeService.show(this.storeId).then(({ data }) => {
        this.store = data;
      });
    },
    loadTables() {
      this.storeTableService.index().then(({ data }) => {
        this.storeTables = data;
      });
    },
    selectTable(id) {
      this.storeTableService
        .member(`${id}/create_order`)
        .then(({ data }) => {
          window.location.href = "/store_tables/" + id;
        })
        .catch(err => {
          toastr.error(err.response.data.message);
        });
    },
    clear(id) {
      this.storeTableService
        .update(id, {
          activeOrder: null
        })
        .then(({ data }) => {
          toastr.success("Đã xong!");
          this.loadTables();
        })
        .catch(err => {
          toastr.error(err.response.data.message);
        });
    }
  },
  created() {
    this.loadStore();
    this.loadTables();
  }
};
</script>

<style>
.table-item {
  border-radius: 0.5em;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  margin: 0.5em 0;
  padding: 1em;
}
.table-item a {
  color: dodgerblue;
  font-weight: normal;
}
.table-item--active {
  background-color: rgba(70, 195, 95, 0.3);
}
</style>
