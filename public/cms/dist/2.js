webpackJsonp([2],{555:function(module,exports,__webpack_require__){function injectStyle(ssrContext){__webpack_require__(615)}var Component=__webpack_require__(3)(__webpack_require__(617),__webpack_require__(623),injectStyle,"data-v-256c87a5",null);module.exports=Component.exports},615:function(module,exports,__webpack_require__){var content=__webpack_require__(616);"string"==typeof content&&(content=[[module.i,content,""]]),content.locals&&(module.exports=content.locals);var add=__webpack_require__(19).default;add("fe3ea08a",content,!0,{})},616:function(module,exports,__webpack_require__){exports=module.exports=__webpack_require__(13)(!1),exports.push([module.i,"",""])},617:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _assign=__webpack_require__(68),_assign2=_interopRequireDefault(_assign),_stringify=__webpack_require__(36),_stringify2=_interopRequireDefault(_stringify),_extends2=__webpack_require__(9),_extends3=_interopRequireDefault(_extends2),_vuex=__webpack_require__(10),_ProductUrl=__webpack_require__(618),_ProductUrl2=_interopRequireDefault(_ProductUrl);exports.default={name:"DetailProduct",data:function(){return{formData:{},cmsUrl:window.settings.services.cmsUrl+"/products",ajaxCategory:{url:window.settings.services.cmsUrl+"/properties/select2",params:{type:"category"},textField:"name",autoload:!0},ajaxTags:{url:window.settings.services.cmsUrl+"/properties/select2",params:{type:"tag"},textField:"name",autoload:!0},froalaConfig:{imageUploadURL:window.settings.services.webUrl+"/api/upload/image",imageUploadMethod:"POST",imageUploadParams:{type:"wysiwyg/post"}}}},computed:(0,_extends3.default)({},(0,_vuex.mapGetters)(["itemSelected","authUser"])),watch:{itemSelected:function(data){data&&(this.formData=JSON.parse((0,_stringify2.default)((0,_assign2.default)({},data))))},"formData.name":function(val){this.formData.slug=this.$options.filters.text2Slug(val)},"formData.attribute":function(attribute){}},methods:(0,_extends3.default)({},(0,_vuex.mapActions)(["initService","saveItem","getItemById","newItem"]),{save:function(options){var _this=this,self=this;this.$validator.validateAll().then(function(res){res?self.saveItem({formData:self.formData,options:options}):_this.$notify("Please check your data",{type:"warning"})})},resetForm:function(){this.errors.clear(),this.formData._id?this.getItemById({id:this.formData._id}):this.newItem()}}),components:{ProductUrl:_ProductUrl2.default},created:function(){this.initService(this.cmsUrl);var id=this.$route.params.id;void 0!==id?this.getItemById({id:id}):this.newItem()},mounted:function(){}}},618:function(module,exports,__webpack_require__){function injectStyle(ssrContext){__webpack_require__(619)}var Component=__webpack_require__(3)(__webpack_require__(621),__webpack_require__(622),injectStyle,null,null);module.exports=Component.exports},619:function(module,exports,__webpack_require__){var content=__webpack_require__(620);"string"==typeof content&&(content=[[module.i,content,""]]),content.locals&&(module.exports=content.locals);__webpack_require__(70)("06aeff53",content,!0,{})},620:function(module,exports,__webpack_require__){exports=module.exports=__webpack_require__(13)(!1),exports.push([module.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},621:function(module,exports,__webpack_require__){"use strict";(function(_){Object.defineProperty(exports,"__esModule",{value:!0});var _lodash=__webpack_require__(69);exports.default={name:"ProductUrl",props:{value:{type:Array,default:function(){return[]}}},data:function(){return{urls:this.value,url:{}}},methods:{addUrl:function(url){_.map(this.urls,function(url){return url.path}).includes(url.path)||(this.urls.push(url),this.url={})},removeUrl:function(path){this.urls=(0,_lodash.remove)(this.urls,function(url){return url.path!=path})}},watch:{value:{deep:!0,handler:function(val){this.urls=val}},urls:function(val){this.$emit("input",val)}}}}).call(exports,__webpack_require__(69))},622:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",[_vm._l(_vm.urls,function(url,index){return _c("h6",{key:"url"+index},[_vm._v("\n    "+_vm._s(url.name)+"("+_vm._s(url.path)+")\n    "),_c("a",{on:{click:function($event){return _vm.removeUrl(url.path)}}},[_c("i",{staticClass:"fa fa-remove"})])])}),_vm._v(" "),_c("div",{staticClass:"form-inline"},[_c("div",{staticClass:"form-group"},[_c("label",{attrs:{for:"name"}},[_vm._v("Name:")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.url.name,expression:"url.name"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Lazada, Tiki..."},domProps:{value:_vm.url.name},on:{input:function($event){$event.target.composing||_vm.$set(_vm.url,"name",$event.target.value)}}}),_vm._v(" "),_c("label",{attrs:{for:"name"}},[_vm._v("Path:")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.url.path,expression:"url.path"}],staticClass:"form-control",attrs:{type:"text",placeholder:"example.com/products/abc"},domProps:{value:_vm.url.path},on:{input:function($event){$event.target.composing||_vm.$set(_vm.url,"path",$event.target.value)}}}),_vm._v(" "),_c("a",{staticClass:"btn btn-sm btn-primary",on:{click:function($event){return _vm.addUrl(_vm.url)}}},[_c("i",{staticClass:"fa fa-plus"}),_vm._v(" Add\n      ")])])])],2)},staticRenderFns:[]}},623:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{staticClass:"page-content"},[_c("div",{staticClass:"container-fluid"},[_c("DetailActions",{attrs:{title:"Product",listRouter:"/products",routeDetail:"/product",formData:_vm.formData,disable:_vm.errors.any()},on:{action:_vm.save,reset:_vm.resetForm}}),_vm._v(" "),_c("form",{staticClass:"box-typical box-typical-padding"},[_c("h5",{staticClass:"m-t-lg with-border"},[_vm._v("Fill data below and click actions above")]),_vm._v(" "),_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"name"}},[_vm._v("Name")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.name,expression:"formData.name"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{"data-vv-name":"name",type:"text",id:"name",placeholder:"Enter name"},domProps:{value:_vm.formData.name},on:{input:function($event){$event.target.composing||_vm.$set(_vm.formData,"name",$event.target.value)}}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("name"),expression:"errors.has('name')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("name")))])])]),_vm._v(" "),_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"slug"}},[_vm._v("Slug")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.slug,expression:"formData.slug"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{"data-vv-name":"slug",type:"text",id:"slug",placeholder:"Enter slug"},domProps:{value:_vm.formData.slug},on:{input:function($event){$event.target.composing||_vm.$set(_vm.formData,"slug",$event.target.value)}}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("slug"),expression:"errors.has('slug')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("slug")))])])]),_vm._v(" "),_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"urls"}},[_vm._v("Urls")]),_vm._v(" "),_c("ProductUrl",{model:{value:_vm.formData.urls,callback:function($$v){_vm.$set(_vm.formData,"urls",$$v)},expression:"formData.urls"}})],1)]),_vm._v(" "),_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"thumb"}},[_vm._v("Thumb")]),_vm._v(" "),_c("imageUploader",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{name:"thumb",classButtonUpload:"btn-secondary",id:"thumb","dir-upload":"products","data-vv-name":"thumb"},model:{value:_vm.formData.thumb,callback:function($$v){_vm.$set(_vm.formData,"thumb",$$v)},expression:"formData.thumb"}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("thumb"),expression:"errors.has('thumb')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("thumb")))])],1)]),_vm._v(" "),_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"content"}},[_vm._v("Content")]),_vm._v(" "),_c("froala",{attrs:{tag:"textarea",id:"content",name:"content","data-vv-name":"content"},model:{value:_vm.formData.content,callback:function($$v){_vm.$set(_vm.formData,"content",$$v)},expression:"formData.content"}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("content"),expression:"errors.has('content')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("content")))])],1)]),_vm._v(" "),_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"price"}},[_vm._v("Price")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.price,expression:"formData.price"}],staticClass:"form-control",attrs:{"data-vv-name":"price",type:"text",id:"price",placeholder:"Enter price"},domProps:{value:_vm.formData.price},on:{input:function($event){$event.target.composing||_vm.$set(_vm.formData,"price",$event.target.value)}}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("price"),expression:"errors.has('price')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("price")))])])]),_vm._v(" "),_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"category"}},[_vm._v("Category")]),_vm._v(" "),_c("select2",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{id:"category","data-vv-name":"category",name:"category",ajax:_vm.ajaxCategory,placeholder:"Select one..."},model:{value:_vm.formData.category,callback:function($$v){_vm.$set(_vm.formData,"category",$$v)},expression:"formData.category"}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("category"),expression:"errors.has('category')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("category")))])],1)]),_vm._v(" "),_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"tags"}},[_vm._v("Tags")]),_vm._v(" "),_c("select2",{attrs:{id:"tags","data-vv-name":"tags",name:"tags",ajax:_vm.ajaxTags,multiple:!0,placeholder:"Select one..."},model:{value:_vm.formData.tags,callback:function($$v){_vm.$set(_vm.formData,"tags",$$v)},expression:"formData.tags"}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("tags"),expression:"errors.has('tags')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("tags")))])],1)])]),_vm._v(" "),_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label",attrs:{for:"status"}},[_vm._v("Status")]),_vm._v(" "),_c("select",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.status,expression:"formData.status"}],staticClass:"form-control",attrs:{name:"status",id:"status"},on:{change:function($event){var $$selectedVal=Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){return"_value"in o?o._value:o.value});_vm.$set(_vm.formData,"status",$event.target.multiple?$$selectedVal:$$selectedVal[0])}}},[_c("option",{domProps:{value:1}},[_vm._v("Publish")]),_vm._v(" "),_c("option",{domProps:{value:0}},[_vm._v("Unpublish")]),_vm._v(" "),_c("option",{domProps:{value:2}},[_vm._v("Trashed")])])])])])])],1)])},staticRenderFns:[]}}});