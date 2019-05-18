webpackJsonp([1],{523:function(module,exports,__webpack_require__){var Component=__webpack_require__(2)(__webpack_require__(531),__webpack_require__(533),null,null,null);module.exports=Component.exports},531:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _extends2=__webpack_require__(13),_extends3=_interopRequireDefault(_extends2),_axios=__webpack_require__(24),_axios2=_interopRequireDefault(_axios),_vuex=__webpack_require__(8),_fields=__webpack_require__(532);exports.default={name:"ListPost",data:function(){return{moreParams:{},fieldsDisplay:_fields.fieldsDisplay,sortOrder:_fields.sortOrder,cmsUrl:window.settings.services.cmsUrl+"/posts",categories:[]}},computed:(0,_extends3.default)({},(0,_vuex.mapGetters)(["filterData"])),methods:(0,_extends3.default)({},(0,_vuex.mapActions)(["openConfirm","setParams","reloadTable"]),{goto:function(router){this.$store.dispatch("goto",router)}}),created:function(){var that=this;for(var prop in this.moreParams)this.$route.query.hasOwnProperty(prop)&&this.$route.query[prop]&&(this.moreParams[prop]=this.$route.query[prop]);_axios2.default.get(window.settings.services.cmsUrl+"/properties",{withCredentials:!0,params:{notPaginate:!0,select:"_id name",type:"category"}}).then(function(resp){that.categories=resp.data.data})},watch:{"moreParams.category":function(category){this.setParams({category:category}),this.reloadTable()}}}},532:function(module,exports,__webpack_require__){"use strict";exports.fieldsDisplay=[{name:"title",title:"Title",sortField:"title"}],exports.sortOrder=[{field:"createdAt",direction:"desc"}]},533:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("Listing",{attrs:{apiService:_vm.cmsUrl,routeDetail:"post",title:"Posts",fields:_vm.fieldsDisplay,subTitle:"Listing",sortOrder:_vm.sortOrder,showExport:!0},scopedSlots:_vm._u([{key:"additionalFilter",fn:function(props){return[_c("div",{staticClass:"col-sm-3"},[_c("div",[_c("label",[_vm._v("\n          Category:\n          "),_c("select",{directives:[{name:"model",rawName:"v-model",value:_vm.moreParams.category,expression:"moreParams.category"}],staticClass:"form-control",attrs:{name:"category"},on:{change:function($event){var $$selectedVal=Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){return"_value"in o?o._value:o.value});_vm.$set(_vm.moreParams,"category",$event.target.multiple?$$selectedVal:$$selectedVal[0])}}},[_c("option",{domProps:{value:null}},[_vm._v("All category")]),_vm._v(" "),_vm._l(_vm.categories,function(cate){return _c("option",{key:cate._id,domProps:{value:cate._id}},[_vm._v(_vm._s(cate.name))])})],2)])])])]}}])})},staticRenderFns:[]}}});