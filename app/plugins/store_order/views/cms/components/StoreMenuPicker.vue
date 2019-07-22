<template>
  <div>
    <div class="row">
      <div class="col-sm-3 col-xs-4">
        <img v-if="menu.image" :src="menu.image" style="width:100%;border:1px solid #ddd" />
      </div>
      <div class="col-sm-7 col-xs-8">
        <h6>
          <strong>{{ menu.name }}</strong>
        </h6>
      </div>
      <div class="col-sm-2 col-xs-12 text-right">
        <button
          type="button"
          @click="loadMenu"
          class="btn btn-secondary-outline"
          data-toggle="modal"
          :data-target="'#store-menu-' + storeOrderItem._id"
        >
          <i class="fa fa-folder-open"></i>
        </button>
      </div>
    </div>

    <div :id="'store-menu-' + storeOrderItem._id" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Menu</h4>
          </div>
          <div class="modal-body">
            <table class="table table-bordered table-hovered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="menu in menus" :key="menu._id">
                  <td style="max-width:100px">
                    <img class="img-responsive" :src="menu.image" />
                  </td>
                  <td>
                    <strong>{{menu.name}}</strong>
                  </td>
                  <td>
                    <strong>{{menu.price}}</strong>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      class="btn btn-secondary-outline"
                      data-dismiss="modal"
                      @click="pick(menu)"
                    >
                      <i class="fa fa-plus"></i> Pick
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StoreMenuLoader from "../services/store_menu_loader";

export default {
  name: "StoreMenuPicker",
  props: {
    store: {
      type: String
    },
    storeOrderItem: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      menus: [],
      menu: {}
    };
  },
  methods: {
    pick(menu) {
      this.menu = menu;
      this.$emit("picked", menu);
    },
    loadMenus() {
      let self = this;
      StoreMenuLoader.perform(this.store).then(({ data }) => {
        self.menus = data.data;
        self.loadMenu();
      });
    },
    loadMenu() {
      if (!this.storeOrderItem.storeMenu) return;

      for (let i in this.menus) {
        if (
          this.menus[i]._id.toString() ==
          this.storeOrderItem.storeMenu.toString()
        ) {
          this.menu = this.menus[i];
          return;
        }
      }
    }
  },
  created() {
    this.loadMenus();
  },
  watch: {
    storeOrderItem: {
      deep: true,
      handler(val) {
        if (!val || !val.storeMenu) this.menu = {};
        else this.loadMenu();
      }
    }
  }
};
</script>

<style>
</style>
