webpackJsonp([6],{564:function(module,exports,__webpack_require__){function injectStyle(ssrContext){__webpack_require__(621)}var Component=__webpack_require__(3)(__webpack_require__(623),__webpack_require__(627),injectStyle,null,null);module.exports=Component.exports},621:function(module,exports,__webpack_require__){var content=__webpack_require__(622);"string"==typeof content&&(content=[[module.i,content,""]]),content.locals&&(module.exports=content.locals);__webpack_require__(43)("4aa93c28",content,!0,{})},622:function(module,exports,__webpack_require__){exports=module.exports=__webpack_require__(12)(!1),exports.push([module.i,"\n#content {\n  height: 500px;\n  overflow: hidden;\n  overflow-y: scroll;\n}\n#content div,\n#content p {\n  border: 1px solid #eee;\n  padding: 0.5em;\n}\n.no-width {\n  width: 0;\n  flex-basis: 0;\n  overflow: hidden;\n  margin: 0;\n  padding: 0;\n  height: 0;\n}\n#heading h1,\n#heading h2 {\n  border: 1px solid #eee;\n  padding: 0.25em;\n  font-size: 1em;\n}\n#image img {\n  width: 25%;\n  height: auto;\n}\nimg {\n  max-width: 100%;\n  height: auto;\n}\n",""])},623:function(module,exports,__webpack_require__){"use strict";(function($){function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _assign=__webpack_require__(26),_assign2=_interopRequireDefault(_assign),_stringify=__webpack_require__(44),_stringify2=_interopRequireDefault(_stringify),_extends2=__webpack_require__(7),_extends3=_interopRequireDefault(_extends2),_vuex=__webpack_require__(10),_axios=__webpack_require__(27),_axios2=_interopRequireDefault(_axios),_ProductSelector=__webpack_require__(624),_ProductSelector2=_interopRequireDefault(_ProductSelector);exports.default={name:"DetailPost",data:function(){return{leak:{},formData:{},cmsUrl:window.settings.services.cmsUrl+"/posts",ajaxCategory:{url:window.settings.services.cmsUrl+"/properties/select2",params:{type:"category"},textField:"name",autoload:!0},ajaxTags:{url:window.settings.services.cmsUrl+"/properties/select2",params:{type:"tag"},textField:"name",autoload:!0},froalaConfig:{imageUploadURL:window.settings.services.webUrl+"/api/upload/image",imageUploadMethod:"POST",imageUploadParams:{type:"wysiwyg/post"}}}},computed:(0,_extends3.default)({},(0,_vuex.mapGetters)(["itemSelected"])),watch:{itemSelected:function(data){data&&(this.formData=JSON.parse((0,_stringify2.default)((0,_assign2.default)({},data))))},"formData.title":function(val){this.$route.params.id||(this.formData.slug=this.$options.filters.text2Slug(val))}},methods:(0,_extends3.default)({},(0,_vuex.mapActions)(["initService","saveItem","getItemById","newItem","goto"]),{save:function(options){var _this=this,self=this;this.$validator.validateAll().then(function(res){res?self.saveItem({formData:self.formData,options:options}):_this.$notify("Please check data",{type:"warning",placement:{from:"bottom"}})})},resetForm:function(){this.errors.clear(),this.formData._id?this.getItemById({id:this.formData._id}):this.newItem()},leakUrl:function(){var that=this;_axios2.default.post(window.settings.services.cmsUrl+"/fetchUrl",{url:that.leak.url}).then(function(resp){var content=resp.data.replace(/\n/gim,"").replace(/>\s+</gim,"><").replace(/<head(((?!<\/head>).)|\n)+<\/head>/gim,"").replace(/<script(((?!<\/script>).)|\n)+<\/script>/gim,"").replace(/href="[^"]+"/gim,'href="#"'),div=document.createElement("div");if(div.innerHTML=content,!that.leak.selector){var selector="";return $(div).find('[id*="content"], [class*="content"]').each(function(){var text="";$(this).attr("id")&&(text+="#"+$(this).attr("id")),$(this).attr("class")&&(text+="."+$(this).attr("class")),selector+='<a href="javascript:void(0)" class="selector-text">'+text+"</a> "}),$("#content-selector").html(selector),void $("#content-selector .selector-text").on("click",function(){that.leak.selector=$(this).text(),that.$forceUpdate(),that.leakUrl()})}$("#content").html($(div).find(that.leak.selector).html()),$("#content div:has(>div)").each(function(){$(this).replaceWith($(this).html())}),$("#content div, #content p").each(function(){var html=$(this).html();html&&"&nbsp;"!=html||$(this).remove()}),$("#content div, #content p").off("click").on("click",function(){0==$(this).find("div, p").length&&$(this).remove()});var heading="";$(div).find("h1, h2").each(function(i){0==i&&(that.formData.title=$(this).text(),that.$forceUpdate()),heading+=this.outerHTML}),$("#heading").html(heading),$("#heading h1, #heading h2").on("click",function(){that.formData.title=$(this).text(),$("#heading .hidden").not($(this)).removeClass("hidden"),$(this).addClass("hidden"),that.$forceUpdate()});var image="";$("#content img").each(function(i){0==i&&(that.formData.thumb=$(this).attr("src"),that.$forceUpdate()),image+=this.outerHTML}),$("#image").html(image),$("#image img").on("click",function(){that.formData.thumb=$(this).attr("src"),$("#image img.hidden").not($(this)).removeClass("hidden"),$(this).addClass("hidden"),that.$forceUpdate()})})},showPanel:function(position){switch($(".col-left, .col-right").removeClass("col-md-12").removeClass("col-md-6").removeClass("no-width"),position){case"left":$(".col-left").addClass("col-md-12"),$(".col-right").addClass("no-width");break;case"center":$(".col-left").addClass("col-md-6"),$(".col-right").addClass("col-md-6");break;case"right":$(".col-left").addClass("no-width"),$(".col-right").addClass("col-md-12")}},getContent:function(){this.formData.content=$("#content").html(),this.$forceUpdate()}}),components:{ProductSelector:_ProductSelector2.default},created:function(){this.initService(this.cmsUrl);var id=this.$route.params.id;void 0!==id?this.getItemById({id:id}):this.newItem()},mounted:function(){}}}).call(exports,__webpack_require__(1))},624:function(module,exports,__webpack_require__){var Component=__webpack_require__(3)(__webpack_require__(625),__webpack_require__(626),null,null,null);module.exports=Component.exports},625:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _axios=__webpack_require__(27),_services=(_interopRequireDefault(_axios),__webpack_require__(70)),_services2=_interopRequireDefault(_services),_lodash=__webpack_require__(71);exports.default={name:"ProductSelector",props:{post:{type:Object,default:{}},value:{type:Array,default:null}},data:function(){return{products:[],selectedIds:this.value,selectedProducts:[],filter:"",service:new _services2.default(window.settings.services.cmsUrl+"/products")}},mounted:function(){var _this=this;setTimeout(function(){_this.getProducts({_id:{$in:_this.selectedIds}},!0)},200)},methods:{selectProduct:function(product){this.selectedIds.includes(product._id)||(this.selectedIds.push(product._id),this.selectedProducts.push(product))},removeProduct:function(product){this.selectedIds=(0,_lodash.remove)(this.selectedIds,function(id){return id.toString()!=product._id.toString()}),this.selectedProducts=(0,_lodash.remove)(this.selectedProducts,function(p){return p._id.toString()!=product._id.toString()})},getProducts:function(){var filters=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{filter:""},init=arguments.length>1&&void 0!==arguments[1]&&arguments[1],vm=this;vm.service.getItems((0,_lodash.extend)({select:"name thumb",status:1,_id:{$nin:vm.selectedIds},sort:"createdAt|desc"},filters)).then(function(resp){vm.products=resp.data.data,init&&(vm.selectedProducts=resp.data.data)})}},watch:{value:{deep:!0,handler:function(value){this.selectedIds=value}},selectedIds:function(val){this.$emit("input",val)}}}},626:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",[_c("div",{staticClass:"row"},_vm._l(_vm.selectedProducts,function(product,index){return _c("div",{key:index,staticClass:"col-sm-3",attrs:{"data-dismiss":"modal"}},[_c("img",{staticClass:"img img-responsive",attrs:{src:product.thumb,alt:product.name}}),_vm._v(" "),_c("h6",[_vm._v("\n        "+_vm._s(product.name)+"\n        "),_c("a",{on:{click:function($event){return _vm.removeProduct(product)}}},[_c("i",{staticClass:"fa fa-remove"})])])])}),0),_vm._v(" "),_c("button",{staticClass:"btn btn-primary",attrs:{"data-toggle":"modal","data-target":"#product-selector",type:"button"},on:{click:function($event){return _vm.getProducts()}}},[_c("i",{staticClass:"fa fa-plus"}),_vm._v(" Add product\n  ")]),_vm._v(" "),_c("div",{staticClass:"modal fade",attrs:{id:"product-selector",role:"dialog"}},[_c("div",{staticClass:"modal-dialog modal-lg"},[_c("div",{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c("div",{staticClass:"modal-body"},[_c("div",{staticClass:"row form-group"},[_c("div",{staticClass:"col-sm-8"},[_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.filter,expression:"filter"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Product name..."},domProps:{value:_vm.filter},on:{input:function($event){$event.target.composing||(_vm.filter=$event.target.value)}}})]),_vm._v(" "),_c("div",{staticClass:"col-sm-4"},[_c("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function($event){return _vm.getProducts({filter:_vm.filter})}}},[_c("i",{staticClass:"fa fa-search"}),_vm._v(" Filter\n              ")]),_vm._v(" "),_c("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:function($event){_vm.filter="",_vm.getProducts()}}},[_c("i",{staticClass:"fa fa-remove"}),_vm._v(" Clear\n              ")])])]),_vm._v(" "),_c("div",{staticClass:"row"},[0==_vm.products.length?_c("h6",{staticClass:"text-center"},[_vm._v("No products found")]):_vm._e(),_vm._v(" "),_vm._l(_vm.products,function(product,index){return _c("a",{key:index,staticClass:"col-sm-3",attrs:{"data-dismiss":"modal"},on:{click:function($event){return _vm.selectProduct(product)}}},[_c("img",{staticClass:"img img-responsive",attrs:{src:product.thumb,alt:product.name}}),_vm._v(" "),_c("h6",[_vm._v(_vm._s(product.name))])])})],2)]),_vm._v(" "),_vm._m(1)])])])])},staticRenderFns:[function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{staticClass:"modal-header"},[_c("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal"}},[_vm._v("×")]),_vm._v(" "),_c("h4",{staticClass:"modal-title"},[_vm._v("Products")])])},function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{staticClass:"modal-footer"},[_c("button",{staticClass:"btn btn-default",attrs:{type:"button","data-dismiss":"modal"}},[_vm._v("Close")])])}]}},627:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{staticClass:"page-content"},[_c("div",{staticClass:"container-fluid"},[_c("DetailActions",{attrs:{title:"Post",listRouter:"/posts",routeDetail:"/post",formData:_vm.formData,disable:_vm.errors.any()},on:{action:_vm.save,reset:_vm.resetForm}},[_c("template",{slot:"moreAction"},[_vm.$route.params.id?_c("button",{staticClass:"btn btn-secondary",attrs:{type:"button"},on:{click:function($event){return _vm.goto({name:"MapLinkPost",params:{id:_vm.formData._id}})}}},[_c("span",{staticClass:"fa fa-link"}),_vm._v(" Map Link\n        ")]):_vm._e()])],2),_vm._v(" "),_c("div",{staticClass:"box-typical box-typical-padding row"},[_vm.$route.params.id?_vm._e():_c("div",{staticClass:"panel-control col-sm-12"},[_c("button",{staticClass:"btn btn-secondary",on:{click:function($event){return _vm.showPanel("center")}}},[_vm._v("\n          Expand\n          "),_c("i",{staticClass:"fa fa-arrow-right"})]),_vm._v(" "),_c("button",{staticClass:"btn btn-secondary",on:{click:function($event){return _vm.showPanel("right")}}},[_c("i",{staticClass:"fa fa-arrow-left"}),_vm._v("\n          Collapse\n        ")])]),_vm._v(" "),_vm.$route.params.id?_vm._e():_c("div",{staticClass:"col-left no-width"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"leak.url"}},[_vm._v("Url")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.leak.url,expression:"leak.url"}],staticClass:"form-control",attrs:{"data-vv-name":"Url",type:"text",id:"leak.url",placeholder:"Url"},domProps:{value:_vm.leak.url},on:{input:function($event){$event.target.composing||_vm.$set(_vm.leak,"url",$event.target.value)}}})]),_vm._v(" "),_c("div",{attrs:{id:"content-selector"}}),_vm._v(" "),_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-sm-10"},[_c("fieldset",{staticClass:"form-group"},[_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.leak.selector,expression:"leak.selector"}],staticClass:"form-control",attrs:{"data-vv-name":"Selector",type:"text",id:"leak.selector",placeholder:"Selector"},domProps:{value:_vm.leak.selector},on:{input:function($event){$event.target.composing||_vm.$set(_vm.leak,"selector",$event.target.value)}}})])]),_vm._v(" "),_c("div",{staticClass:"col-sm-2"},[_c("button",{staticClass:"btn btn-primary",on:{click:function($event){return _vm.leakUrl()}}},[_vm._v("Leak")])])]),_vm._v(" "),_c("label",{staticClass:"form-label semibold"},[_vm._v("Heading")]),_vm._v(" "),_c("div",{attrs:{id:"heading"}}),_vm._v(" "),_c("label",{staticClass:"form-label semibold"},[_vm._v("Image")]),_vm._v(" "),_c("div",{attrs:{id:"image"}}),_vm._v(" "),_c("label",{staticClass:"form-label semibold"},[_vm._v("Content")]),_vm._v(" "),_c("div",{attrs:{id:"content"}}),_vm._v(" "),_c("button",{staticClass:"btn btn-primary",on:{click:function($event){return _vm.getContent()}}},[_vm._v("Get content")])]),_vm._v(" "),_c("div",{class:"col-right col-sm-12"},[_c("form",[_c("h5",{staticClass:"m-t-lg with-border"},[_vm._v("Fill data below and click actions above")]),_vm._v(" "),_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"exampleInput"}},[_vm._v("Title")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.title,expression:"formData.title"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{"data-vv-name":"Tiêu đề",type:"text",id:"exampleInput",placeholder:"Title"},domProps:{value:_vm.formData.title},on:{input:function($event){$event.target.composing||_vm.$set(_vm.formData,"title",$event.target.value)}}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("Tiêu đề"),expression:"errors.has('Tiêu đề')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("Tiêu đề")))])])]),_vm._v(" "),_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label",attrs:{for:"exampleInputEmail1"}},[_vm._v("Slug")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.slug,expression:"formData.slug"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{"data-vv-name":"Slug",type:"text",id:"exampleInputEmail1",placeholder:"Slug auto generator"},domProps:{value:_vm.formData.slug},on:{input:function($event){$event.target.composing||_vm.$set(_vm.formData,"slug",$event.target.value)}}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("Slug"),expression:"errors.has('Slug')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("Slug")))])])])]),_vm._v(" "),_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"category"}},[_vm._v("Category")]),_vm._v(" "),_c("select2",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{id:"category","data-vv-name":"Category",name:"category",ajax:_vm.ajaxCategory,placeholder:"Chọn...",tags:!0,createItem:!0},model:{value:_vm.formData.category,callback:function($$v){_vm.$set(_vm.formData,"category",$$v)},expression:"formData.category"}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("Category"),expression:"errors.has('Category')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("Category")))])],1)]),_vm._v(" "),_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"tags"}},[_vm._v("Tags")]),_vm._v(" "),_c("select2",{attrs:{id:"tags","data-vv-name":"Tags",name:"tags",ajax:_vm.ajaxTags,placeholder:"Chọn...",tags:!0,multiple:!0,createItem:!0},model:{value:_vm.formData.tags,callback:function($$v){_vm.$set(_vm.formData,"tags",$$v)},expression:"formData.tags"}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("Tags"),expression:"errors.has('Tags')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("Tags")))])],1)])]),_vm._v(" "),_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"thumb"}},[_vm._v("Thumb image")]),_vm._v(" "),_c("imageUploader",{attrs:{name:"thumb",classButtonUpload:"btn-secondary",id:"thumb","data-vv-name":"Hình thumb"},model:{value:_vm.formData.thumb,callback:function($$v){_vm.$set(_vm.formData,"thumb",$$v)},expression:"formData.thumb"}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("Hình thumb"),expression:"errors.has('Hình thumb')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("Hình thumb")))])],1)])]),_vm._v(" "),_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-sm-12"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"summary"}},[_vm._v("Summary")]),_vm._v(" "),_c("textarea",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.summary,expression:"formData.summary"}],staticClass:"form-control",attrs:{type:"text",id:"summary",placeholder:"Summary"},domProps:{value:_vm.formData.summary},on:{input:function($event){$event.target.composing||_vm.$set(_vm.formData,"summary",$event.target.value)}}})])]),_vm._v(" "),_c("div",{staticClass:"col-sm-12"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label",attrs:{for:"exampleInputPassword1"}},[_vm._v("Content")]),_vm._v(" "),_c("froala",{attrs:{tag:"textarea"},model:{value:_vm.formData.content,callback:function($$v){_vm.$set(_vm.formData,"content",$$v)},expression:"formData.content"}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("Mật khẩu"),expression:"errors.has('Mật khẩu')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("Mật khẩu")))])],1)])]),_vm._v(" "),_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label",attrs:{for:"status"}},[_vm._v("Status")]),_vm._v(" "),_c("select",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.status,expression:"formData.status"}],staticClass:"form-control",attrs:{name:"status",id:"status"},on:{change:function($event){var $$selectedVal=Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){return"_value"in o?o._value:o.value});_vm.$set(_vm.formData,"status",$event.target.multiple?$$selectedVal:$$selectedVal[0])}}},[_c("option",{domProps:{value:1}},[_vm._v("Publish")]),_vm._v(" "),_c("option",{domProps:{value:0}},[_vm._v("Unpublish")]),_vm._v(" "),_c("option",{domProps:{value:2}},[_vm._v("Trashed")])])])])]),_vm._v(" "),_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-sm-12"},[_c("ProductSelector",{attrs:{post:_vm.formData},model:{value:_vm.formData.products,callback:function($$v){_vm.$set(_vm.formData,"products",$$v)},expression:"formData.products"}})],1)])])])])],1)])},staticRenderFns:[]}}});