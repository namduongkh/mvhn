<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Controller</th>
          <th>Action</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(right, index) in userRights" :key="index">
          <td>
            <input type="checkbox" :value="right._id" v-model="selected" />
          </td>
          <td>{{ right.name }}</td>
          <td>{{ right.controller }}</td>
          <td>{{ right.action }}</td>
          <td>
            <a href="javascript:void(0)" class="btn btn-danger btn-sm" @click="removeRight(right)">
              <i class="fa fa-trash"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <hr />
    <div class="row">
      <div class="col-sm-12">
        <form class="form form-inline">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            v-model="right.name"
            placeholder="Permit for someone"
          />
          <label for="controller">Controller</label>
          <input type="text" class="form-control" v-model="right.controller" placeholder="posts" />
          <label for="action">Action</label>
          <input type="text" class="form-control" v-model="right.action" placeholder="index" />
          <a href="javascript:void(0)" class="btn btn-primary" @click="saveRight()">
            <i class="fa fa-plus"></i> Add
          </a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Service from "@general/services.class";
import { compact, remove } from "lodash";

export default {
  name: "UserRightLoader",
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      selected: [],
      service: new Service(`${window.settings.services.cmsUrl}/user_rights`),
      userRights: [],
      right: {}
    };
  },
  mounted() {
    let that = this;
    this.service
      .getItems({
        select: "name controller action"
      })
      .then(resp => {
        that.userRights = resp.data.data;
      });
  },
  methods: {
    saveRight() {
      let that = this;
      if (!this.right.name || !this.right.controller || !this.right.action) {
        this.$notify("Please check your data", { type: "warning" });
        return;
      }
      this.service.addItem(this.right).then(resp => {
        that.userRights.unshift({
          _id: resp.data.data._id,
          controller: resp.data.data.controller,
          action: resp.data.data.action,
          name: resp.data.data.name
        });
        that.selected.unshift(resp.data.data._id);
        that.$notify(resp.data.message, { type: "success" });
      });
    },
    removeRight(right) {
      if (!confirm("Are you sure?")) return;
      let that = this;
      this.service.deleteItem(right._id).then(resp => {
        remove(that.selected, function(id) {
          return id.toString() == right._id.toString();
        });
        remove(that.userRights, function(_right) {
          return _right._id.toString() == right._id.toString();
        });
        that.$forceUpdate();
        that.$notify(resp.data.message, { type: "success" });
      });
    }
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        this.selected = val;
      }
    },
    selected(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style>
table > tr > td {
  vertical-align: middle;
}
</style>
