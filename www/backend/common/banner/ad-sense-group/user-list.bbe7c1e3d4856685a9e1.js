webpackJsonp([76],{"+k1j":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("EpKl"),a=n.n(s);t.default={name:"app",components:{List:a.a},data:function(){return{}},methods:{}}},"47yS":function(e,t,n){var s=n("VU/8")(n("+k1j"),n("tf0+"),null,null);e.exports=s.exports},DJWB:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=0,a="",i="",o=!1,r=[{title:"编号",key:"id"},{title:"标题",key:"name"},{title:"开始时间",key:"start_time"},{title:"结束时间",key:"end_time",render:function(e,t){return e("span",0===t.row.end_time.indexOf("1970-01-01 08:00:00")?"无":t.row.end_time)}},{title:"操作",key:"action",render:function(e,t){var n=[],r=[{name:"编辑",handle:function(){if(0!==parseInt(s))return void 0===bus.data&&(bus.data={}),bus.data.position=parseInt(s),bus.data.listRouteTail=a,bus.data.adSenseFormats=i,void(location.hash="/common/banner/ad-sense-group/edit-with-position/"+t.row.id);location.hash="/common/banner/ad-sense-group/edit/"+t.row.id}},{name:"删除",handle:function(){if(confirm("确认删除?")){var e={api:{path:"/boss/common/banner/ad-sense-group/delete",params:{id:t.row.id}}};bus.$emit("on-loading"),vm.$Util.api.delete(e,vm).then(function(e){location.reload()},function(e){})}}}];return o&&r.unshift({name:"复制发布",handle:function(){if(0!==parseInt(s))return void 0===bus.data&&(bus.data={}),bus.data.position=parseInt(s),bus.data.listRouteTail=a,bus.data.adSenseFormats=i,void(location.hash="/common/banner/ad-sense-group/copy-with-position/"+t.row.id);location.hash="/common/banner/ad-sense-group/copy/"+t.row.id}}),r.map(function(t){n.push(e("i-button",{props:{type:"text",size:"small"},on:{click:function(){t.handle()}}},[e("span",{style:{color:"#39f"}},t.name)]))}),e("div",n)}}],d={},u=[];t.default={name:"app",props:{position:{type:Number,default:0},listRouteTail:{type:String,default:"community"},adSenseFormats:{type:String,default:"A1,A2,A3,A4,A5"},showSearch:{type:Boolean,default:!0},showBusinessSearch:{type:Boolean,default:!0},showTimeSearch:{type:Boolean,default:!1},nameSearchMultiple:{type:Boolean,default:!1},showAudienceSearch:{type:Boolean,default:!1},haveCopyOperation:{type:Boolean,default:!1}},data:function(){return{searchCondition:{name:"",businessId:"",position:this.position,startTime:0,endTime:0,nameSearchMultiple:this.nameSearchMultiple,audience:[]},businesses:[],audiences:[],columns:r,formats:{mix:"广告组",B2:"教程",B1:"美图标签"},api:{path:"/boss/common/banner/ad-sense-group/find-list?position="+this.position,params:{fields:"{id,start_time,end_time,name"+(this.showBusinessSearch?",business_id,business_name":"")+(this.showAudienceSearch?",audience":"")+"}"}},pageInfoApi:{path:"/boss/common/banner/ad-sense-group/list-page-info",params:{position:this.position,fields:this.showAudienceSearch?"{audience{id,title}}":"{}"}},methods:{toAddAdSenseGroup:function(e){location.hash="/common/banner/ad-sense-group/add/"+e},toAddCommunityAdSenseGroup:function(){void 0===bus.data&&(bus.data={}),bus.data.position=parseInt(s),bus.data.listRouteTail=a,bus.data.adSenseFormats=i,location.hash="/common/banner/ad-sense-group/add-with-position"},syncStartTime:function(e){e=e||0,d.startTime=new Date(e).getTime()/1e3},syncEndTime:function(e){e=e||0,d.endTime=new Date(e).getTime()/1e3}},responseHandle:function(e,t){return e.data=null===e.data?[]:e.data,e.data.map(function(e){e.start_time=t.$Util.dateFormat(e.start_time,"yyyy-MM-dd hh:mm:ss"),e.end_time=t.$Util.dateFormat(e.end_time,"yyyy-MM-dd hh:mm:ss")}),e}}},methods:{handleListPageInfoSuccess:function(e){var t=this,n=e.data.filter.businesses;n.unshift({id:"",name:"全部"}),this.businesses=n,this.showAudienceSearch&&(t.audiences=[],t.audiences.push({id:0,title:"不限"}),e.data.filter.audiences.map(function(e){t.audiences.push({id:e.id,title:e.title})}),u=this.audiences)},businessColumnShouldShow:function(){return 0===parseInt(s)},addBusinessColumn:function(){this.removeBusinessColumn(),r.splice(1,0,{title:"部门",key:"business_name"})},removeBusinessColumn:function(){for(var e in r)"部门"===r[e].title&&r.splice(e,1)},addAudienceColumn:function(){this.removeBusinessColumn(),r.splice(2,0,{title:"展示对象",key:"audience",render:function(e,t){var n="";if(parseInt(0===t.row.audience));else for(var s in u)if(u[s].id===parseInt(t.row.audience)){n=u[s].title;break}return e("span",n)}})},removeAudienceColumn:function(){for(var e in r)"展示对象"===r[e].title&&r.splice(e,1)}},created:function(){s=this.position,a=this.listRouteTail,i=this.adSenseFormats,d=this.searchCondition,o=this.haveCopyOperation,this.businessColumnShouldShow()?this.addBusinessColumn():this.removeBusinessColumn(),this.showAudienceSearch?(this.removeAudienceColumn(),this.addAudienceColumn()):this.removeAudienceColumn()}}},"E+7V":function(e,t,n){t=e.exports=n(0)(),t.push([e.i,"#adSenseGroupSearchBar .m-form-item .label{margin-right:8px;font-size:16px;line-height:30px}",""])},EpKl:function(e,t,n){n("tNRv");var s=n("VU/8")(n("DJWB"),n("dVLa"),null,null);e.exports=s.exports},dVLa:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("m-page-list",{attrs:{path:e.api.path,params:e.api.params,columns:e.columns,methods:e.methods,"response-handle":e.responseHandle,"page-info-path":e.pageInfoApi.path,"page-info-params":e.pageInfoApi.params},on:{"on-page-info-success":e.handleListPageInfoSuccess}},[n("m-action-bar",[0===parseInt(e.position)?n("Dropdown",{attrs:{placement:"bottom-start"},on:{"on-click":e.methods.toAddAdSenseGroup}},[n("Button",{attrs:{type:"primary"}},[e._v("新增\n\n\n\n                "),n("Icon",{attrs:{type:"arrow-down-b"}})],1),e._v(" "),n("Dropdown-menu",{attrs:{slot:"list"},slot:"list"},e._l(e.formats,function(t,s){return n("Dropdown-item",{attrs:{name:s}},[e._v("新增"+e._s(t)+"\n\n\n                ")])}))],1):e._e(),e._v(" "),0!==parseInt(e.position)?n("Button",{attrs:{type:"primary"},on:{click:e.methods.toAddCommunityAdSenseGroup}},[e._v("新增\n\n\n        ")]):e._e()],1),e._v(" "),e.showSearch?n("m-action-bar",{attrs:{slot:"search"},slot:"search"},[n("m-action-search-bar",{attrs:{"search-condition":e.searchCondition,id:"adSenseGroupSearchBar"}},[n("div",[n("m-form-item",{attrs:{label:"广告标题"}},[n("Input",{staticStyle:{width:"200px"},attrs:{placeholder:e.nameSearchMultiple?"多个搜索词之间英文逗号隔开":"输入广告标题"},model:{value:e.searchCondition.name,callback:function(t){e.$set(e.searchCondition,"name",t)},expression:"searchCondition.name"}})],1),e._v(" "),e.showBusinessSearch?n("m-form-item",{attrs:{label:"部门"}},[n("i-select",{staticStyle:{width:"260px"},model:{value:e.searchCondition.businessId,callback:function(t){e.$set(e.searchCondition,"businessId",t)},expression:"searchCondition.businessId"}},e._l(e.businesses,function(t){return n("i-option",{attrs:{value:t.id}},[e._v(e._s(t.name))])}))],1):e._e(),e._v(" "),e.showAudienceSearch?n("m-form-item",{attrs:{label:"展示对象"}},[n("Select",{staticStyle:{width:"200px"},attrs:{filterable:"",multiple:""},model:{value:e.searchCondition.audience,callback:function(t){e.$set(e.searchCondition,"audience",t)},expression:"searchCondition.audience"}},e._l(e.audiences,function(t){return n("Option",{key:t.id,attrs:{value:t.id}},[e._v("\n                            "+e._s(t.title)+"\n                        ")])}))],1):e._e()],1),e._v(" "),n("div",[e.showTimeSearch?n("m-form-item",{attrs:{label:"开始时间"}},[n("Date-picker",{attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss",placeholder:"选择开始日期和时间"},on:{"on-change":e.methods.syncStartTime}})],1):e._e(),e._v(" "),e.showTimeSearch?n("m-form-item",{attrs:{label:"结束时间"}},[n("Date-picker",{attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss",placeholder:"选择结束日期和时间"},on:{"on-change":e.methods.syncEndTime}})],1):e._e()],1)])],1):e._e()],1)},staticRenderFns:[]}},tNRv:function(e,t,n){var s=n("E+7V");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);n("rjj0")("8cfc353a",s,!0)},"tf0+":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("List",{attrs:{position:2,"list-route-tail":"user","ad-sense-formats":"A1,A2,A3,A4","show-search":!0,"show-business-search":!1,"show-time-search":!0,"name-search-multiple":!0,"show-audience-search":!0}})},staticRenderFns:[]}}});