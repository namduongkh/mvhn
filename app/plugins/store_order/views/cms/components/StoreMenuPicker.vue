<template>
  <div>
    <div class="row">
      <div class="col-xs-4">
        <ImageAsAvatar :src="menu.image" :alt="menu.name" />
      </div>
      <div class="col-xs-8">
        <h6>
          <strong>{{ menu.name }}</strong>
        </h6>
        <a
          @click="loadMenu"
          data-toggle="modal"
          :data-target="'#store-menu-' + storeOrderItem._id"
          href="javascript:void(0)"
        >
          <i class="fa fa-folder-open"></i> Menu
        </a>
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
            <div class="row">
              <div class="col-xs-6" v-for="menu in menus" :key="menu._id">
                <table class="table table-bordered table-hovered">
                  <tr>
                    <td style="width:25%;max-width:80px">
                      <ImageAsAvatar :src="menu.image" :alt="menu.name" />
                    </td>
                    <td>
                      <h4>{{menu.name}}</h4>
                      <h5>{{menu.price | currency}}</h5>
                      <div>
                        <a
                          href="javascript:void(0)"
                          class="btn btn-secondary-outline btn-sm"
                          data-dismiss="modal"
                          @click="pick(menu)"
                        >
                          <i class="fa fa-plus"></i> Chọn
                        </a>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
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
      type: String,
    },
    storeOrderItem: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      menus: [],
      menu: {},
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
    },
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
      },
    },
  },
};
</script>

<style>
</style>
