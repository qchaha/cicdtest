webpackJsonp([246],{"+oBu":function(e,t,a){var i=a("VU/8")(a("xhP7"),a("cbFO"),null,null);e.exports=i.exports},cbFO:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("m-page-list",{attrs:{path:e.api.path,params:e.api.params,columns:e.columns,"page-info-path":e.pageInfoApi.path,"response-handle":e.responseHandle,"page-info-params":e.pageInfoApi.params}},[a("m-action-bar",[a("m-action-button-add",{attrs:{route:e.addRoute}})],1)],1)},staticRenderFns:[]}},xhP7:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"list",data:function(){return{addRoute:"/education/recruitment/privilege-card-category/add",api:{path:"/boss/education/recruitment/privilege-card-category/find-list",params:{fields:"{id,name,tip,usage_mode,weight}",limit:24}},pageInfoApi:{path:"/boss/education/recruitment/privilege-card-category/list-page-info",params:{}},columns:[{title:"特权卡分类ID",key:"id"},{title:"特权卡分类名字",key:"name"},{title:"卡片展示文案",key:"tip"},{title:"生效模式",key:"usage_mode",render:function(e,t){return e("div",0===t.row.usage_mode?"需要使用":"存在即生效")}},{title:"权重",key:"weight"},{title:"操作",key:"action",render:function(e,t){return e("m-action-list",{props:{list:[{text:"编辑",click:function(){location.hash="/education/recruitment/privilege-card-category/edit/"+t.row.id}},{text:"删除",color:"#f57",click:function(){confirm("确认删除?")&&vm.$Util.api.delete({api:{path:"/boss/education/recruitment/privilege-card-category/delete",params:{id:t.row.id}},loading:!0})}}]}})}}],responseHandle:function(e,t){null===e.data||e.data;return e}}}}}});