<template>
  <div id="store-order-items" class="row">
    <div class="col-sm-12 items">
      <StoreOrderItemForm
        v-for="(item, index) in storeOrderItems"
        :key="item._id"
        :item="item"
        :index="index+1"
        :store="store"
      >
        <template slot="actions" slot-scope="props">
          <button type="button" @click="update(props.item)" class="btn btn-primary-outline">
            <i class="fa fa-save"></i>
          </button>
          <button type="button" @click="deleteItem(props.item._id)" class="btn btn-danger-outline">
            <i class="fa fa-trash"></i>
          </button>
        </template>
      </StoreOrderItemForm>
      <hr />
      <StoreOrderItemForm :item="storeOrderItem" :index="storeOrderItems.length+1" :store="store">
        <template slot="actions" slot-scope="props">
          <button type="button" @click="create(props.item)" class="btn btn-primary-outline">
            <i class="fa fa-plus"></i> Add
          </button>
        </template>
      </StoreOrderItemForm>
    </div>
  </div>
</template>

<script>
import ResourcesService from "@general/resources_service";
import StoreOrderItemForm from "./StoreOrderItemForm";
import { sumBy } from "lodash";

export default {
  name: "StoreOrderItemSelector",
  props: {
    store: {
      type: String
      // required: true
    },
    storeOrder: {
      type: String
      // required: true
    }
    // value: {
    //   type: Array
    // }
  },
  data() {
    return {
      storeOrderItemIds: [],
      storeOrderItems: [],
      storeOrderItem: {},
      service: new ResourcesService(
        `${window.settings.services.cmsUrl}/store_order_items`
      ),
      disabledEmitChange: true
    };
  },
  methods: {
    index() {
      this.service
        .index({
          store: this.store,
          storeOrder: this.storeOrder,
          notPaginate: true
        })
        .then(({ data }) => {
          this.storeOrderItems = data.data;
          this.$emit("orderTotalChange", sumBy(this.storeOrderItems, "total"));
        });
    },
    new() {
      this.service.new().then(({ data }) => {
        this.storeOrderItem = Object.assign(
          {
            store: this.store,
            storeOrder: this.storeOrder
          },
          data
        );
      });
    },
    create(data) {
      if (!data.storeMenu) return;

      this.service.create(data).then(({ data }) => {
        this.new();
        this.index();
        this.$notify("Added", { type: "success" });
      });
    },
    update(data) {
      let id = data._id;
      this.service.update(id, data).then(({ data }) => {
        this.$notify("Updated", { type: "success" });
      });
    },
    deleteItem(id) {
      if (!confirm("Are you sure?")) return;
      this.service.delete(id).then(({ data }) => {
        this.index();
        this.$notify("Deleted", { type: "success" });
      });
    }
  },
  created() {
    this.new();
    this.index();
  },
  components: {
    StoreOrderItemForm
  },
  watch: {
    storeOrderItems(val) {
      if (this.disabledEmitChange) return (this.disabledEmitChange = false);

      this.$emit(
        "created",
        val.map(i => {
          return i._id;
        }),
        {
          route: {
            name: this.$route.meta.actions.edit,
            params: Object.assign(this.$route.params, { id: this.storeOrder })
          }
        }
      );
    }
    // value: {
    //   deep: true,
    //   handler(val) {
    //     this.storeOrderItemIds = val;
    //     this.index();
    //   }
    // },
    // storeOrderItemIds(val) {
    //   this.$emit("input", val);
    // }
  }
};
</script>

<style>
#store-order-items .items .btn,
#store-order-items h6 {
  margin: 0;
}
</style>
