webpackJsonp([187],{DVXc:function(e,t,a){var r=a("VU/8")(a("Yddr"),a("n5Ld"),null,null);e.exports=r.exports},Yddr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"list",data:function(){return{addRoute:"/user-asset/diamond-coin/diamond-coin-record/add",api:{path:"/boss/UserAsset/DiamondCoin/backend-recharge-record/find-list",params:{fields:"{id,user{uid, nickname},operator{id,admin_name},amount,source,create_time,remark}"}},pageInfoApi:{path:"/boss/UserAsset/DiamondCoin/backend-recharge-record/list-page-info",params:{}},columns:[{title:"充值人id",key:"operator_id",render:function(e,t){return e("div",[e("p",t.row.operator.id)])}},{title:"操作充值人",key:"operator_name",render:function(e,t){return e("div",[e("p",t.row.operator.admin_name)])}},{title:"充值金额",key:"amount"},{title:"充值时间",key:"create_time"},{title:"被充值uid",key:"user_uid",render:function(e,t){return e("div",[e("p",t.row.user.uid)])}},{title:"被充值昵称",key:"user_uid",render:function(e,t){return e("div",[e("p",t.row.user.nickname)])}},{title:"充值用途",key:"source"}],responseHandle:function(e,t){for(var a in e.data)e.data[a].create_time=t.$Util.dateFormat(e.data[a].create_time,"yyyy-MM-dd<br>hh:mm:ss"),"赠送用户"==e.data[a].source&&(e.data[a].source=e.data[a].source+" "+e.data[a].remark);return e},searchCondition:{uid:"",operator_uid:""},searchConditionHandle:function(e){return e}}}}},n5Ld:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("m-page-list",{attrs:{path:e.api.path,params:e.api.params,columns:e.columns,"response-handle":e.responseHandle,"page-info-path":e.pageInfoApi.path,"page-info-params":e.pageInfoApi.params}},[a("m-action-bar",{attrs:{slot:"search"},slot:"search"},[a("m-action-search-bar",{attrs:{"search-condition":e.searchCondition,"search-condition-handle":e.searchConditionHandle}},[a("m-form-item",{attrs:{label:"充值人id"}},[a("Input",{staticStyle:{width:"150px"},attrs:{placeholder:"输入充值人id"},model:{value:e.searchCondition.operator_uid,callback:function(t){e.$set(e.searchCondition,"operator_uid",t)},expression:"searchCondition.operator_uid"}})],1),e._v(" "),a("m-form-item",{attrs:{label:"被充值uid"}},[a("Input",{staticStyle:{width:"150px"},attrs:{placeholder:"输入被充值uid"},model:{value:e.searchCondition.uid,callback:function(t){e.$set(e.searchCondition,"uid",t)},expression:"searchCondition.uid"}})],1)],1)],1),e._v(" "),a("m-action-bar",[a("m-action-button-add",{attrs:{route:e.addRoute}})],1)],1)},staticRenderFns:[]}}});