<template>
    <Listing
            :apiService="apiUrl"
            routeDetail="redeemhistory"
            title="Redeem Histories"
            :fields="fieldsDisplay"
            subTitle="Listing"
            :sortOrder="sortOrder"
            :showExport="true"
    >
        <!-- <template slot="additionalFilter" slot-scope="props">
            <div class="col-sm-3">
                <div>
                    <label>
                        Category:
                        <select name="category" v-model="moreParams.category" class="form-control">
                            <option :value="null">All category</option>
                            <option value="admin">Admin</option>
                            <option value="redeemhistory">RedeemHistory</option>
                        </select>
                    </label>
                </div>
            </div>
        </template> -->
    </Listing>
</template>
<script>

    import { mapGetters, mapActions } from 'vuex';
    import { fieldsDisplay, sortOrder } from './fields'
    export default {
        name: 'ListRedeemHistory',
        data() {
            return {
                moreParams: {
                    role: null
                },
                fieldsDisplay,
                sortOrder,
                apiUrl: `${window.settings.services.adminUrl}/redeemhistory`
            }
        },
        computed: {
            ...mapGetters(['filterData']),
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
            'moreParams.category'(val){
                this.setParams({ role: val });
                this.reloadTable();
            }
        }
    }
</script>