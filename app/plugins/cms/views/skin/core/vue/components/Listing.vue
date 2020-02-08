<template>
  <div class="page-content listing-data">
    <div class="container-fluid">
      <header class="section-header">
        <div class="row">
          <div class="col-sm-4">
            <h2>{{ title }}</h2>
            <div class="subtitle">{{ subTitle }}</div>
          </div>
          <div class="col-sm-8 text-right group-actions">
            <button
              @click="gotoNew()"
              class="btn btn-primary"
              v-if="permitted.new && !disabledActions.includes('new') && !disabledNew"
            >
              <i class="fa fa-plus-circle"></i> New
            </button>

            <div class="btn-group" v-if="!disabledActions.includes('bulkActions')">
              <button
                type="button"
                class="btn dropdown-toggle btn-info"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fa fa-cogs"></i> Bulk Actions
              </button>
              <ul class="dropdown-menu">
                <li v-if="!disabledActions.includes('publishAll')">
                  <a class="dropdown-item" @click="publishItems()">Publish All</a>
                </li>
                <li v-if="!disabledActions.includes('unpublishAll')">
                  <a class="dropdown-item" @click="unPublishItems()">Unpublish All</a>
                </li>
                <li v-if="!disabledActions.includes('archiveAll')">
                  <a class="dropdown-item" @click="moveItemsToTrash()">Archive All</a>
                </li>
                <li v-if="!disabledActions.includes('deleteAll')">
                  <a class="dropdown-item" @click="deleteItems()">Delete All</a>
                </li>
              </ul>
            </div>

            <div class="btn-group" v-if="!disabledActions.includes('export') && showExport">
              <button
                type="button"
                class="btn dropdown-toggle btn-success"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fa fa-file-export"></i> Export
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" @click="exportExcelSelected()">Selected Items</a>
                </li>
                <li>
                  <a class="dropdown-item" @click="exportExcelAll()">Showing Items</a>
                </li>
                <li>
                  <a class="dropdown-item" @click="exportExcelAll(true)">All Items</a>
                </li>
              </ul>
            </div>
            <slot name="additionalButtonHeader" />
          </div>
        </div>
        <div class="clearfix"></div>
      </header>

      <section class="box-typical">
        <div class="bootstrap-table">
          <div class="fixed-table-toolbar">
            <form @submit.prevent="doFilter" class="header-table">
              <slot v-if="useFilterLayout" name="filterLayout" />
              <div v-else class="row">
                <div class="col-sm-3">
                  <div class>
                    <label>
                      Search:
                      <input
                        v-model="searchParam.filter"
                        tabindex="0"
                        autofocus
                        type="text"
                        class="form-control"
                        placeholder="Keyword..."
                      />
                    </label>
                  </div>
                </div>

                <div class="col-sm-3">
                  <div>
                    <label>
                      Status:
                      <select
                        v-model="searchParam.status"
                        name="status"
                        class="form-control"
                      >
                        <option :value="null">All</option>
                        <option :value="1">Publish</option>
                        <option :value="0">Unpublish</option>
                        <option :value="2">Trashed</option>
                      </select>
                    </label>
                  </div>
                </div>

                <slot name="additionalFilter" />

                <div class="col-sm-2">
                  <div class="form-group">
                    <label>Hành động</label>
                    <button type="submit" class="btn btn-primary-outline">Lọc</button>
                    <button
                      type="button"
                      @click="resetFilter()"
                      class="btn btn-secondary-outline"
                    >Reset</button>
                    <slot name="additionalAction" />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div class="table-wrapper table-responsive">
            <vuetable
              ref="vuetable"
              :api-url="apiService"
              :fields="customFields"
              :sort-order="sortOrder"
              :css="css.table"
              pagination-path
              :per-page="perPage"
              :trackBy="'_id'"
              pagination-info-template="Đang hiển thị: {data.from} - {data.to} trong tổng số {data.total} dữ liệu"
              pagination-info-no-data-template="Không có kết quả truy vấn"
              @vuetable:pagination-data="onPaginationData"
              @vuetable:loading="onLoading"
              @vuetable:loaded="onLoaded"
              :http-options="{ withCredentials: true }"
              :append-params="filterData"
              @vuetable:checkbox-toggled="onCheckboxChange"
              @vuetable:checkbox-toggled-all="onAllCheckboxChange"
            >
              <template slot="actions" slot-scope="props">
                <div class="btn-group btn-group-sm">
                  <button
                    v-if="permitted.edit && (!disabledActions.includes('edit') && showEdit)"
                    type="button"
                    class="btn btn-inline btn-secondary-outline"
                    @click="gotoDetail(props.rowData)"
                  >
                    <span class="glyphicon glyphicon-pencil"></span>
                  </button>
                  <button
                    @click="gotoNew(props.rowData._id)"
                    class="btn btn-inline btn-secondary-outline"
                    v-if="permitted.new && !disabledActions.includes('new') && !disabledNew"
                  >
                    <span class="fa fa-copy"></span>
                  </button>
                  <button
                    v-if="permitted.delete && (!disabledActions.includes('delete') && showDelete)"
                    type="button"
                    class="btn btn-inline btn-danger-outline"
                    @click="confirmDelete(props.rowData._id)"
                  >
                    <span class="glyphicon glyphicon-trash"></span>
                  </button>
                  <slot :props="props" name="addActions"></slot>
                </div>
              </template>
            </vuetable>
            <div class="per-page">
              Hiện
              <select v-model="perPage" name="perPage" class="form-control">
                <option :value="50">50</option>
                <option :value="100">100</option>
                <option :value="200">200</option>
                <option :value="500">500</option>
              </select>
              mục mỗi trang
            </div>

            <vuetable-pagination
              ref="pagination"
              :css="css.pagination"
              @vuetable-pagination:change-page="onChangePage"
            />
          </div>
        </div>
        <div class="clearfix"></div>
      </section>
      <!--.box-typical-->

      <!-- <section class="box-typical">
        <table class="table table-hovered table-bordered">
          <tr v-for="log in exportlogs" :key="log._id">
            <td>
              <span class="label label-info" v-if="log.process==0">Đang xuất báo cáo...</span>
              <span class="label label-success" v-if="log.process==1">Đã xuất báo cáo thành công</span>
              <span class="label label-error" v-if="log.process==-1">Không thành công</span>
            </td>
            <td>
              <a v-if="log.process==1" :href="webUrl +'/' + log.file_url">{{ log.file_name }}</a>
            </td>
            <td>{{ log.createdAt | formatDate }}</td>
          </tr>
        </table>
      </section>-->
    </div>
    <!--.container-fluid-->
  </div>
  <!--.page-content-->
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Service from "@general/services.class";
import Excel from "@general/excel";
import Permit from "@Core/permit";
import Axios from "axios";

