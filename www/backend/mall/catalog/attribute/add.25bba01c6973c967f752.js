webpackJsonp([121],{"5iCF":function(t,e,a){var i=a("VU/8")(a("Ginr"),a("70fA"),null,null);t.exports=i.exports},"70fA":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("m-page-edit",{attrs:{"is-loading":t.loadingState}},[a("m-attribute-form",{attrs:{usage:"add"},on:{loading:t.changeLoadingState}})],1)},staticRenderFns:[]}},Ginr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("XUGK"),r=a.n(i);e.default={name:"app",components:{MAttributeForm:r.a},data:function(){return{loadingState:!1}},methods:{changeLoadingState:function(){this.loadingState=!this.loadingState}}}},XUGK:function(t,e,a){var i=a("VU/8")(a("Z5wy"),a("eRJT"),null,null);t.exports=i.exports},Z5wy:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=void 0,r={create:{api:{path:"/boss/mall/catalog/attribute/create"}},update:{api:{path:"/boss/mall/catalog/attribute/update"}},find:{api:{path:"/boss/mall/catalog/attribute/find",params:{fields:"{code,name,type,items,filter,can_search,is_show,update_time}",code:""}},responseHandle:function(t){return t}},resource:{api:{path:"/boss/mall/catalog/attribute/add-page-info",params:{fields:"{}"}},responseHandle:function(t){return t}}};e.default={name:"MAttributeForm",props:{id:{type:String,default:""},usage:{type:String,default:"edit"}},data:function(){return{formItem:{code:"",name:"",items:"",filter:0,can_search:0,is_show:0,type:1},defaultIcon:[],attributeInfo:[],ruleValidate:{code:[{required:!0,message:"不能为空",trigger:"blur"},{type:"string",max:30,message:"不能超过30字",trigger:"change"}],name:[{required:!0,message:"不能为空",trigger:"blur"},{type:"string",max:20,message:"不能超过20字",trigger:"change"}],items:[{required:!0,message:"不能为空",trigger:"blur"},{type:"string",max:500,message:"不能超过500字",trigger:"change"}],filter:[{required:!0,message:"不能为空",trigger:"blur"}],can_search:[{required:!0,message:"不能为空",trigger:"blur"}],is_show:[{required:!0,message:"不能为空",trigger:"blur"}]}}},methods:{back:function(){location.hash="/mall/catalog/attribute/list"},submit:function(){var t=this;this.$refs.formItem.validate(function(e){if(e){if(!t.validateFormData())return;var a=t.getRequestParams(),i=r.create;"edit"===t.usage&&(i=r.update),t.submitRequest(a,i)}else t.$Message.error("表单验证失败!")})},validateFormData:function(){return!0},getRequestParams:function(){return this.formItem},submitRequest:function(t,e){bus.$emit("on-loading");var a=this;this.$Util.api.post(e,t,a).then(function(t){a.$Notice.success({title:"请求成功",desc:""}),a.back()},function(t){bus.$emit("on-loading"),a.$Notice.warning({title:"请求失败",desc:""})})},loadResource:function(){"edit"===i.usage&&i.$nextTick(function(){i.loadEditData()})},loadEditData:function(){bus.$emit("on-loading");var t=this;this.$Util.api.get(r.find,t).then(function(e){bus.$emit("on-loading"),t.formItem=e.data,t.formItem.items=JSON.stringify(t.formItem.items,null,2)},function(e){bus.$emit("on-loading"),t.$Notice.warning({title:"加载详情失败",desc:""})})},initIds:function(){if("edit"===this.usage){var t=this.id;this.formItem.code=t,r.find.api.params.code=t}}},created:function(){i=this,this.initIds(),"edit"===this.usage&&(r.resource.api.path="/boss/mall/catalog/attribute/edit-page-info"),this.$nextTick(function(){this.loadResource()})}}},eRJT:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"padding-top":"20px"}},[a("Form",{ref:"formItem",attrs:{model:t.formItem,"label-width":80,rules:t.ruleValidate}},[a("Form-item",{attrs:{label:"商品参数编码",prop:"code"}},[a("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"商品参数编码",disabled:"edit"==this.usage},model:{value:t.formItem.code,callback:function(e){t.$set(t.formItem,"code",e)},expression:"formItem.code"}})],1),t._v(" "),a("Form-item",{attrs:{label:"商品参数",prop:"name"}},[a("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"商品参数"},model:{value:t.formItem.name,callback:function(e){t.$set(t.formItem,"name",e)},expression:"formItem.name"}})],1),t._v(" "),a("Form-item",{attrs:{label:"商品参数值",prop:"items"}},[a("Input",{staticStyle:{width:"500px"},attrs:{type:"textarea",autosize:{minRows:6,maxRows:10},placeholder:"商品参数值"},model:{value:t.formItem.items,callback:function(e){t.$set(t.formItem,"items",e)},expression:"formItem.items"}})],1),t._v(" "),a("Form-item",{attrs:{label:"是否筛选项"}},[a("Radio-group",{model:{value:t.formItem.filter,callback:function(e){t.$set(t.formItem,"filter",e)},expression:"formItem.filter"}},[a("Radio",{attrs:{label:"0"}},[t._v("否")]),t._v(" "),a("Radio",{attrs:{label:"1"}},[t._v("是")])],1)],1),t._v(" "),a("Form-item",{attrs:{label:"是否搜索项"}},[a("Radio-group",{model:{value:t.formItem.can_search,callback:function(e){t.$set(t.formItem,"can_search",e)},expression:"formItem.can_search"}},[a("Radio",{attrs:{label:"0"}},[t._v("否")]),t._v(" "),a("Radio",{attrs:{label:"1"}},[t._v("是")])],1)],1),t._v(" "),a("Form-item",{attrs:{label:"是否展示在商品参数"}},[a("Radio-group",{model:{value:t.formItem.is_show,callback:function(e){t.$set(t.formItem,"is_show",e)},expression:"formItem.is_show"}},[a("Radio",{attrs:{label:"0"}},[t._v("否")]),t._v(" "),a("Radio",{attrs:{label:"1"}},[t._v("是")])],1)],1),t._v(" "),a("Form-item",{attrs:{label:"单选/多选"}},[a("Radio-group",{model:{value:t.formItem.type,callback:function(e){t.$set(t.formItem,"type",e)},expression:"formItem.type"}},[a("Radio",{attrs:{label:"1"}},[t._v("单选")]),t._v(" "),a("Radio",{attrs:{label:"2"}},[t._v("多选")])],1)],1),t._v(" "),a("Form-item",[a("Button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("提交")]),t._v(" "),a("Button",{staticStyle:{"margin-left":"8px"},attrs:{type:"ghost"},on:{click:t.back}},[t._v("取消")])],1)],1)],1)},staticRenderFns:[]}}});