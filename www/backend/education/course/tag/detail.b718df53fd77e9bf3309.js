webpackJsonp([156,256],{"2n6A":function(t,e,a){var o=a("VU/8")(a("pD0F"),a("e915"),null,null);t.exports=o.exports},Et60:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("2n6A"),s=a.n(o),i={find:{api:{path:"/boss/education/course/tag/find",params:{fields:"{id, name, desc, cover{s(w:400){url,origin,origin_width,origin_height}},all_courses{id},in_course_project,in_video_course}",id:0}}}};e.default={name:"APP",components:{MCourseList:s.a},props:{id:{type:String,default:""},usage:{type:String,default:""}},data:function(){return{formData:{id:0,name:"",desc:"",imageUrl:"",courseCount:0}}},methods:{back:function(){location.hash="/education/course/tag/list"},loadTag:function(){bus.$emit("on-loading");var t=this;this.$Util.api.get(i.find,t).then(function(e){bus.$emit("on-loading"),t.formData.name=e.data.name,t.formData.desc=e.data.desc,t.formData.imageUrl=e.data.cover.s.url,t.formData.courseCount=e.data.all_courses.length},function(e){bus.$emit("on-loading"),t.$Message.warning("加载课程详情失败")})},initIds:function(){var t=this.$route.params.id;if(!parseInt(t))return alert("标签id格式有误"),!1;t=parseInt(t),this.formData.id=t,i.find.api.params.id=t}},created:function(){this.initIds(),this.$nextTick(function(){this.loadTag()})}}},Uvpn:function(t,e,a){var o=a("VU/8")(a("Et60"),a("mVNg"),null,null);t.exports=o.exports},e915:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("m-page-list",{attrs:{path:t.api.path,params:t.api.params,columns:t.columns,methods:t.methods,"response-handle":t.responseHandle,"page-info-path":t.pageInfoApi.path,"page-info-params":t.pageInfoApi.params},on:{"on-page-info-success":t.handleListPageInfoSuccess}},[a("div",{style:{display:this.isCourseTagDetailList?"none":"block"},attrs:{id:"test"}},[a("m-action-bar",[a("m-action-button-add",{attrs:{route:t.addRoute}})],1)],1),t._v(" "),a("div",{style:{display:this.isCourseTagDetailList?"none":"block"}},[a("m-action-bar",{attrs:{slot:"search"},slot:"search"})],1),t._v(" "),a("div",{style:{display:this.isCourseTagDetailList?"block":"none"}},[a("m-action-bar",[a("m-form-item",{attrs:{label:""}},[a("Input",{staticStyle:{width:"150px"},attrs:{placeholder:"输入教程ID"},model:{value:t.courseTagIdToAdd,callback:function(e){t.courseTagIdToAdd=e},expression:"courseTagIdToAdd"}}),t._v(" "),a("Button",{attrs:{type:"primary"},on:{click:function(e){t.addCourseToTag(t.courseTagIdToAdd)}}},[t._v("添加到该专题")])],1)],1)],1)])},staticRenderFns:[]}},mVNg:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"padding-top":"20px"}},[a("Form",{attrs:{model:t.formData,"label-width":60}},[a("Form-item",{attrs:{label:"专题名称"}},[t._v("\n            "+t._s(t.formData.name)+"\n\n        ")]),t._v(" "),a("Form-item",{attrs:{label:"专题描述"}},[t._v("\n            "+t._s(t.formData.desc)+"\n\n        ")]),t._v(" "),a("Form-item",{attrs:{label:"封面图"}},[a("img",{staticStyle:{"max-width":"300px","max-height":"300px"},attrs:{src:t.formData.imageUrl}})]),t._v(" "),a("Form-item",{attrs:{label:"包含教程"}},[t._v("\n            "+t._s(t.formData.courseCount)+"个\n        ")])],1),t._v(" "),a("div",[a("MCourseList",{attrs:{courseTagId:t.formData.id,usage:"courseTagDetailList"}})],1)],1)},staticRenderFns:[]}},pD0F:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=null;e.default={name:"MCourseList",props:{courseTagId:{type:Number,default:0},usage:{type:String,default:"courseTagDetailList"},columns:{}},computed:{columns:function(){return[{title:"教程id",key:"id"},{title:"教程名",key:"title"},{title:"小组",key:"group",render:function(t,e){return t("span",void 0!==e.row.group.name?e.row.group.name:"")}},{title:"作者",key:"author",render:function(t,e){return t("span",void 0!==e.row.author.nickname?e.row.author.nickname:"")}},{title:"操作",key:"action",render:function(t,e){var a=function(){o.removeCourseFromTag(parseInt(e.row.id))};return t("div",[t("div",[t("i-button",{props:{type:"text",size:"small"}},[t("a",{style:{color:"#39f"},attrs:{href:e.row.sns_share_entity.link_url,target:"_blank"}},"浏览")]),t("i-button",{props:{type:"text",size:"small"}},[t("a",{style:{color:"#39f"},attrs:{href:"/admin.php?m=Admin&c=Course&a=edit&course_id="+e.row.id,target:"_blank"}},"编辑")])]),t("div",[t("i-button",{props:{type:"text",size:"small"},on:{click:a}},[t("span",{style:{color:"#39f"}},"从本专题移除")])])])}}]},isCourseTagDetailList:function(){return"courseTagDetailList"===this.usage}},data:function(){return{searchTypeSource:{},courseTagIdToAdd:"",searchCondition:{},addRoute:"/education/course/course/add",api:{path:"/boss/education/course/course/find-list",params:{fields:"{id,title,author{nickname},group,sns_share_entity}",courseTagId:this.courseTagId}},pageInfoApi:{path:"/boss/education/course/course/list-page-info",params:{courseTagId:this.courseTagId}},methods:{},responseHandle:function(t){return null===t.data&&(t.data=[]),t}}},methods:{removeCourseFromTag:function(t){if(confirm("确认移除?")){bus.$emit("on-loading");var e=this;vm.$Util.api.delete({api:{path:"/boss/education/course/course/remove-from-tag",params:{courseIds:[t],tagId:this.courseTagId}}},vm).then(function(){e.$Notice.success({title:"移出成功",desc:"页面即将刷新"}),setTimeout(function(){location.reload()},500)},function(t){bus.$emit("on-loading"),e.$Notice.error({title:"移出失败",desc:""})})}},addCourseToTag:function(t){if(!parseInt(t))return void this.$Notice.error({title:"请输入教程ID",desc:""});t=parseInt(t),bus.$emit("on-loading");var e=this,a={courseIds:[t],tagId:this.courseTagId};vm.$Util.api.post({api:{path:"/boss/education/course/course/add-to-tag"}},a,vm).then(function(){e.$Notice.success({title:"添加成功",desc:"页面即将刷新"}),location.reload()},function(t){bus.$emit("on-loading"),e.$Notice.error({title:"添加失败",desc:""})})}},created:function(){o=this}}}});