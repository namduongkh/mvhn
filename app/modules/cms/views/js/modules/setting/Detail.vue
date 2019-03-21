<template>
    <div class="page-content">
        <div class="container-fluid">
            <DetailActions
                    title="Settings"
                    listRouter="/settings"
                    routeDetail="/setting"
                    :formData="formData"
                    :disable="errors.any()"
                    @action="save"
                    @reset="resetForm"
            />

            <form class="box-typical box-typical-padding">
                <!-- <h5 class="m-t-lg with-border">Fill data below and click actions above</h5> -->
                <div class="row">
                    <div class="col-sm-12">
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <fieldset class="form-group">
                            <label class="form-label semibold" for="inputKey">Key</label>
                            <input v-model="formData.key" v-validate="'required'" data-vv-name="Key" type="text" class="form-control" id="inputKey" placeholder="Key" >
                            <small v-show="errors.has('Key')" class="text-danger">{{ errors.first('Key') }}</small>
                        </fieldset>
                    </div>
                </div><!--.row-->

                <div class="row">
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="value_type">Type</label>
                            <select v-model="formData.value_type" name="value_type" id="value_type" class="form-control">
                                <option :value="setting.value" v-for="setting in ValueTypesSetting">{{setting.name}}</option>
                            </select>
                        </fieldset>
                    </div>
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="status">Status</label>
                            <select v-model="formData.status" name="status" id="status" class="form-control">
                                <option :value="1">Publish</option>
                                <option :value="0">Unpublish</option>
                                <option :value="2">Trashed</option>
                            </select>
                        </fieldset>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <fieldset class="form-group">
                            <label class="form-label" for="inputValue">Value</label>
                            <input v-model="formData.value" v-validate="'required'" data-vv-name="Value" type="text" class="form-control" id="inputValue" placeholder="Enter value" v-if="formData.value_type == 'string'">
                            <textarea v-model="formData.value" rows="5" name="value" id="value" class="form-control" v-if="formData.value_type == 'textarea'"></textarea>
                            <select v-model="formData.value" name="value" id="value" class="form-control" v-if="formData.value_type == 'boolean'">
                                <option :value="true">True</option>
                                <option :value="false">False</option>
                            </select>
                            <input v-model="formData.value" v-validate="'required|numeric'" data-vv-name="Value" type="number" class="form-control" id="inputValue" placeholder="Enter value" v-if="formData.value_type == 'number'">
                            <datepicker v-model="formData.value" v-validate="'required'" language="vi" name="value" id="inputValue" data-vv-name="Value" placeholder="Pick a date" format="dd/MM/yyyy" input-class="form-control" v-if="formData.value_type == 'date'"/>
                            <bz-json-editor v-model="formData.value" v-if="formData.value_type == 'json'"></bz-json-editor>
                            <imageUploader name="value" classButtonUpload="btn-secondary" id="value" v-validate="'required'" dir-upload="setting" data-vv-name="Value" v-model="formData.value" v-if="formData.value_type == 'image'"/>
                            <small v-show="errors.has('Value')" class="text-danger">{{ errors.first('Value') }}</small>
                        </fieldset>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <fieldset class="form-group">
                            <label class="form-label" for="description">Description</label>
                            <textarea v-model="formData.description" rows="5" name="description" id="description" class="form-control"></textarea>
                        </fieldset>
                    </div>
                </div>
            </form><!--.box-typical-->

        </div><!--.container-fluid-->
    </div><!--.page-content-->
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import { ValueTypesSetting } from '@general/constants';

    let formData = {
        key: '',
        value_type: 'string',
        value: '',
        status: 1,
    };

    export default {
        name: 'DetailSetting',
        data(){
            return {
                formData: JSON.parse(JSON.stringify(formData)),
                apiUrl: `${window.settings.services.adminUrl}/setting`,
                ValueTypesSetting,
                tmp:{
                    string: '',
                    boolean: true,
                    json: {
                        key: "value"
                    },
                    number: 0,
                    date: new Date(),
                    textarea: ''
                },
                // test: {
                //     a: '1',
                //     b: 2,
                //     c: {
                //         key: 'value'
                //     }
                // }
            }
        },

        computed: {
            ...mapGetters(['itemSelected', 'authUser'])
        },
        watch: {
            itemSelected(data){
                if(data){
                    let templateData = Object.assign({}, formData);
                    this.formData = Object.assign({}, templateData, data);
                    this.tmp[this.formData.value_type] = this.formData.value;
                }
                // this.showJsonEditor = true;
            },
            'formData.value_type'(value_type){
                var value = this.formData.value;
                value = this.tmp[value_type];
                this.formData.value = value;
            },
            'formData.value'(value){
                if (this.formData.value_type == 'date') {
                    this.tmp[this.formData.value_type] = new Date(value).getTime().toString();
                } else {
                    this.tmp[this.formData.value_type] = value;
                }
            }
        },
        methods: {
            ...mapActions(['initService', 'saveItem', 'getItemById']),
            save(options){
                let self = this;
                this.$validator.validateAll().then(res=>{
                    if(res){
                        self.saveItem({formData: self.formData, options});
                    }
                    else{
                        this.$notify('Please check data', {type: 'warning'});
                    }
                });
            },
            resetForm(){
                this.formData = JSON.parse(JSON.stringify(formData));
                this.errors.clear();
            },
            onJsonChange (value) {
                // console.log('value:', value)
            },
        },
        components:{
        },
        created(){
            this.initService(this.apiUrl);
            let id = this.$route.params.id;
            if (id !== undefined)
                this.getItemById({ id });
        }
    }
</script>

<style>
    
</style>
