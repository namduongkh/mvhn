<template>
  <div class="page-content">
    <div class="container-fluid">
      <DetailActions
        title="StoreOrder"
        :formData="formData"
        :disable="errors.any()"
        @action="save"
        @reset="resetForm"
      >
        <template slot="moreAction">
          <StorePanel v-if="storeId" :store="storeId"></StorePanel>
        </template>
      </DetailActions>

      <form class="box-typical box-typical-padding">
        <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>

        <div class="row">
          <div class="col-sm-3">
            <fieldset class="form-group">
              <label class="form-label semibold" for="orderName">Tên đơn</label>
              <input
                v-model="formData.orderName"
                data-vv-name="Tên đơn"
                type="text"
                class="form-control"
                id="orderName"
                placeholder="Tên đơn"
              />
              <small
                v-show="errors.has('Tên đơn')"
                class="text-danger"
              >{{ errors.first('Tên đơn') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-3">
            <fieldset class="form-group">
              <label class="form-label semibold" for="store">Store</label>
              <select2
                id="store"
                v-validate="'required'"
                data-vv-name="Store"
                name="store"
                v-model="formData.store"
                :ajax="ajaxStore"
                disabled
              />
              <small v-show="errors.has('Store')" class="text-danger">{{ errors.first('Store') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-3">
            <fieldset class="form-group">
              <label class="form-label semibold" for="storeTable">Bàn</label>
              <select2
                id="storeTable"
                data-vv-name="Bàn"
                name="storeTable"
                v-model="formData.storeTable"
                :ajax="ajaxStoreTable"
                disabled
              />
              <small v-show="errors.has('Bàn')" class="text-danger">{{ errors.first('Bàn') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-3">
            <fieldset class="form-group">
              <label class="form-label semibold" for="customer">Khách hàng</label>
              <select2
                id="customer"
                data-vv-name="Khách hàng"
                name="customer"
                v-model="formData.customer"
                :ajax="ajaxCustomer"
              />
              <small
                v-show="errors.has('Khách hàng')"
                class="text-danger"
              >{{ errors.first('Khách hàng') }}</small>
            </fieldset>
          </div>

          <div class="col-sm-3">
            <fieldset class="form-group">
              <label class="form-label semibold" for="type">Loại đơn</label>
              <select
                id="type"
                data-vv-name="Loại đơn"
                name="type"
                v-model="formData.type"
                class="form-control"
              >
                <option value="single">Single</option>
                <option value="multiple">Multiple</option>
              </select>
            </fieldset>
          </div>

          <div class="col-sm-3">
            <fieldset class="form-group">
              <label class="form-label semibold" for="orderStatus">Trạng thái</label>
              <select
                id="orderStatus"
                data-vv-name="Trạng thái"
                name="orderStatus"
                v-model="formData.orderStatus"
                class="form-control"
              >
                <option
                  v-for="status in orderStatusOptions"
                  :key="status"
                  :value="status"
                >{{ status }}</option>
              </select>
            </fieldset>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 text-right">
            <h4>
              Tổng giá trị:
              <span class="text-danger">{{ formData.total }}</span>
            </h4>

            <button type="button" class="btn btn-success-outline" @click="doneOrder()">
              <i class="fa fa-check"></i> Kết thúc đơn hàng
            </button>
          </div>
        </div>

        <hr />
        <div class="row">
          <div class="col-sm-12">
            <StoreOrderItemSelector
              v-if="parent.store || parent._id"
              :store="parent.store || parent._id"
              :storeOrder="$route.params.id || formData._id || formData.fakeId"
              :storeOrderObject="formData"
              @created="onItemCreated"
              @orderTotalChange="onOrderTotalChange"
            />
          </div>
        </div>
        <hr />

        <div class="row" v-if="formData.type == 'single' && !formData.storeTable">
          <div class="col-sm-4">
            <fieldset class="form-group">
              <label class="form-label" for="deliveryPeople">Người nhận:</label>
              <input v-model="formData.deliveryPeople" class="form-control" />
            </fieldset>
          </div>
          <div class="col-sm-4">
            <fieldset class="form-group">
              <label class="form-label" for="deliveryPhone">Điện thoại:</label>
              <input v-model="formData.deliveryPhone" class="form-control" />
            </fieldset>
          </div>
          <div class="col-sm-4">
            <fieldset class="form-group">
              <label class="form-label" for="deliveryAddress">Địa chỉ:</label>
              <input v-model="formData.deliveryAddress" class="form-control" />
            </fieldset>
          </div>
          <div class="col-sm-12">
            <fieldset class="form-group">
              <label class="form-label" for="note">Ghi chú</label>
              <textarea disabled v-model="formData.note" class="form-control" />
            </fieldset>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6">
            <fieldset class="form-group">
              <label class="form-label" for="status">Status</label>
              <select v-model="formData.status" name="status" id="status" class="form-control">
                <option :value="1">Publish</option>
                <option :value="0">Unpublish</option>
                <option :value="2">Trashed</option>
              </select>
            </fieldset>
          </div>
        </div>
      </form>
      <!--.box-typical-->
    </div>
    <!--.container-fluid-->
  </div>
  <!--.page-content-->
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import StoreOrderItemSelector from "./StoreOrderItemSelector";
import ResourcesService from "@general/resources_service";
import moment from "moment";

export default {
  name: "DetailStoreOrder",
  data() {
    return {
      formData: {},
      cmsUrl: `${CMS_URL}/${this.$route.params.parentType}/${this.$route.params.parentId}/store_orders`,
      ajaxStoreTable: {
        url: `${CMS_URL}/store_tables/select2`,
      },
      ajaxStore: {
        url: `${CMS_URL}/stores/select2`,
      },
      ajaxCustomer: {
        url: `${CMS_URL}/users/select2`,
        textTemplate: "<%= name %> (<%= email %>)",
      },
      froalaConfig: {
        imageUploadURL: WEB_URL + "/api/upload/image",
        imageUploadMethod: "POST",
        imageUploadParams: {
          type: "wysiwyg/post",
        },
      },
      parentType:
        this.$route.params.parentType == "stores" ? "store" : "storeTable",
      parent: {},
      parentService: new ResourcesService(
        `${CMS_URL}/${this.$route.params.parentType}`
      ),
      storeTable: {},
      customer: {},
      orderStatusOptions: [
        "ordering",
        "ordered",
        "active",
        "ready",
        "delivering",
        "delivered",
        "done",
        "cancel",
      ],
    };
  },
  computed: {
    ...mapGetters(["itemSelected", "authUser"]),
    storeId() {
      return this.parent.store || this.parent._id;
    },
  },
  watch: {
    itemSelected(data) {
      if (data) {
        this.formData = Object.assign(
          {
            store: this.parent.store || this.parent._id,
            storeTable: this.storeTable._id,
            orderName: `${this.storeTable.name}'s order at ${moment().format(
              "DD/MM/YYYY HH:mm"
            )}`,
            total: this.formData.total,
          },
          data
        );
      }
    },
    // "formData.name"(val) {
    //   this.formData.slug = this.$options.filters["text2Slug"](val);
    // },
    // "formData.attribute"(attribute) {
    //   // Do something
    // }
  },
  methods: {
    ...mapActions([
      "initService",
      "saveItem",
      "getItemById",
      "newItem",
      "goto",
    ]),
    save(options) {
      let self = this;
      this.$validator.validateAll().then((res) => {
        if (res) {
          self.saveItem({ formData: self.formData, options });
        } else {
          this.$notify("Please check your data", { type: "warning" });
        }
      });
    },
    doneOrder() {
      if (!confirm("Confirm to complete order")) return;
      this.formData.orderStatus = "done";
      this.saveItem({
        formData: this.formData,
        options: {
          route: {
            name: this.formData.storeTable
              ? "ListStoreTables"
              : "ListStoreOrders",
            params: { storeId: this.formData.store },
          },
        },
      });
    },
    resetForm() {
      this.errors.clear();
      if (!this.formData._id) {
        this.newItem();
      } else {
        this.getItemById({ id: this.formData._id });
      }
    },
    onItemCreated(itemIds, options) {
      this.formData.storeOrderItems = itemIds;
      this.saveItem({ formData: this.formData, options });
    },
    loadParent(id) {
      return this.parentService.show(id);
    },
    onOrderTotalChange(total) {
      this.formData.total = total;
    },
  },
  components: {
    StoreOrderItemSelector,
  },
  created() {
    if (!this.$route.params.parentId) return;

    this.loadParent(this.$route.params.parentId).then(({ data }) => {
      this.parent = data;
      if (this.parent.store) {
        this.storeTable = this.parent;
      }

      this.initService(this.cmsUrl);
      let id = this.$route.params.id;
      if (id !== undefined) this.getItemById({ id });
      else this.newItem();
    });
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>
