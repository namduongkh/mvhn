<template>
    <div class="custom-actions">
        <button class="btn btn-inline btn-success-outline" @click="showModal = true">Notify</button>
        <SendNotify :clientId="rowData._id" :show="showModal"  @cancel="closePopup"/>
    </div>
</template>

<script>
    import SendNotify from '../popup/notify';

    export default {
        props: {
            rowData: {
                type: Object,
                required: true
            },
            rowIndex: {
                type: Number
            }
        },
        data(){
            return {
                showModal: false
            }
        },
        components: {
            SendNotify
        },
        methods: {
            closePopup(){
                this.showModal = false;
            }
        }
    }
</script>