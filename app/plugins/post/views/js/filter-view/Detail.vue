<template>
  <div class="card card">
    <div class="card-body card-body">
      <h4 class="post-title">
        {{ post.title }}
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
          <blockquote class="field-content">
            <div
              v-if="field.type == 'editor'"
              v-html="post.customData[field.key]"
            ></div>
            <div v-else>{{ post.customData[field.key] }}</div>
          </blockquote>
        </li>
      </ul>
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
          class="btn btn-sm btn-secondary"
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
