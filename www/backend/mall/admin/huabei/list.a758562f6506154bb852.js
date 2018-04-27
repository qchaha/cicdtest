webpackJsonp([50],{"/dRm":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=[{value:1,text:"黑名单"},{value:2,text:"白名单"},{value:3,text:"待审核"}];e.default={name:"MGoodsBlacklist",data:function(){var t=this;return{blacklistAddRoute:"/mall/admin/huabei-blacklist/add",blacklistApi:{path:"/boss/mall/admin/huabei/blacklist/find-list",params:{fields:"{goods_id,goods_name,create_time,status}",status:[3]}},blacklistPageInfoApi:{path:"/boss/mall/admin/huabei/blacklist/list-page-info",params:{status:[3]}},changeStatusApi:{api:{path:"/boss/mall/admin/huabei/blacklist/change-status"}},types:i,searchCondition:{goods_id:"",goods_name:"",status:[3]},columns:[{title:"商品id",key:"goods_id"},{title:"商品名称",key:"goods_name"},{title:"创建时间",key:"create_time"},{title:"状态",key:"status",render:function(e,a){return e("div",[e("RadioGroup",{props:{value:a.row.status},on:{input:function(e){t.changeIntoRandom(a.row,e)}}},[e("Radio",{props:{label:"黑名单"}}),e("Radio",{props:{label:"白名单"}}),e("Radio",{props:{label:"待审核"}})])])}}],responseHandle:function(t,e){var a=t.data;for(var i in a)a[i].create_time=a[i].create_time.date.replace(".000000",""),1==a[i].status?a[i].status="黑名单":2==a[i].status?a[i].status="白名单":3==a[i].status&&(a[i].status="待审核");return t}}},methods:{changeIntoRandom:function(t,e){if(confirm("确认修改?")){bus.$emit("on-loading");var a=0,i=this;a="黑名单"===e?1:"白名单"===e?2:3;var n={goods_id:t.goods_id,status:a};this.$Util.api.post(i.changeStatusApi,n,i).then(function(){t.status=e,bus.$emit("on-loading")},function(t){bus.$emit("on-loading"),i.$Message.warning("修改失败")})}}}}},"57Sx":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("HTBq"),n=a.n(i),s=a("H73M"),o=a.n(s);e.default={name:"List",components:{MRule:o.a,MGoodsBlacklist:n.a},data:function(){return{selectTag:"花呗商品黑名单",blacklistIsShow:!1,ruleIsShow:!1}},methods:{changeTag:function(t){"花呗商品黑名单"===t?(this.blacklistIsShow=!0,this.ruleIsShow=!1):"花呗规则"===t&&(this.blacklistIsShow=!1,this.ruleIsShow=!0)}},created:function(){var t=this;this.$nextTick(function(){"rule"===t.$route.query.type?(t.selectTag="花呗规则",t.blacklistIsShow=!1,t.ruleIsShow=!0):(t.selectTag="花呗商品黑名单",t.blacklistIsShow=!0,t.ruleIsShow=!1)})}}},H73M:function(t,e,a){var i=a("VU/8")(a("HvXu"),a("V1ck"),null,null);t.exports=i.exports},HTBq:function(t,e,a){var i=a("VU/8")(a("/dRm"),a("xV9c"),null,null);t.exports=i.exports},HvXu:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"MRule",data:function(){return{addRoute:"/mall/admin/huabei-rule/add",api:{path:"/boss/mall/admin/huabei/rule/find-list",params:{fields:"{id,start_time,end_time}"}},pageInfoApi:{path:"/boss/mall/admin/huabei/rule/list-page-info",params:{}},searchCondition:{filter_time:"",select_time:""},columns:[{title:"ID",key:"id"},{title:"规则开始时间",key:"start_time"},{title:"规则结束时间",key:"end_time"},{title:"操作",key:"action",render:function(t,e){var a=[];return[{name:"详情",handle:function(){location.hash="/mall/admin/huabei-rule/edit/"+e.row.id}},{name:"作废",handle:function(){if(confirm("确定要作废吗?")){var t={api:{path:"/boss/mall/admin/huabei/rule/delete",params:{id:e.row.id}}};bus.$emit("on-loading"),vm.$Util.api.delete(t,vm).then(function(t){!0===t.data?location.reload():alert("作废失败，请联系开发人员")},function(t){})}}}].map(function(e){a.push(t("i-button",{props:{type:"text",size:"small"},on:{click:function(){e.handle()}}},[t("span",{style:{color:"#39f"}},e.name)]))}),t("div",a)}}],responseHandle:function(t,e){var a=t.data;for(var i in a)a[i].start_time=e.$Util.dateFormat(a[i].start_time,"yyyy-MM-dd<br>hh:mm:ss"),a[i].end_time=e.$Util.dateFormat(a[i].end_time,"yyyy-MM-dd<br>hh:mm:ss");return t},searchConditionHandle:function(t){return t.filter_time?t.select_time=t.filter_time/1e3:t.select_time=0,t}}},methods:{syncSelectTime:function(t){this.searchCondition.filter_time=t?Date.parse(t):""}}}},V1ck:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("m-page-list",{attrs:{path:t.api.path,params:t.api.params,columns:t.columns,"response-handle":t.responseHandle,"page-info-path":t.pageInfoApi.path,"page-info-params":t.pageInfoApi.params}},[a("m-action-bar",[a("m-action-button-add",{attrs:{route:t.addRoute}})],1),t._v(" "),a("m-action-bar",{attrs:{slot:"search"},slot:"search"},[a("m-action-search-bar",{attrs:{"search-condition":t.searchCondition,"search-condition-handle":t.searchConditionHandle}},[a("m-form-item",{attrs:{label:"筛选时间"}},[a("Date-picker",{attrs:{type:"datetime",placeholder:"筛选时间"},on:{"on-change":t.syncSelectTime},model:{value:t.searchCondition.filter_time,callback:function(e){t.$set(t.searchCondition,"filter_time",e)},expression:"searchCondition.filter_time"}})],1)],1)],1)],1)},staticRenderFns:[]}},"h/66":function(t,e,a){var i=a("VU/8")(a("57Sx"),a("xDHy"),null,null);t.exports=i.exports},xDHy:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("m-page",[a("Card",{staticStyle:{"margin-bottom":"10px"}},[a("RadioGroup",{on:{"on-change":t.changeTag},model:{value:t.selectTag,callback:function(e){t.selectTag=e},expression:"selectTag"}},[a("Radio",{attrs:{label:"花呗商品黑名单"}}),t._v(" "),a("Radio",{attrs:{label:"花呗规则"}})],1)],1),t._v(" "),t.blacklistIsShow?a("m-goods-blacklist"):t._e(),t._v(" "),t.ruleIsShow?a("m-rule"):t._e()],1)},staticRenderFns:[]}},xV9c:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("m-page-list",{attrs:{path:t.blacklistApi.path,params:t.blacklistApi.params,columns:t.columns,"response-handle":t.responseHandle,"page-info-path":t.blacklistPageInfoApi.path,"page-info-params":t.blacklistPageInfoApi.params}},[a("m-action-bar",[a("m-action-button-add",{attrs:{route:t.blacklistAddRoute}})],1),t._v(" "),a("m-action-bar",{attrs:{slot:"search"},slot:"search"},[a("m-action-search-bar",{attrs:{"search-condition":t.searchCondition}},[a("m-form-item",{attrs:{label:"GOODS_ID"}},[a("Input",{staticStyle:{width:"150px","margin-right":"10px"},model:{value:t.searchCondition.goods_id,callback:function(e){t.$set(t.searchCondition,"goods_id",e)},expression:"searchCondition.goods_id"}})],1),t._v(" "),a("m-form-item",{attrs:{label:"商品名称"}},[a("Input",{staticStyle:{width:"150px","margin-right":"10px"},model:{value:t.searchCondition.goods_name,callback:function(e){t.$set(t.searchCondition,"goods_name",e)},expression:"searchCondition.goods_name"}})],1),t._v(" "),a("m-form-item",{attrs:{label:"花呗商品状态"}},[a("Select",{staticStyle:{width:"200px","margin-right":"10px"},attrs:{multiple:"",placeholder:"花呗商品状态"},model:{value:t.searchCondition.status,callback:function(e){t.$set(t.searchCondition,"status",e)},expression:"searchCondition.status"}},t._l(t.types,function(e){return a("Option",{key:e,attrs:{value:e.value}},[t._v(t._s(e.text))])}))],1)],1)],1)],1)},staticRenderFns:[]}}});