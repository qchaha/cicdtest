webpackJsonp([256],{"2n6A":function(e,t,o){var s=o("VU/8")(o("pD0F"),o("e915"),null,null);e.exports=s.exports},e915:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("m-page-list",{attrs:{path:e.api.path,params:e.api.params,columns:e.columns,methods:e.methods,"response-handle":e.responseHandle,"page-info-path":e.pageInfoApi.path,"page-info-params":e.pageInfoApi.params},on:{"on-page-info-success":e.handleListPageInfoSuccess}},[o("div",{style:{display:this.isCourseTagDetailList?"none":"block"},attrs:{id:"test"}},[o("m-action-bar",[o("m-action-button-add",{attrs:{route:e.addRoute}})],1)],1),e._v(" "),o("div",{style:{display:this.isCourseTagDetailList?"none":"block"}},[o("m-action-bar",{attrs:{slot:"search"},slot:"search"})],1),e._v(" "),o("div",{style:{display:this.isCourseTagDetailList?"block":"none"}},[o("m-action-bar",[o("m-form-item",{attrs:{label:""}},[o("Input",{staticStyle:{width:"150px"},attrs:{placeholder:"输入教程ID"},model:{value:e.courseTagIdToAdd,callback:function(t){e.courseTagIdToAdd=t},expression:"courseTagIdToAdd"}}),e._v(" "),o("Button",{attrs:{type:"primary"},on:{click:function(t){e.addCourseToTag(e.courseTagIdToAdd)}}},[e._v("添加到该专题")])],1)],1)],1)])},staticRenderFns:[]}},pD0F:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=null;t.default={name:"MCourseList",props:{courseTagId:{type:Number,default:0},usage:{type:String,default:"courseTagDetailList"},columns:{}},computed:{columns:function(){return[{title:"教程id",key:"id"},{title:"教程名",key:"title"},{title:"小组",key:"group",render:function(e,t){return e("span",void 0!==t.row.group.name?t.row.group.name:"")}},{title:"作者",key:"author",render:function(e,t){return e("span",void 0!==t.row.author.nickname?t.row.author.nickname:"")}},{title:"操作",key:"action",render:function(e,t){var o=function(){s.removeCourseFromTag(parseInt(t.row.id))};return e("div",[e("div",[e("i-button",{props:{type:"text",size:"small"}},[e("a",{style:{color:"#39f"},attrs:{href:t.row.sns_share_entity.link_url,target:"_blank"}},"浏览")]),e("i-button",{props:{type:"text",size:"small"}},[e("a",{style:{color:"#39f"},attrs:{href:"/admin.php?m=Admin&c=Course&a=edit&course_id="+t.row.id,target:"_blank"}},"编辑")])]),e("div",[e("i-button",{props:{type:"text",size:"small"},on:{click:o}},[e("span",{style:{color:"#39f"}},"从本专题移除")])])])}}]},isCourseTagDetailList:function(){return"courseTagDetailList"===this.usage}},data:function(){return{searchTypeSource:{},courseTagIdToAdd:"",searchCondition:{},addRoute:"/education/course/course/add",api:{path:"/boss/education/course/course/find-list",params:{fields:"{id,title,author{nickname},group,sns_share_entity}",courseTagId:this.courseTagId}},pageInfoApi:{path:"/boss/education/course/course/list-page-info",params:{courseTagId:this.courseTagId}},methods:{},responseHandle:function(e){return null===e.data&&(e.data=[]),e}}},methods:{removeCourseFromTag:function(e){if(confirm("确认移除?")){bus.$emit("on-loading");var t=this;vm.$Util.api.delete({api:{path:"/boss/education/course/course/remove-from-tag",params:{courseIds:[e],tagId:this.courseTagId}}},vm).then(function(){t.$Notice.success({title:"移出成功",desc:"页面即将刷新"}),setTimeout(function(){location.reload()},500)},function(e){bus.$emit("on-loading"),t.$Notice.error({title:"移出失败",desc:""})})}},addCourseToTag:function(e){if(!parseInt(e))return void this.$Notice.error({title:"请输入教程ID",desc:""});e=parseInt(e),bus.$emit("on-loading");var t=this,o={courseIds:[e],tagId:this.courseTagId};vm.$Util.api.post({api:{path:"/boss/education/course/course/add-to-tag"}},o,vm).then(function(){t.$Notice.success({title:"添加成功",desc:"页面即将刷新"}),location.reload()},function(e){bus.$emit("on-loading"),t.$Notice.error({title:"添加失败",desc:""})})}},created:function(){s=this}}}});