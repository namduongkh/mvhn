<template>
    <div class="croper bzPopup mfp-hide bzPopupAnimation">
        <div class="modal-header">
            <h5 class="modal-title">Crop image</h5>
        </div>
        <div class="modal-body">

            <div class="actions text-center">
                <button type="button" @click="zoom(-.1)" class="btn btn-rounded btn-inline btn-primary-outline"><i class="ibutton fa fa-search-minus" aria-hidden="true"></i></button>
                <button type="button" @click="zoom(.1)" class="btn btn-rounded btn-inline btn-primary-outline"><i class="ibutton fa fa-search-plus" aria-hidden="true"></i></button>

                <button type="button" @click="rotate(-45)" class="btn btn-rounded btn-inline btn-success-outline"><i class="ibutton fa fa-rotate-left" aria-hidden="true"></i></button>
                <button type="button" @click="rotate(45)" class="btn btn-rounded btn-inline btn-success-outline"><i class="ibutton fa fa-rotate-right" aria-hidden="true"></i></button>
            </div>
            <div v-show="image" class="crop-area">
                <img :src="image" alt="Image crop" :id="id_img" class="img img-fluid">
            </div>
            <div v-if="!image" class="no-img">
                Please upload image!!!
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" @click="saveClick" class="btn btn-primary">Save</button>
            <button type="button"  @click="cancelClick" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        </div>
    </div>
</template>

<script>
    /**
     * Created by Tất Chủ <tatchu.it@gmail.com>
     * Base usage: <imageUploader image="image_source" :aspectRatio="yourAspectRatio" :showCrop="yourShowCropModel" />
     * More options read below or docs at https://www.npmjs.com/package/cropper
     */

    export default {
        name: 'CropImage',
        props: {
            image: {
                type: String
            },
            showCrop: {
                type: Boolean,
                default: false
            },
            aspectRatio: {
                type: Number,
                default: 1
            }
        },
        data(){
            return {
                id_img: Math.round(Math.random() * 1e10)
            }
        },
        methods: {
            onCrop(e){
                this.$emit('crop', e);
            },
            cancelClick(){
                this.$emit('cancel');
                this.closePopup();
            },
            closePopup(){
                Popup.close({
                    items: {
                        src: this.$el
                    }
                });
            },
            saveClick(){
                let canvas = $(this.crop_src).cropper('getCroppedCanvas').toDataURL('image/jpeg');
                this.$emit('save', canvas);
                this.closePopup();
            },
            zoom(val){
                $(this.crop_src).cropper('zoom', val);
            },
            rotate(val){
                $(this.crop_src).cropper('rotate', val);
            },
            refresh(){
                $(this.crop_src).cropper('refresh');
            }
        },
        created(){
        },
        computed: {
            crop_src(){
                return '#' + this.id_img;
            }
        },
        watch:{
            showCrop(val){
                let self = this;
                if(val){
                    Popup.open({
                        items: {
                            src: this.$el
                        },
                        afterClose: function () {
                            self.$emit('crop:cancel');
                        }
                    });

                    setTimeout(()=>{
                        $(self.crop_src).cropper({
                            aspectRatio: self.aspectRatio,
                            crop: function(e) {
                                self.onCrop(e);
                            }
                        });
                    }, 500);

                }
            },
            image(val){
                this.$forceUpdate();
            }
        }
    }
</script>

<style lang="scss">
    .croper{
        .ibutton{
            width: 15px;
            height: 15px;
        }
    }

</style>
