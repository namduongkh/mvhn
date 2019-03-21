<template>
    <div id="pop-send-noti" class="bzPopup mfp-hide bzPopupAnimation">
        <div class="modal-header">
            <h4 class="modal-title">Send message to client</h4>
        </div>
        <div class="modal-body">
            <form class="row">
                <div class="col-sm-12">
                    <fieldset class="form-group">
                        <label for="title" class="form-label semibold">Title</label>
                        <input type="text" class="form-control" v-model="formData.title" v-validate="'required'" data-vv-name="Title" id="title"/>
                    </fieldset>
                </div>
                <div class="col-sm-12">
                    <fieldset class="form-group">
                        <label for="body" class="form-label semibold">Message</label>
                        <textarea type="text" class="form-control" v-model="formData.body" v-validate="'required'" data-vv-name="Message" id="body"></textarea>
                    </fieldset>
                </div>
                <div class="col-sm-12">
                    <fieldset class="form-group">
                        <label for="click_action" class="form-label semibold">Link onclick</label>
                        <input type="text" class="form-control" v-model="formData.click_action" id="click_action"/>
                    </fieldset>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" v-if="!success" @click="sendNoti" class="btn btn-success">Gửi</button>
            <span v-if="success" class="text-green">{{ message }}</span>
            <button type="button" @click="cancelClick" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios';
    export default {
        name: "browser-push-notify",
        props: {
            clientId: {
                type: String,
                required: true
            },
            show:{
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                loading: false,
                formData: {
                    title: '',
                    body: '',
                    click_action: ''
                },
                success: false,
                message: ''
            }
        },
        methods: {
            sendNoti(){
                if(!this.loading){
                    let vm = this;
                    this.loading = true;
                    Axios.post(`${window.settings.services.adminUrl}/notificationclient/notify/${this.clientId}`, this.formData, {withCredentials: true})
                        .then(res=>{
                            vm.loading = false;
                            vm.success = res.data.success;
                            vm.message = res.data.message;
                            console.log('res', res);
                        }).catch(err=>{
                            vm.loading = false;
                            console.log('err', err)
                        })
                }
            },
            cancelClick(){
                this.$emit('cancel');
                this.closePop();
            },
            closePop(){
                Popup.close({
                    items: {
                        src: this.$el
                    }
                });
                this.resetState();
            },
            resetState(){
                this.success = false;
                this.message = '';
            }
        },
        watch: {
            show(val){
                let self = this;
                if(val){
                    Popup.open({
                        items: {
                            src: this.$el
                        },
                        closeOnBgClick: false,
                        afterClose: function () {
                            self.$emit('cancel');
                        }
                    });
                }
            },
        }
    }
</script>

<style scoped>
    #pop-send-noti{
        max-width: 700px;
    }
</style>