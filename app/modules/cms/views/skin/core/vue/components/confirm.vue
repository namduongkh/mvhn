<template>
    <div id="pop-confirm" class="bzPopup mfp-hide bzPopupAnimation">
        <div class="modal-header">
            <h5 class="modal-title">Confirm</h5>
        </div>
        <div class="modal-body">
            <p>{{ popupConfirm.message || message }}</p>
        </div>
        <div class="modal-footer">
            <button type="button" @click="okClick" class="btn btn-primary">OK</button>
            <button type="button"  @click="cancelClick" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        name: 'confirm',
        props: ['message', 'ok', 'cancel'],
        methods:{
            okClick(){
                if(this.popupConfirm && this.popupConfirm.ok && typeof  this.popupConfirm.ok === 'function'){
                    this.popupConfirm.ok();
                }
                this.closePopup();
            },
            cancelClick(){
                if(this.popupConfirm && this.popupConfirm.cancel  && typeof this.popupConfirm.cancel === 'function'){
                    this.popupConfirm.cancel();
                    this.closePopup();
                }
            },
            closePopup(){
                Popup.close({
                    items: {
                        src: '#pop-confirm'
                    }
                });
                let self = this;
                setTimeout(()=>{
                    self.resetConfirmState();
                }, 100);
            }
        },
        data() {
            return {
                ...mapActions(['resetConfirmState'])
            }
        },
        watch: {
            'popupConfirm.show'(){
                let self = this;
                if(this.popupConfirm.show){
                    Popup.open({
                        items: {
                            src: '#pop-confirm'
                        },
                        afterClose: function () {
                            self.resetConfirmState();
                        }
                    });
                }

            }
        },
        computed: {
            ...mapGetters(['popupConfirm'])
        }
    }
</script>
<style lang="scss">
    #pop-confirm{
        width: 40%;
        top: -200px;
        .mfp-close{
            color: #333;
        }
    }
</style>