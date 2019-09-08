webpackJsonp([21],{585:function(module,exports,__webpack_require__){function injectStyle(ssrContext){__webpack_require__(745)}var Component=__webpack_require__(3)(__webpack_require__(747),__webpack_require__(748),injectStyle,null,null);module.exports=Component.exports},594:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _extends2=__webpack_require__(7),_extends3=_interopRequireDefault(_extends2),_getPrototypeOf=__webpack_require__(256),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__(28),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__(38),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__(257),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__(258),_inherits3=_interopRequireDefault(_inherits2),_services=__webpack_require__(68),_services2=_interopRequireDefault(_services),_axios=__webpack_require__(27),_axios2=_interopRequireDefault(_axios),ResourcesService=function(_Service){function ResourcesService(){return(0,_classCallCheck3.default)(this,ResourcesService),(0,_possibleConstructorReturn3.default)(this,(ResourcesService.__proto__||(0,_getPrototypeOf2.default)(ResourcesService)).apply(this,arguments))}return(0,_inherits3.default)(ResourcesService,_Service),(0,_createClass3.default)(ResourcesService,[{key:"index",value:function(params){return this.getItems(params)}},{key:"new",value:function(){return this.newItem()}},{key:"edit",value:function(id){return this.getItemById(id)}},{key:"show",value:function(id){return this.getItemById(id)}},{key:"create",value:function(data){return this.addItem(data)}},{key:"update",value:function(id,data){return this.updateItem(id,data)}},{key:"delete",value:function(id){return this.deleteItem(id)}},{key:"member",value:function(actionName){var method=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",data=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},config=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return _axios2.default.request((0,_extends3.default)({url:this.apiBaseUrl+"/"+actionName,method:method,data:data,withCredentials:!0},config))}}]),ResourcesService}(_services2.default);exports.default=ResourcesService},745:function(module,exports,__webpack_require__){var content=__webpack_require__(746);"string"==typeof content&&(content=[[module.i,content,""]]),content.locals&&(module.exports=content.locals);__webpack_require__(44)("740f3fa0",content,!0,{})},746:function(module,exports,__webpack_require__){exports=module.exports=__webpack_require__(12)(!1),exports.push([module.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},747:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _stringify=__webpack_require__(45),_stringify2=_interopRequireDefault(_stringify),_extends2=__webpack_require__(7),_extends3=_interopRequireDefault(_extends2),_vuex=__webpack_require__(10),_resources_service=__webpack_require__(594),_resources_service2=_interopRequireDefault(_resources_service);exports.default={name:"Preparing",data:function(){return{storeService:new _resources_service2.default(window.settings.services.cmsUrl+"/stores"),storeOrderItemService:new _resources_service2.default(window.settings.services.cmsUrl+"/store_order_items"),storeOrderService:new _resources_service2.default(window.settings.services.cmsUrl+"/store_orders"),preparings:[],readies:[],activeOrders:[],store:{}}},methods:(0,_extends3.default)({},(0,_vuex.mapActions)(["goto"]),{index:function(){var _this=this;this.storeService.show("mystore").then(function(_ref){var data=_ref.data;_this.store=data,_this.loadOrders()})},loadOrders:function(){var _this2=this;this.storeOrderService.index({store:this.store._id,orderStatus:{$in:["active","ready"]},sort:"createdAt|asc"}).then(function(_ref2){var data=_ref2.data;_this2.activeOrders=data.data,_this2.loadPreparings(),_this2.loadReadies()})},loadOrderItems:function(status){return this.storeOrderItemService.index({store:this.store._id,storeOrder:{$in:this.activeOrders.map(function(order){return order._id})},itemStatus:status,sort:"createdAt|asc",populates:(0,_stringify2.default)([{path:"storeMenu",select:"name"},{path:"storeOrder",select:"storeTable",populate:[{path:"storeTable",select:"name"}]}])})},loadPreparings:function(){var _this3=this;this.loadOrderItems("preparing").then(function(_ref3){var data=_ref3.data;_this3.preparings=data.data})},loadReadies:function(){var _this4=this;this.loadOrderItems("ready").then(function(_ref4){var data=_ref4.data;_this4.readies=data.data})},ready:function(item){var _this5=this;this.storeOrderItemService.update(item._id,{itemStatus:"ready"}).then(function(_ref5){_ref5.data;_this5.loadPreparings(),_this5.loadReadies()})},delivery:function(item){var _this6=this;this.storeOrderItemService.update(item._id,{itemStatus:"delivered"}).then(function(_ref6){_ref6.data;_this6.loadReadies()})}}),created:function(){this.index()}}},748:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{staticClass:"page-content"},[_c("div",{staticClass:"container-fluid"},[_vm.store?_c("StorePanel",{attrs:{store:_vm.store._id}}):_vm._e(),_vm._v(" "),_c("div",{staticClass:"box-typical box-typical-padding"},[_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-xs-6"},[_c("h5",[_vm._v("Preparing")]),_vm._v(" "),_vm.preparings.length?_c("ul",{staticClass:"list-group"},_vm._l(_vm.preparings,function(item){return _c("li",{key:item._id,staticClass:"list-group-item list-group-item-default"},[_c("div",[_c("strong",[_c("span",{staticClass:"label label-primary"},[_vm._v(_vm._s(item.quantity))]),_vm._v("\n                  "+_vm._s(item.storeMenu&&item.storeMenu.name)+"\n                ")]),_vm._v(" "),_c("span",[_vm._v("["+_vm._s(item.storeOrder&&item.storeOrder.storeTable&&item.storeOrder.storeTable.name)+"]")]),_vm._v(" "),_c("em",[_vm._v("- "+_vm._s(_vm._f("timeForm")(item.createdAt)))]),_vm._v(" "),_c("div",{staticClass:"pull-right"},[_c("button",{staticClass:"btn btn-sm btn-success",attrs:{type:"button"},on:{click:function($event){return _vm.ready(item)}}},[_c("i",{staticClass:"fa fa-check"})])]),_vm._v(" "),_c("div",{staticClass:"clearfix"})]),_vm._v(" "),_c("div",{staticStyle:{"padding-left":"1.5em"}},[_c("span",{staticClass:"label label-default"},[_vm._v(_vm._s(item.note))])])])}),0):_c("div",{staticClass:"text-center"},[_vm._v("No item left.")])]),_vm._v(" "),_c("div",{staticClass:"col-xs-6"},[_c("h5",[_vm._v("Ready")]),_vm._v(" "),_vm.readies.length?_c("ul",{staticClass:"list-group"},_vm._l(_vm.readies,function(item){return _c("li",{key:item._id,staticClass:"list-group-item list-group-item-success"},[_c("div",[_c("strong",[_c("span",{staticClass:"label label-primary"},[_vm._v(_vm._s(item.quantity))]),_vm._v("\n                  "+_vm._s(item.storeMenu&&item.storeMenu.name)+"\n                ")]),_vm._v(" "),_c("span",[_vm._v("["+_vm._s(item.storeOrder&&item.storeOrder.storeTable&&item.storeOrder.storeTable.name)+"]")]),_vm._v(" "),_c("em",[_vm._v("- "+_vm._s(_vm._f("timeForm")(item.createdAt)))]),_vm._v(" "),_c("div",{staticClass:"pull-right"},[_c("button",{staticClass:"btn btn-sm btn-success",attrs:{type:"button"},on:{click:function($event){return _vm.delivery(item)}}},[_c("i",{staticClass:"fa fa-check"})])]),_vm._v(" "),_c("div",{staticClass:"clearfix"})]),_vm._v(" "),_c("div",{staticStyle:{"padding-left":"1.5em"}},[_c("u",[_vm._v(_vm._s(item.note))])])])}),0):_c("div",{staticClass:"text-center"},[_vm._v("No item left.")])])])])],1)])},staticRenderFns:[]}}});