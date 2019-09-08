webpackJsonp([23],{591:function(module,exports,__webpack_require__){function injectStyle(ssrContext){__webpack_require__(782)}var Component=__webpack_require__(3)(__webpack_require__(784),__webpack_require__(785),injectStyle,"data-v-1df65aec",null);module.exports=Component.exports},782:function(module,exports,__webpack_require__){var content=__webpack_require__(783);"string"==typeof content&&(content=[[module.i,content,""]]),content.locals&&(module.exports=content.locals);var add=__webpack_require__(19).default;add("576b2e9e",content,!0,{})},783:function(module,exports,__webpack_require__){exports=module.exports=__webpack_require__(12)(!1),exports.push([module.i,"",""])},784:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _assign=__webpack_require__(26),_assign2=_interopRequireDefault(_assign),_stringify=__webpack_require__(45),_stringify2=_interopRequireDefault(_stringify),_extends2=__webpack_require__(7),_extends3=_interopRequireDefault(_extends2),_vuex=__webpack_require__(10);exports.default={name:"DetailUserRight",data:function(){return{formData:{},cmsUrl:window.settings.services.cmsUrl+"/user_rights",froalaConfig:{imageUploadURL:window.settings.services.webUrl+"/api/upload/image",imageUploadMethod:"POST",imageUploadParams:{type:"wysiwyg/post"}}}},computed:(0,_extends3.default)({},(0,_vuex.mapGetters)(["itemSelected","authUser"])),watch:{itemSelected:function(data){data&&(this.formData=JSON.parse((0,_stringify2.default)((0,_assign2.default)({},data))))},"formData.name":function(val){this.formData.slug=this.$options.filters.text2Slug(val)},"formData.attribute":function(attribute){}},methods:(0,_extends3.default)({},(0,_vuex.mapActions)(["initService","saveItem","getItemById","newItem"]),{save:function(options){var _this=this,self=this;this.$validator.validateAll().then(function(res){res?self.saveItem({formData:self.formData,options:options}):_this.$notify("Please check your data",{type:"warning"})})},resetForm:function(){this.errors.clear(),this.formData._id?this.getItemById({id:this.formData._id}):this.newItem()}}),components:{},created:function(){this.initService(this.cmsUrl);var id=this.$route.params.id;void 0!==id?this.getItemById({id:id}):this.newItem()},mounted:function(){}}},785:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{staticClass:"page-content"},[_c("div",{staticClass:"container-fluid"},[_c("DetailActions",{attrs:{title:"UserRight",listRouter:"/user_rights",routeDetail:"/user_right",formData:_vm.formData,disable:_vm.errors.any()},on:{action:_vm.save,reset:_vm.resetForm}}),_vm._v(" "),_c("form",{staticClass:"box-typical box-typical-padding"},[_c("h5",{staticClass:"m-t-lg with-border"},[_vm._v("Fill data below and click actions above")]),_vm._v(" "),_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"controller"}},[_vm._v("Name")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.name,expression:"formData.name"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{"data-vv-name":"name",type:"text",id:"name",placeholder:"Enter name"},domProps:{value:_vm.formData.name},on:{input:function($event){$event.target.composing||_vm.$set(_vm.formData,"name",$event.target.value)}}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("name"),expression:"errors.has('name')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("name")))])])]),_vm._v(" "),_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"controller"}},[_vm._v("Controller")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.controller,expression:"formData.controller"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{"data-vv-name":"controller",type:"text",id:"controller",placeholder:"Enter controller"},domProps:{value:_vm.formData.controller},on:{input:function($event){$event.target.composing||_vm.$set(_vm.formData,"controller",$event.target.value)}}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("controller"),expression:"errors.has('controller')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("controller")))])])]),_vm._v(" "),_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"action"}},[_vm._v("Action")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.action,expression:"formData.action"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{"data-vv-name":"action",type:"text",id:"action",placeholder:"Enter action"},domProps:{value:_vm.formData.action},on:{input:function($event){$event.target.composing||_vm.$set(_vm.formData,"action",$event.target.value)}}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("action"),expression:"errors.has('action')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("action")))])])])]),_vm._v(" "),_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label",attrs:{for:"status"}},[_vm._v("Status")]),_vm._v(" "),_c("select",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.status,expression:"formData.status"}],staticClass:"form-control",attrs:{name:"status",id:"status"},on:{change:function($event){var $$selectedVal=Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){return"_value"in o?o._value:o.value});_vm.$set(_vm.formData,"status",$event.target.multiple?$$selectedVal:$$selectedVal[0])}}},[_c("option",{domProps:{value:1}},[_vm._v("Publish")]),_vm._v(" "),_c("option",{domProps:{value:0}},[_vm._v("Unpublish")]),_vm._v(" "),_c("option",{domProps:{value:2}},[_vm._v("Trashed")])])])])])])],1)])},staticRenderFns:[]}}});