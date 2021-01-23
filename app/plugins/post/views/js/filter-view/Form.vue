<template>
  <div class="card card">
    <form @submit.prevent="save()" class="card-body card-body">
      <h4 class="post-title">
        <input
          type="text"
          v-model="post.title"
          class="form-control"
          placeholder="Title"
        />
      </h4>
      <ul
        v-if="post.customData && post.customFields && post.customFields.length"
      >
        <li
          v-for="(field, jIndex) in post.customFields"
          :key="`jIndex${jIndex}`"
        >
          <small
            ><strong>{{ field.name }}:</strong></small
          >
          <FieldEditor
            v-model="post.customData[field.key]"
            :field="{
              type: field.type,
              key: field.key,
              placeholder: field.name,
              options: field.options || '',
            }"
          />
        </li>
      </ul>
      <div class="text-right">
        <button
          type="button"
          @click="onCancelEdit()"
          class="btn btn-sm btn-secondary"
          v-if="post._id"
        >
          <i class="fa fa-arrow-left"></i> Cancel
        </button>
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
    onCancelEdit() {
      this.$emit("onCancelEdit");
    },
  },
};
</script>

<style>
</style>
