webpackJsonp([6],{574:function(module,exports,__webpack_require__){function injectStyle(ssrContext){__webpack_require__(673)}var Component=__webpack_require__(3)(__webpack_require__(675),__webpack_require__(679),injectStyle,null,null);module.exports=Component.exports},673:function(module,exports,__webpack_require__){var content=__webpack_require__(674);"string"==typeof content&&(content=[[module.i,content,""]]),content.locals&&(module.exports=content.locals);var add=__webpack_require__(19).default;add("2ae014d0",content,!0,{})},674:function(module,exports,__webpack_require__){exports=module.exports=__webpack_require__(12)(!1),exports.push([module.i,"\n.form-inline label{display:inline\n}\n",""])},675:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _keys=__webpack_require__(259),_keys2=_interopRequireDefault(_keys),_assign=__webpack_require__(26),_assign2=_interopRequireDefault(_assign),_stringify=__webpack_require__(45),_stringify2=_interopRequireDefault(_stringify),_extends2=__webpack_require__(7),_extends3=_interopRequireDefault(_extends2),_vuex=__webpack_require__(10),_SettingField=__webpack_require__(676),_SettingField2=_interopRequireDefault(_SettingField),_lodash=__webpack_require__(69);exports.default={name:"DetailSetting",data:function(){return{formData:{},field:{},cmsUrl:window.settings.services.cmsUrl+"/settings",froalaConfig:{imageUploadURL:window.settings.services.webUrl+"/api/upload/image",imageUploadMethod:"POST",imageUploadParams:{type:"wysiwyg/post"}}}},components:{SettingField:_SettingField2.default},computed:(0,_extends3.default)({},(0,_vuex.mapGetters)(["itemSelected","authUser"])),watch:{itemSelected:function(data){data&&(this.formData=JSON.parse((0,_stringify2.default)((0,_assign2.default)({},data))))},"formData.name":function(val){this.$route.params.id||(this.formData.key=this.$options.filters.text2Slug(val,"_"))},"field.name":function(val){this.field.key=this.$options.filters.text2Slug(val,"_")}},methods:(0,_extends3.default)({},(0,_vuex.mapActions)(["initService","saveItem","getItemById","newItem"]),{save:function(options){var _this=this,self=this;this.$validator.validateAll().then(function(res){if(res){var redundancy=(0,_lodash.difference)((0,_keys2.default)(self.formData),self.formData.fields.map(function(field){return field.key}).concat(["_id","createdAt","updatedAt","name","fields","key","status"])),formData=JSON.parse((0,_stringify2.default)(self.formData));for(var i in redundancy)formData[redundancy[i]]="__undefined";self.saveItem({formData:formData,options:options})}else _this.$notify("Please check your data",{type:"warning"})})},resetForm:function(){this.errors.clear(),this.formData._id?this.getItemById({id:this.formData._id}):this.newItem()},addFields:function(field){if(!field.name||!field.key||!field.type)return alert("Please provide missed data!");this.formData.fields.push(field),this.field={}},removeFields:function(key){confirm("Are you sure?")&&(this.formData.fields=this.formData.fields.filter(function(field){if(field.key!=key)return field}))}}),created:function(){this.initService(this.cmsUrl);var id=this.$route.params.id;void 0!==id?this.getItemById({id:id}):this.newItem()},mounted:function(){}}},676:function(module,exports,__webpack_require__){var Component=__webpack_require__(3)(__webpack_require__(677),__webpack_require__(678),null,null,null);module.exports=Component.exports},677:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={name:"setting-field",props:{field:{type:Object},value:{}},data:function(){return{model:this.value}},methods:{getOptions:function(options){return options.split("|").map(function(elem){return elem.split(",")})}},watch:{model:function(val){this.$emit("input",val)}}}},678:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",["text"==_vm.field.type?_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.model,expression:"model"}],staticClass:"form-control",attrs:{id:_vm.field.key,name:_vm.field.key,type:"text"},domProps:{value:_vm.model},on:{input:function($event){$event.target.composing||(_vm.model=$event.target.value)}}}):_vm._e(),_vm._v(" "),"editor"==_vm.field.type?_c("froala",{attrs:{id:_vm.field.key,name:_vm.field.key,tag:"textarea"},model:{value:_vm.model,callback:function($$v){_vm.model=$$v},expression:"model"}}):_vm._e(),_vm._v(" "),"image"==_vm.field.type?_c("imageUploader",{attrs:{id:_vm.field.key,name:_vm.field.key,classButtonUpload:"btn-secondary","dir-upload":"images"},model:{value:_vm.model,callback:function($$v){_vm.model=$$v},expression:"model"}}):_vm._e(),_vm._v(" "),"boolean"==_vm.field.type?_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.model,expression:"model"}],attrs:{id:_vm.field.key,name:_vm.field.key,type:"checkbox"},domProps:{checked:Array.isArray(_vm.model)?_vm._i(_vm.model,null)>-1:_vm.model},on:{change:function($event){var $$a=_vm.model,$$el=$event.target,$$c=!!$$el.checked;if(Array.isArray($$a)){var $$i=_vm._i($$a,null);$$el.checked?$$i<0&&(_vm.model=$$a.concat([null])):$$i>-1&&(_vm.model=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}else _vm.model=$$c}}}):_vm._e(),_vm._v(" "),"date"==_vm.field.type?_c("datepicker",{attrs:{id:_vm.field.key,name:_vm.field.key,placeholder:"Pick a date",format:"dd/MM/yyyy","input-class":"form-control"},model:{value:_vm.model,callback:function($$v){_vm.model=$$v},expression:"model"}}):_vm._e(),_vm._v(" "),"select"==_vm.field.type?_c("select",{directives:[{name:"model",rawName:"v-model",value:_vm.model,expression:"model"}],staticClass:"form-control",attrs:{id:_vm.field.key,name:_vm.field.key},on:{change:function($event){var $$selectedVal=Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){return"_value"in o?o._value:o.value});_vm.model=$event.target.multiple?$$selectedVal:$$selectedVal[0]}}},_vm._l(_vm.getOptions(_vm.field.options),function(option,index){return _c("option",{key:index,domProps:{value:option[0]}},[_vm._v(_vm._s(option[1]))])}),0):_vm._e()],1)},staticRenderFns:[]}},679:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{staticClass:"page-content"},[_c("div",{staticClass:"container-fluid"},[_c("DetailActions",{attrs:{title:"Setting",listRouter:"/settings",routeDetail:"/setting",formData:_vm.formData,disable:_vm.errors.any()},on:{action:_vm.save,reset:_vm.resetForm}}),_vm._v(" "),_c("form",{staticClass:"box-typical box-typical-padding"},[_c("h5",{staticClass:"m-t-lg with-border"},[_vm._v("Fill data below and click actions above")]),_vm._v(" "),_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"name"}},[_vm._v("Name")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.name,expression:"formData.name"}],staticClass:"form-control",attrs:{"data-vv-name":"name",type:"text",id:"name",placeholder:"Enter name"},domProps:{value:_vm.formData.name},on:{input:function($event){$event.target.composing||_vm.$set(_vm.formData,"name",$event.target.value)}}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("name"),expression:"errors.has('name')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("name")))])])]),_vm._v(" "),_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"key"}},[_vm._v("Key")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.key,expression:"formData.key"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{"data-vv-name":"key",type:"text",id:"key",placeholder:"Enter key"},domProps:{value:_vm.formData.key},on:{input:function($event){$event.target.composing||_vm.$set(_vm.formData,"key",$event.target.value)}}}),_vm._v(" "),_c("small",{directives:[{name:"show",rawName:"v-show",value:_vm.errors.has("key"),expression:"errors.has('key')"}],staticClass:"text-danger"},[_vm._v(_vm._s(_vm.errors.first("key")))])])])]),_vm._v(" "),_c("h5",{staticClass:"m-t-lg with-border"},[_vm._v("Fields")]),_vm._v(" "),_c("div",{staticClass:"row"},_vm._l(_vm.formData.fields,function(field,index){return _c("div",{key:index,staticClass:"col-sm-6"},[_c("label",{staticClass:"form-label semibold",attrs:{for:field.key}},[_vm._v("\n            "+_vm._s(field.name)+" ("+_vm._s(field.key)+")\n            "),_c("a",{staticClass:"text-danger",attrs:{href:"javascript:void(0)"},on:{click:function($event){return _vm.removeFields(field.key)}}},[_c("i",{staticClass:"fa fa-remove"})])]),_vm._v(" "),_c("SettingField",{attrs:{field:field},model:{value:_vm.formData[field.key],callback:function($$v){_vm.$set(_vm.formData,field.key,$$v)},expression:"formData[field.key]"}})],1)}),0),_vm._v(" "),_c("hr"),_vm._v(" "),_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-sm-12 form-inline"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"field.name"}},[_vm._v("Name")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.field.name,expression:"field.name"}],staticClass:"form-control",attrs:{"data-vv-name":"field.name",type:"text",id:"field.name",placeholder:"Name"},domProps:{value:_vm.field.name},on:{input:function($event){$event.target.composing||_vm.$set(_vm.field,"name",$event.target.value)}}}),_vm._v(" "),_c("label",{staticClass:"form-label semibold",attrs:{for:"field.name"}},[_vm._v("Key")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.field.key,expression:"field.key"}],staticClass:"form-control",attrs:{"data-vv-name":"field.key",type:"text",id:"field.key",placeholder:"Key"},domProps:{value:_vm.field.key},on:{input:function($event){$event.target.composing||_vm.$set(_vm.field,"key",$event.target.value)}}}),_vm._v(" "),_c("label",{staticClass:"form-label semibold",attrs:{for:"field.type"}},[_vm._v("Type")]),_vm._v(" "),_c("select",{directives:[{name:"model",rawName:"v-model",value:_vm.field.type,expression:"field.type"}],staticClass:"form-control",attrs:{name:"field.type",id:"field.type"},on:{change:function($event){var $$selectedVal=Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){return"_value"in o?o._value:o.value});_vm.$set(_vm.field,"type",$event.target.multiple?$$selectedVal:$$selectedVal[0])}}},[_c("option",{attrs:{value:"text"}},[_vm._v("Text")]),_vm._v(" "),_c("option",{attrs:{value:"select"}},[_vm._v("Select")]),_vm._v(" "),_c("option",{attrs:{value:"editor"}},[_vm._v("Editor")]),_vm._v(" "),_c("option",{attrs:{value:"image"}},[_vm._v("Image")]),_vm._v(" "),_c("option",{attrs:{value:"boolean"}},[_vm._v("Checkbox")]),_vm._v(" "),_c("option",{attrs:{value:"date"}},[_vm._v("Date")]),_vm._v(" "),_c("option",{attrs:{value:"array"}},[_vm._v("Array")])]),_vm._v(" "),"select"==_vm.field.type?_c("label",{staticClass:"form-label semibold",attrs:{for:"field.options"}},[_vm._v("Options")]):_vm._e(),_vm._v(" "),"select"==_vm.field.type?_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.field.options,expression:"field.options"}],staticClass:"form-control",attrs:{"data-vv-name":"field.options",type:"text",id:"field.options",placeholder:"1, 'ABC' | 2, 'XYZ' | ..."},domProps:{value:_vm.field.options},on:{input:function($event){$event.target.composing||_vm.$set(_vm.field,"options",$event.target.value)}}}):_vm._e(),_vm._v(" "),_c("button",{staticClass:"btn btn-sm btn-primary",attrs:{type:"button"},on:{click:function($event){return _vm.addFields(_vm.field)}}},[_c("i",{staticClass:"fa fa-plus"}),_vm._v(" Add\n          ")])])]),_vm._v(" "),_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-sm-6"},[_c("fieldset",{staticClass:"form-group"},[_c("label",{staticClass:"form-label semibold",attrs:{for:"status"}},[_vm._v("Status")]),_vm._v(" "),_c("select",{directives:[{name:"model",rawName:"v-model",value:_vm.formData.status,expression:"formData.status"}],staticClass:"form-control",attrs:{name:"status",id:"status"},on:{change:function($event){var $$selectedVal=Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){return"_value"in o?o._value:o.value});_vm.$set(_vm.formData,"status",$event.target.multiple?$$selectedVal:$$selectedVal[0])}}},[_c("option",{domProps:{value:1}},[_vm._v("Publish")]),_vm._v(" "),_c("option",{domProps:{value:0}},[_vm._v("Unpublish")]),_vm._v(" "),_c("option",{domProps:{value:2}},[_vm._v("Trashed")])])])])])])],1)])},staticRenderFns:[]}}});