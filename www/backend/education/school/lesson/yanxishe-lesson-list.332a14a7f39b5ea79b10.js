webpackJsonp([238],{"+We/":function(o,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={resource:{api:{path:"/boss/education/school/lesson/find-location-and-school-info",params:{fields:"{name,location{province,city,district,address,summary}}",schoolId:0}}}};t.default={name:"app",data:function(){return{location:"",api:{path:"/boss/education/school/lesson/find-yanxishe-lesson-list",params:{fields:"{id,school_id,title,start_time,end_time,days}",schoolId:this.$route.params.schoolId}},pageInfoApi:{path:"/boss/education/school/lesson/list-yanxishe-lesson-page-info",params:{schoolId:this.$route.params.schoolId}},regions:[],columns:[{title:"课程ID",key:"id"},{title:"课程名称",key:"title"},{title:"是否线上显示",key:"isShow"},{title:"课程时长（天）",key:"days"},{title:"操作",key:"action",render:function(o,t){var e=[];return[{name:"查看每日统计",handle:function(){location.hash="/education/school/lesson/yanxishe-lesson-daily-info-list/"+t.row.id}}].map(function(t){e.push(o("i-button",{props:{type:"text",size:"small"},on:{click:function(){t.handle()}}},[o("span",{style:{color:"#39f"}},t.name)]))}),o("div",e)}}],searchCondition:{name:"",region:[],province_id:0,city_id:0}}},methods:{back:function(){location.hash="/education/school/school/yanxishe-list"},responseHandle:function(o){return null!==o.data&&o.data.map(function(o){var t=(new Date).getTime().toString().substring(0,10);return 0!==o.start_time&&t-o.start_time>0&&t-o.end_time<0?o.isShow="<p>是</p>":o.isShow="<p>否</p>",o}),o},loadResource:function(){bus.$emit("on-loading");var o=this;this.$Util.api.get(n.resource,o).then(function(o){bus.$emit("on-loading"),this.location=o.data.location.province+" "+o.data.location.city+" "+o.data.location.summary+" "+o.data.name},function(t){bus.$emit("on-loading"),o.$Message.warning("加载资源失败")})}},created:function(){this.$nextTick(function(){this.loadResource()}),n.resource.api.params.schoolId=this.$route.params.schoolId}}},UK03:function(o,t,e){var n=e("VU/8")(e("+We/"),e("UMeg"),null,null);o.exports=n.exports},UMeg:function(o,t){o.exports={render:function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("m-page-list",{attrs:{path:o.api.path,params:o.api.params,columns:o.columns,methods:o.methods,"response-handle":o.responseHandle,"page-info-path":o.pageInfoApi.path,"page-info-params":o.pageInfoApi.params}},[e("m-action-bar",[e("i-button",{on:{click:o.back}},[o._v("返回")])],1),o._v(" "),e("p",[o._v("当前："+o._s(o.location)+"\n    ")])],1)},staticRenderFns:[]}}});