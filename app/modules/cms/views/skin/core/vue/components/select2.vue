<template>
    <select>
        <slot></slot>
    </select>
</template>

<script>
    /**
     * Created by Tất Chủ <tatchu.it@gmail.com>
     * Base usage: <select2 v-model="model" :options="options"/>
     * More options see below and docs at https://select2.org
     */
    import Axios from 'axios';
    export default {
        name: 'select2',
        props: {
            options: {
                type: Array,
                default(){ return [] }
            },
            value: {
            },
            placeholder: {
                type: String,
                default(){ return 'Select one item' }
            },
            ajax: {
                type: Object,
                default(){ return null }
            },
            disabled: {
                type: Boolean,
                default(){ return false }

            },
            multiple: {
                type: Boolean,
                default(){ return false }
            },
        },
        computed: {
            elm(){
                return $(this.$el);
            }
        },
        data(){
            return {
                fixed_options: false
            }
        },
        mounted: function () {
            // init select2
            if(this.ajax && this.ajax.url && this.value){
                this.initFixedOptions();
            }
            else{
                this.init();
            }

        },
        watch: {
            value: function (value, oldVal) {
                // update value
                if(this.multiple){
                    let current_val = this.elm.val();
                    if(JSON.stringify(value) !== JSON.stringify(current_val)){
                        this.elm.val(value).trigger('change');
                    }
                }
                else{
                    let vm = this;
                    if(vm.ajax && vm.ajax.url && vm.value && !vm.fixed_options){
                        this.initFixedOptions();
                    }
                    else{
                        this.elm.val(value).trigger('change');
                    }

                }
            },
            options: function (options) {
                // update options
                this.elm.select2('data', options)
            },
            disabled(val){
                $(this.$el).select2.defaults.set("disabled", val);
            }
        },
        methods:{
            init(){
                let vm = this;
                this.elm.select2({
                    data: this.options,
                    placeholder: this.placeholder,
                    ajax: this.ajax,
                    disabled: this.disabled,
                    multiple: this.multiple,
                })
                    .val(this.value)
                    .trigger('change')
                    // emit event on change.
                    .on('change', function () {
                        vm.$emit('input', vm.elm.val())
                    })
            },
            initFixedOptions(){
                let vm = this;
                Axios.get(this.ajax.url, { withCredentials: true, params: { notPaginate: true} }).then(({data}) =>{
                    if(data.results && data.results.length){
                        vm.fixed_options = true;
                        vm.elm.select2({
                            data: data.results,
                            placeholder: vm.placeholder,
                            disabled: vm.disabled,
                            multiple: vm.multiple,
                        })
                            .val(vm.value)
                            .trigger('change')
                            // emit event on change.
                            .on('change', function () {
                                vm.$emit('input', vm.elm.val())
                            })
                        this.elm.val(vm.value).trigger('change');

                    }else{
                        vm.init();
                    }

                })
            }
        },
        destroyed: function () {
            $(this.$el).off().select2('destroy')
        }
    }
</script>

<style>
    .select2-container--default .select2-selection--single{
        border: none;
    }
    .select2-container--default .select2-selection--single .select2-selection__rendered{
        height: 18px;
    }
    .select2-container--default .select2-selection--single .select2-selection__arrow{
        height: 38px;
    }
    .select2-container--default .select2-results__option--highlighted[aria-selected] {
    }

    .select2-container--default .select2-results__option--highlighted[aria-selected] {
        background-color: #5897fb !important;
        color: white;
    }
    .select2-results__option{
        background: #fff !important;
        color: #000;
    }

    .select2-container--default .select2-selection--multiple .select2-selection__rendered li{
        padding-right: 29px
    }
    .select2-container--default .select2-selection--multiple .select2-selection__choice{
        background: #919fa9;
    }
    .select2-selection{
        min-height: 38px;
    }
</style>