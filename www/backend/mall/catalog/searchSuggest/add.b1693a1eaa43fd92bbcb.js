webpackJsonp([59],{"1Pe4":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("hkVv"),i=s.n(a);t.default={name:"app",components:{MSearchSuggestForm:i.a}}},"1QXM":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("m-page-edit",[s("m-search-suggest-form",{attrs:{usage:"add"}})],1)},staticRenderFns:[]}},LdJI:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("m-page",[s("Card",[s("p",{attrs:{slot:"title"},slot:"title"},[e._v("基本信息")]),e._v(" "),s("Button",{attrs:{slot:"extra",type:"primary"},on:{click:e.submit},slot:"extra"},[e._v("提交")]),e._v(" "),s("div",[s("Form",{ref:e.formRef,attrs:{model:e.searchSuggest,rules:e.validateRules,"label-width":80}},[s("FormItem",{attrs:{label:"搜索词","label-width":70,prop:"keyword"}},[s("Input",{staticClass:"fixed-width-input",attrs:{placeholder:""},model:{value:e.searchSuggest.keyword,callback:function(t){e.$set(e.searchSuggest,"keyword",t)},expression:"searchSuggest.keyword"}})],1),e._v(" "),s("FormItem",{attrs:{label:"召回词","label-width":70,prop:"suggestion"}},[s("Input",{staticClass:"fixed-width-input",attrs:{placeholder:""},model:{value:e.searchSuggest.suggestion,callback:function(t){e.$set(e.searchSuggest,"suggestion",t)},expression:"searchSuggest.suggestion"}}),e._v(" "),s("p",[e._v("不超过5个字符，不含特殊字符")])],1),e._v(" "),s("Form-item",{attrs:{label:"召回词排序值",prop:"sort"}},[s("Input-number",{staticClass:"fixed-width-input",attrs:{placeholder:""},model:{value:e.searchSuggest.sort,callback:function(t){e.$set(e.searchSuggest,"sort",t)},expression:"searchSuggest.sort"}})],1),e._v(" "),s("FormItem",{attrs:{label:"召回词路由","label-width":70}},[s("m-app-route",{staticStyle:{width:"300px"},attrs:{defaultRoute:e.searchSuggest.app_route,placeholder:""},on:{"on-ok":e.handleRoute},model:{value:e.searchSuggest.app_route,callback:function(t){e.$set(e.searchSuggest,"app_route",t)},expression:"searchSuggest.app_route"}})],1),e._v(" "),s("Form-item",{attrs:{label:"召回词图片",prop:"image"}},[s("m-upload-image",{attrs:{"default-images":[{url:e.searchSuggest.image}]},on:{"on-success":e.handleUploadSuccess}})],1)],1)],1)],1)],1)},staticRenderFns:[]}},Sxgb:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"MSearchSuggestForm",props:{id:{type:String,default:""},usage:{type:String,default:"add"}},data:function(){var e=this;return{searchSuggest:{id:0,keyword:"",suggestion:"",app_route:"",image:"",sort:0},ParentLevelOptions:[],formRef:"baseForm",nameLastChangedAt:null,existsId:0,detailApi:{api:{path:"/boss/mall/catalog/search-suggest/detail",params:{id:0,fields:"{id,keyword,suggestion,app_route,image{origin},sort}"}}},findApi:{api:{path:"/boss/mall/catalog/search-suggest/detail",params:{name:"",fields:"{id,suggestion}"}}},createApi:{api:{path:"/boss/mall/catalog/search-suggest/create"}},updateApi:{api:{path:"/boss/mall/catalog/search-suggest/update"}},validateRules:{keyword:[{required:!0,message:"搜索词名称不能为空",trigger:"blur"}],suggestion:[{required:!0,message:"召回词名称不能为空",trigger:"blur"},{type:"string",max:5,message:"不超过5个字符，不含特殊字符",trigger:"blur"},{validator:function(t,s,a){e.existsId?a(new Error("与已有召回词重名")):a()},trigger:"blur"}],image:[{required:!0,message:"图片不能为空",trigger:"change"}],sort:[{type:"number",required:!0,message:"召回词排序不能为空",trigger:"blur"}]},loadTotal:2,loadedNum:0}},created:function(){var e=this,t=this;"edit"===t.usage&&(t.searchSuggest.id=this.id,t.detailApi.api.params.id=this.id),this.$nextTick(function(){"edit"===t.usage&&(t.detailApi.api.params.id?(bus.$emit("on-loading"),t.loadDetail()):e.$Modal.error({width:260,title:"错误提示",content:"非法操作：缺少必要参数"}))})},watch:{loadedNum:function(){this.loadedNum>=this.loadTotal&&(bus.$emit("on-loading"),this.loadedNum=0)},"searchSuggest.suggestion":function(){this.existsId=0,this.nameLastChangedAt=(new Date).getTime(),this.searchSuggest.suggestion&&setTimeout(this.isNameExists,1e3)}},methods:{loadDetail:function(){var e=this;this.$Util.api.get(this.detailApi,this).then(function(t){bus.$emit("on-loading"),e.searchSuggest=t.data,e.searchSuggest.image=t.data.image.origin},function(t){bus.$emit("on-loading"),e.alertErrorTips(t.message?t.message:"发生了未知的错误",300)})},alertErrorTips:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:250;this.$Modal.error({width:t,content:e})},handleUploadSuccess:function(e){this.searchSuggest.image=e[0].url},isNameExists:function(){(new Date).getTime()-1e3>=this.nameLastChangedAt&&this.findByName(this.searchSuggest.suggestion)},findByName:function(e){var t=this;this.findApi.api.params.suggestion=e,this.$Util.api.get(this.findApi,this).then(function(e){0===e.error_code&&e.data.id!==t.searchSuggest.id&&(t.existsId=e.data.id)},function(e){t.alertErrorTips(e.message?e.message:"发生了未知的错误",300)})},submit:function(){var e=this;this.$refs[this.formRef].validate(function(t){if(t){var s=/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,a=/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;if(s.test(e.searchSuggest.suggestion)||a.test(e.searchSuggest.suggestion))return e.alertErrorTips("名称不能包含特殊字符",300),!1;bus.$emit("on-loading");var i=e,r=e.createApi;"edit"===i.usage&&(r=e.updateApi),e.$Util.api.post(r,e.searchSuggest,i).then(function(e){bus.$emit("on-loading"),0===e.error_code?location.hash="/mall/catalog/searchSuggest/list":i.alertErrorTips(e.error_description?e.error_description:"提交失败",300)},function(e){bus.$emit("on-loading"),i.alertErrorTips(e.message?e.message:"提交失败",300)})}else e.alertErrorTips("有表单项填写非法")})}}}},V3Lu:function(e,t,s){var a=s("VU/8")(s("1Pe4"),s("1QXM"),null,null);e.exports=a.exports},c0Zh:function(e,t,s){t=e.exports=s(0)(),t.push([e.i,".ivu-form-item-required[data-v-72dd1784]:not(:last-child){margin-bottom:24px}.fixed-width-input[data-v-72dd1784]{display:inline-block;width:300px}.input-tips[data-v-72dd1784]{margin-left:10px;font-size:12px}",""])},hkVv:function(e,t,s){s("jmq3");var a=s("VU/8")(s("Sxgb"),s("LdJI"),"data-v-72dd1784",null);e.exports=a.exports},jmq3:function(e,t,s){var a=s("c0Zh");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);s("rjj0")("29ac9d70",a,!0)}});