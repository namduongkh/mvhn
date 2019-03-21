<template>
    <div class="row">
        <div class="col-sm-12">
            <h6 class="m-t-lg with-border">Page banner</h6>
        </div>
        <div class="col-sm-12">
            <fieldset class="form-group">
                <label class="form-label semibold">Loại banner</label>
                <div class="">
                    <input v-model="formData.banner_type" :value="1" id="banner_1_img" type="radio" name="banner_type">
                    <label class="radio-label semibold" for="banner_1_img">Một ảnh</label>
                </div>
                <div class="">
                    <input v-model="formData.banner_type" :value="2" id="banner_multi_img" type="radio" name="banner_type">
                    <label class="radio-label semibold" for="banner_multi_img">Nhiều ảnh</label>
                </div>
            </fieldset>
            <div class="row" v-if="formData.banner_type === 1">
                <div class="col-md-6">
                    <fieldset  class="form-group">
                        <label class="form-label semibold" for="banner_img">Banner desktop</label>
                        <imageUploader name="banner_img" classButtonUpload="btn-secondary" id="banner_img" v-model="formData.img_url"/>
                        <small v-show="errors.has('Hình banner')" class="text-danger">{{ errors.first('Hình banner') }}</small>
                    </fieldset>
                </div>
                <div class="col-md-6">
                    <fieldset class="form-group">
                        <label class="form-label semibold" for="banner_img_mb">Banner mobile</label>
                        <imageUploader name="banner_img_mb" classButtonUpload="btn-secondary" id="banner_img_mb" v-model="formData.img_url_mobile"/>
                        <small v-show="errors.has('Hình banner')" class="text-danger">{{ errors.first('Hình banner') }}</small>
                    </fieldset>
                </div>
            </div>

            <fieldset v-if="formData.banner_type === 2" class="form-group">
                <label class="form-label semibold" for="list_img_url">Danh sách hình</label>
                <imageUploader :multiple="true" name="list_img_url" classButtonUpload="btn-secondary" id="list_img_url" v-model="formData.list_img_url"/>
                <small v-show="errors.has('Hình ảnh')" class="text-danger">{{ errors.first('Hình ảnh') }}</small>
            </fieldset>
        </div>

        <div class="col-sm-12">
            <h6 class="m-t-lg with-border">Call to action button</h6>
        </div>
        <div class="col-sm-4">
            <fieldset class="form-group">
                <label class="form-label semibold" for="button_text">Nội dung hiển thị</label>
                <input type="text" id="button_text" v-model="formData.button_text" class="form-control"/>
            </fieldset>
        </div>
        <div class="col-sm-4">
            <fieldset class="form-group">
                <label class="form-label semibold" id="callback_url" for="callback_url">Khi click button sẽ đi tới (url)</label>
                <input type="text" v-model="formData.callback_url" class="form-control"/>
            </fieldset>
        </div>
        <div class="col-sm-4">
            <fieldset class="form-group">
                <label class="form-label semibold" id="open_in_new_tab" for="open_in_new_tab">Mở link trên tab mới</label>
                <input type="checkbox" v-model="formData.open_in_new_tab" />
            </fieldset>
        </div>
    </div>
</template>

<script>
    export default {
        name: "page-banner",
        props: {
            value: {
                type: Object,
                 default: function () {return {}}
            }
        },
        data(){
            return {
                formData: {
                    banner_type: 1,
                    img_url: null,
                    img_url_mobile: null,
                    list_img_url: [],
                    button_text: "",
                    callback_url: null,
                    open_in_new_tab: false,
                }
            }
        },
        watch: {
            formData: {
                deep: true,
                handler: function (val) {
                    this.$emit('input', val);
                }
            },
            value(val){
                this.formData = val;
            }
        }
    }
</script>

<style scoped>
    .radio-label{
        display: inline-block;;
    }
</style>