webpackJsonp([27],{"/RIs":function(t,e,a){a("fHI1");var r=a("VU/8")(a("QufU"),a("uSCp"),"data-v-431ffe49",null);t.exports=r.exports},"0I4b":function(t,e,a){e=t.exports=a(0)(),e.push([t.i,".ivu-form>.ivu-row[data-v-d7055284]:not(:last-child){margin-bottom:10px}",""])},"2BOn":function(t,e,a){a("VCFu");var r=a("VU/8")(a("dPXm"),a("MZ+7"),"data-v-d7055284",null);t.exports=r.exports},"MZ+7":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Card",[a("Form",{attrs:{model:t.searchParams}},[a("Row",[a("Col",{attrs:{span:"5"}},[a("FormItem",{attrs:{label:"搜索词","label-width":100}},[a("Input",{attrs:{placeholder:"多个关键词之间用中/英文逗号隔开"},model:{value:t.searchParams.keyword,callback:function(e){t.$set(t.searchParams,"keyword",e)},expression:"searchParams.keyword"}})],1)],1),t._v(" "),a("Col",{attrs:{span:"5"}},[a("FormItem",{attrs:{label:"召回词","label-width":70}},[a("Input",{attrs:{placeholder:"多个关键词之间用中/英文逗号隔开"},model:{value:t.searchParams.suggestion,callback:function(e){t.$set(t.searchParams,"suggestion",e)},expression:"searchParams.suggestion"}})],1)],1)],1),t._v(" "),a("Row",[a("Col",{attrs:{span:"2"}},[a("Button",{attrs:{type:"primary",long:""},on:{click:t.onSearch}},[t._v("搜索")])],1),t._v(" "),a("Col",{attrs:{span:"2",push:"19"}},[a("Button",{attrs:{type:"primary",long:""},on:{click:t.toCreate}},[t._v("新建")])],1)],1)],1)],1)},staticRenderFns:[]}},NScW:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Card",[a("Table",{attrs:{border:"",columns:t.columns,data:t.data}}),t._v(" "),a("div",{staticClass:"page-bar"},[a("Page",{attrs:{current:t.page.currentPage,"page-size":t.page.pageSize,total:t.page.total,size:"small"},on:{"on-change":t.changePage}})],1)],1)},staticRenderFns:[]}},OM59:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"MTable",props:{data:{type:Array,default:function(){return[]}},page:{type:Object,default:function(){return{total:0,pageSize:24,currentPage:1}}}},data:function(){var t=this;return{trashApi:{api:{path:"/boss/mall/catalog/search-suggest/delete"}},columns:[{title:"ID",key:"id",align:"center",sortable:!0,width:80},{title:"搜索词",key:"keyword",align:"center",width:100},{title:"召回词",key:"suggestion",align:"center",width:100},{title:"图片",key:"image",align:"center",width:100,render:function(t,e){return e.row.image.origin&&e.row.image.url?t("div",{style:{height:"60px",width:"60px",border:"1px solid transparent",borderRadius:"4px",background:"#fff",boxShadow:"0 1px 1px rgba(0,0,0,.2)"}},[t("img",{attrs:{src:e.row.image.url},style:{width:"100%",height:"100%"}})]):t("span",{},"未上传")}},{title:"排序值",key:"sort",align:"center",width:100},{title:"召回路由",key:"app_route",align:"center",width:200},{title:"创建时间",key:"create_time",align:"center",sortable:!0,width:120,render:function(e,a){var r=parseInt(a.row.create_time);return e("div",{},[e("p",{},t.$Util.dateFormat(r,"yyyy-MM-dd")),e("p",{},t.$Util.dateFormat(r,"hh:mm:ss"))])}},{title:"更新时间",key:"update_time",align:"center",sortable:!0,width:120,render:function(e,a){var r=parseInt(a.row.update_time);return e("div",{},[e("p",{},t.$Util.dateFormat(r,"yyyy-MM-dd")),e("p",{},t.$Util.dateFormat(r,"hh:mm:ss"))])}},{title:"操作",key:"action",align:"center",render:function(e,a){return e("div",{},[e("Button",{attrs:{type:"text",size:"small"},style:{color:"#3366FF"},on:{click:function(){location.hash="/mall/catalog/searchSuggest/edit/"+a.row.id}}},"编辑"),e("Button",{attrs:{type:"text",size:"small"},style:{color:"#FF0000"},on:{click:function(){var e=t;e.$Modal.confirm({width:300,loading:!0,content:"确认废弃ID【"+a.row.id+"】么？",onOk:function(){t.$Util.api.post(t.trashApi,{id:a.row.id},e).then(function(t){0===t.error_code?(a.row.status=0,e.$Modal.remove(),setTimeout(function(){e.$Modal.success({width:250,loading:!1,content:"已成功作废"}),location.reload()},300),setTimeout(function(){location.reload()},1500)):(e.$Modal.remove(),setTimeout(function(){bus.$emit("alert-error-tips",t.error_description?t.error_description:"发生了未知的错误",300)},300))},function(t){e.$Modal.remove(),setTimeout(function(){bus.$emit("alert-error-tips",t.message?t.message:"发生了未知的错误",300)},300)})}})}}},"删除")])}}]}},methods:{changePage:function(t){bus.$emit("change-page",t)}}}},"Og/q":function(t,e,a){e=t.exports=a(0)(),e.push([t.i,".page-bar[data-v-032dbd28]{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;margin:15px auto 0}",""])},QufU:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("2BOn"),o=a.n(r),i=a("fHeN"),s=a.n(i);e.default={name:"List",components:{MSearch:o.a,MTable:s.a},data:function(){return{listApi:{api:{path:"/boss/mall/catalog/search-suggest/list",params:{offset:0,limit:24,keyword:"",suggestion:"",fields:"{id,keyword,suggestion,sort,app_route,image{origin,url},create_time,update_time}"}}},pageApi:{api:{path:"/boss/mall/catalog/search-suggest/page"}},loadTotal:2,loadedNum:0,data:[],page:{total:0,pageSize:24,currentPage:1}}},created:function(){var t=this;this.$nextTick(function(){bus.$emit("on-loading"),t.loadList(),t.loadPage(),bus.$on("alert-error-tips",function(e,a){return t.alertErrorTips(e,a)}),bus.$on("on-search",function(){return t.doSearch()}),bus.$on("change-page",function(e){return t.changePage(e)})})},watch:{loadedNum:function(){this.loadedNum>=this.loadTotal&&(bus.$emit("on-loading"),this.loadedNum=0)}},methods:{loadList:function(){var t=this;this.$Util.api.get(this.listApi,this).then(function(e){t.loadedNum+=1,t.data=e.data},function(e){t.loadedNum+=1,t.alertErrorTips(e.message?e.message:"发生了未知的错误",300)})},loadPage:function(){this.page.total=0,this.page.currentPage=1,this.pageApi.api.params=this.listApi.api.params;var t=this;this.$Util.api.get(this.pageApi,this).then(function(e){t.loadedNum+=1,t.page.total=e.data.total},function(e){t.loadedNum+=1,t.alertErrorTips(e.message?e.message:"发生了未知的错误",300)})},doSearch:function(){this.data=[],bus.$emit("on-loading"),this.loadList(),this.loadPage()},changePage:function(t){this.page.currentPage=t,this.listApi.api.params.offset=(t-1)*this.listApi.api.params.limit,this.loadTotal=1,bus.$emit("on-loading"),this.loadList()},alertErrorTips:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:250;this.$Modal.error({width:e,content:t})}},beforeDestroy:function(){bus.$off("alert-error-tips"),bus.$off("on-search"),bus.$off("change-page")}}},VCFu:function(t,e,a){var r=a("0I4b");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("rjj0")("a6dcc9b4",r,!0)},Y76e:function(t,e,a){e=t.exports=a(0)(),e.push([t.i,".ivu-card[data-v-431ffe49]{margin-bottom:15px}.top[data-v-431ffe49]{padding:10px;background:rgba(0,153,229,.7);color:#fff;text-align:center;border-radius:2px}",""])},dPXm:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"MSearch",props:{searchParams:{type:Object,default:function(){return{keyword:"",suggestion:""}}}},methods:{toCreate:function(){location.hash="/mall/catalog/searchSuggest/add"},onSearch:function(){bus.$emit("on-search")}}}},fHI1:function(t,e,a){var r=a("Y76e");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("rjj0")("bb733980",r,!0)},fHeN:function(t,e,a){a("fNji");var r=a("VU/8")(a("OM59"),a("NScW"),"data-v-032dbd28",null);t.exports=r.exports},fNji:function(t,e,a){var r=a("Og/q");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("rjj0")("5b5b3828",r,!0)},uSCp:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("m-page",[a("m-search",{attrs:{searchParams:t.listApi.api.params},on:{"update:searchParams":function(e){t.$set(t.listApi.api,"params",e)}}}),t._v(" "),a("m-table",{attrs:{data:t.data,page:t.page}}),t._v(" "),a("Back-top",{attrs:{bottom:100,right:30}},[a("div",{staticClass:"top"},[t._v("返回顶端")])])],1)},staticRenderFns:[]}}});