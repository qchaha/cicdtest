webpackJsonp([134],{"+emb":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("m-page-edit",{attrs:{"is-loading":t.loadingState}},[a("m-custom-system-blacklist-form",{attrs:{usage:"edit",id:t.id},on:{loading:t.changeLoadingState}})],1)},staticRenderFns:[]}},JZeW:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"padding-top":"20px"}},[a("i-button",{attrs:{type:"primary"},on:{click:t.back}},[t._v("返回")]),t._v(" "),a("Form",{ref:"formDynamic",attrs:{model:t.formDynamic,"label-width":80}},[a("Card",[a("h3",[t._v("过滤的消息范围")]),t._v(" "),"add"===t.usage?a("Form-item",[a("Row",[a("Col",{attrs:{span:"6"}},[a("Checkbox-group",{model:{value:t.formDynamic.from_types,callback:function(e){t.$set(t.formDynamic,"from_types",e)},expression:"formDynamic.from_types"}},[a("Checkbox",{attrs:{label:1}},[t._v("客服")]),t._v(" "),a("Checkbox",{attrs:{label:2}},[t._v("用户")])],1)],1)],1)],1):t._e(),t._v(" "),"edit"===t.usage?a("Form-item",[a("Row",[a("Col",{attrs:{span:"6"}},[a("Select",{staticStyle:{width:"200px"},model:{value:t.formDynamic.from_type,callback:function(e){t.$set(t.formDynamic,"from_type",e)},expression:"formDynamic.from_type"}},t._l(t.from_types,function(e,i){return a("Option",{key:i,attrs:{value:e.value}},[t._v(t._s(e.text)+"\n\n\n                        ")])}))],1)],1)],1):t._e()],1),t._v(" "),a("Card",[a("h3",[t._v("过滤的消息内容")]),t._v(" "),t._l(t.formDynamic.items,function(e,i){return a("Form-item",[a("Row",[a("Col",{attrs:{span:"18"}},[a("Select",{staticStyle:{width:"200px"},model:{value:e.chat_type,callback:function(a){t.$set(e,"chat_type",a)},expression:"item.chat_type"}},t._l(t.chat_types,function(e,i){return a("Option",{key:i,attrs:{value:e.value}},[t._v(t._s(e.text)+"\n\n\n                        ")])})),t._v(" "),a("Input",{attrs:{type:"text",placeholder:"请填写消息包含的关键词"},model:{value:e.keyword,callback:function(a){t.$set(e,"keyword",a)},expression:"item.keyword"}})],1),t._v(" "),a("Col",{attrs:{span:"4",offset:"1"}},["add"===t.usage?a("Button",{attrs:{type:"ghost"},on:{click:function(e){t.handleRemove(i)}}},[t._v("删除")]):t._e()],1)],1)],1)}),t._v(" "),"add"===t.usage?a("Form-item",[a("Row",[a("Col",{attrs:{span:"6"}},[a("Button",{attrs:{type:"dashed",long:"",icon:"plus-round"},on:{click:t.handleAdd}},[t._v("新增")])],1)],1)],1):t._e()],2),t._v(" "),a("Form-item",[a("Button",{attrs:{type:"primary"},on:{click:function(e){t.handleSubmit("formDynamic")}}},[t._v("提交")]),t._v(" "),a("Button",{staticStyle:{"margin-left":"8px"},attrs:{type:"ghost"},on:{click:function(e){t.handleReset("formDynamic")}}},[t._v("重置")])],1)],1)],1)},staticRenderFns:[]}},Mmse:function(t,e,a){var i=a("VU/8")(a("f0YT"),a("JZeW"),null,null);t.exports=i.exports},WNMP:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Mmse"),n=a.n(i);e.default={name:"app",components:{MCustomSystemBlacklistForm:n.a},data:function(){return{id:this.$route.params.id,loadingState:!1}},methods:{changeLoadingState:function(){this.loadingState=!this.loadingState}}}},f0YT:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=[{value:1,text:"非咨询"},{value:2,text:"售后"}],n=[{value:1,text:"客服"},{value:2,text:"用户"}],s={create:{api:{path:"/boss/mall/admin/customSystem/blacklist/create"}},update:{api:{path:"/boss/mall/admin/customSystem/blacklist/update"}},find:{api:{path:"/boss/mall/admin/customSystem/blacklist/find",params:{fields:"{id,from_type,chat_type,keyword,create_time,admin_id}",id:0}},responseHandle:function(t){return t}}};e.default={name:"MCustomSystemBlacklistForm",props:{id:{type:String,default:""},usage:{type:String,default:"add"}},data:function(){return{chat_types:i,from_types:n,formDynamic:{from_type:"",from_types:[],items:[{from_type:"",chat_type:"",keyword:""}]}}},methods:{handleSubmit:function(t){if(this.validateFormData()){var e=this.getRequestParams(),a=s.create;"edit"===this.usage&&(a=s.update),this.submitRequest(e,a)}},handleReset:function(t){this.$refs[t].resetFields()},handleAdd:function(){this.formDynamic.items.push({value:""})},handleRemove:function(t){this.formDynamic.items.splice(t,1)},back:function(){location.hash="/mall/admin/custom-system-blacklist/list"},validateFormData:function(){return""==this.formDynamic.from_type?(this.$Notice.warning({title:"消息范围不能为空",desc:""}),!1):""!=this.formDynamic.items||(this.$Notice.warning({title:"消息范围不能为空",desc:""}),!1)},getRequestParams:function(){return{id:this.id,from_type:this.formDynamic.from_type,from_types:this.formDynamic.from_types,items:this.formDynamic.items}},submitRequest:function(t,e){bus.$emit("on-loading");var a=this;this.$Util.api.post(e,t,a).then(function(t){a.$Notice.success({title:"请求成功",desc:""}),a.back()},function(t){bus.$emit("on-loading"),a.$Notice.warning({title:"请求失败",desc:t.error_message})})},loadEditFormData:function(t){s.find.api.params.id=t;var e=this;this.$Util.api.get(s.find,this).then(function(t){if(bus.$emit("on-loading"),!t.data)return e.$Message.warning("数据有误"),!1;e.formDynamic.items[0]=t.data,e.formDynamic.items[0].chat_type=parseInt(t.data.chat_type),e.formDynamic.from_type=parseInt(t.data.from_type)},function(t){bus.$emit("on-loading"),e.$Notice.warning({title:"加载资源失败",desc:""})})}},created:function(){this.$nextTick(function(){"edit"===this.usage?(bus.$emit("on-loading"),this.loadEditFormData(this.id)):this.formDynamic.from_type=[1,2]})}}},"gK/Y":function(t,e,a){var i=a("VU/8")(a("WNMP"),a("+emb"),null,null);t.exports=i.exports}});