<template>
  <Listing
    :apiService="apiUrl"
    routeDetail="tip"
    title="Tips"
    :fields="fieldsDisplay"
    subTitle="Listing"
    :sortOrder="sortOrder"
    :showExport="true"
  >
    <template slot="additionalFilter" slot-scope="props"></template>
    <template slot="addActions" slot-scope="props"></template>
  </Listing>
</template>
<script>
  /**
   * For more option please check Listing component
   */
  import { mapGetters, mapActions } from 'vuex';
  import { fieldsDisplay, sortOrder } from './fields_list_tip'
  export default {
    name: 'ListTip',
    data() {
      return {
        moreParams: {
          any_field: null
        },
        fieldsDisplay,
        sortOrder,
        apiUrl: `${window.settings.services.adminUrl}/tip`
      }
    },
    computed: {
      ...mapGetters(['filterData', 'onResetParams']),
    },
    methods: {
      ...mapActions(['openConfirm', 'setParams', 'reloadTable']),
      goto(router){
        this.$store.dispatch("goto", router);
      }
    },
    created () {
      for(let prop in this.moreParams){
        if(this.$route.query.hasOwnProperty(prop) && this.$route.query[prop]){
          this.moreParams[prop] = this.$route.query[prop];
        }
      }
    },
    watch: {
      'moreParams.any_field'(any_field){
        this.setParams({ any_field });
        this.reloadTable();
      },
      onResetParams(val){
        if(val){
          this.moreParams.any_field = null;
        }
      }
    }
  }
</script>
<style lang="scss" scoped></style>
