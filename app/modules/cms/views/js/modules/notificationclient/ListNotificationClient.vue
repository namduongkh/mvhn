<template>
  <Listing
    :apiService="apiUrl"
    routeDetail="notificationclient"
    title="NotificationClients"
    :fields="fieldsDisplay"
    subTitle="Listing"
    :sortOrder="sortOrder"
    :showExport="true"
  >
    <template slot="additionalButtonHeader" slot-scope="props">
      <button class="btn btn-inline btn-success-outline" @click="showModal = true" type="button">Notify to all client</button>
      <SendNotify :clientId="'all'" :show="showModal"  @cancel="showModal = false;"/>
    </template>
    <template slot="addActions" slot-scope="props">
    </template>
  </Listing>
</template>
<script>
  /**
   * For more option please check Listing component
   */
  import SendNotify from './popup/notify';
  import { mapGetters, mapActions } from 'vuex';
  import { fieldsDisplay, sortOrder } from './fields_list_notificationclient'
  export default {
    name: 'ListNotificationClient',
    data() {
      return {
        moreParams: {
          any_field: null
        },
        fieldsDisplay,
        sortOrder,
        apiUrl: `${window.settings.services.adminUrl}/notificationclient`,
          showModal: false
      }
    },
    components: {
        SendNotify
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
