webpackJsonp([241],{iqsD:function(o,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"app",data:function(){return{addRoute:"/education/school/comment/add/"+this.$route.params.schoolId,api:{path:"/boss/education/school/school-comment/find-list",params:{fields:'{id,school_id,uid,content,create_time,user{user_name},images{s(w:80,h:80){url(protocol:"https"),width,height}}}}',schoolId:this.$route.params.schoolId}},pageInfoApi:{path:"/boss/education/school/school-comment/list-page-info",params:{schoolId:this.$route.params.schoolId}},columns:[{title:"评价id",key:"id"},{title:"用户昵称",key:"user",render:function(o,t){var e="";try{e=t.row.user.user_name}catch(o){e="无昵称"}return o("span",e)}},{title:"评价内容",key:"content"},{title:"操作",key:"action",render:function(o,t){return o("div",[o("i-button",{props:{type:"text",size:"small"},on:{click:function(){location.hash="/education/school/comment/edit/"+t.row.school_id+"/"+t.row.id}}},[o("span",{style:{color:"#39f"}},"编辑")]),o("i-button",{props:{type:"text",size:"small"},on:{click:function(){if(confirm("确认删除?")){var o={api:{path:"/boss/education/school/school-comment/delete",params:{id:t.row.id}}};bus.$emit("on-loading"),vm.$Util.api.delete(o,vm).then(function(o){location.reload()},function(o){})}}}},[o("span",{style:{color:"#39f"}},"删除")])])}}],methods:{},responseHandle:function(o,t){return o}}}}},j3aT:function(o,t,e){var n=e("VU/8")(e("iqsD"),e("rwJh"),null,null);o.exports=n.exports},rwJh:function(o,t){o.exports={render:function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("m-page-list",{attrs:{path:o.api.path,params:o.api.params,columns:o.columns,methods:o.methods,"response-handle":o.responseHandle,"page-info-path":o.pageInfoApi.path,"page-info-params":o.pageInfoApi.params}},[e("m-action-bar",[e("m-action-button-add",{attrs:{route:o.addRoute}})],1)],1)},staticRenderFns:[]}}});