webpackJsonp([17],{553:function(module,exports,__webpack_require__){var Component=__webpack_require__(3)(__webpack_require__(604),__webpack_require__(605),null,null,null);module.exports=Component.exports},604:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _assign=__webpack_require__(68),_assign2=_interopRequireDefault(_assign),_stringify=__webpack_require__(36),_stringify2=_interopRequireDefault(_stringify),_extends2=__webpack_require__(9),_extends3=_interopRequireDefault(_extends2),_vuex=__webpack_require__(10);exports.default={name:"DetailProperty",data:function(){return{formData:{},apiUrl:window.settings.services.cmsUrl+"/properties"}},computed:(0,_extends3.default)({},(0,_vuex.mapGetters)(["itemSelected"])),watch:{itemSelected:function(data){data&&(this.formData=JSON.parse((0,_stringify2.default)((0,_assign2.default)({},data))))},"formData.name":function(val){this.formData.slug=this.$options.filters.text2Slug(val)},"formData.color":function(val){val&&"string"!=typeof val&&(this.formData.color=val.hex)}},methods:(0,_extends3.default)({},(0,_vuex.mapActions)(["initService","saveItem","getItemById","newItem"]),{save:function(options){var _this=this,self=this;this.$validator.validateAll().then(function(res){res?self.saveItem({formData:self.formData,options:options}):_this.$notify("Please check data",{type:"warning",placement:{from:"bottom"}})})},resetForm:function(){this.errors.clear(),this.formData._id?this.getItemById({id:this.formData._id}):this.newItem()}}),components:{},created:function(){this.initService(this.apiUrl);var id=this.$route.params.id;void 0!==id?this.getItemById({id:id}):this.newItem()},mounted:function(){}}},605:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{staticClass:"page-content"},[_c("div",{staticClass:"container-fluid"},[_c("DetailActions",{attrs:{title:"Property",listRouter:"/properties",routeDetail:"/property",formData:_vm.formData,disable:_vm.errors.any()},on:{action:_vm.save,reset:_vm.resetForm}}),_vm._v(" "),_c("form",{staticClass:"box-typical box-typical-padding"},[_c("h5",{staticClass:"m-t-lg with-border"},[_vm._v("Fill data below and click actions above")]),_vm._v(" "),_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"name"}},[_vm._v("Name")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.name,expression:"formData.name"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{"data-vv-name":"Name",type:"text",id:"name",placeholder:"Name"},domProps:{value:_vm.formData.name},on:{input:function($event){$event.target.composing||_vm.$set(_vm.formData,"name",$event.target.value)}}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("Name"),expression:"errors.has('Name')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("Name")))])])]),_vm._v(" "),_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label",attrs:{for:"slug"}},[_vm._v("Slug")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.slug,expression:"formData.slug"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{"data-vv-name":"Slug",type:"text",id:"slug",placeholder:"Slug auto generator"},domProps:{value:_vm.formData.slug},on:{input:function($event){$event.target.composing||_vm.$set(_vm.formData,"slug",$event.target.value)}}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("Slug"),expression:"errors.has('Slug')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("Slug")))])])])]),_vm._v(" "),_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label",attrs:{for:"color"}},[_vm._v("Color")]),_vm._v(" "),_vm.formData.color?_c("color-picker",{attrs:{id:"color"},model:{value:_vm.formData.color,callback:function($$v){_vm.$set(_vm.formData,"color",$$v)},expression:"formData.color"}}):_vm._e(),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("Color"),expression:"errors.has('Color')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("Color")))])],1)]),_vm._v(" "),_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label",attrs:{for:"type"}},[_vm._v("Type")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.type,expression:"formData.type"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{"data-vv-name":"Type",type:"text",id:"type",placeholder:"Type auto generator"},domProps:{value:_vm.formData.type},on:{input:function($event){$event.target.composing||_vm.$set(_vm.formData,"type",$event.target.value)}}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("Type"),expression:"errors.has('Type')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("Type")))])])])]),_vm._v(" "),_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label",attrs:{for:"textClassname"}},[_vm._v("Text color")]),_vm._v(" "),_c("select",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.textClassname,expression:"formData.textClassname"}],staticClass:"form-control",attrs:{name:"textClassname",id:"textClassname"},on:{change:function($event){var $$selectedVal=Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){return"_value"in o?o._value:o.value});_vm.$set(_vm.formData,"textClassname",$event.target.multiple?$$selectedVal:$$selectedVal[0])}}},[_c("option",{domProps:{value:"property-text-white"}},[_vm._v("White")]),_vm._v(" "),_c("option",{domProps:{value:"property-text-black"}},[_vm._v("Black")])])])]),_vm._v(" "),_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label",attrs:{for:"status"}},[_vm._v("Status")]),_vm._v(" "),_c("select",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.status,expression:"formData.status"}],staticClass:"form-control",attrs:{name:"status",id:"status"},on:{change:function($event){var $$selectedVal=Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){return"_value"in o?o._value:o.value});_vm.$set(_vm.formData,"status",$event.target.multiple?$$selectedVal:$$selectedVal[0])}}},[_c("option",{domProps:{value:1}},[_vm._v("Publish")]),_vm._v(" "),_c("option",{domProps:{value:0}},[_vm._v("Unpublish")]),_vm._v(" "),_c("option",{domProps:{value:2}},[_vm._v("Trashed")])])])])])])],1)])},staticRenderFns:[]}}});