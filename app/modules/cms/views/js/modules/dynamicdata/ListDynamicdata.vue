<template>
  <Listing
    :apiService="apiUrl"
    routeDetail="dynamicdata"
    :title="listTitle"
    :fields="customDisplay || fieldsDisplay"
    subTitle="Listing"
    :sortOrder="sortOrder"
    :showExport="true"
    :disabledNew="true"
    :showEdit="false"
    v-if="showListing"
  >
    <template slot="additionalButtonHeader" slot-scope="props">
      <br/>
      <button class="btn btn-success" v-on:click="backToAllList()" v-if="moreParams.type"><i class="fa fa-arrow-circle-left"></i> Danh sách dữ liệu</button>
      <button class="btn btn-primary" v-on:click="addNew()" v-if="moreParams.type"><i class="fa fa-plus"></i> Thêm mới</button>
    </template>
    <template slot="additionalFilter" slot-scope="props"></template>
    <template slot="addActions" slot-scope="props">
      <button v-if="props.props.rowData.is_table" type="button" class="btn btn-inline btn-secondary-outline" @click="gotoTableData(props.props.rowData)"><span class="fa fa-table"></span></button>
      <button v-if="!props.props.rowData.is_table" type="button" class="btn btn-inline btn-secondary-outline" @click="gotoDetail(props.props.rowData)"><span class="glyphicon glyphicon-pencil"></span></button>
    </template>
  </Listing>
</template>
<script>
/**
 * For more option please check Listing component
 */
import { mapGetters, mapActions } from "vuex";
import { fieldsDisplay, sortOrder } from "./fields_list_dynamicdata";
import Axios from "axios";
export default {
  name: "ListDynamicdata",
  data() {
    return {
      moreParams: {
        type: null,
        key: null
      },
      fieldsDisplay,
      sortOrder,
      apiUrl: `${window.settings.services.adminUrl}/dynamicdata`,
      listTitle: "Thiết lập dữ liệu",
      customDisplay: false,
      showListing: false
    };
  },
  computed: {
    ...mapGetters(["filterData", "onResetParams"])
  },
  methods: {
    ...mapActions(["openConfirm", "setParams", "reloadTable"]),
    goto(router) {
      this.$store.dispatch("goto", router);
    },
    backToAllList() {
      this.showListing = false;
      this.moreParams = {
        type: null,
      };
      this.$router.push(`/dynamicdatas`);
    },
    addNew() {
      let url = `/dynamicdata`;
      if (this.$route.query.hasOwnProperty("type") && this.$route.query.type) {
        url += `?type=${this.$route.query.type}`;
      } else if (this.moreParams.hasOwnProperty("type") && this.moreParams.type) {
        url += `?type=${this.moreParams.type}`;
      } 
      this.$cookie.set('dynamicdata-more-params', JSON.stringify(this.moreParams));
      this.$router.push(url);
    },
    gotoTableData(row) {
      this.showListing = false;
      this.moreParams.type = row._id;
    },
    gotoDetail(rowData) {
      this.$cookie.set('dynamicdata-more-params', JSON.stringify(this.moreParams));
      this.$store.dispatch("gotoDetail", {
        _id: rowData._id,
        routeDetail: '/dynamicdata'
      });
    }
  },
  created() {
    for (let prop in this.moreParams) {
      if (this.$route.query.hasOwnProperty(prop) && this.$route.query[prop]) {
        this.moreParams[prop] = this.$route.query[prop];
      }
    }
    let dynamicdataMoreParams = this.$cookie.get('dynamicdata-more-params');
    if (dynamicdataMoreParams) {
      try {
        dynamicdataMoreParams = JSON.parse(dynamicdataMoreParams);
        for (let prop in this.moreParams) {
          if (dynamicdataMoreParams.hasOwnProperty(prop) && dynamicdataMoreParams[prop]) {
            this.moreParams[prop] = dynamicdataMoreParams[prop];
          }
        }
      } catch (e) {}
      this.$cookie.delete('dynamicdata-more-params');
    }
    if (!this.moreParams.type) {
      this.customDisplay = false;
      this.showListing = true;
    }
  },
  watch: {
    "moreParams.type"(type) {
      let that = this;
      if (type) {
        Axios.get(
          `${window.settings.services.adminUrl}/dynamicdata/ajaxOne?id=${type}`
        )
        .then(resp => {
          that.listTitle = resp.data.name || "Thiết lập dữ liệu";
          return Axios.get(
            `${window.settings.services.adminUrl}/customdata/ajaxOne?id=${resp.data.customdata}`
          );
        })
        .then(resp => {
          if (resp.data.is_table) {
            that.customDisplay = _.map(resp.data.display, (field) => {
              if (field.callback) {
                field.callback = eval(`(${field.callback})`);
              }
              return field;
            });
          }
          that.showListing = true;
        });
      } else {
        this.listTitle = "Thiết lập dữ liệu";
        setTimeout(() => {
          this.customDisplay = false;
          this.showListing = true;
        }, 100);
      }
      this.setParams({ type });
      this.reloadTable();
    },
    "$route.query.type"(type) {
      this.showListing = false;
      this.moreParams.type = type;
    },
    // "moreParams.key"(key) {
    //   this.showListing = false;
    //   let that = this;
    //   Axios.get(
    //     `${window.settings.services.adminUrl}/dynamicdata/ajaxOne?key=${key}`
    //   )
    //   .then(resp => {
    //     that.moreParams.type = resp.data._id;
    //   });
    // },
    onResetParams(val) {
      if (val) {
        this.moreParams = {
          type: this.moreParams.type,
          key: null
        };
      }
      this.reloadTable();
    }
  }
};
</script>
<style lang="scss" scoped></style>
