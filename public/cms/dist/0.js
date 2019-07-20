webpackJsonp([0],{553:function(module,exports,__webpack_require__){function injectStyle(ssrContext){__webpack_require__(600)}var Component=__webpack_require__(3)(__webpack_require__(602),__webpack_require__(609),injectStyle,null,null);module.exports=Component.exports},600:function(module,exports,__webpack_require__){var content=__webpack_require__(601);"string"==typeof content&&(content=[[module.i,content,""]]),content.locals&&(module.exports=content.locals);__webpack_require__(69)("02b8532c",content,!0,{})},601:function(module,exports,__webpack_require__){exports=module.exports=__webpack_require__(13)(!1),exports.push([module.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},602:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _assign=__webpack_require__(68),_assign2=_interopRequireDefault(_assign),_extends2=__webpack_require__(9),_extends3=_interopRequireDefault(_extends2),_vuex=__webpack_require__(10),_LinkLoader=__webpack_require__(603),_LinkLoader2=_interopRequireDefault(_LinkLoader);exports.default={name:"LinkMapper",components:{LinkLoader:_LinkLoader2.default},data:function(){return{cmsUrl:window.settings.services.cmsUrl+"/posts",formData:{},wordSearch:""}},computed:(0,_extends3.default)({},(0,_vuex.mapGetters)(["itemSelected"])),watch:{itemSelected:function(data){data&&(this.formData=(0,_assign2.default)({},data))}},methods:(0,_extends3.default)({},(0,_vuex.mapActions)(["initService","saveItem","getItemById","goto"]),{reset:function(){this.getItemById({id:this.$route.params.id})},save:function(options){var _this=this,self=this;this.$validator.validateAll().then(function(res){res?self.saveItem({formData:self.formData,options:options}):_this.$notify("Please check data",{type:"warning",placement:{from:"bottom"}})})},replaceLink:function(selectedLink){this.formData.content=this.formData.content.replace(new RegExp("(\\s)"+selectedLink.text+"(\\s)","gim"),"$1"+selectedLink.html+"$2")},onSelection:function(){var debouncer=void 0,self=this;document.onselectionchange=function(){clearTimeout(debouncer),debouncer=setTimeout(function(){var word=document.getSelection().toString().trim();word&&(self.wordSearch=word)},300)}}}),created:function(){this.initService(this.cmsUrl),this.getItemById({id:this.$route.params.id}),this.onSelection()}}},603:function(module,exports,__webpack_require__){function injectStyle(ssrContext){__webpack_require__(604)}var Component=__webpack_require__(3)(__webpack_require__(606),__webpack_require__(608),injectStyle,null,null);module.exports=Component.exports},604:function(module,exports,__webpack_require__){var content=__webpack_require__(605);"string"==typeof content&&(content=[[module.i,content,""]]),content.locals&&(module.exports=content.locals);__webpack_require__(69)("184b7465",content,!0,{})},605:function(module,exports,__webpack_require__){exports=module.exports=__webpack_require__(13)(!1),exports.push([module.i,"\nimg {\n  max-width: 100%;\n  height: auto;\n}\n",""])},606:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _resources_service=__webpack_require__(607),_resources_service2=function(obj){return obj&&obj.__esModule?obj:{default:obj}}(_resources_service);exports.default={name:"LinkLoader",props:{word:{type:String}},data:function(){return{wordSearch:"",service:new _resources_service2.default(window.settings.services.cmsUrl+"/links"),links:[],link:{},selectedLink:{}}},methods:{loadLink:function(){var self=this;this.service.index({title:self.wordSearch}).then(function(resp){self.links=resp.data.data})},saveLink:function(){var _this=this,self=this;this.$validator.validateAll().then(function(res){res?self.service.create(_this.link).then(function(resp){self.$notify(resp.data.message,{type:"success",placement:{from:"bottom"}}),self.links.unshift(resp.data.data)}):self.$notify("Please check data",{type:"warning",placement:{from:"bottom"}})})},generateLinkHtml:function(link){var linkHtml='<a href="'+link.url+'" title="'+link.title+'"';return link.external&&(linkHtml+=' target="_blank" nofollow'),linkHtml+=">"+link.title+"</a>"},wordChange:function(word){word&&(this.wordSearch=word,this.link.title=word,this.loadLink())}},created:function(){this.wordChange(this.word)},watch:{word:function(val){this.wordChange(val)},selectedLink:function(val){this.$emit("selectedLink",{text:this.word,link:{title:val.title,url:val.url,external:val.external},html:this.generateLinkHtml(val)})}}}},607:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=__webpack_require__(257),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__(37),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__(43),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__(258),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__(259),_inherits3=_interopRequireDefault(_inherits2),_services=__webpack_require__(71),_services2=_interopRequireDefault(_services),ResourcesService=function(_Service){function ResourcesService(){return(0,_classCallCheck3.default)(this,ResourcesService),(0,_possibleConstructorReturn3.default)(this,(ResourcesService.__proto__||(0,_getPrototypeOf2.default)(ResourcesService)).apply(this,arguments))}return(0,_inherits3.default)(ResourcesService,_Service),(0,_createClass3.default)(ResourcesService,[{key:"index",value:function(params){return this.getItems(params)}},{key:"new",value:function(){return this.newItem()}},{key:"edit",value:function(id){return this.getItemById(id)}},{key:"show",value:function(id){return this.getItemById(id)}},{key:"create",value:function(data){return this.addItem(data)}},{key:"update",value:function(id,data){return this.updateItem(id,data)}},{key:"delete",value:function(id){return this.deleteItem(id)}}]),ResourcesService}(_services2.default);exports.default=ResourcesService},608:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{staticClass:"row"},[_c("div",{staticClass:"col-sm-12"},[_c("form",[_c("label",[_vm._v("Title")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.link.title,expression:"link.title"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{type:"text",placeholder:"something","data-vv-name":"Title"},domProps:{value:_vm.link.title},on:{input:function($event){$event.target.composing||_vm.$set(_vm.link,"title",$event.target.value)}}}),_vm._v(" "),_c("label",[_vm._v("Url")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.link.url,expression:"link.url"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{type:"text",placeholder:"http://example.com","data-vv-name":"Url"},domProps:{value:_vm.link.url},on:{input:function($event){$event.target.composing||_vm.$set(_vm.link,"url",$event.target.value)}}}),_vm._v(" "),_c("label",[_vm._v("External")]),_vm._v(" "),_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.link.external,expression:"link.external"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(_vm.link.external)?_vm._i(_vm.link.external,null)>-1:_vm.link.external},on:{change:function($event){var $$a=_vm.link.external,$$el=$event.target,$$c=!!$$el.checked;if(Array.isArray($$a)){var $$i=_vm._i($$a,null);$$el.checked?$$i<0&&_vm.$set(_vm.link,"external",$$a.concat([null])):$$i>-1&&_vm.$set(_vm.link,"external",$$a.slice(0,$$i).concat($$a.slice($$i+1)))}else _vm.$set(_vm.link,"external",$$c)}}}),_vm._v(" "),_c("br"),_vm._v(" "),_c("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function($event){return _vm.saveLink()}}},[_c("i",{staticClass:"fa fa-plus"}),_vm._v(" Create\n      ")])]),_vm._v(" "),_c("hr"),_vm._v(" "),_c("div",{staticClass:"form-inline"},[_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.wordSearch,expression:"wordSearch"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Something"},domProps:{value:_vm.wordSearch},on:{input:function($event){$event.target.composing||(_vm.wordSearch=$event.target.value)}}}),_vm._v(" "),_c("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function($event){return _vm.loadLink()}}},[_c("i",{staticClass:"fa fa-search"}),_vm._v(" Search\n      ")])]),_vm._v(" "),_c("br"),_vm._v(" "),_c("span",[_vm._v("Replace for:")]),_vm._v(" "),_c("span",{staticClass:"label label-default"},[_vm._v(_vm._s(_vm.word))]),_vm._v(" "),_c("br"),_vm._v(" "),_c("br"),_vm._v(" "),_vm._l(_vm.links,function(link){return _c("a",{key:link._id,staticClass:"btn btn-default",attrs:{href:"javascript:void(0)"},on:{click:function($event){_vm.selectedLink=link}}},[_vm._v("\n      "+_vm._s(link.title)+"\n      "),_c("small",[_vm._v("("+_vm._s(link.url)+")")])])})],2)])},staticRenderFns:[]}},609:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{staticClass:"page-content"},[_c("div",{staticClass:"container-fluid"},[_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-sm-12 text-right"},[_c("button",{staticClass:"btn btn-primary",on:{click:function($event){return _vm.save({})}}},[_c("i",{staticClass:"fa fa-save"}),_vm._v(" Save\n        ")]),_vm._v(" "),_c("button",{staticClass:"btn btn-secondary",on:{click:function($event){return _vm.goto({name:"ShowPost",params:{id:_vm.formData._id}})}}},[_c("i",{staticClass:"fa fa-edit"}),_vm._v(" Edit\n        ")]),_vm._v(" "),_c("button",{staticClass:"btn btn-secondary",on:{click:function($event){return _vm.reset()}}},[_c("i",{staticClass:"fa fa-refresh"}),_vm._v(" Reset\n        ")]),_vm._v(" "),_c("button",{staticClass:"btn btn-secondary",on:{click:function($event){return _vm.goto({name:"ListPosts"})}}},[_c("i",{staticClass:"fa fa-list"}),_vm._v(" List\n        ")])])]),_vm._v(" "),_c("div",{staticClass:"box-typical box-typical-padding row"},[_c("div",{staticClass:"col-sm-12"},[_c("h5",{staticClass:"m-t-lg with-border"},[_vm._v(_vm._s(_vm.formData.title))])]),_vm._v(" "),_c("div",{staticClass:"col-sm-12 row"},[_c("div",{staticClass:"col-sm-7"},[_c("div",{domProps:{innerHTML:_vm._s(_vm.formData.content)}})]),_vm._v(" "),_c("div",{staticClass:"col-sm-5"},[_c("LinkLoader",{attrs:{word:_vm.wordSearch},on:{selectedLink:_vm.replaceLink}})],1)])])])])},staticRenderFns:[]}}});