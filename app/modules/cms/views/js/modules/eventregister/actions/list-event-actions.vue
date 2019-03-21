<template>
    <div class="custom-event-actions">
        <button v-if="!rowData.is_selected" class="btn btn-inline btn-success-outline" @click="confirmChoose()">Chọn tham gia</button>
        <span v-else>Mã xác nhận: <br/> <strong>{{ rowData.confirm_code }}</strong></span>
    </div>
</template>

<script>
    import Axios from 'axios';

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
            }
        },
        components: {
        },
        methods: {
            chooseMom(){
                let vm = this;
                Axios.post(settings.services.adminUrl + "/eventregister/choose-mom", {id: this.rowData._id}, {withCredentials: true}).then(res=>{
                    vm.$store.dispatch("reloadTable");
                })
                .catch(err=>{
                    console.log('err', err)
                })
            },
            confirmChoose(){
                let vm = this;
                this.$store.dispatch("openConfirm", {
                    show: true, 
                    title: 'Xác nhận chọn',
                    message: 'Click Ok để tiếp tục',
                    ok: vm.chooseMom, 
                    cancel: () => {console.log('cancel', vm.rowData);} 
                })
            }
        }
    }
</script>