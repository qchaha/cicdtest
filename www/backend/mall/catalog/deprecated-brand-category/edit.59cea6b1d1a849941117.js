webpackJsonp([115],{"1NnM":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"padding-top":"20px"}},[a("Form",{ref:"formItem",attrs:{model:t.formItem,"label-width":120,rules:t.ruleValidate}},[a("Form-item",{attrs:{label:"品牌分类名称",prop:"bcate_name"}},[a("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"品牌分类名称"},model:{value:t.formItem.bcate_name,callback:function(e){t.$set(t.formItem,"bcate_name",e)},expression:"formItem.bcate_name"}})],1),t._v(" "),a("Form-item",{staticStyle:{"margin-top":"10px"}},[a("i-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("提交")]),t._v(" "),a("i-button",{staticStyle:{"margin-left":"8px"},attrs:{type:"ghost"},on:{click:t.back}},[t._v("取消")])],1)],1)],1)},staticRenderFns:[]}},"8VWK":function(t,e,a){var i=a("VU/8")(a("dQ/o"),a("bJiL"),null,null);t.exports=i.exports},"J/uy":function(t,e,a){var i=a("VU/8")(a("Yjow"),a("1NnM"),null,null);t.exports=i.exports},Yjow:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={create:{api:{path:"/boss/mall/catalog/deprecated-brand-category/create"}},update:{api:{path:"/boss/mall/catalog/deprecated-brand-category/update"}},find:{api:{path:"/boss/mall/catalog/deprecated-brand-category/find",params:{fields:"{bcate_id,bcate_name,sort_order,create_time,update_time}",id:0}},responseHandle:function(t){return t}},resource:{api:{path:"/boss/mall/catalog/deprecated-brand-category/add-page-info",params:{fields:"{}"}},responseHandle:function(t){return t}}};e.default={name:"MBrandCategoryForm",props:{id:{type:String,default:""},usage:{type:String,default:"edit"}},data:function(){return{formItem:{id:0,bcate_name:""},ruleValidate:{bcate_name:[{required:!0,message:"品牌分类不能为空",trigger:"blur"}]}}},methods:{back:function(){location.hash="/mall/catalog/deprecated-brand-category/list"},submit:function(){var t=this;this.$refs.formItem.validate(function(e){if(e){if(!t.validateFormData())return;var a=t.getRequestParams(),n=i.create;"edit"===t.usage&&(n=i.update),t.submitRequest(a,n)}else t.$Message.error("表单验证失败!")})},validateFormData:function(){return!0},getRequestParams:function(){return{id:this.formItem.id,bcate_name:this.formItem.bcate_name}},submitRequest:function(t,e){bus.$emit("on-loading");var a=this;this.$Util.api.post(e,t,a).then(function(t){a.$Notice.success({title:"请求成功",desc:""}),a.back()},function(t){bus.$emit("on-loading"),a.$Notice.warning({title:"请求失败",desc:""})})},loadResource:function(){var t=this;"edit"===t.usage&&t.$nextTick(function(){t.loadBrandCategory()})},loadBrandCategory:function(){bus.$emit("on-loading");var t=this;this.$Util.api.get(i.find,t).then(function(t){bus.$emit("on-loading"),this.formItem.id=t.data.bcate_id,this.formItem.bcate_name=t.data.bcate_name},function(e){bus.$emit("on-loading"),t.$Notice.warning({title:"加载详情失败",desc:""})})},initIds:function(){if("edit"===this.usage){var t=this.id;if(!parseInt(t))return alert("id格式有误"),!1;t=parseInt(t),this.formItem.id=t,i.find.api.params.id=t}}},created:function(){this.initIds(),"edit"===this.usage&&(i.resource.api.path="/boss/mall/catalog/deprecated-brand-category/edit-page-info"),this.$nextTick(function(){this.loadResource()})}}},bJiL:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("m-page-edit",{attrs:{"is-loading":t.loadingState}},[a("m-brandCategory-form",{attrs:{usage:"edit",id:t.id},on:{loading:t.changeLoadingState}})],1)},staticRenderFns:[]}},"dQ/o":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("J/uy"),n=a.n(i);e.default={name:"app",components:{MBrandCategoryForm:n.a},data:function(){return{id:this.$route.params.id,loadingState:!1}},methods:{changeLoadingState:function(){this.loadingState=!this.loadingState}}}}});