webpackJsonp([100],{"56lv":function(t,e,i){var a=i("VU/8")(i("xdyg"),i("FnmW"),null,null);t.exports=a.exports},Fiij:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("56lv"),o=i.n(a);e.default={name:"app",components:{MCoinForm:o.a},data:function(){return{id:this.$route.params.id}}}},FnmW:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{"padding-top":"20px"}},[i("Form",{ref:"formItem",attrs:{model:t.formItem,"label-width":60,rules:t.ruleValidate}},[i("Form-item",{attrs:{label:"按UID发放",prop:"uid"}},[i("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"多个UID以英文逗号隔开",disabled:"edit"==t.usage},model:{value:t.formItem.uid,callback:function(e){t.$set(t.formItem,"uid",e)},expression:"formItem.uid"}})],1),t._v(" "),"add"!==t.usage?i("Form-item",{attrs:{label:"扣除的原因标题",prop:"title"}},[i("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"扣除的原因标题"},model:{value:t.formItem.title,callback:function(e){t.$set(t.formItem,"title",e)},expression:"formItem.title"}})],1):t._e(),t._v(" "),"add"!==t.usage?i("Form-item",{attrs:{label:"扣除的原因描述",prop:"desc"}},[i("Input",{staticStyle:{width:"300px"},attrs:{type:"textarea",autosize:{minRows:5,maxRows:10},placeholder:"扣除的原因描述"},model:{value:t.formItem.desc,callback:function(e){t.$set(t.formItem,"desc",e)},expression:"formItem.desc"}})],1):t._e(),t._v(" "),"add"!==t.usage?i("Form-item",{attrs:{label:"关联的金币收入ID",prop:"relate_id"}},[i("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"关联的金币收入ID",disabled:"edit"==t.usage},model:{value:t.formItem.relate_id,callback:function(e){t.$set(t.formItem,"relate_id",e)},expression:"formItem.relate_id"}}),t._v("\n            该关联已经扣除"+t._s(t.formItem.has_reduce)+"金币\n\n        ")],1):t._e(),t._v(" "),"add"===t.usage?i("Form-item",{attrs:{label:"发放的原因标题",prop:"title"}},[i("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"发放的原因标题"},model:{value:t.formItem.title,callback:function(e){t.$set(t.formItem,"title",e)},expression:"formItem.title"}})],1):t._e(),t._v(" "),"add"===t.usage?i("Form-item",{attrs:{label:"发放的原因描述",prop:"desc"}},[i("Input",{staticStyle:{width:"300px"},attrs:{type:"textarea",autosize:{minRows:5,maxRows:10},placeholder:"发放的原因描述"},model:{value:t.formItem.desc,callback:function(e){t.$set(t.formItem,"desc",e)},expression:"formItem.desc"}})],1):t._e(),t._v(" "),i("Form-item",{attrs:{label:"金币增减数量",prop:"amount"}},[i("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"金币增减数量"},model:{value:t.formItem.amount,callback:function(e){t.$set(t.formItem,"amount",e)},expression:"formItem.amount"}})],1),t._v(" "),i("Form-item",{attrs:{label:"发送小秘书通知用户",prop:"notice_uid"}},[i("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"发送小秘书通知用户"},model:{value:t.formItem.notice_uid,callback:function(e){t.$set(t.formItem,"notice_uid",e)},expression:"formItem.notice_uid"}})],1),t._v(" "),i("Form-item",{attrs:{label:"系统内通知跳转APP_ROUTE",prop:"notice_app_route"}},[i("m-app-route",{staticStyle:{width:"300px"},attrs:{placeholder:"系统内通知跳转APP_ROUTE"},on:{"on-ok":t.handleRoute},model:{value:t.formItem.notice_app_route,callback:function(e){t.$set(t.formItem,"notice_app_route",e)},expression:"formItem.notice_app_route"}})],1),t._v(" "),i("Form-item",[i("i-button",{attrs:{type:"primary",disabled:t.submitEnable},on:{click:function(e){t.handleSubmit("formItem")}}},[t._v("提交")]),t._v(" "),i("i-button",{staticStyle:{"margin-left":"8px"},attrs:{type:"ghost"},on:{click:t.back}},[t._v("取消")])],1)],1)],1)},staticRenderFns:[]}},YeF2:function(t,e,i){var a=i("VU/8")(i("Fiij"),i("jH38"),null,null);t.exports=a.exports},jH38:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("m-page-edit",[i("m-coin-form",{attrs:{usage:"edit",id:t.id}})],1)},staticRenderFns:[]}},xdyg:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={create:{api:{path:"/boss/userasset/coin/coin/create"}},find:{api:{path:"/boss/userasset/coin/coin/find",params:{fields:"{id,uid,obj_id,obj_type,amount,rest_amount,has_reduce,create_time,relate_id,title,desc}",id:0}},responseHandle:function(t){return t}},resource:{api:{path:"/boss/userasset/coin/coin/get-coin-config",params:{}}}};e.default={name:"MCoinForm",props:{id:{type:String,default:""},usage:{type:String,default:"add"}},data:function(){return{formItem:{uid:"",title:"",desc:"",relate_id:"",amount:"",has_reduce:"",notice_uid:"",notice_app_route:""},submitEnable:!1,ruleValidate:{uid:[{required:!0,message:"UID不能为空",trigger:"blur"}],title:[{required:!0,message:"标题不能为空",trigger:"blur"}],amount:[{required:!0,message:"金币数不能为空",trigger:"blur"}]}}},methods:{back:function(){location.hash="/user-asset/coin/coin/list"},handleRoute:function(t){this.formItem.notice_app_route=t},handleSubmit:function(t){var e=this;bus.$emit("on-loading"),this.$refs[t].validate(function(t){if(t){if(!e.validateFormData())return void bus.$emit("on-loading");var i=e;e.getCoinConfig(function(t){var e=!0;if(Math.abs(i.formItem.amount)>=10*t.data.exchange_rate&&(e=confirm("发放金币数大于等于￥10.00哦~")),e){var a=i.getRequestParams();i.submitRequest(a)}else bus.$emit("on-loading"),i.$Message.error("表单验证失败!")})}else bus.$emit("on-loading"),e.$Message.error("表单验证失败!")})},validateFormData:function(){return""===this.formItem.uid?(this.$Notice.warning({title:"UID不能为空",desc:""}),!1):""===this.formItem.title?(this.$Notice.warning({title:"标题不能为空",desc:""}),!1):""===this.formItem.amount?(this.$Notice.warning({title:"金币数不能为空",desc:""}),!1):"add"===this.usage&&this.formItem.amount<=0&&Math.floor(this.formItem.amount)==this.formItem.amount?(this.$Notice.warning({title:"金币数不能为负数",desc:""}),!1):!("add"!==this.usage&&this.formItem.amount>=0&&Math.floor(this.formItem.amount)==this.formItem.amount)||(this.$Notice.warning({title:"金币数不能为正数",desc:""}),!1)},getCoinConfig:function(t){var e=this;this.$Util.api.get(a.resource,e).then(function(e){t(e)},function(){})},getRequestParams:function(){return{uid:this.formItem.uid,title:this.formItem.title,desc:this.formItem.desc,relate_id:this.formItem.relate_id,amount:this.formItem.amount,notice_uid:this.formItem.notice_uid,notice_app_route:this.formItem.notice_app_route,type:this.usage}},submitRequest:function(t){this.submitEnable=!1;var e={};e=a.create,e.exceptionHandle=function(t,e){i.$Message.error(e),bus.$emit("on-loading")};var i=this;this.$Util.api.post(e,t,i).then(function(){i.$Message.success("提交成功!"),i.back()},function(){})},loadEditFormData:function(t){a.find.api.params.id=t;var e=this;this.$Util.api.get(a.find,this).then(function(t){if(bus.$emit("on-loading"),!t.data)return e.$Message.warning("数据不存在"),!1;e.submitEnable=!1,e.formItem=t.data,e.formItem.amount="",e.formItem.uid=t.data.uid+"",e.formItem.notice_uid="",e.formItem.notice_app_route="",e.formItem.relate_id=e.id},function(t){})}},created:function(){var t=this;this.$nextTick(function(){if("edit"===t.usage){bus.$emit("on-loading");var e=t.id;if(this.loadEditFormData(e),t.formItem.relate_id=e,!parseInt(t.formItem.relate_id))return alert("id格式有误"),!1}})}}}});