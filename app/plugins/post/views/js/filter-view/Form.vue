<template>
  <div class="card panel panel-default">
    <form @submit.prevent="save()" class="card-body panel-body">
      <h4 class="post-title">
        <input
          type="text"
          v-model="post.title"
          class="form-control"
          placeholder="Title"
        />
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
            <small
              ><strong>{{ field.name }}</strong></small
            >
          </td>
          <td>
            <FieldEditor
              v-model="post.customData[field.key]"
              :field="{
                type: field.type,
                key: field.key,
                placeholder: field.name,
                options: field.options || '',
              }"
            />
          </td>
        </tr>
      </table>
      <div class="text-right">
        <button type="submit" class="btn btn-sm btn-primary">
          <i class="fa fa-save"></i> Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Form",
  props: {
    post: {
      type: Object,
    },
    customConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    save() {
      this.$emit("onSave", this.post);
    },
  },
};
</script>

<style>
</style>
