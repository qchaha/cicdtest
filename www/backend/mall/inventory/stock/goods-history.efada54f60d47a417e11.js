webpackJsonp([20],{"+o1C":function(t,e,a){a("yrjB");var r=a("VU/8")(a("OIhh"),a("nLXQ"),null,null);t.exports=r.exports},"3e7R":function(t,e,a){var r=a("mm/r");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("rjj0")("7008a694",r,!0)},"4GHN":function(t,e,a){a("FwZA");var r=a("VU/8")(a("77jH"),a("hf8V"),"data-v-1e2e31c3",null);t.exports=r.exports},"77jH":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"InventoryHistorySearchForm",props:{idName:{type:String,default:"ID"},searchParams:{type:Object,default:function(){return{id:null}}}},data:function(){return{}},methods:{onSearch:function(){this.$emit("onSearch")}}}},FwZA:function(t,e,a){var r=a("vz7R");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("rjj0")("508e30ea",r,!0)},IQAM:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Poptip",{attrs:{title:"",content:t.fullText,placement:t.placement}},[a("span",[t._v(t._s(t.ellipsisText))]),t._v(" "),a("Icon",{attrs:{type:"help-circled"}})],1)},staticRenderFns:[]}},N0Sx:function(t,e,a){a("3e7R");var r=a("VU/8")(a("hGZX"),a("W0Ol"),"data-v-11d3d9c2",null);t.exports=r.exports},OIhh:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"InventoryHistoryTable",props:{columns:{type:Array,default:function(){return[]}},data:{type:Array,default:function(){return[]}},page:{type:Object,default:function(){return{total:0,pageSize:24,currentPage:1}}}},data:function(){return{}},methods:{onChangePage:function(t){this.$emit("onChangePage",t)}}}},W0Ol:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("m-page",[a("inventory-history-search-form",{attrs:{idName:t.idName,searchParams:t.searchParams},on:{"update:searchParams":function(e){t.searchParams=e},onSearch:t.onSearch}}),t._v(" "),a("inventory-history-table",{attrs:{columns:t.columns,data:t.data,page:t.page},on:{onChangePage:t.onChangePage}}),t._v(" "),a("Back-top",{attrs:{bottom:100,right:100}},[a("div",{staticClass:"top"},[t._v("返回顶端")])])],1)},staticRenderFns:[]}},WhC6:function(t,e,a){a("q9xo");var r=a("VU/8")(a("salm"),a("IQAM"),"data-v-2b6a1bac",null);t.exports=r.exports},hGZX:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("+o1C"),n=a.n(r),o=a("WhC6"),i=a.n(o),s=a("4GHN"),l=a.n(s);e.default={name:"InventoryHistory",components:{InventoryHistoryTable:n.a,InventoryHistorySearchForm:l.a},data:function(){return{idName:"商品ID",searchParams:{id:null},columns:[{title:"商品ID",key:"goods_id",align:"center"},{title:"仓库ID",key:"warehouse_id",align:"center"},{title:"操作类型",key:"operation_type",align:"center"},{title:"变动数",key:"change_quantity",align:"center",render:function(t,e){var a=parseInt(e.row.change_quantity);return t("Tag",{attrs:{color:a>0?"green":a<0?"yellow":""}},e.row.change_quantity)}},{title:"总可销",key:"total_saleable_quantity",align:"center"},{title:"可销",key:"saleable_quantity",align:"center"},{title:"备注",key:"remark",align:"center",render:function(t,e){return t(i.a,{props:{fullText:e.row.remark,length:50}})}},{title:"订单ID",key:"order_id",align:"center",render:function(t,e){return t("span",{},e.row.order_id>0?e.row.order_id:"")}},{title:"创建时间",key:"create_time",align:"center",sortable:!0,width:200}],data:[],goodsStockHistoryApi:{api:{path:"/boss/mall/inventory/history/goods/list",params:{offset:0,limit:24,goods_id:null}}},page:{total:0,pageSize:24,currentPage:1},loadTotal:1,loadedNum:0}},watch:{loadedNum:function(){this.loadedNum>=this.loadTotal&&(bus.$emit("on-loading"),this.loadedNum=0)}},methods:{alertErrorTips:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300;this.$Modal.error({width:e,content:t})},loadGoodsStockHistory:function(){var t=this;this.$Util.api.get(this.goodsStockHistoryApi,this).then(function(e){t.loadedNum+=1,t.data=e.data.data,t.page.total=e.data.page.total,t.page.currentPage=e.data.page.currentPage,t.page.pageSize=e.data.page.pageSize},function(e){t.loadedNum+=1,t.alertErrorTips(e.message?e.message:"发生了未知的错误")})},onChangePage:function(t){this.page.currentPage=t,this.goodsStockHistoryApi.api.params.offset=(t-1)*this.goodsStockHistoryApi.api.params.limit,this.loadTotal=1,bus.$emit("on-loading"),this.loadGoodsStockHistory()},onSearch:function(){this.goodsStockHistoryApi.api.params.goods_id=this.searchParams.id,this.data=[],this.loadTotal=1,this.page.total=0,this.page.currentPage=1,bus.$emit("on-loading"),this.loadGoodsStockHistory()}},created:function(){this.$nextTick(function(){bus.$emit("on-loading")}),this.loadGoodsStockHistory()},beforeDestroy:function(){bus.$off("alert-error-tips")}}},hf8V:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Card",[a("Form",{attrs:{model:t.searchParams}},[a("Row",[a("Col",{attrs:{span:"3"}},[a("FormItem",{attrs:{label:t.idName,"label-width":50}},[a("Input",{on:{"on-enter":t.onSearch},model:{value:t.searchParams.id,callback:function(e){t.$set(t.searchParams,"id",e)},expression:"searchParams.id"}})],1)],1),t._v(" "),a("Col",{attrs:{span:"3"}},[a("Button",{attrs:{type:"primary"},on:{click:t.onSearch}},[t._v("搜索")])],1)],1)],1)],1)},staticRenderFns:[]}},"mm/r":function(t,e,a){e=t.exports=a(0)(),e.push([t.i,".ivu-card[data-v-11d3d9c2]{margin-bottom:15px}.top[data-v-11d3d9c2]{padding:10px;background:rgba(0,153,229,.7);color:#fff;text-align:center;border-radius:2px}",""])},nLXQ:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Card",[a("p",{attrs:{slot:"title"},slot:"title"},[t._v("\n        最多1万条记录，"),a("Tag",{attrs:{color:"green"}}),t._v("表示增加，"),a("Tag",{attrs:{color:"yellow"}}),t._v("表示减少，"),a("Tag"),t._v("表示不变\n    ")],1),t._v(" "),a("Table",{attrs:{border:"",columns:t.columns,data:t.data}}),t._v(" "),a("div",{staticClass:"page-bar"},[a("Page",{attrs:{current:t.page.currentPage,"page-size":t.page.pageSize,total:t.page.total,size:"small"},on:{"on-change":t.onChangePage}})],1)],1)},staticRenderFns:[]}},q9xo:function(t,e,a){var r=a("soLO");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("rjj0")("33c634da",r,!0)},salm:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"Ellipsis",props:{fullText:{type:String},length:{type:Number},placement:{type:String,default:"right"}},data:function(){return{}},computed:{ellipsisText:function(){return this.fullText.substr(0,this.length)+"..."}}}},sd35:function(t,e,a){e=t.exports=a(0)(),e.push([t.i,".page-bar{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;margin:15px auto 0}",""])},soLO:function(t,e,a){e=t.exports=a(0)(),e.push([t.i,"",""])},vz7R:function(t,e,a){e=t.exports=a(0)(),e.push([t.i,".ivu-form>.ivu-row[data-v-1e2e31c3]:not(:last-child){margin-bottom:10px}",""])},yrjB:function(t,e,a){var r=a("sd35");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("rjj0")("5294b9bd",r,!0)}});