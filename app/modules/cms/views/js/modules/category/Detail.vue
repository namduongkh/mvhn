<template>
    <div class="page-content">
        <div class="container-fluid">
            <DetailActions
                    title="Category"
                    listRouter="/categories"
                    routeDetail="/category"
                    :formData="formData"
                    :disable="errors.any()"
                    @action="save"
                    @reset="resetForm"
            />

            <form class="box-typical box-typical-padding">
                <h5 class="m-t-lg with-border">Fill data below and click actions above</h5>

                <div class="row">
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label semibold" for="exampleInput">Full name</label>
                            <input v-model="formData.name" v-validate="'required'" data-vv-name="Tên" type="text" class="form-control" id="exampleInput" placeholder="Full name" >
                            <small v-show="errors.has('Tên')" class="text-danger">{{ errors.first('Tên') }}</small>
                        </fieldset>
                    </div>
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="exampleInputSlug">Slug</label>
                            <input v-model="formData.slug" v-validate="'required'" data-vv-name="Slug" type="text" class="form-control" id="exampleInputSlug" placeholder="Enter Slug">
                            <small v-show="errors.has('Slug')" class="text-danger">{{ errors.first('Slug') }}</small>
                        </fieldset>
                    </div>
                </div><!--.row-->

                <div class="row">
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="type">Type</label>
                            <select v-model="formData.type" name="type" id="type" class="form-control">
                                <option :value="'product'">Product</option>
                                <option :value="'banner'">Banner</option>
                                <option :value="'post'">Post</option>
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
                
                <div class="row" v-if="formData.type == 'question'">
                    <div class="col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label semibold" for="image">Image</label>
                            <imageUploader name="image" classButtonUpload="btn-secondary" id="image"  data-vv-name="Image" v-model="formData.image"/>
                            <small v-show="errors.has('image')" class="text-danger">{{ errors.first('Image') }}</small>
                        </fieldset>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <fieldset class="form-group">
                            <label class="form-label" for="description">Description</label>
                            <textarea cols="30" rows="5" name="description" id="description" class="form-control" v-model="formData.description"></textarea>
                        </fieldset>
                    </div>
                </div>
            </form><!--.box-typical-->


        </div><!--.container-fluid-->
    </div><!--.page-content-->
</template>
<script>
    let formData = {
        name: '',
        slug: '',
        description: '',
        type: '',
        status: 1
    };

    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'DetailUser',
        data(){
          return {
              formData: JSON.parse(JSON.stringify(formData)),
              apiUrl: `${window.settings.services.adminUrl}/category`
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
                }
            },
            'formData.name'(val){
                this.formData.slug = this.$options.filters['text2Slug'](val);
            },
            'formData.slug'(val){
                this.formData.slug = this.$options.filters['text2Slug'](val);
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
            }
        },
        components: {
        },
        created(){
            this.initService(this.apiUrl);
            let id = this.$route.params.id;
            if (id !== undefined)
                this.getItemById({ id });
        }
    }
</script>