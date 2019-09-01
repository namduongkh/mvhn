webpackJsonp([7],{578:function(module,exports,__webpack_require__){function injectStyle(ssrContext){__webpack_require__(698)}var Component=__webpack_require__(3)(__webpack_require__(700),__webpack_require__(702),injectStyle,"data-v-a7d1a59a",null);module.exports=Component.exports},594:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=__webpack_require__(256),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__(27),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__(38),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__(257),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__(258),_inherits3=_interopRequireDefault(_inherits2),_services=__webpack_require__(68),_services2=_interopRequireDefault(_services),ResourcesService=function(_Service){function ResourcesService(){return(0,_classCallCheck3.default)(this,ResourcesService),(0,_possibleConstructorReturn3.default)(this,(ResourcesService.__proto__||(0,_getPrototypeOf2.default)(ResourcesService)).apply(this,arguments))}return(0,_inherits3.default)(ResourcesService,_Service),(0,_createClass3.default)(ResourcesService,[{key:"index",value:function(params){return this.getItems(params)}},{key:"new",value:function(){return this.newItem()}},{key:"edit",value:function(id){return this.getItemById(id)}},{key:"show",value:function(id){return this.getItemById(id)}},{key:"create",value:function(data){return this.addItem(data)}},{key:"update",value:function(id,data){return this.updateItem(id,data)}},{key:"delete",value:function(id){return this.deleteItem(id)}}]),ResourcesService}(_services2.default);exports.default=ResourcesService},698:function(module,exports,__webpack_require__){var content=__webpack_require__(699);"string"==typeof content&&(content=[[module.i,content,""]]),content.locals&&(module.exports=content.locals);var add=__webpack_require__(19).default;add("10506c3a",content,!0,{})},699:function(module,exports,__webpack_require__){exports=module.exports=__webpack_require__(12)(!1),exports.push([module.i,"",""])},700:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _extends2=__webpack_require__(7),_extends3=_interopRequireDefault(_extends2),_defineProperty2=__webpack_require__(39),_defineProperty3=_interopRequireDefault(_defineProperty2),_vuex=__webpack_require__(10),_fields=__webpack_require__(701),_resources_service=__webpack_require__(594),_resources_service2=_interopRequireDefault(_resources_service);exports.default={name:"ListStoreOrder",data:function(){return{fieldsDisplay:_fields.fieldsDisplay,sortOrder:_fields.sortOrder,cmsUrl:window.settings.services.cmsUrl+"/store_orders",parentService:new _resources_service2.default(window.settings.services.cmsUrl+"/"+this.$route.params.parentType),parent:null,parentType:"stores"==this.$route.params.parentType?"store":"storeTable",moreParams:(0,_defineProperty3.default)({},this.parentType,null)}},computed:(0,_extends3.default)({},(0,_vuex.mapGetters)(["filterData"])),methods:(0,_extends3.default)({},(0,_vuex.mapActions)(["openConfirm","setParams","reloadTable"]),{goto:function(router){this.$store.dispatch("goto",router)}}),created:function(){var _this=this;this.$route.params.parentId&&this.parentService.show(this.$route.params.parentId).then(function(_ref){var data=_ref.data;_this.parent=data,_this.setParams((0,_defineProperty3.default)({},_this.parentType,_this.parent._id));for(var prop in _this.moreParams)_this.$route.query.hasOwnProperty(prop)&&_this.$route.query[prop]&&(_this.moreParams[prop]=_this.$route.query[prop]);_this.reloadTable()})},watch:{onResetParams:function(val){val&&(this.moreParams=(0,_defineProperty3.default)({},this.parentType,this.parent._id))}}}},701:function(module,exports,__webpack_require__){"use strict";var _moment=__webpack_require__(0);!function(obj){obj&&obj.__esModule}(_moment);exports.fieldsDisplay=[{name:"orderName",titleClass:"text-center",title:"Name",sortField:"orderName"},{name:"total",titleClass:"text-center",title:"Total",sortField:"total"},{name:"storeOrderItems",titleClass:"text-center",title:"Number of Items",callback:function(val){return val.length}},{name:"orderStatus",titleClass:"text-center",title:"Order Status",sortField:"orderStatus",callback:function(val){return{active:'<span class="label label-success">Active</span>',done:'<span class="label label-default">Done</span>'}[val]}}],exports.sortOrder=[{field:"createdAt",direction:"desc"}]},702:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("Listing",{attrs:{apiService:_vm.cmsUrl,routeDetail:"store_order",title:"StoreOrders",fields:_vm.fieldsDisplay,subTitle:"Listing",sortOrder:_vm.sortOrder,showExport:!0,disabledNew:!0},scopedSlots:_vm._u([{key:"additionalFilter",fn:function(props){}},{key:"addActions",fn:function(props){}},{key:"additionalButtonHeader",fn:function(props){return[_vm.parent?_c("StorePanel",{attrs:{store:_vm.parent.store||_vm.parent._id}}):_vm._e()]}}])})},staticRenderFns:[]}}});