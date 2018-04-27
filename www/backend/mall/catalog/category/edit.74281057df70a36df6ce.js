webpackJsonp([60],{"+fZQ":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("eoW9"),r=a.n(i);t.default={name:"app",components:{MCategoryForm:r.a},data:function(){return{id:this.$route.params.id,loadingState:!1}},methods:{changeLoadingState:function(){this.loadingState=!this.loadingState}}}},GXfa:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("m-page",[a("Card",[a("p",{attrs:{slot:"title"},slot:"title"},[e._v("基本信息")]),e._v(" "),a("Button",{attrs:{slot:"extra",type:"primary"},on:{click:e.submit},slot:"extra"},[e._v("提交")]),e._v(" "),a("div",[a("Form",{ref:e.formRef,attrs:{model:e.category,rules:e.validateRules,"label-width":80}},["add"!==e.usage?a("Form-item",{attrs:{label:"ID"}},[a("span",[e._v(e._s(e.category.id))])]):e._e(),e._v(" "),a("FormItem",{attrs:{label:"品类层级","label-width":70,prop:"level"}},[a("Select",{attrs:{placeholder:"请选择",disabled:"edit"===e.usage},on:{"on-change":e.checkLevel},model:{value:e.category.level,callback:function(t){e.$set(e.category,"level",t)},expression:"category.level"}},e._l(e.levelOptions,function(t){return a("Option",{attrs:{value:t.value}},[e._v(e._s(t.label))])})),e._v(" "),a("p",[e._v("一级：用于统计；二级：用于营销；三级：用于关联商品和促销优惠")])],1),e._v(" "),e.showParentOption?a("FormItem",{staticClass:"required-input",attrs:{label:"所属父级品类","label-width":70}},[a("Select",{attrs:{placeholder:"请选择"},model:{value:e.category.parent_id,callback:function(t){e.$set(e.category,"parent_id",t)},expression:"category.parent_id"}},e._l(e.parentLevelOptions,function(t){return a("Option",{attrs:{value:t.id}},[e._v(e._s(t.name))])}))],1):e._e(),e._v(" "),a("Form-item",{attrs:{label:"品类名称",prop:"name"}},[a("Input",{staticClass:"fixed-width-input",attrs:{placeholder:"请输入品类名称"},model:{value:e.category.name,callback:function(t){e.$set(e.category,"name",t)},expression:"category.name"}}),e._v(" "),e.existsId?a("a",{staticClass:"input-tips",attrs:{target:"_blank",href:"#/mall/catalog/category/edit/"+e.existsId}},[e._v("查看同名品类")]):e._e()],1),e._v(" "),a("Form-item",{attrs:{label:"品类图片",prop:"image"}},[a("m-upload-image",{attrs:{"default-images":[{url:e.category.image}]},on:{"on-success":e.handleUploadSuccess}})],1),e._v(" "),a("Form-item",{attrs:{label:"品类推荐排序值",prop:"sort"}},[a("Input-number",{staticClass:"fixed-width-input",attrs:{placeholder:"请输入品类推荐排序值"},model:{value:e.category.sort,callback:function(t){e.$set(e.category,"sort",t)},expression:"category.sort"}})],1)],1)],1)],1)],1)},staticRenderFns:[]}},Pirh:function(e,t,a){var i=a("VU/8")(a("+fZQ"),a("uuRy"),null,null);e.exports=i.exports},SXWV:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"Edit",props:{id:{type:String,default:""},usage:{type:String,default:"add"}},data:function(){var e=this;return{category:{id:0,level:0,parent_id:0,name:"",image:"",sort:0,ratio_of_image:1},levelOptions:[{label:"一级",value:1},{label:"二级",value:2},{label:"三级",value:3}],parentLevelOptions:[],formRef:"baseForm",nameLastChangedAt:null,showParentOption:!1,existsId:0,detailApi:{api:{path:"/boss/mall/catalog/category/find",params:{id:0,fields:"{id,name,parent_id,level,image{origin},sort}"}}},findApi:{api:{path:"/boss/mall/catalog/category/find-list",params:{name:"",level:3,fields:"{id,name}"}}},findLevelApi:{api:{path:"/boss/mall/catalog/category/find-list",params:{level:1,fields:"{id,name}"}}},createApi:{api:{path:"/boss/mall/catalog/category/create"}},updateApi:{api:{path:"/boss/mall/catalog/category/update"}},validateRules:{level:[{type:"number",required:!0,message:"品类等级不能为空",trigger:"blur"}],name:[{required:!0,message:"品类名称不能为空",trigger:"blur"},{validator:function(t,a,i){e.existsId?i(new Error("与已有品类重名")):i()},trigger:"blur"}],image:[{required:!0,message:"图片不能为空",trigger:"change"}],sort:[{type:"number",required:!0,message:"品类排序不能为空",trigger:"blur"}]},loadTotal:2,loadedNum:0}},created:function(){var e=this,t=this;"edit"===t.usage&&(t.category.id=this.id,t.detailApi.api.params.id=this.id),this.$nextTick(function(){"edit"===t.usage&&(t.detailApi.api.params.id?(bus.$emit("on-loading"),t.loadDetail()):e.$Modal.error({width:260,title:"错误提示",content:"非法操作：缺少必要参数"}))})},watch:{loadedNum:function(){this.loadedNum>=this.loadTotal&&(bus.$emit("on-loading"),this.loadedNum=0)},"category.name":function(){this.existsId=0,this.nameLastChangedAt=(new Date).getTime(),this.category.name&&this.category.level&&setTimeout(this.isNameExists,1e3)},"category.level":function(){this.existsId=0,this.nameLastChangedAt=(new Date).getTime(),this.category.name&&this.category.level&&setTimeout(this.isNameExists,1e3)}},methods:{checkLevel:function(){var e=this,t=e.category.level;2===t||3===t?(bus.$emit("on-loading"),this.loadedNum+=1,e.showParentOption=!0,2===t?(e.findLevelApi.api.params.level=1,this.findParentLevelOptions()):(e.findLevelApi.api.params.level=2,this.findParentLevelOptions())):e.showParentOption=!1},findParentLevelOptions:function(){var e=this,t=this;this.$Util.api.get(this.findLevelApi,this).then(function(a){e.loadedNum+=1,t.parentLevelOptions=a.data},function(a){e.loadedNum+=1,t.alertErrorTips(a.message?a.message:"发生了未知的错误",300)})},loadDetail:function(){var e=this;this.$Util.api.get(this.detailApi,this).then(function(t){bus.$emit("on-loading"),e.category=t.data,e.category.image=t.data.image.origin,e.category.ratio_of_image=1},function(t){bus.$emit("on-loading"),e.alertErrorTips(t.message?t.message:"发生了未知的错误",300)})},alertErrorTips:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:250;this.$Modal.error({width:t,content:e})},handleUploadSuccess:function(e){this.category.image=e[0].url;var t=e.length>0?(e[0].width/e[0].height).toFixed(4):0;this.category.ratio_of_image=t},isNameExists:function(){(new Date).getTime()-1e3>=this.nameLastChangedAt&&this.findByNameAndLevel(this.category.name,this.category.level)},findByNameAndLevel:function(e,t){var a=this;this.findApi.api.params.name=e,this.findApi.api.params.level=t,this.$Util.api.get(this.findApi,this).then(function(e){if(0===e.error_code)for(var t=0;t<e.data.length;t++)e.data[t].id!==a.category.id&&(a.existsId=e.data.id)},function(e){a.alertErrorTips(e.message?e.message:"发生了未知的错误",300)})},submit:function(){var e=this;this.$refs[this.formRef].validate(function(t){if(t){bus.$emit("on-loading");var a=e;if(1!==a.category.level&&(0===a.category.parent_id||""===a.category.parent_id))return bus.$emit("on-loading"),void a.alertErrorTips("父级品类不能为空");if(a.category.ratio_of_image-1!=0)return bus.$emit("on-loading"),void a.alertErrorTips("图片长宽比需要1:1");var i=e.createApi;"edit"===a.usage&&(i=e.updateApi),e.$Util.api.post(i,e.category,a).then(function(e){bus.$emit("on-loading"),0===e.error_code?a.$Modal.success({width:250,content:"提交成功"}):a.alertErrorTips(e.error_description?e.error_description:"提交失败",300)},function(e){bus.$emit("on-loading"),a.alertErrorTips(e.message?e.message:"提交失败",300)})}else e.alertErrorTips("有表单项填写非法")})}}}},eoW9:function(e,t,a){a("oNMH");var i=a("VU/8")(a("SXWV"),a("GXfa"),"data-v-cb10dcdc",null);e.exports=i.exports},oNMH:function(e,t,a){var i=a("wlgt");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("rjj0")("473fc7e7",i,!0)},uuRy:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("m-page-edit",{attrs:{"is-loading":e.loadingState}},[a("m-category-form",{attrs:{usage:"edit",id:e.id},on:{loading:e.changeLoadingState}})],1)},staticRenderFns:[]}},wlgt:function(e,t,a){t=e.exports=a(0)(),t.push([e.i,".ivu-form-item-required[data-v-cb10dcdc]:not(:last-child){margin-bottom:24px}.fixed-width-input[data-v-cb10dcdc]{display:inline-block;width:300px}.input-tips[data-v-cb10dcdc]{margin-left:10px;font-size:12px}.required-input[data-v-cb10dcdc]{position:relative}.required-input[data-v-cb10dcdc]:before{position:absolute;top:10px;content:'*';display:block;line-height:1;font-family:SimSun;font-size:12px;color:#ed3f14}",""])}});