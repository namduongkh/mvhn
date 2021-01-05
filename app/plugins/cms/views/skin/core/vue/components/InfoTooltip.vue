<template>
  <i
    class="fa fa-info-circle info-tooltip"
    data-toggle="tooltip"
    data-placement="top"
    :title="text"
  ></i>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
    },
  },
  mounted() {
    $(".info-tooltip").tooltip();
  },
};
</script>

<style>
</style>