export default {
  name: "Listing",
  props: {
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      default: ""
    },
    hideColumns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    apiService: {
      type: String,
      required: true
    },
    // routeDetail: {
    //   type: String,
    //   required: true
    // },
    fields: {
      type: Array,
      required: true
    },
    sortOrder: {
      type: Array,
      required: true
    },
    // Addvance action props
    showEdit: {
      type: Boolean,
      default: true
    },
    showDelete: {
      type: Boolean,
      default: true
    },
    // Export Excel Attr
    showExport: {
      // Show Export Btn
      type: Boolean,
      default: true
    },
    exceptFieldExport: {
      // Remove export field from default list
      type: Array
    },
    fieldExport: {
      type: Array // Set field export
    },
    addFieldExport: {
      type: Array // Add more field export
    },
    disabledNew: {
      type: Boolean,
      default: false
    },
    useFilterLayout: {
      type: Boolean,
      default: false
    },
    disabledActions: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    ...mapActions([
      "setParams",
      "resetParams",
      "setFilterName",
      "openConfirm",
      "reloadTable",
      "notify",
      "goto"
    ]),

    /// Router ///
    gotoNew(originId = "") {
      // this.$store.dispatch("goto", `${this.routeDetail}/new`);
      delete this.$route.params.id;
      delete this.$route.params._id;

      let routeConfig = {
        name: this.$route.meta.actions.new,
        params: this.$route.params
      };

      if (originId) routeConfig.query = { originId };

      this.goto(routeConfig);
    },
    gotoDetail(rowData) {
      // this.$store.dispatch("gotoDetail", {
      //   _id: rowData._id,
      //   routeDetail: this.routeDetail
      // });
      this.goto({
        name: this.$route.meta.actions.edit,
        params: Object.assign({}, this.$route.params, { id: rowData._id })
      });
    },
    checkPermit() {
      this.permitted = {
        new: Permit.getInstance().isPermitted(
          this.$route.meta.controller,
          "new"
        ),
        edit: Permit.getInstance().isPermitted(
          this.$route.meta.controller,
          "edit"
        ),
        delete: Permit.getInstance().isPermitted(
          this.$route.meta.controller,
          "delete"
        )
      };
    },

    /// Table managerment ///
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    onLoading() {
      this.$store.commit("setLoading", true);
    },
    onLoaded() {
      this.$store.commit("setLoading", false);
      this.reloadTable(false);
      if (this.exportingData) {
        this.exportExcel(this.$refs.vuetable.tableData);
        this.exportingData = false;
        delete this.filterData["notPaginate"];
        setTimeout(() => {
          this.reloadTable();
        }, 500);
      }
    },
    onCheckboxChange(isChecked, dataItem) {
      this.itemSelected = this.$refs.vuetable.selectedTo;
      let tableData = this.$refs.vuetable.tableData;
      let tmpCheckedItems = [];
      for (let i = 0; i < tableData.length; i++) {
        if (this.itemSelected.indexOf(tableData[i]._id) >= 0) {
          tmpCheckedItems.push(tableData[i]);
        }
      }
      this.checkedItems = tmpCheckedItems;
    },
    onAllCheckboxChange(isChecked) {
      this.itemSelected = this.$refs.vuetable.selectedTo;
      if (isChecked) {
        this.checkedItems = this.$refs.vuetable.tableData;
      } else {
        this.checkedItems = [];
      }
    },

    /// Filter management ///
    doFilter() {
      clearTimeout(this.filterDebouncer);
      this.filterDebouncer = setTimeout(() => {
        this.itemSelected = [];
        this.$refs.vuetable.selectedTo = [];
        this.$refs.vuetable.refresh();
        this.$router.push({ query: this.filterData });
      }, 50);
    },
    resetFilter() {
      this.searchParam = { status: 1, filter: null };
      this.resetParams();
      setTimeout(() => {
        this.doFilter();
      }, 20);
    },
    defaultSearchParams() {
      return Object.assign(
        {},
        {
          status: 1,
          filter: null
        },
        this.filterData
      );
    },

    /// Actions backend ///
    confirmDelete(id) {
      let self = this;
      this.openConfirm({
        message: "Are you sure want to delete? This action cannot be undo.",
        ok: function() {
          self.$store.commit("setLoading", true);
          self.API.deleteItem(id).then(({ data }) => {
            self.notify([
              {
                icon: "font-icon font-icon-warning",
                title: "<strong>Notification</strong>",
                message: `Delete ${self.itemSelected.length || 1} item${
                  (self.itemSelected.length || 1) > 1 ? "s" : ""
                } successfully`
              },
              {
                type: "success",
                placement: {
                  from: "bottom"
                }
              }
            ]);

            self.doFilter();
          });
        }
      });
    },
    deleteItems() {
      if (this.itemSelected && this.itemSelected.length) {
        let self = this;
        this.openConfirm({
          message: `Are you sure want to delete ${
            this.itemSelected.length
          } item${this.itemSelected.length > 1 ? "s" : ""}?`,
          ok: function() {
            self.$store.commit("setLoading", true);
            self.API.deleteItems(self.itemSelected).then(({ data }) => {
              self.notify([
                {
                  icon: "font-icon font-icon-warning",
                  title: "<strong>Notification</strong>",
                  message: `Delete ${self.itemSelected.length} item${
                    self.itemSelected.length > 1 ? "s" : ""
                  } successfully`
                },
                {
                  type: "success",
                  placement: {
                    from: "bottom"
                  }
                }
              ]);

              self.doFilter();
            });
          }
        });
      }
    },
    moveItemsToTrash() {
      if (this.itemSelected && this.itemSelected.length) {
        let self = this;
        this.openConfirm({
          message: `Are you sure want to move ${this.itemSelected.length} item${
            this.itemSelected.length > 1 ? "s" : ""
          } to trash?`,
          ok: function() {
            self.$store.commit("setLoading", true);
            self.API.moveToTrashItems(self.itemSelected).then(({ data }) => {
              self.notify([
                {
                  icon: "font-icon font-icon-warning",
                  title: "<strong>Notification</strong>",
                  message: `Move ${self.itemSelected.length} item${
                    self.itemSelected.length > 1 ? "s" : ""
                  } to trash successfully`
                },
                {
                  type: "success",
                  placement: {
                    from: "bottom"
                  }
                }
              ]);

              self.doFilter();
            });
          }
        });
      }
    },
    publishItems() {
      if (this.itemSelected && this.itemSelected.length) {
        let self = this;
        this.openConfirm({
          message: `Are you sure want to publish ${
            this.itemSelected.length
          } item${this.itemSelected.length > 1 ? "s" : ""} selected`,
          ok: function() {
            self.$store.commit("setLoading", true);
            self.API.publishItems(self.itemSelected).then(({ data }) => {
              console.log("data publishItems", data);
              self.notify([
                {
                  icon: "fa fa-check",
                  title: "<strong>Notification</strong>",
                  message: `Publish ${self.itemSelected.length} item${
                    self.itemSelected.length > 1 ? "s" : ""
                  }  successfully`
                },
                {
                  type: "success",
                  placement: {
                    from: "bottom"
                  }
                }
              ]);
              self.doFilter();
            });
          }
        });
      }
    },
    unPublishItems() {
      if (this.itemSelected && this.itemSelected.length) {
        let self = this;
        this.openConfirm({
          message: `Are you sure want to unpublish ${
            this.itemSelected.length
          } item${this.itemSelected.length > 1 ? "s" : ""} selected`,
          ok: function() {
            self.$store.commit("setLoading", true);
            self.API.unPublishItems(self.itemSelected).then(({ data }) => {
              self.notify([
                {
                  icon: "fa fa-check",
                  title: "<strong>Notification</strong>",
                  message: `Unpublish ${self.itemSelected.length} item${
                    self.itemSelected.length > 1 ? "s" : ""
                  }  successfully`
                },
                {
                  type: "purple",
                  placement: {
                    from: "bottom"
                  }
                }
              ]);

              self.doFilter();
            });
          }
        });
      }
    },

    /// Custom display in table ///
    status(value) {
      switch (value) {
        case 1:
          return '<span class="label label-pill label-success">Publish</span>';
          break;
        case 2:
          return '<span class="label label-pill label-danger">Trashed</span>';
          break;
        default:
          return '<span class="label label-pill label-warning">Unpublish</span>';
          break;
      }
    },
    statusExport(value) {
      switch (value) {
        case 1:
          return "Publish";
          break;
        case 2:
          return "Trashed";
          break;
        default:
          return "Unpublish";
          break;
      }
    },
    formatDate(value, fmt) {
      return this.formatDateCommon(value, fmt);
    },
    formatDateExport(value, fmt) {
      return this.formatDateCommon(value, fmt);
    },
    formatDateCommon(value, fmt) {
      if (value === null) {
        return "";
      }
      fmt = typeof fmt === "undefined" ? "DD/MM/YYYY HH:mm" : fmt;
      return moment(value).format(fmt);
    },
    exportExcelSelected() {
      let dataSelectedExport = this.$refs.vuetable.tableData.filter(item => {
        return this.$refs.vuetable.selectedTo.find(
          itemSelected => itemSelected == item._id
        );
      });
      this.exportExcel(dataSelectedExport);
    },
    exportExcelAll(all = false) {
      if (all) {
        let _sortConf = [
          this.sortOrder[0].field,
          this.sortOrder[0].direction == "asc" ? 1 : -1
        ].join("|");
        Axios.get(this.apiService, {
          withCredentials: true,
          params: {
            ...this.filterData,
            notPaginate: 1,
            exportConfig: JSON.stringify({
              key: this.apiService,
              name: this.title,
              config: this.routeDetail
            }),
            sort: _sortConf
          }
        }).then(resp => {
          if (resp.data.status) {
            clearInterval(window.exportFetchInterval);
            this.fetchExportlog(true);
            window.exportFetchInterval = setInterval(() => {
              this.fetchExportlog();
            }, 15000);
            alert(
              "Quá trình xuất báo cáo đang diễn ra, kiểm tra kết quả ở cuối trang."
            );
          }
        });
      } else {
        this.exportExcel(this.$refs.vuetable.tableData);
      }
    },
    exportExcel(data, name = this.title) {
      let self = this;
      if (data.length == 0) {
        self.$notify("No data to export", {
          type: "danger",
          placement: { from: "bottom" }
        });
        return;
      }

      // Get Custom Field and remove field select and action
      let customFields = self.customFields.slice();
      customFields.pop();
      customFields.shift();

      // Init
      let exceptFieldExport = self.exceptFieldExport || [];
      let fieldExport = self.fieldExport || [];
      let addFieldExport = self.addFieldExport || [];

      // Remove field from field export and field only export
      customFields = customFields.filter(field => {
        let defaultReturnField = false;
        if (exceptFieldExport.indexOf(field.name) === -1) {
          defaultReturnField = true;
        }
        if (fieldExport.length > 0) {
          if (fieldExport.indexOf(field.name) > -1) {
            defaultReturnField = true;
          } else {
            defaultReturnField = false;
          }
        }
        return defaultReturnField;
      });

      // Add field from addFieldExport
      addFieldExport.forEach(function(field) {
        if (!field.index || field.index == "first") {
          customFields = [field].concat(customFields);
        } else {
          customFields.push(field);
        }
      });

      // Create file data for export
      let dataExport = [["STT"].concat(customFields.map(field => field.title))];
      data.forEach((item, index) => {
        let arrayExport = [];
        customFields.forEach(field => {
          let valueField = item[field.name];
          if (field.name.length == 0) {
            valueField = item;
          }
          if (typeof field.callbackExport == "string") {
            valueField = self[`${field.callbackExport}Export`](valueField);
          }
          if (typeof field.callbackExport == "function") {
            valueField = field.callbackExport(valueField);
          }
          arrayExport.push(valueField);
        });
        dataExport.push([index + 1].concat(arrayExport));
      });

      let options = {
        type: "xlsx",
        sheetName: "SheetJS1",
        fileName: name
      };

      Excel.exportExcel(dataExport, options);
    },
    fetchExportlog(dontclear = false) {
      Axios.get(`${window.settings.services.adminUrl}/exportlog`, {
        withCredentials: true,
        params: {
          key: this.apiService
        }
      }).then(resp => {
        if (resp.data && resp.data.status) {
          this.exportlogs = resp.data.data;
        }
        if (!dontclear) {
          clearInterval(window.exportFetchInterval);
        }
      });
    }
  },
  beforeUpdate() {},
  data() {
    return {
      searchParam: {},
      filterConfig: {
        array: [],
        allowed: []
      },
      itemSelected: [],
      perPage: 50,
      API: null,
      css: {
        table: {
          tableClass: "table table-striped table-bordered table-hovered",
          loadingClass: "loading",
          ascendingIcon: "glyphicon glyphicon-chevron-up",
          descendingIcon: "glyphicon glyphicon-chevron-down",
          handleIcon: "glyphicon glyphicon-menu-hamburger"
        },
        pagination: {
          infoClass: "pull-left",
          wrapperClass: "btn-group pull-right padding-20",
          activeClass: "active",
          disabledClass: "disabled",
          pageClass: "btn btn-outline-primary page-item",
          linkClass: "btn btn-outline-primary page-item",
          icons: {
            first: "",
            prev: "",
            next: "",
            last: ""
          }
        }
      },
      exportlogs: [],
      webUrl: window.settings.services.webUrl,
      permitted: {},
      filterDebouncer: null
    };
  },
  computed: {
    ...mapGetters(["filterData", "isReloadTable"]),
    customFields() {
      let defaultField = [
        {
          name: "createdAt",
          title: "Ngày tạo",
          callback: "formatDate",
          dataClass: "text-center",
          titleClass: "text-center",
          sortField: "createdAt",
          callbackExport: "formatDate"
        },
        {
          name: "status",
          title: "Status",
          callback: "status",
          dataClass: "text-center",
          titleClass: "text-center",
          callbackExport: "status"
        },
        {
          name: "__slot:actions",
          title: "",
          dataClass: "text-center",
          titleClass: "text-center"
        }
      ];
      defaultField = defaultField.filter(item => {
        if (!this.hideColumns.includes(item.name)) {
          return item;
        }
      });
      return [
        {
          name: "__checkbox",
          dataClass: "text-center",
          titleClass: "text-center"
        }
      ].concat(this.fields.concat(defaultField));
    }
  },
  watch: {
    "searchParam.filter"() {
      if (this.useFilterLayout) return;

      this.setParams(this.searchParam);
    },
    "searchParam.status"() {
      if (this.useFilterLayout) return;

      this.setParams(this.searchParam);
      this.doFilter();
    },
    isReloadTable(val) {
      if (val) {
        this.doFilter();
      }
    },
    perPage() {
      let self = this;
      setTimeout(() => {
        self.doFilter();
      }, 20);
    }
  },
  components: {},
  created() {
    this.routeDetail = this.$route.meta.actions.edit;
    this.API = new Service(this.apiService);
    this.setFilterName(this.$route.name);

    this.filterConfig.array = [
      {
        label: "Search",
        name: "filter",
        type: "text",
        placeholder: "Keyword..."
      },
      {
        label: "Status",
        name: "status",
        type: "select",
        default: 1
      }
    ].concat(this.filters);
    this.filterConfig.allowed = this.filterConfig.array.map(i => i.name);

    // Assign query to search params
    let searchParam = {};
    let defaultSearchParams = this.defaultSearchParams();
    for (let key in defaultSearchParams) {
      if (this.filterConfig.allowed.includes(key)) {
        searchParam[key] = defaultSearchParams[key];
      }
    }
    for (let prop in searchParam) {
      if (this.$route.query.hasOwnProperty(prop) && this.$route.query[prop]) {
        searchParam[prop] = this.$route.query[prop];
      }
    }
    this.searchParam = searchParam;

    this.checkPermit();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
</style>
