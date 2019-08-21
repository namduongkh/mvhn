webpackJsonp([21],{562:function(module,exports,__webpack_require__){function injectStyle(ssrContext){__webpack_require__(614)}var Component=__webpack_require__(3)(__webpack_require__(616),__webpack_require__(617),injectStyle,null,null);module.exports=Component.exports},591:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=__webpack_require__(256),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__(37),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__(45),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__(257),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__(258),_inherits3=_interopRequireDefault(_inherits2),_services=__webpack_require__(70),_services2=_interopRequireDefault(_services),ResourcesService=function(_Service){function ResourcesService(){return(0,_classCallCheck3.default)(this,ResourcesService),(0,_possibleConstructorReturn3.default)(this,(ResourcesService.__proto__||(0,_getPrototypeOf2.default)(ResourcesService)).apply(this,arguments))}return(0,_inherits3.default)(ResourcesService,_Service),(0,_createClass3.default)(ResourcesService,[{key:"index",value:function(params){return this.getItems(params)}},{key:"new",value:function(){return this.newItem()}},{key:"edit",value:function(id){return this.getItemById(id)}},{key:"show",value:function(id){return this.getItemById(id)}},{key:"create",value:function(data){return this.addItem(data)}},{key:"update",value:function(id,data){return this.updateItem(id,data)}},{key:"delete",value:function(id){return this.deleteItem(id)}}]),ResourcesService}(_services2.default);exports.default=ResourcesService},614:function(module,exports,__webpack_require__){var content=__webpack_require__(615);"string"==typeof content&&(content=[[module.i,content,""]]),content.locals&&(module.exports=content.locals);__webpack_require__(43)("719cb087",content,!0,{})},615:function(module,exports,__webpack_require__){exports=module.exports=__webpack_require__(12)(!1),exports.push([module.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},616:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _promise=__webpack_require__(260),_promise2=_interopRequireDefault(_promise),_extends2=__webpack_require__(7),_extends3=_interopRequireDefault(_extends2),_resources_service=__webpack_require__(591),_resources_service2=_interopRequireDefault(_resources_service);exports.default={name:"PluginManagement",data:function(){return{service:new _resources_service2.default(window.settings.services.cmsUrl+"/plugin_managements"),plugins:[],plugin:{}}},methods:{index:function(){var _this=this,params=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.service.index((0,_extends3.default)({},params,{sort:"cmsOrder",notPaginate:!0})).then(function(_ref){var data=_ref.data;_this.plugins=data.data})},create:function(plugin){var _this2=this;this.service.create(plugin).then(function(_ref2){_ref2.data;_this2.index(),_this2.new(),_this2.$notify("Created",{type:"success"})})},update:function(plugin){var _this3=this,id=plugin._id;delete plugin._id,this.service.update(id,plugin).then(function(_ref3){_ref3.data;_this3.index({shouldReload:!0}),_this3.$notify("Updated",{type:"success"})})},updates:function(){var _this4=this;_promise2.default.all(this.plugins.map(function(plugin){var id=plugin._id;return delete plugin._id,this.service.update(id,plugin)}.bind(this))).then(function(){_this4.index({shouldReload:!0}),_this4.$notify("Updated",{type:"success"})})}},created:function(){this.index()}}},617:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{staticClass:"page-content"},[_c("div",{staticClass:"container-fluid"},[_c("div",{staticClass:"box-typical box-typical-padding"},[_c("div",{staticClass:"text-right"},[_c("button",{staticClass:"btn btn-primary-outline",attrs:{type:"button"},on:{click:function($event){return _vm.updates()}}},[_c("i",{staticClass:"fa fa-save"}),_vm._v(" Save\n        ")])]),_vm._v(" "),_c("table",{staticClass:"table table-striped table-bordered table-hovered"},[_vm._m(0),_vm._v(" "),_c("tbody",_vm._l(_vm.plugins,function(plugin){return _c("tr",{key:plugin._id},[_c("td",[_vm._v(_vm._s(plugin.pluginName))]),_vm._v(" "),_c("td",[_c("input",{directives:[{name:"model",rawName:"v-model",value:plugin.enabled,expression:"plugin.enabled"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(plugin.enabled)?_vm._i(plugin.enabled,null)>-1:plugin.enabled},on:{change:function($event){var $$a=plugin.enabled,$$el=$event.target,$$c=!!$$el.checked;if(Array.isArray($$a)){var $$i=_vm._i($$a,null);$$el.checked?$$i<0&&_vm.$set(plugin,"enabled",$$a.concat([null])):$$i>-1&&_vm.$set(plugin,"enabled",$$a.slice(0,$$i).concat($$a.slice($$i+1)))}else _vm.$set(plugin,"enabled",$$c)}}})]),_vm._v(" "),_c("td",[_c("input",{directives:[{name:"model",rawName:"v-model",value:plugin.cmsOrder,expression:"plugin.cmsOrder"}],staticClass:"form-control",staticStyle:{width:"80px"},attrs:{type:"number"},domProps:{value:plugin.cmsOrder},on:{input:function($event){$event.target.composing||_vm.$set(plugin,"cmsOrder",$event.target.value)}}})])])}),0)])])])])},staticRenderFns:[function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("thead",[_c("tr",[_c("th",[_vm._v("Name")]),_vm._v(" "),_c("th",[_vm._v("Enabled")]),_vm._v(" "),_c("th",[_vm._v("CMS Order")])])])}]}}});