webpackJsonp([191],{"0ysZ":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={create:{api:{path:"/boss/UserAsset/DiamondCoin/diamond-coin-order/create"}}};e.default={name:"add",data:function(){return{formItem:{uid:"",transaction_id:"",product_id:"",create_time:""}}},methods:{back:function(){location.hash="/user-asset/diamond-coin/diamond-coin-order/list"},validateFormData:function(){return 0===this.formItem.uid.length||0===this.formItem.uid?(this.$Message.warning("请输入uid"),!1):0===this.formItem.transaction_id.length||0===this.formItem.transaction_id?(this.$Message.warning("请输入transaction_id"),!1):0===this.formItem.product_id.length||0===this.formItem.product_id?(this.$Message.warning("请输入product_id"),!1):""!==this.formItem.create_time||(this.$Message.warning("时间不能为空"),!1)},getRequestParams:function(){return{uid:this.formItem.uid,transaction_id:this.formItem.transaction_id,product_id:this.formItem.product_id,create_time:this.formItem.create_time.getTime()/1e3}},submit:function(){if(this.validateFormData()){var t=this.getRequestParams();this.submitRequest(t)}},submitRequest:function(t){bus.$emit("on-loading");var e=this,i=a.create;this.$Util.api.post(i,t,e).then(function(){e.$Message.success("请求成功"),e.back()},function(t){bus.$emit("on-loading"),e.$Message.warning("请求失败")})}}}},"H2u/":function(t,e,i){var a=i("VU/8")(i("0ysZ"),i("lH5A"),null,null);t.exports=a.exports},lH5A:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("m-page",[i("m-card",[i("div",{staticStyle:{"padding-top":"20px"}},[i("h4",[t._v("这里只负责苹果内购的订单创建，针对掉单情况")]),t._v(" "),i("Form",{attrs:{model:t.formItem,"label-width":100}},[i("Form-item",{attrs:{label:"uid"}},[i("Input",{staticStyle:{width:"300px"},attrs:{maxlength:50,placeholder:"请输入uid"},model:{value:t.formItem.uid,callback:function(e){t.$set(t.formItem,"uid",e)},expression:"formItem.uid"}})],1),t._v(" "),i("Form-item",{attrs:{label:"transaction_id"}},[i("Input",{staticStyle:{width:"300px"},attrs:{maxlength:50,placeholder:"请输入transaction_id"},model:{value:t.formItem.transaction_id,callback:function(e){t.$set(t.formItem,"transaction_id",e)},expression:"formItem.transaction_id"}})],1),t._v(" "),i("Form-item",{attrs:{label:"product_id"}},[i("Input",{staticStyle:{width:"300px"},attrs:{maxlength:50,placeholder:"请输入product_id"},model:{value:t.formItem.product_id,callback:function(e){t.$set(t.formItem,"product_id",e)},expression:"formItem.product_id"}})],1),t._v(" "),i("Form-item",{attrs:{label:"支付时间"}},[i("Row",[i("i-col",{staticStyle:{width:"300px"}},[i("Date-picker",{attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm",placeholder:"选择支付时间"},model:{value:t.formItem.create_time,callback:function(e){t.$set(t.formItem,"create_time",e)},expression:"formItem.create_time"}})],1)],1)],1),t._v(" "),i("Form-item",[i("i-button",{attrs:{type:"primary"},nativeOn:{click:function(e){return t.submit(e)}}},[t._v("提交")]),t._v(" "),i("i-button",{staticStyle:{"margin-left":"8px"},attrs:{type:"ghost"},nativeOn:{click:function(e){return t.back(e)}}},[t._v("取消")])],1)],1)],1)])],1)},staticRenderFns:[]}}});