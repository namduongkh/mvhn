<template>
  <div class="row">
    <div class="col-sm-12">
      <StoreOrderItemForm
        v-for="(item, index) in storeOrderItems"
        :key="item._id"
        :item="item"
        :index="index+1"
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
      <StoreOrderItemForm :item="storeOrderItem" :index="storeOrderItems.length+1">
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
      let self = this;
      this.service
        .index({
          store: this.store,
          storeOrder: this.storeOrder
        })
        .then(({ data }) => {
          self.storeOrderItems = data.data;
          self.disabledEmitChange = false;
        });
    },
    new() {
      let self = this;
      this.service.new().then(({ data }) => {
        self.storeOrderItem = Object.assign(
          {
            store: self.store,
            storeOrder: self.storeOrder
          },
          data
        );
      });
    },
    create(data) {
      let self = this;
      this.service.create(data).then(({ data }) => {
        self.new();
        self.index();
        self.$notify("Added", { type: "success" });
      });
    },
    update(data) {
      let id = data._id;
      delete data._id;

      let self = this;
      this.service.update(id, data).then(({ data }) => {
        // self.index();
        self.$notify("Updated", { type: "success" });
      });
    },
    deleteItem(id) {
      if (!confirm("Are you sure?")) return;
      let self = this;
      this.service.delete(id).then(({ data }) => {
        self.index();
        self.$notify("Deleted", { type: "success" });
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
      if (disabledEmitChange) return;

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
</style>
