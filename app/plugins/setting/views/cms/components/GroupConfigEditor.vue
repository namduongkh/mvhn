<template>
  <div>
    <ul class="nav flex-column nav-pills nav-stacked">
      <li v-for="(group, index) in groups" :key="index">
        <a
          class="nav-link"
          :class="{ active: activeGroup == group.id }"
          href="javascript:void(0)"
          @click="changeGroup(group.id)"
        >
          <span v-text="group.name"></span>
        </a>
        <div class="actions" v-if="group.id != 'general'">
          <a
            href="javascript:void(0)"
            class="btn btn-sm btn-danger-outline"
            @click="deleteGroup(index, group.id)"
          >
            <i class="fa fa-trash"></i>
          </a>
        </div>
      </li>
    </ul>
    <hr />
    <div class="form-inline">
      <input
        type="text"
        v-model="groupName"
        class="form-control"
        placeholder="New group name"
      />
      <button class="btn btn-sm btn-primary" type="button" @click="addGroup">
        <i class="fa fa-plus"></i> Add
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupConfigEditor",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    activeGroup: {},
  },
  data() {
    return {
      groups: [],
      groupName: "",
    };
  },
  methods: {
    addGroup() {
      this.groups.push({
        id: new Date().getTime(),
        name: this.groupName,
      });

      this.groupName = "";
    },
    changeGroup(id) {
      this.$emit("groupChanged", id);
    },
    deleteGroup(index, id) {
      if (!confirm("Are you sure?")) return;

      this.groups.splice(index, 1);
      this.$emit("groupDeleted", id);
    },
  },
  created() {
    let valueWatcher = this.$watch(
      () => this.value,
      (groups) => {
        if (!groups) return;

        groups = groups || [];
        if (!groups.map((g) => g.id).includes("general")) {
          groups.unshift({ id: "general", name: "General" });
        }

        valueWatcher();
        this.groups = groups;
      }
    );
  },
  watch: {
    groups() {
      this.$emit("input", this.groups);
    },
  },
};
</script>

<style>
.nav-stacked li {
  position: relative;
}
.nav-stacked li .actions {
  position: absolute;
  top: 50%;
  right: 0.5em;
  transform: translateY(-50%);
}
</style>
