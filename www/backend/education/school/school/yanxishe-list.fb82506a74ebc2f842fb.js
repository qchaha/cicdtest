webpackJsonp([232],{"9rc5":function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("m-page-list",{attrs:{path:e.api.path,params:e.api.params,columns:e.columns,methods:e.methods,"response-handle":e.responseHandle,"page-info-path":e.pageInfoApi.path,"page-info-params":e.pageInfoApi.params},on:{"on-page-info-success":e.handlePageInfoSuccess}},[t("m-action-bar",{attrs:{slot:"search"},slot:"search"},[t("m-action-search-bar",{attrs:{"search-condition":e.searchCondition,"search-condition-handle":e.searchConditionHandle}},[t("m-form-item",[t("Cascader",{staticStyle:{width:"300px"},attrs:{data:e.regions,"change-on-select":""},model:{value:e.searchCondition.region,callback:function(n){e.$set(e.searchCondition,"region",n)},expression:"searchCondition.region"}})],1),e._v(" "),t("m-form-item",{attrs:{label:""}},[t("Input",{staticStyle:{width:"150px"},attrs:{placeholder:"输入名称搜索"},model:{value:e.searchCondition.name,callback:function(n){e.$set(e.searchCondition,"name",n)},expression:"searchCondition.name"}})],1)],1)],1)],1)},staticRenderFns:[]}},Nge2:function(e,n,t){var a=t("VU/8")(t("XnUr"),t("9rc5"),null,null);e.exports=a.exports},XnUr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"app",data:function(){return{api:{path:"/boss/education/school/school/find-yanxishe-list",params:{fields:"{id,name,type,all_lessons{id},start_time,end_time,location{province,city,district}}"}},pageInfoApi:{path:"/boss/education/school/school/list-yanxishe-page-info",params:{}},regions:[],columns:[{title:"学校ID",key:"id"},{title:"研习社名称",key:"name"},{title:"研习社地点",key:"city",render:function(e,n){return e("p",n.row.location.province+" "+n.row.location.city)}},{title:"是否线上显示",key:"isShow"},{title:"研习社课程数",key:"lessonCount",render:function(e,n){return e("span",n.row.all_lessons.length)}},{title:"操作",key:"action",render:function(e,n){var t=[];return[{name:"查看课程统计",handle:function(){location.hash="/education/school/lesson/yanxishe-lesson-list/"+n.row.id}}].map(function(n){t.push(e("i-button",{props:{type:"text",size:"small"},on:{click:function(){n.handle()}}},[e("span",{style:{color:"#39f"}},n.name)]))}),e("div",t)}}],responseHandle:function(e,n){return null!==e.data&&e.data.map(function(e){var n=(new Date).getTime().toString().substring(0,10);return 0!==e.start_time&&n-e.start_time>0&&n-e.end_time<0?e.isShow="<p>是</p>":e.isShow="<p>否</p>",e}),e},searchConditionHandle:function(e){return e[e.select]=e.keyword,e.region&&(e.province_id=e.region[0],e.city_id=e.region[1]),e},searchCondition:{name:"",region:[],province_id:0,city_id:0}}},methods:{handlePageInfoSuccess:function(e){var n=[];for(var t in e.data.filter.regions){var a=e.data.filter.regions[t],i={value:a.area_code,label:a.name,children:[]};for(var o in a.cities){var s=a.cities[o],r={value:s.area_code,label:s.name,children:[]};i.children.push(r)}n.push(i)}e.data.filter.regions=n,this.regions=n}}}}});