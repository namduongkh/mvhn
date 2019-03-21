<template>
    <Listing
            :apiService="apiUrl"
            routeDetail="setting"
            title="Settings"
            :fields="fieldsDisplay"
            subTitle="Listing"
            :sortOrder="sortOrder"
    >
        <template slot="additionalFilter" slot-scope="props">
        </template>
    </Listing>
</template>
<script>

    import { mapGetters, mapActions } from 'vuex';
    import { fieldsDisplay, sortOrder } from './fields'
    export default {
        name: 'ListSetting',
        data() {
            return {
                moreParams: {
                    role: null
                },
                fieldsDisplay,
                sortOrder,
                apiUrl: `${window.settings.services.adminUrl}/setting`
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
        created: function () {
            for(let prop in this.moreParams){
                if(this.$route.query.hasOwnProperty(prop) && this.$route.query[prop]){
                    this.moreParams[prop] = this.$route.query[prop];
                }
            }
        },
        watch: {
            'moreParams.role'(val){
                this.setParams({ role: val });
                this.reloadTable();
            },
            onResetParams(val){
                if(val){
                    this.moreParams.role = null;
                }
            }
        }
    }
</script>