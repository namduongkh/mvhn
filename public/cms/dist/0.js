webpackJsonp([0],{531:function(module,exports,__webpack_require__){function injectStyle(ssrContext){__webpack_require__(558)}var Component=__webpack_require__(2)(__webpack_require__(560),__webpack_require__(562),injectStyle,"data-v-532e40fa",null);module.exports=Component.exports},558:function(module,exports,__webpack_require__){var content=__webpack_require__(559);"string"==typeof content&&(content=[[module.i,content,""]]),content.locals&&(module.exports=content.locals);var add=__webpack_require__(17).default;add("02d0a31c",content,!0,{})},559:function(module,exports,__webpack_require__){exports=module.exports=__webpack_require__(10)(!1),exports.push([module.i,"",""])},560:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _extends2=__webpack_require__(13),_extends3=function(obj){return obj&&obj.__esModule?obj:{default:obj}}(_extends2),_vuex=__webpack_require__(8),_fields=__webpack_require__(561);exports.default={name:"ListUser",data:function(){return{moreParams:{},fieldsDisplay:_fields.fieldsDisplay,sortOrder:_fields.sortOrder,cmsUrl:window.settings.services.cmsUrl+"/users"}},computed:(0,_extends3.default)({},(0,_vuex.mapGetters)(["filterData"])),methods:(0,_extends3.default)({},(0,_vuex.mapActions)(["openConfirm","setParams","reloadTable"]),{goto:function(router){this.$store.dispatch("goto",router)}}),created:function(){for(var prop in this.moreParams)this.$route.query.hasOwnProperty(prop)&&this.$route.query[prop]&&(this.moreParams[prop]=this.$route.query[prop])},watch:{"moreParams.any_field":function(any_field){this.setParams({any_field:any_field}),this.reloadTable()},onResetParams:function(val){val&&(this.moreParams.any_field=null)}}}},561:function(module,exports,__webpack_require__){"use strict";var _moment=__webpack_require__(0);!function(obj){obj&&obj.__esModule}(_moment);exports.fieldsDisplay=[{name:"name",titleClass:"text-center",title:"Name",sortField:"name"},{name:"email",titleClass:"text-center",title:"Email",sortField:"email"},{name:"status",titleClass:"text-center",title:"Status",sortField:"status"}],exports.sortOrder=[{field:"createdAt",direction:"asc"}]},562:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement;return(_vm._self._c||_h)("Listing",{attrs:{apiService:_vm.cmsUrl,routeDetail:"user",title:"Users",fields:_vm.fieldsDisplay,subTitle:"Listing",sortOrder:_vm.sortOrder,showExport:!0},scopedSlots:_vm._u([{key:"additionalFilter",fn:function(props){}},{key:"addActions",fn:function(props){}}])})},staticRenderFns:[]}}});