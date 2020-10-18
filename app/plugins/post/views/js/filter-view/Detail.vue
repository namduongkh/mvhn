<template>
  <div class="card panel panel-default">
    <div class="card-body panel-body">
      <h4 class="post-title">
        {{ post.title }}
      </h4>
      <table
        class="table table-sm"
        v-if="post.customData && post.customFields && post.customFields.length"
      >
        <tr
          v-for="(field, jIndex) in post.customFields"
          :key="`jIndex${jIndex}`"
        >
          <td>
            <small><strong>{{ field.name }}</strong></small>
          </td>
          <td>
            <div>{{ post.customData[field.key] }}</div>
          </td>
        </tr>
      </table>
      <div class="text-right">
        <a
          href="javascript:void(0)"
          class="btn btn-sm btn-primary"
          @click="edit()"
        >
          <i class="fa fa-edit"></i> Edit
        </a>
        <a
          href="javascript:void(0)"
          class="btn btn-sm btn-default"
          @click="remove()"
        >
          <i class="fa fa-trash"></i> Remove
        </a>
        <div>
          <small>Created at: {{ post.createdAt | formatDate }}</small>
          <small>Updated at: {{ post.updatedAt | formatDate }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  props: {
    post: {
      type: Object,
    },
  },
  methods: {
    edit() {
      this.$emit("onEditEnabled");
    },
    remove() {
      this.$emit("onRemove");
    },
  },
};
</script>

<style>
</style>
